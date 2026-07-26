import { render, screen } from '@testing-library/react';

import { TemporaryHome } from './TemporaryHome';

it('shows the approved renovation notice and only its contact action', () => {
  render(<TemporaryHome />);

  expect(screen.getByRole('img', { name: '별마루' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '별마루는 지금 새 단장을 준비하고 있어요.',
  );
  expect(
    screen.getByText('더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.'),
  ).toBeVisible();
  expect(screen.getByRole('link', { name: '문의하기 →' })).toHaveAttribute(
    'href',
    'mailto:hello@byulmaru.co',
  );
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});
