import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const root = fileURLToPath(new URL('../', import.meta.url));
const skillName = 'four-panel-reference-generator';
const { version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (typeof version !== 'string' || !/^\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/.test(version)) {
  throw new Error('package.json must contain a valid version number');
}
const archivePath = join(root, 'dist', `${skillName}-skill-${version}.zip`);
const files = [
  'SKILL.md',
  'agents/openai.yaml',
  'assets/icon.svg',
  'README.md',
  'LICENSE',
];

const entries = Object.fromEntries(
  await Promise.all(
    files.map(async (path) => [
      `${skillName}/${path}`,
      new Uint8Array(await readFile(join(root, path))),
    ]),
  ),
);

const archive = zipSync(entries, {
  level: 9,
  mtime: new Date(2000, 0, 1),
});

await mkdir(dirname(archivePath), { recursive: true });
await writeFile(archivePath, archive);
console.log(`Built ${archivePath}`);
