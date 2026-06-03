```markdown
# humanizer Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns, coding conventions, and typical workflows used in the `humanizer` JavaScript project. The repository is a lightweight, framework-free codebase focused on manipulating or presenting data in a more human-readable way, with a simple HTML interface and modular JavaScript. You'll learn how to contribute effectively, follow the project's style, and use common commands for routine tasks.

## Coding Conventions

- **File Naming:** Use `camelCase` for file names.
  - Example: `humanizeString.js`, `appLogic.js`
- **Import Style:** Use relative imports.
  - Example:
    ```js
    import { humanize } from './humanizeString.js';
    ```
- **Export Style:** Use named exports.
  - Example:
    ```js
    // In humanizeString.js
    export function humanize(input) { ... }
    ```
- **Commit Messages:** Freeform, typically concise (~43 characters), sometimes with a prefix.
  - Example: `Fix pluralization for irregular nouns`

## Workflows

### html-ui-refactor
**Trigger:** When you want to enhance the layout, styles, or features of the web interface.  
**Command:** `/refactor-ui`

1. Edit `index.html` to update the structure, layout, or UI components.
2. Adjust or add HTML elements and attributes for new features or improved usability.
3. Modify inline styles or classes to enhance appearance and functionality.
4. Preview your changes in a browser.
5. Commit your changes with a descriptive message.

**Example:**
```html
<!-- Before -->
<button>Submit</button>

<!-- After -->
<button class="primary-btn">Submit</button>
```

### merge-pull-request-update-branch
**Trigger:** When you want to merge changes from a feature or fix branch back into the main branch, often after resolving issues or making updates.  
**Command:** `/merge-update`

1. Update `.gitignore` as needed.
2. Edit `app.js`, `index.html`, and/or `styles.css` to incorporate new changes or fixes.
3. Commit changes with a message referencing the pull request or update.
4. Merge the branch into `main`.
5. Resolve any conflicts that arise.

**Example:**
```bash
git checkout main
git merge feature/my-feature
# Resolve conflicts if any
git commit -m "Merge feature/my-feature into main"
```

### html-bugfix-or-feature-update
**Trigger:** When you want to fix a bug or add a small feature related to the UI or user interaction.  
**Command:** `/fix-ui`

1. Edit `index.html` to fix the bug or add the feature.
2. Adjust relevant HTML elements, attributes, or inline styles.
3. Commit with a descriptive message about the fix or feature.

**Example:**
```html
<!-- Bug: Missing aria-label for accessibility -->
<input type="text">

<!-- Fix: -->
<input type="text" aria-label="Humanized input">
```

## Testing Patterns

- **Test File Pattern:** All test files are named with the `.test.` infix, e.g., `humanizeString.test.js`.
- **Framework:** Not explicitly detected; tests may use a custom or minimal setup.
- **Test Example:**
  ```js
  // humanizeString.test.js
  import { humanize } from './humanizeString.js';

  test('humanizes a camelCase string', () => {
    expect(humanize('helloWorld')).toBe('Hello world');
  });
  ```

## Commands

| Command        | Purpose                                                    |
|----------------|------------------------------------------------------------|
| /refactor-ui   | Refactor and improve the UI and functionality of index.html|
| /merge-update  | Merge feature/fix branches and update main project files   |
| /fix-ui        | Apply bugfixes or small feature updates to the UI          |
```
