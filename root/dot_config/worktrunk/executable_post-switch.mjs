#!/usr/bin/env zx

// Worktrunk post-switch hook for zellij.
//
// Switches the running zellij client to the worktree's session, creating
// it with the worktree path as cwd (and an optional layout from the
// primary worktree) if it doesn't already exist.
//
// No-op when not running inside zellij — there's no client to switch.
//
// Usage:
//   post-switch.mjs <worktree_path> <primary_worktree_path> <repo> <sanitized_branch>
//
// Wired up via ~/.config/worktrunk/config.toml; receives the four args
// expanded from worktrunk's template variables.

// zx provides `$`, `fs`, `chalk` etc. as globals — no `import "zx"` (the
// package isn't installed next to this script, so an explicit import fails).
import { existsSync } from "node:fs";

$.verbose = false;

const [worktreePath, primaryWorktreePath, repo, sanitizedBranch] =
  process.argv.slice(3);

if (!worktreePath || !primaryWorktreePath || !repo || !sanitizedBranch) {
  console.error(
    "Usage: post-switch.mjs <worktree_path> <primary_worktree_path> <repo> <sanitized_branch>",
  );
  process.exit(1);
}

if (!process.env.ZELLIJ) {
  process.exit(0);
}

const sessionName = `${repo}-${sanitizedBranch}`;
const layoutPath = `${primaryWorktreePath}/.zellij-layout.kdl`;

const args = ["action", "switch-session", "--cwd", worktreePath];
if (existsSync(layoutPath)) {
  args.push("--layout", layoutPath);
}
args.push(sessionName);

await $`zellij ${args}`;
