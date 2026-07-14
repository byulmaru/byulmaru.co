import { access, readFile } from 'node:fs/promises';

const required = [
  'build/client/index.html',
  'build/client/about-us/index.html',
  'build/client/our-work/index.html',
  'build/client/favicon.ico',
  'build/client/robots.txt',
];

await Promise.all(required.map((path) => access(path)));

for (const [path, title] of [
  ['build/client/index.html', '<title>Byulmaru</title>'],
  ['build/client/about-us/index.html', '<title>About us</title>'],
  ['build/client/our-work/index.html', '<title>Our Work — 별마루</title>'],
]) {
  const html = await readFile(path, 'utf8');

  if (!html.includes(title)) {
    throw new Error(`${path} is missing ${title}`);
  }

  if (!html.includes('<html lang="en">')) {
    throw new Error(`${path} does not preserve the original document language`);
  }
}
