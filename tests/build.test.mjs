import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { unzipSync } from 'fflate';

const execFileAsync = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
const skillName = '人物四格参考图';
const { name: packageName, version } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const files = ['SKILL.md', 'LICENSE'];

test('构建带版本号和中文技能目录的压缩包，仅包含发布文件且重复构建结果一致', async () => {
  const archivePath = join(root, 'dist', `${packageName}-${version}.zip`);
  await rm(archivePath, { force: true });
  await execFileAsync(process.execPath, ['scripts/build.mjs'], { cwd: root });

  const firstArchive = await readFile(archivePath);
  const entries = unzipSync(firstArchive);
  const expectedPaths = files.map((path) => `${skillName}/${path}`).sort();

  assert.deepEqual(Object.keys(entries).sort(), expectedPaths);
  for (const path of files) {
    assert.deepEqual(
      Buffer.from(entries[`${skillName}/${path}`]),
      await readFile(path === 'SKILL.md' ? join(root, skillName, path) : join(root, path)),
    );
  }

  await execFileAsync(process.execPath, ['scripts/build.mjs'], { cwd: root });
  assert.deepEqual(await readFile(archivePath), firstArchive);
});
