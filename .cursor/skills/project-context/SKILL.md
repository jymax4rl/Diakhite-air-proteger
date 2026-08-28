---
name: project-context
description: Maintain the synchronized project handoff after material repository changes.
---

# Project context

Use this skill when work materially changes architecture, routes, dependencies, component APIs, design tokens, image strategy, commands, or known issues. Skip it for trivial formatting or copy-only edits.

1. Read `AGENTS.md`, `PROJECT_CONTEXT.md`, and the relevant version-matched documentation under `node_modules/next/dist/docs/`.
2. Inspect all changed files and `git diff`; treat source and version-matched Next.js docs as authoritative.
3. Revise `PROJECT_CONTEXT.md` to match the changed source, including its source snapshot marker.
4. Copy it exactly: `cp PROJECT_CONTEXT.md PROJECT_CONTEXT.txt`.
5. Verify byte identity: `cmp -s PROJECT_CONTEXT.md PROJECT_CONTEXT.txt`.
6. Stage both context files with the source changes: `git add PROJECT_CONTEXT.md PROJECT_CONTEXT.txt <source-files>`.

Avoid recursive commit churn when recording the SHA: use `WORKTREE`, or say that the context reflects the source tree immediately before its documentation commit.
