import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const root = fileURLToPath(new URL('../', import.meta.url));
const { name: packageName, version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (typeof version !== 'string' || !/^\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/.test(version)) {
  throw new Error('package.json must contain a valid version number');
}
const archivePath = join(root, 'dist', `${packageName}-${version}.zip`);
const entries = {
  [`${packageName}/SKILL.md`]: await readFile(join(root, 'SKILL.md')),
  [`${packageName}/LICENSE`]: await readFile(join(root, 'LICENSE')),
};

const archive = zipSync(entries, {
  level: 9,
  mtime: new Date(2000, 0, 1),
});

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(archivePath, archive);
console.log(`Built ${archivePath}`);
