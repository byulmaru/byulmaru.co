import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, Route, Routes } from 'react-router';

import { RouteAccessibility } from './RouteAccessibility';

function Harness() {
  return (
    <>
      <RouteAccessibility />
      <Link to="/about-us" onClick={() => (document.title = 'About us')}>
        About us
      </Link>
      <Link to="/autofocus" onClick={() => (document.title = 'Autofocus page')}>
        Autofocus page
      </Link>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about-us" element={<h1>About us</h1>} />
        <Route path="/autofocus" element={<input aria-label="Preferred field" autoFocus />} />
      </Routes>
    </>
  );
}

function renderHarness() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Harness />
    </MemoryRouter>,
  );
}

it('announces client routes and resets focus to body', async () => {
  const user = userEvent.setup();
  document.title = 'Byulmaru';
  const { container } = renderHarness();

  const announcer = container.querySelector('#route-announcer');
  expect(announcer).toHaveAttribute('aria-live', 'assertive');
  expect(announcer).toHaveAttribute('aria-atomic', 'true');
  expect(announcer).toBeEmptyDOMElement();

  const link = screen.getByRole('link', { name: 'About us' });
  link.focus();
  expect(link).toHaveFocus();

  await user.click(link);

  await waitFor(() => expect(announcer).toHaveTextContent('About us'));
  expect(document.body).toHaveFocus();
  expect(document.body).not.toHaveAttribute('tabindex');
});

it('prefers a route autofocus target while announcing the new title', async () => {
  const user = userEvent.setup();
  document.title = 'Byulmaru';
  const { container } = renderHarness();

  await user.click(screen.getByRole('link', { name: 'Autofocus page' }));

  await waitFor(() =>
    expect(container.querySelector('#route-announcer')).toHaveTextContent('Autofocus page'),
  );
  expect(screen.getByRole('textbox', { name: 'Preferred field' })).toHaveFocus();
});
