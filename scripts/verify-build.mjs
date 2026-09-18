import { access, readFile } from 'node:fs/promises';

const required = [
  'build/client/index.html',
  'build/client/about-us/index.html',
  'build/client/our-work/index.html',
  'build/client/favicon.ico',
  'build/client/og-image.png',
  'build/client/robots.txt',
  'build/client/sitemap.xml',
];

await Promise.all(required.map((path) => access(path)));

for (const [path, expected] of [
  [
    'build/client/index.html',
    {
      title: '별마루',
      description: 'SNS 코스모를 만드는 팀입니다.',
      canonical: 'https://byulmaru.co/',
    },
  ],
  [
    'build/client/about-us/index.html',
    {
      title: '팀 소개 · 별마루',
      description: '코스모를 만드는 세 사람의 소개와 인터뷰를 만나보세요.',
      canonical: 'https://byulmaru.co/about-us',
    },
  ],
  [
    'build/client/our-work/index.html',
    {
      title: '코스모 · 별마루',
      description: '한 계정에서 여러 프로필로 활동할 수 있는 SNS입니다.',
      canonical: 'https://byulmaru.co/our-work',
    },
  ],
]) {
  const html = await readFile(path, 'utf8');

  for (const value of [
    `<title>${expected.title}</title>`,
    `<meta name="description" content="${expected.description}"/>`,
    `<link rel="canonical" href="${expected.canonical}"/>`,
    `<meta property="og:title" content="${expected.title}"/>`,
    `<meta property="og:description" content="${expected.description}"/>`,
    `<meta property="og:url" content="${expected.canonical}"/>`,
    '<meta property="og:image" content="https://byulmaru.co/og-image.png"/>',
    '<meta name="twitter:card" content="summary_large_image"/>',
  ]) {
    if (!html.includes(value)) {
      throw new Error(`${path} is missing ${value}`);
    }
  }

  if (!html.includes('<html lang="ko">')) {
    throw new Error(`${path} must declare Korean as the document language`);
  }
}

const robots = await readFile('build/client/robots.txt', 'utf8');
if (!robots.includes('Sitemap: https://byulmaru.co/sitemap.xml')) {
  throw new Error('robots.txt must advertise the sitemap');
}

const sitemap = await readFile('build/client/sitemap.xml', 'utf8');
for (const url of [
  'https://byulmaru.co/',
  'https://byulmaru.co/about-us',
  'https://byulmaru.co/our-work',
]) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    throw new Error(`sitemap.xml is missing ${url}`);
  }
}
