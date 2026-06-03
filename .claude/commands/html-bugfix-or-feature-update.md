---
name: html-bugfix-or-feature-update
description: Workflow command scaffold for html-bugfix-or-feature-update in humanizer.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /html-bugfix-or-feature-update

Use this workflow when working on **html-bugfix-or-feature-update** in `humanizer`.

## Goal

Apply targeted bugfixes or feature updates to the main HTML file, often for UI or interaction issues.

## Common Files

- `index.html`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit index.html to fix the bug or add the feature
- Adjust relevant HTML elements, attributes, or inline styles
- Commit with a descriptive message about the fix or feature

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.