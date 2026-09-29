import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { unzipSync } from 'fflate';

const execFileAsync = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
const skillName = 'four-panel-reference-generator';
const files = [
  'SKILL.md',
  'agents/openai.yaml',
  'assets/icon.svg',
  'README.md',
  'LICENSE',
];

test('build creates an installable ZIP with only the published skill files', async () => {
  await execFileAsync(process.execPath, ['scripts/build.mjs'], { cwd: root });

  const archivePath = join(root, 'dist', `${skillName}-skill.zip`);
  const firstArchive = await readFile(archivePath);
  const entries = unzipSync(firstArchive);
  const expectedPaths = files.map((path) => `${skillName}/${path}`).sort();

  assert.deepEqual(Object.keys(entries).sort(), expectedPaths);
  for (const path of files) {
    assert.deepEqual(
      Buffer.from(entries[`${skillName}/${path}`]),
      await readFile(join(root, path)),
    );
  }

  await execFileAsync(process.execPath, ['scripts/build.mjs'], { cwd: root });
  assert.deepEqual(await readFile(archivePath), firstArchive);
});
