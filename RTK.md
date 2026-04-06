# RTK (Rust Token Killer)

Auto-rewrite hook intercepts commands like `git status` → `rtk git status` for 60-90% token savings.

## Meta Commands (only when needed explicitly)
```bash
rtk gain               # Token savings statistics
rtk discover           # Find missed savings opportunities
rtk proxy <cmd>        # Run command without RTK filtering
rtk init --show        # Show installation status
```

## All standard commands are auto-rewritten:
- Git: status, log, diff, add, commit, push, pull, branch, fetch, stash, show
- GitHub: gh pr, gh issue, gh run
- Tests: cargo test, vitest, pytest, go test
- Build: cargo build, tsc, lint, oxfmt
- Files: ls, cat/grep → rtk read/grep
- Containers: docker ps/logs, kubectl get/logs

Full docs: https://github.com/rtk-ai/rtk
