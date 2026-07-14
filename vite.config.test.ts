import path from 'node:path';

import { resolveConfig } from 'vite';

it('resolves app aliases in the development module runner', async () => {
  const config = await resolveConfig({}, 'serve');
  const appAlias = config.resolve.alias.find((entry) => entry.find === '~');

  expect(appAlias?.replacement).toBe(path.resolve('app'));
});
