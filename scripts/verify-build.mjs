import { access, readFile } from 'node:fs/promises';

const required = [
  'build/client/index.html',
  'build/client/about-us/index.html',
  'build/client/our-work/index.html',
  'build/client/_redirects',
  'build/client/favicon.ico',
  'build/client/robots.txt',
];

await Promise.all(required.map((path) => access(path)));

const expectedTitle = '<title>새 단장 중 — 별마루</title>';
const expectedLang = '<html lang="ko">';
const retiredCopy = ['동인이 만드는,', '당사자의 시선으로', 'MVP Scope'];

for (const path of [
  'build/client/index.html',
  'build/client/about-us/index.html',
  'build/client/our-work/index.html',
]) {
  const html = await readFile(path, 'utf8');

  if (!html.includes(expectedTitle)) {
    throw new Error(`${path} is missing ${expectedTitle}`);
  }

  if (!html.includes(expectedLang)) {
    throw new Error(`${path} is missing ${expectedLang}`);
  }

  for (const copy of retiredCopy) {
    if (html.includes(copy)) {
      throw new Error(`${path} still exposes retired copy: ${copy}`);
    }
  }
}
