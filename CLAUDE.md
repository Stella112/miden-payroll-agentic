# Miden Agentic Template

This monorepo contains two Miden development templates as git submodules:

- `project-template/` -- Miden smart contracts (Rust SDK). Account components, note scripts, transaction scripts, and integration tests.
- `frontend-template/` -- Miden web frontend (React + TypeScript + @miden-sdk/react). Browser-based UI that interacts with Miden contracts.

Each sub-template has its own CLAUDE.md with detailed instructions, skills for domain-specific patterns, and hooks for automated verification. These load automatically when you start working in either directory.

## Agent Rules

### Git Commits
- Never amend commits. Create fixup commits or new commits instead.
- Use commit messages exactly as specified by the user, verbatim.
- Never add Co-Authored-By or "Generated with Claude Code" to commits, PRs, or any content.
- Never push without explicit request.

### Workflow
- Enter plan mode for any non-trivial task (3+ steps or architectural decisions). If something goes wrong, stop and re-plan.
- Use subagents for research, exploration, and parallel analysis. One task per subagent.
- After any correction from the user, update `tasks/lessons.md` with the pattern.
- Never mark a task complete without proving it works.
- For non-trivial changes, ask "is there a more elegant way?" Skip this for simple fixes.
- When given a bug report, fix it autonomously.

### Task Management
1. Write plan to `tasks/todo.md` with checkable items
2. Check in with the user before starting implementation
3. Mark items complete as you go
4. Summarize changes at each step
5. Document results in `tasks/todo.md`
6. Capture lessons in `tasks/lessons.md` after corrections

### Core Principles
- **Simplicity first**: Make every change as simple as possible. Minimal code impact.
- **No laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal impact**: Only touch what's necessary.

## Development Workflow

**Contracts first, then frontend.** The frontend consumes compiled contract artifacts.

1. Build smart contracts in `project-template/`
   - Write account components, note scripts, and tx scripts in `project-template/contracts/`
   - Test with MockChain in `project-template/integration/tests/`
   - Contracts compile to `.masp` package files
   - Deploy the contracts to testnet to use the contracts in the frontend using testnet

2. Copy contract artifacts to the frontend
   - Copy `.masp` files from `project-template/masm-output/` (or the contract's `target/` directory) into `frontend-template/public/packages/`
   - The frontend loads these at runtime via the Miden SDK

3. Build the frontend in `frontend-template/`
   - React components use `@miden-sdk/react` hooks to interact with contracts
   - TDD workflow: write tests first, then implement
   - Automated hooks verify type safety and test coverage on every edit

## Which Directory to Work In

| Task | Directory |
|------|-----------|
| Write or edit smart contracts | `project-template/contracts/` |
| Write or edit integration tests | `project-template/integration/tests/` |
| Deploy contracts to testnet | `project-template/integration/src/bin/` |
| Write or edit frontend components | `frontend-template/src/` |
| Write or edit frontend tests | `frontend-template/src/__tests__/` |

## Automated Verification

Hooks run automatically on every file edit:
- Editing files in `project-template/contracts/` triggers `cargo miden build` on the modified contract
- Editing files in `frontend-template/src/` triggers TypeScript type checking and affected test runs

On task completion, a full verification runs: contract integration tests + frontend tests + typecheck + build.

## Quick Reference

**Build a contract:**
```
cargo miden build --manifest-path project-template/contracts/<name>/Cargo.toml --release
```

**Run contract integration tests:**
```
cd project-template && cargo test -p integration --release
```

**Start frontend dev server:**
```
cd frontend-template && yarn dev
```

**Run frontend tests:**
```
cd frontend-template && npx vitest --run
```

## Post-Project Feedback

After completing a project (all tasks done, verification passed), generate a `feedback.md` file in the project root covering:
- What worked well with the agentic tooling (skills, hooks, CLAUDE.md guidance)
- What was missing, confusing, or incorrect
- Suggested improvements to skills, hooks, or documentation
- Patterns that should be captured as new skills or lessons
