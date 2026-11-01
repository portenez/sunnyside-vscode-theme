const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const manifest = require('../package.json');

test('both contributed themes load with the shared Markdown semantic role', () => {
  assert.equal(manifest.contributes.themes.length, 2);
  for (const contribution of manifest.contributes.themes) {
    const theme = JSON.parse(fs.readFileSync(contribution.path, 'utf8'));
    assert.equal(theme.name, contribution.label);
    assert.equal(theme.type, contribution.uiTheme === 'vs' ? 'light' : 'dark');
    assert.equal(theme.semanticHighlighting, true);
    assert.ok(theme.colors['editor.background']);
    assert.ok(theme.tokenColors.length > 0);
    const headerStyle = theme.semanticTokenColors['sunnysideTableHeader:markdown'];
    assert.equal(headerStyle.bold, true);
    assert.equal(headerStyle.foreground, theme.tokenColors.find((rule) => rule.name === 'Markdown H1').settings.foreground);
    assert.ok(!Object.hasOwn(theme.semanticTokenColors, 'sunnysideTableHeader.markdown'),
      'Markdown must be a language selector, not a token modifier');
    for (const [role, color] of Object.entries(theme.colors)) {
      assert.match(color, /^#[\da-f]{6}([\da-f]{2})?$/i, `${theme.name}: ${role}`);
    }
  }
});
