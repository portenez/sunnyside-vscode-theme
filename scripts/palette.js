const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const themes = ['light', 'dark'].map((variant) =>
  JSON.parse(fs.readFileSync(path.join(root, `sunnyside-${variant}.json`), 'utf8')));
const rows = [
  ['Background', (t) => t.colors['editor.background']],
  ['Text', (t) => t.colors['editor.foreground']],
  ['Comments', (t) => token(t, 'comment')],
  ['Keywords / H1', (t) => token(t, 'keyword')],
  ['Strings / H5', (t) => token(t, 'string')],
  ['Constants / H6', (t) => token(t, 'constant.numeric')],
  ['Functions / H3', (t) => t.semanticTokenColors.function],
  ['Types / H2', (t) => t.semanticTokenColors.type],
  ['Properties / H4', (t) => t.semanticTokenColors.property],
  ['Parameters', (t) => t.semanticTokenColors.parameter],
  ['Tags', (t) => token(t, 'entity.name.tag')],
];

function token(theme, scope) {
  const rule = theme.tokenColors.find((rule) =>
    (Array.isArray(rule.scope) ? rule.scope : [rule.scope]).includes(scope));
  if (!rule) throw new Error(`Missing scope: ${scope}`);
  return rule.settings.foreground;
}

const panels = themes.map((theme, index) => {
  const x = 24 + index * 520;
  const foreground = theme.colors['editor.foreground'];
  const background = theme.colors['editor.background'];
  const items = rows.map(([role, color], row) => {
    const y = 178 + row * 58;
    const value = color(theme);
    return `<g>
      <rect x="${x + 28}" y="${y}" width="42" height="34" rx="7" fill="${value}" stroke="${foreground}" stroke-opacity="0.25"/>
      <text x="${x + 86}" y="${y + 23}" fill="${foreground}" font-size="18">${role}</text>
      <text x="${x + 356}" y="${y + 23}" fill="${foreground}" font-family="ui-monospace, Menlo, monospace" font-size="17">${value}</text>
    </g>`;
  }).join('\n');
  return `<g>
    <rect x="${x}" y="90" width="508" height="766" rx="18" fill="${background}"/>
    <text x="${x + 28}" y="140" fill="${foreground}" font-size="27" font-weight="700">${theme.name}</text>
    ${items}
    <text x="${x + 28}" y="838" fill="${foreground}" opacity="0.8" font-size="14">Syntax accents shown against the editor background</text>
  </g>`;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="904" viewBox="0 0 1080 904" role="img" aria-labelledby="title desc">
  <title id="title">Sunnyside Light and Dark palettes</title>
  <desc id="desc">Matching color roles with hex values, generated from the theme files. Each panel uses its theme's editor background. H1 through H6 refer to Markdown heading levels.</desc>
  <rect width="1080" height="904" rx="24" fill="#E6DCCD"/>
  <g font-family="system-ui, -apple-system, sans-serif">
    <text x="28" y="55" fill="#332B23" font-size="30" font-weight="700">The Sunnyside palette</text>
    ${panels}
    <text x="28" y="885" fill="#493D30" font-size="15">Same roles, different contrast. H1–H6 indicate Markdown heading levels.</text>
  </g>
</svg>
`;
fs.writeFileSync(path.join(root, 'docs/palette.svg'), svg);
console.log('Generated docs/palette.svg from the Light and Dark theme files');
