import { readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url));
const root = path.join(repositoryRoot, 'artifacts');
const resultsPath =
  process.env.PIXEL_RESULTS_PATH ?? path.join(tmpdir(), 'byulmaru-react-pixel-diff-results.json');
const files = (await readdir(path.join(root, 'baseline')))
  .filter((file) => file.endsWith('.png'))
  .sort();
const reactFiles = (await readdir(path.join(root, 'react')))
  .filter((file) => file.endsWith('.png'))
  .sort();
if (files.length !== 22 || JSON.stringify(files) !== JSON.stringify(reactFiles)) {
  throw new Error(
    `screenshot inventory mismatch: baseline=${files.length} react=${reactFiles.length}`,
  );
}
const results = [];

for (const file of files) {
  const baseline = await sharp(path.join(root, 'baseline', file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const react = await sharp(path.join(root, 'react', file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sameDimensions =
    baseline.info.width === react.info.width &&
    baseline.info.height === react.info.height &&
    baseline.info.channels === react.info.channels;
  if (!sameDimensions) {
    throw new Error(`dimension mismatch: ${file}`);
  }

  let absolute = 0;
  let squared = 0;
  let changed = 0;
  let over10 = 0;
  let over30 = 0;
  const pixels = baseline.info.width * baseline.info.height;
  for (let offset = 0; offset < baseline.data.length; offset += 4) {
    let max = 0;
    for (let channel = 0; channel < 3; channel += 1) {
      const delta = Math.abs(baseline.data[offset + channel] - react.data[offset + channel]);
      absolute += delta;
      squared += delta * delta;
      max = Math.max(max, delta);
    }
    if (max > 0) {
      changed += 1;
    }
    if (max > 10) {
      over10 += 1;
    }
    if (max > 30) {
      over30 += 1;
    }
  }
  results.push({
    file,
    width: baseline.info.width,
    height: baseline.info.height,
    meanAbsoluteError: Number((absolute / (pixels * 3)).toFixed(4)),
    rootMeanSquareError: Number(Math.sqrt(squared / (pixels * 3)).toFixed(4)),
    changedPixelPercent: Number(((changed / pixels) * 100).toFixed(4)),
    pixelOver10Percent: Number(((over10 / pixels) * 100).toFixed(4)),
    pixelOver30Percent: Number(((over30 / pixels) * 100).toFixed(4)),
  });
}

const violations = results.flatMap((result) => {
  const exactPage = result.file.startsWith('home-') || result.file.startsWith('about-us-');
  const overview = result.file.startsWith('our-work-overview-');
  const threshold = exactPage
    ? { meanAbsoluteError: 0, rootMeanSquareError: 0, pixelOver30Percent: 0 }
    : overview
      ? { meanAbsoluteError: 0.2, rootMeanSquareError: 3, pixelOver30Percent: 0.15 }
      : { meanAbsoluteError: 0.75, rootMeanSquareError: 4.25, pixelOver30Percent: 0.15 };
  const exceeded = Object.entries(threshold).filter(
    ([metric, maximum]) => result[metric] > maximum,
  );
  return exceeded.length > 0 ? [{ file: result.file, exceeded, result }] : [];
});

await writeFile(resultsPath, `${JSON.stringify({ results, violations }, null, 2)}\n`);
console.log(`PIXEL_DIFF_RESULTS=${resultsPath}`);
console.log('file\tdimensions\tMAE\tRMSE\t>10%\t>30%');
for (const result of results) {
  console.log(
    `${result.file}\t${result.width}x${result.height}\t${result.meanAbsoluteError}\t${result.rootMeanSquareError}\t${result.pixelOver10Percent}\t${result.pixelOver30Percent}`,
  );
}
console.log(`PIXEL_DIFF_FAILURES=${violations.length}`);
if (violations.length > 0) {
  console.error(JSON.stringify(violations, null, 2));
  process.exitCode = 1;
}
