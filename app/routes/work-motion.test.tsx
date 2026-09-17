import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';

import OurWork from './our-work';

afterEach(cleanup);

it('switches the selected profile and its matching post together', () => {
  render(<OurWork />);
  const demo = within(screen.getByRole('region', { name: '멀티 프로필 시연' }));
  fireEvent.click(demo.getByRole('button', { name: /모래의 게임계/ }));
  expect(demo.getByRole('button', { name: /모래의 게임계/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(demo.getByRole('img', { name: /선택한 프로필/ })).toHaveAttribute(
    'src',
    '/figma/work-game-post.png',
  );
  fireEvent.click(demo.getByRole('button', { name: /모래의 일상계/ }));
  expect(demo.getByRole('img', { name: /선택한 프로필/ })).toHaveAttribute(
    'src',
    '/figma/work-daily-post.png',
  );
});

it('shows the original author profile without a transition control', () => {
  render(<OurWork />);
  expect(screen.getByRole('img', { name: /소개와 게시물/ })).toHaveAttribute(
    'src',
    '/figma/work-profile.png',
  );
  expect(screen.queryByRole('button', { name: '모래의 프로필 보기' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: '게시물로 돌아가기' })).not.toBeInTheDocument();
});

it('changes sample content without interactive visibility settings or publishing', () => {
  render(<OurWork />);
  const demo = within(screen.getByRole('region', { name: '글쓰기 시연' }));
  expect(demo.getByRole('img', { name: '코스모 원본 글쓰기 화면' })).toHaveAttribute(
    'src',
    '/figma/composer.png',
  );
  fireEvent.click(demo.getByRole('button', { name: '낙서 첨부' }));
  expect(demo.getByRole('img', { name: '파란 캐릭터와 토끼 낙서' })).toBeInTheDocument();
  fireEvent.click(demo.getByRole('button', { name: '작품 소개' }));
  expect(demo.queryByRole('img', { name: '파란 캐릭터와 토끼 낙서' })).not.toBeInTheDocument();
  expect(demo.queryByRole('button', { name: /공개 범위/ })).not.toBeInTheDocument();
  expect(demo.queryByRole('radio')).not.toBeInTheDocument();
  expect(demo.queryByRole('button', { name: '게시' })).not.toBeInTheDocument();
});

it('restores the federation illustration and keeps one attached K logo without a peel flap', () => {
  const { container } = render(<OurWork />);
  expect(container.querySelector('.federation img')).toHaveAttribute(
    'src',
    '/figma/work-federation.png',
  );
  expect(container.querySelector('.federation-demo')).not.toBeInTheDocument();
  const card = screen.getByRole('link', { name: '코스모 공식 계정 방문하기' });
  expect(card.querySelectorAll('img')).toHaveLength(2);
  expect(card.querySelector('.sticker-flap')).not.toBeInTheDocument();
});
