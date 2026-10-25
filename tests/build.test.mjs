import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { unzipSync } from 'fflate';

const execFileAsync = promisify(execFile);
const buildScript = fileURLToPath(new URL('../scripts/build.mjs', import.meta.url));
const skill = '---\nname: example-skill\ndescription: Example skill.\n---\n\n# Example\n';
const build = (cwd) => execFileAsync(process.execPath, [buildScript], { cwd });
const manifest = (root, values = {}) =>
  writeFile(join(root, 'package.json'), JSON.stringify({
    name: 'example-skill',
    version: '1.2.3',
    ...values,
  }));

async function fixture(t) {
  const parent = resolve(tmpdir());
  const root = await mkdtemp(join(parent, 'skill-package-test-'));
  t.after(async () => {
    assert.equal(dirname(resolve(root)), parent);
    assert.ok(basename(root).startsWith('skill-package-test-'));
    await rm(root, { recursive: true, force: true });
  });
  await manifest(root);
  await writeFile(join(root, 'SKILL.md'), skill);
  return root;
}

test('packages only the skill under its name, with a versioned and reproducible ZIP', async (t) => {
  const root = await fixture(t);
  await writeFile(join(root, 'README.md'), 'Development documentation');
  await writeFile(join(root, '.env'), 'TEST_ONLY=do-not-package');

  await build(root);
  const archive = await readFile(join(root, 'dist', 'example-skill-1.2.3.zip'));
  const entries = unzipSync(archive);
  assert.deepEqual(Object.keys(entries), ['example-skill/SKILL.md']);
  assert.deepEqual(Buffer.from(entries['example-skill/SKILL.md']), Buffer.from(skill));

  await build(root);
  assert.deepEqual(await readFile(join(root, 'dist', 'example-skill-1.2.3.zip')), archive);

  await manifest(root, { version: '1.2.4-beta.1' });
  await build(root);
  assert.deepEqual(
    (await readdir(join(root, 'dist'))).sort(),
    ['example-skill-1.2.3.zip', 'example-skill-1.2.4-beta.1.zip'],
  );
  assert.deepEqual(await readFile(join(root, 'dist', 'example-skill-1.2.4-beta.1.zip')), archive);
});

test('rejects unsafe package metadata before creating output', async (t) => {
  for (const values of [{ name: '../outside' }, { version: '../1.2.3' }, { version: 'latest' }]) {
    const root = await fixture(t);
    await manifest(root, values);
    await assert.rejects(build(root), /Invalid package/);
    await assert.rejects(readdir(join(root, 'dist')), { code: 'ENOENT' });
  }
});

test('fails without a skill entrypoint', async (t) => {
  const root = await fixture(t);
  await rm(join(root, 'SKILL.md'));
  await assert.rejects(build(root), /ENOENT/);
  await assert.rejects(readdir(join(root, 'dist')), { code: 'ENOENT' });
});
