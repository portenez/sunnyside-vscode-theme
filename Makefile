.PHONY: setup check package ghostty-light ghostty-dark
setup:
	npm ci
check:
	npm test
package:
	mkdir -p dist
	npm run package

# macOS previews use an isolated configuration and a shell without startup files.
ghostty-light:
	open -na Ghostty --args --config-default-files=false --theme="$(CURDIR)/ghostty/Sunnyside Light" --title="Sunnyside Light Preview" --window-width=100 --window-height=26 --window-save-state=never -e /bin/sh "$(CURDIR)/scripts/terminal-preview.sh"
ghostty-dark:
	open -na Ghostty --args --config-default-files=false --theme="$(CURDIR)/ghostty/Sunnyside Dark" --title="Sunnyside Dark Preview" --window-width=100 --window-height=26 --window-save-state=never -e /bin/sh "$(CURDIR)/scripts/terminal-preview.sh"
