import { render, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import { expectOnlyOurWorkModuleClasses } from '../test/assert-css-module-classes';
import { StarField } from './StarField';

it('does not render stars during prerender', () => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<StarField />);

  expect(container.querySelectorAll('[data-star]')).toHaveLength(0);
});

it('adds 120 styled stars after mounting on the client', async () => {
  const { container } = render(<StarField />);

  await waitFor(() => expect(container.querySelectorAll('[data-star]')).toHaveLength(120));

  const star = container.querySelector<HTMLElement>('[data-star]');
  expect(star).not.toBeNull();
  expect(star?.style.width).toMatch(/px$/);
  expect(star?.style.height).toBe(star?.style.width);
  expect(star?.style.left).toMatch(/%$/);
  expect(star?.style.top).toMatch(/%$/);
  expect(star?.style.getPropertyValue('--d')).toMatch(/s$/);
  expect(star?.style.getPropertyValue('--delay')).toMatch(/^-.*s$/);
  expect(star?.style.getPropertyValue('--op')).not.toBe('');
  expectOnlyOurWorkModuleClasses(container);
});
