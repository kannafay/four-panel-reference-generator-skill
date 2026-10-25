# Four-Panel Character Reference

A portable skill for generating four views of the same character. The instructions in [SKILL.md](SKILL.md) are written in Chinese for review; metadata, documentation, and tooling use English. Requires image generation and, when using reference images, image input support.

## Installation and Usage

`SKILL.md` lives at the repository root. Import `four-panel-reference-skill/` using your tool's skill installation mechanism.

Provide a reference image or character description and ask your tool to use `four-panel-reference-skill`. Installation paths and invocation syntax depend on the tool. See the [Agent Skills specification](https://agentskills.io/specification) for the file format.

## Development

Run from the repository root:

```text
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

The build writes `dist/four-panel-reference-skill-<version>.zip`, using the version from `package.json`. The archive contains only `SKILL.md` and `LICENSE` under `four-panel-reference-skill/`.

## License

[MIT](LICENSE).
