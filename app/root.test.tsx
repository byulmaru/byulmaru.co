import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import App from './root';

it('replaces the normal site shell with the temporary home', () => {
  render(<App />, { wrapper: MemoryRouter });

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '별마루는 지금 새 단장을 준비하고 있어요.',
  );
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  expect(screen.queryByText('동인이 만드는,')).not.toBeInTheDocument();
});
