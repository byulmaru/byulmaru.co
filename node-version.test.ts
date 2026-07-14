import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

it('pins a Cloudflare build Node version compatible with React Router 8.2', async () => {
  const version = await readFile(resolve('.node-version'), 'utf8');

  expect(version.trim()).toBe('22.22.0');
});
