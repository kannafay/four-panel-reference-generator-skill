# four-panel-reference-skill

A portable Agent Skill for creating a 2x2 reference sheet of one person: front and three-quarter upper-body views, plus front and back full-body views.

Load [SKILL.md](SKILL.md) from the repository root using your agent's skill support. Provide reference images or a character description. Requires image generation and, when references are supplied, image input support. All skill instructions and generation prompts are in English.

Each request allows at most one generation or edit call for one complete sheet. Inspection reports any remaining issues; further generation or edits require an explicit follow-up request.

The prompt specifies front and back garment construction separately, keeping openings, lining exposure, layers, and asymmetric details consistent with the references and camera angle.

## Packaging

Run from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm build
```

Set `version` in [package.json](package.json) before a release. The build writes `dist/four-panel-reference-skill-<version>.zip`, containing only `four-panel-reference-skill/SKILL.md`. Building does not change the version.

Run `pnpm test` to check archive contents, version naming, reproducibility, and invalid inputs.
