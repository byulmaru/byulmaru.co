import type { SvelteComponent } from 'svelte';
import { Temporal } from 'temporal-polyfill';

type MarkdownImported = {
  metadata: {
    date: string;
    title: string;
    subtitle?: string;
  };
  default: () => SvelteComponent;
};

export const articles = Object.entries(
  import.meta.glob<MarkdownImported>('$lib/articles/notice/**.svx', { eager: true })
)
.map(([path, data]) => {
  const splitPath = path.split('/');

  const match = data.metadata.date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const [, year, month, day] = match || [];

    return {
      metadata: {
        ...data.metadata,
        // YAML의 Date Format은 시간 포함 -> PDT로 먼저 변환 후 PD로 변환
        date: new Temporal.PlainDate(Number(year), Number(month), Number(day))
      },
      component: data.default,
      slug: splitPath.at(-1)!.replace(/\.svx$/, ''),
    }
})