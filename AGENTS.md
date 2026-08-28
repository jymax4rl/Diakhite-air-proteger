<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:workspace-project-context -->

# Project context maintenance

- Read `PROJECT_CONTEXT.md` before architecture-impacting or multi-file work.
- Treat the actual source code and the version-matched Next.js documentation in `node_modules/next/dist/docs/` as authoritative whenever they conflict with the context.
- Update both `PROJECT_CONTEXT.md` and `PROJECT_CONTEXT.txt` whenever architecture, routes, dependencies, component APIs, design tokens, image strategy, commands, or known issues materially change.
- Keep those two files byte-identical; `PROJECT_CONTEXT.txt` is the plain-text copy for external assistants.
- Update the documented commit/SHA marker to the post-change commit when practical. Avoid recursive documentation-only commit churn: use `WORKTREE`, or state that the context reflects the source tree immediately before its own documentation commit, when necessary.
- Do not update the context for trivial formatting or copy-only edits.

<!-- END:workspace-project-context -->
