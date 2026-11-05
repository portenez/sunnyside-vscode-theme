# Sunnyside development instructions

This repository contains the Sunnyside VS Code themes. Keep Light and Dark consistent in syntax roles while preserving their different contrast needs. Read docs/DESIGN.md before changing the palette.

Use npm and the pinned Node version. Run npm test and npm run package after changes that affect distribution. Keep credentials, local state, and unrelated files outside Git. Do not create a remote, publish, or change the distribution license without explicit user authorization.

Commits use Conventional Commit headers with a short plain-language body explaining what changed and why. Commit identity is Victor Garcia <info@vgarcia.dev>.

Use an Extension Development Host or isolated testing instance to test without replacing an existing installation.

This repository owns theme palettes, generators, and release artifacts. Personal dotfiles owns installed copies, symlinks, and application preferences. After approved palette changes, regenerate Ghostty and Neovim outputs before committing. When local installation is requested, use the dotfiles repository's `make sunnyside-sync` and `make sunnyside-check`; do not edit installed copies independently. Sync records the source commit and hashes. Changes to VS Code extension runtime or metadata require a separate installation update because sync copies only its palette JSON. Do not infer authorization to push or publish from a local sync request.
