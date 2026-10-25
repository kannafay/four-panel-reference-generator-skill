import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const root = fileURLToPath(new URL('../', import.meta.url));
const skillName = '人物四格参考图';
const { name: packageName, version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (typeof version !== 'string' || !/^\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/.test(version)) {
  throw new Error('package.json 必须包含有效的版本号');
}
const archivePath = join(root, 'dist', `${packageName}-${version}.zip`);
const entries = {
  [`${skillName}/SKILL.md`]: await readFile(join(root, skillName, 'SKILL.md')),
  [`${skillName}/LICENSE`]: await readFile(join(root, 'LICENSE')),
};

const archive = zipSync(entries, {
  level: 9,
  mtime: new Date(2000, 0, 1),
});

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(archivePath, archive);
console.log(`已生成压缩包：${archivePath}`);
