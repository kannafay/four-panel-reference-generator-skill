import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { zipSync } from 'fflate';

const root = process.cwd();
const { name, version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));

if (typeof name !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  throw new Error('Invalid package name: use lowercase letters, digits, and hyphens.');
}
if (
  typeof version !== 'string' ||
  !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version)
) {
  throw new Error('Invalid package version: use x.y.z with an optional prerelease or build suffix.');
}

const archive = zipSync(
  { [`${name}/SKILL.md`]: await readFile(join(root, 'SKILL.md')) },
  { level: 9, mtime: new Date(2000, 0, 1) },
);
const output = join(root, 'dist', `${name}-${version}.zip`);
await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(output, archive);
console.log(`Built ${output}`);
