import styles from '../our-work.module.css';

const sharedDividerClassNames = [
  'mx-4',
  'h-[50px]',
  'border-t',
  'border-white/60',
  'sm:mx-8',
  'lg:mx-0',
] as const;

const allowedClassNames = new Set([...Object.values(styles), 'star', ...sharedDividerClassNames]);

export function expectOnlyOurWorkModuleClasses(container: HTMLElement): void {
  for (const element of container.querySelectorAll<HTMLElement>('[class]')) {
    for (const className of element.classList) {
      expect(allowedClassNames).toContain(className);
    }
  }
}
