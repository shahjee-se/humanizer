---
name: merge-pull-request-update-branch
description: Workflow command scaffold for merge-pull-request-update-branch in humanizer.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /merge-pull-request-update-branch

Use this workflow when working on **merge-pull-request-update-branch** in `humanizer`.

## Goal

Synchronize feature/fix branches with main by merging and updating key project files.

## Common Files

- `.gitignore`
- `app.js`
- `index.html`
- `styles.css`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Update .gitignore as needed
- Edit app.js, index.html, and/or styles.css to incorporate new changes or fixes
- Commit changes with a message referencing the pull request or update
- Merge branch into main

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.