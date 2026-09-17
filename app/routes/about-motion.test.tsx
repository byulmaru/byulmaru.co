import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, it } from 'vitest';

import AboutUs from './about-us';

afterEach(cleanup);

it('makes avatar tips keyboard accessible and dismissible without hiding the introduction', async () => {
  render(
    <MemoryRouter>
      <AboutUs />
    </MemoryRouter>,
  );
  const avatar = screen.getByRole('button', { name: '이예은 / 샤샤 한 줄 소개' });
  fireEvent.focus(avatar);
  expect(screen.getByRole('tooltip')).toHaveTextContent('파이널 판타지 XIV');
  fireEvent.keyDown(avatar, { key: 'Escape' });
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(screen.getByText('SNS 헤비유저 · 파이널 판타지 XIV · 요즘은 뜨개질')).toBeVisible();
  fireEvent.click(avatar);
  await waitFor(() => expect(screen.getByRole('tooltip')).toBeVisible());
  fireEvent.blur(avatar);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

it('shows only documented dates and preserves all expandable interviews', () => {
  render(
    <MemoryRouter>
      <AboutUs />
    </MemoryRouter>,
  );
  expect(screen.getByRole('list', { name: '유키의 운영·활동 이력' })).toHaveTextContent('2017.10');
  expect(screen.getByRole('list', { name: '유키의 운영·활동 이력' })).toHaveTextContent(
    '2023.08–2025.10',
  );
  const expand = screen.getAllByRole('button', { name: '인터뷰 더 읽기' });
  expect(expand).toHaveLength(3);
  fireEvent.click(expand[1]);
  expect(screen.getByRole('button', { name: '인터뷰 접기' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});
