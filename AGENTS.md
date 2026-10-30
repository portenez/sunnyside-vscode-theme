# Sunnyside development instructions

This repository contains the Sunnyside VS Code themes. Keep Light and Dark consistent in syntax roles while preserving their different contrast needs. Read docs/DESIGN.md before changing the palette.

Use npm and the pinned Node version. Run npm test and npm run package after changes that affect distribution. Keep credentials, local state, and unrelated files outside Git. Do not create a remote, publish, or change the distribution license without explicit user authorization.

Commits use Conventional Commit headers with a short plain-language body explaining what changed and why. Commit identity is Victor Garcia <info@vgarcia.dev>.

Use an Extension Development Host or isolated testing instance to test without replacing an existing installation.
