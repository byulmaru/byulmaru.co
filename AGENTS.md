# AGENTS

## Workspace Rules

- Never edit any `package.json` file by hand. Make changes through the appropriate CLI instead.

## Skills

- When preparing commits, branches, or pull requests, use the `commit-pr` skill.
- The canonical project skill directory is `.skills`. Agent-specific directories should reference it rather than keeping separate copies.
- Make speculative commits frequently so intermediate hypotheses, pivots, and recovery points are preserved.

## Team Site Design System

- Before changing the team site's Figma design, UI, or frontend, read `docs/design-explorations/04-night-editorial-hybrid/DESIGN.md` and use it as the canonical design-system reference.
- Follow that document for color tokens, typography, layout, components, header behavior, logo assets, and the fixed footer structure.
- If a requested change intentionally diverges from the design system, explain the affected rule and get user confirmation before implementing it.

## `package.json` Changes

- Use the appropriate package manager CLI for manifest updates.
- If a script or field must change, update it through CLI tooling rather than directly editing the file contents.
