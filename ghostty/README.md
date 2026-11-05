# Sunnyside for Ghostty

Light and Dark use the same background, text, cursor, and 16 ANSI colors as the VS Code integrated terminal. Selection backgrounds come from the matching editor theme. These files only set colors; your fonts, shell, and key bindings stay under your control.

## Install

From the repository root, copy the themes into Ghostty's custom theme directory:

```sh
mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/ghostty/themes"
cp -i "ghostty/Sunnyside Light" "ghostty/Sunnyside Dark" \
  "${XDG_CONFIG_HOME:-$HOME/.config}/ghostty/themes/"
```

The `-i` flag asks before replacing existing files. In your existing Ghostty configuration, set:

```ini
theme = light:Sunnyside Light,dark:Sunnyside Dark
```

This follows your system appearance. To always use one variant, use `theme = Sunnyside Light` or `theme = Sunnyside Dark` instead. Reload Ghostty's configuration after editing it. Explicit color settings elsewhere in your configuration take precedence over theme colors.

See Ghostty's [theme documentation](https://ghostty.org/docs/features/theme) for custom theme lookup and appearance switching.

## Maintain and check

Edit the root `sunnyside-light.json` and `sunnyside-dark.json` files, then regenerate:

```sh
npm run ghostty
node scripts/ghostty.js --check
```

With Ghostty installed, validate each file without loading your personal configuration:

```sh
ghostty +validate-config --config-file="$PWD/ghostty/Sunnyside Light"
ghostty +validate-config --config-file="$PWD/ghostty/Sunnyside Dark"
```

For a visual check, open each theme in Ghostty and inspect normal text, selection, cursor, and the ANSI swatches below. The shell prompt and applications using explicit RGB colors can choose their own colors.

On macOS, from the repository root:

```sh
make ghostty-light
make ghostty-dark
```

Each command opens a separate preview instance with your personal configuration disabled. It displays all 16 ANSI colors, text styles, selection sample text, and an input prompt for checking the cursor. Select text with the mouse and type at the prompt to review both. Press Enter to close the preview. Your normal Ghostty configuration is not edited.

```sh
for code in 30 31 32 33 34 35 36 37 90 91 92 93 94 95 96 97; do
  printf '\033[%sm ANSI %s \033[0m' "$code" "$code"
done
printf '\n'
```
