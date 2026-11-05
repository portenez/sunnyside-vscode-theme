# Sunnyside for Neovim

Warm Light and Dark variants generated from the same palettes as Sunnyside for VS Code and Ghostty. Includes classic syntax groups, Tree-sitter captures, LSP semantic tokens, six Markdown heading colors, diagnostics, diff highlights, completion menus, and 16 terminal colors.

Tested on Neovim 0.12.6. Tree-sitter parsers and language servers are optional and are not installed by the theme. Highlighting follows whichever syntax engine and queries you have configured. The VS Code Markdown table-header detector is not included.

## Install

From the repository root, copy the standalone colorscheme into your Neovim configuration:

```sh
mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/nvim/colors"
cp -i neovim/colors/sunnyside.lua "${XDG_CONFIG_HOME:-$HOME/.config}/nvim/colors/"
```

If you manage Neovim through dotfiles, put the file in that source instead. `cp -i` asks before replacing an existing colorscheme.

Add this to `init.lua`, after any other colorscheme settings:

```lua
vim.opt.termguicolors = true
vim.opt.background = 'dark' -- use 'light' for Sunnyside Light
vim.cmd.colorscheme('sunnyside')
```

Change variants during a session with `:set background=light` or `:set background=dark`. Neovim reloads the active colorscheme when the background option changes. This follows Neovim's background setting rather than the operating system appearance.

## Try without installing

Run from the repository root:

```sh
nvim -u NONE --cmd 'set termguicolors background=dark' \
  --cmd "set runtimepath^=$PWD/neovim" \
  -c 'filetype plugin indent on' -c 'syntax enable' \
  -c 'colorscheme sunnyside' samples/MARKDOWN-SAMPLE.md samples/sunnyside.ts
```

Use `background=light` to preview Light. `-u NONE` skips your personal configuration and plugins. The preview uses built-in syntax; Tree-sitter and LSP colors can be reviewed in your configured Neovim separately. Terminal font, cursor shape, and shell prompt are not changed by the theme.

## Maintain and verify

Edit the root VS Code palettes, then run:

```sh
npm run neovim
node scripts/neovim.js --check
nvim --headless -u NONE -l test/neovim.lua
```

The checks cover variant switching, editor and selection colors, semantic links, Markdown heading roles, diagnostics, and all 16 terminal colors. Use a normal session to review cursor, search, selection, diff, and completion states visually.
