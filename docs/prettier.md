# Prettier

## What is it?

Prettier is:

- an opinionated code formatter
- industry-popular in 2020
- designed by the React folks

Check out [prettier.io](https://prettier.io/) and learn more.

## Why use it?

The best reason is **_consistency_**. A code formatter becomes especially useful on projects with many developers.

## How to use Prettier on this project?

In theory, we should only ever have to use `npm run format` once and only once.

This project implements project settings for VSCode and enforces `formatOnSave` as well as specifying Prettier as the default code formatter. These settings can be found in `.vscode/settings.json` and are enforced automagically on any developer's local machine when working in this project's codebase (within VSCode).

Developers should install the VSCode extension for Prettier (`esbenp.prettier-vscode`) to take advantage of the `formatOnSave` feature and remain format-compliant during development.

## Technical Notes

- The `format` script is defined in the root `package.json` for the entire project.
- Custom Prettier configuration options are defined in the `prettier` section of the root `package.json`. View all options and default values [here](https://prettier.io/docs/en/options.html).
- Any directories/files that should be _excluded_ from Prettier formatting are declared in the root `.prettierignore` file.
