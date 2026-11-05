#!/bin/sh
# Preview terminal defaults and all 16 ANSI colors without shell configuration.
printf '\033[2J\033[HSunnyside terminal preview\n\n'
printf 'Default text: The quick brown fox jumps over the lazy dog.\n'
printf '\033[1mBold text\033[0m  \033[3mItalic text\033[0m  \033[4mUnderlined text\033[0m\n\n'
printf 'Normal foregrounds:\n'
for code in 30 31 32 33 34 35 36 37; do
  printf '\033[%sm  ANSI %s  \033[0m' "$code" "$code"
done
printf '\n\nBright foregrounds:\n'
for code in 90 91 92 93 94 95 96 97; do
  printf '\033[%sm  ANSI %s  \033[0m' "$code" "$code"
done
printf '\n\nNormal backgrounds:\n'
for code in 40 41 42 43 44 45 46 47; do
  printf '\033[%sm      \033[0m ' "$code"
done
printf '\n\nBright backgrounds:\n'
for code in 100 101 102 103 104 105 106 107; do
  printf '\033[%sm      \033[0m ' "$code"
done
printf '\n\nSelect this sentence to inspect selection colors.\n\n'
printf 'Cursor and input check (press Enter to close): '
IFS= read -r preview_input
