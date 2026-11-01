# Package verification

## November 1, 2026

Tested the `0.1.2` VSIX from GitHub Actions run `41096208842` using temporary user-data and extension directories on macOS arm64. The normal extension installation was not replaced.

The downloaded artifact installed successfully on VS Code 1.141.0 and loaded on the minimum supported version, 1.90.0. Runtime and theme files matched the artifact. Integration checks confirmed that Markdown table headers receive semantic tokens while body rows and tables inside fenced code do not.

Visual review found a release-blocking error: both themes used `sunnysideTableHeader.markdown`, which selects a token modifier rather than a language. Tokens were available, but the intended header style did not apply.

The local correction uses `sunnysideTableHeader:markdown`. Regression checks require the language selector and match the header foreground to the theme's H1 color. After rebuilding and installing the corrected VSIX:

- All four Node tests and packaging passed.
- Integration checks passed on VS Code 1.90.0 and 1.141.0.
- Both themes loaded, with semantic tokens limited to the intended table header.
- Visual review on 1.90.0 confirmed six heading colors, emphasis, links, embedded TypeScript, bold amber table headers, ordinary table body text, and normal/bright terminal ANSI colors in both themes.
- Header styling survived a window reload; the selected theme also persisted across a restart in 1.141.0.

Do not publish the original artifact from run `41096208842`. Use a new CI artifact built from a commit containing the selector correction. Windows, Linux, remote VS Code, and subjective reading comfort were not tested in this session. The visual check used a trusted test environment; table highlighting in Restricted Mode was not validated.
