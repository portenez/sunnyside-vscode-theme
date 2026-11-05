# Theme source and local installations

This repository owns palette design, generators, tests, and release packages. A personal dotfiles repository can own installed copies and app preferences without depending on a live symlink to this checkout.

For the coordinated personal setup, keep `dotfiles` and `sunnyside-vscode-theme` as sibling checkouts. Dotfiles already stores its installed theme files, so restoring a machine does not require this source checkout. Updating those files does.

## Update sequence

1. Change palettes here and preview in an isolated instance.
2. Obtain approval, run the checks below, and commit the source and generated files together.
3. In dotfiles, run `make sunnyside-sync`, `make sunnyside-check`, and `make check`.
4. Review and commit the installed copies, `sunnyside-source.json`, and related preferences in dotfiles.
5. When remote backup or another machine is needed, push the theme source first, then dotfiles. Marketplace publication is a separate action.

```sh
npm run palette
npm run ghostty
npm run neovim
npm test
npm run package
nvim --headless -u NONE -l test/neovim.lua
```

Dotfiles synchronization requires tracked, committed source theme files. It records the exact source revision and file hashes, copies both Ghostty variants and the standalone Neovim colorscheme, and updates the local VS Code palette JSON. It does not copy VS Code extension runtime code, assets, or package metadata; those require a separate extension installation update when changed. The sync never fetches, pushes, or publishes.

To reproduce a recorded installation, check out the revision in `sunnyside-source.json`, then sync. `SUNNYSIDE_REPO` can point to a different source checkout. The check command compares installed bytes as well as the recorded revision; a newer source commit requires an intentional sync even when palette bytes are unchanged.

Application preferences belong in dotfiles. VS Code's system appearance detection selects its preferred Light/Dark themes; Ghostty and Neovim retain their own configured appearance settings. Existing windows may need a configuration or colorscheme reload.
