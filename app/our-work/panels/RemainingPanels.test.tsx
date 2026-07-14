import { render, screen, within } from '@testing-library/react';

import { launchMetrics } from '../content';
import styles from '../our-work.module.css';
import { expectOnlyOurWorkModuleClasses } from '../test/assert-css-module-classes';
import { ArchitecturePanel } from './ArchitecturePanel';
import { DataOpsPanel } from './DataOpsPanel';
import { JourneyPanel } from './JourneyPanel';
import { MvpPanel } from './MvpPanel';

it('preserves the MVP scope content and counts', () => {
  const { container } = render(<MvpPanel />);

  expect(screen.getByRole('heading', { name: 'MVP 범위' })).toBeVisible();
  expect(container.querySelectorAll(`.${styles['feature-card']}`)).toHaveLength(4);
  expect(container.querySelectorAll(`.${styles['scope-item']}`)).toHaveLength(6);
  expect(container.querySelectorAll(`.${styles['oos-item']}`)).toHaveLength(9);
  expect(container.querySelectorAll(`.${styles['metric-row']}`)).toHaveLength(11);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-mvp');
  expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-mvp');
  expectOnlyOurWorkModuleClasses(container);
});

it('preserves the six user journeys', () => {
  const { container } = render(<JourneyPanel />);

  expect(
    screen.getByRole('heading', {
      name: '가입부터 연합, 탐색, 통합 피드까지의 핵심 여정',
    }),
  ).toBeVisible();
  expect(container.querySelectorAll(`.${styles['journey-item']}`)).toHaveLength(6);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-journey');
  expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-journey');
  expectOnlyOurWorkModuleClasses(container);
});

it('preserves the architecture nodes, pipelines, and CI/CD flow', () => {
  const { container } = render(<ArchitecturePanel />);

  expect(screen.getByRole('heading', { name: 'Inner Architecture' })).toBeVisible();
  expect(container.querySelectorAll(`.${styles['arch-node']}.${styles.domain}`)).toHaveLength(9);
  expect(container.querySelectorAll(`.${styles['arch-node']}.${styles.worker}`)).toHaveLength(5);
  expect(container.querySelectorAll(`.${styles['arch-node']}.${styles.external}`)).toHaveLength(4);

  const pipelines = container.querySelectorAll(`.${styles['pipeline-card']}`);
  expect(pipelines).toHaveLength(2);
  expect(pipelines[0].querySelectorAll(`.${styles['pipeline-step']}`)).toHaveLength(7);
  expect(pipelines[1].querySelectorAll(`.${styles['pipeline-step']}`)).toHaveLength(8);
  expect(container.querySelectorAll(`.${styles['cicd-step']}`)).toHaveLength(5);
  expect(container.querySelectorAll(`.${styles['cicd-arrow']}`)).toHaveLength(4);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-architecture');
  expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-architecture');
  expectOnlyOurWorkModuleClasses(container);
});

it('preserves all nine source schema cards, principles, and launch metrics', () => {
  const { container } = render(<DataOpsPanel />);

  expect(screen.getByRole('heading', { name: 'DB Schema' })).toBeVisible();
  expect(container.querySelectorAll(`.${styles['schema-card']}`)).toHaveLength(9);
  expect(container.querySelectorAll(`.${styles['data-card']}`)).toHaveLength(6);
  expect(container.querySelectorAll(`.${styles['metric-row']}`)).toHaveLength(launchMetrics.length);
  expect(launchMetrics).toHaveLength(11);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-data');
  expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-data');

  const schemaCards = container.querySelectorAll(`.${styles['schema-card']}`);
  expect(within(schemaCards[0] as HTMLElement).getByText('account')).toBeVisible();
  expect(within(schemaCards[8] as HTMLElement).getByText('profile_follow')).toBeVisible();
  expectOnlyOurWorkModuleClasses(container);
});
