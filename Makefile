.PHONY: setup check package
setup:
	npm ci
check:
	npm test
package:
	mkdir -p dist
	npm run package
