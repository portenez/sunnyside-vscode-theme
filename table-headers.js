// Identify table headers outside fenced and indented code blocks.
function cells(line) {
  const parts = line.trim().split(/(?<!\\)\|/);
  if (parts[0] === '') parts.shift();
  if (parts[parts.length - 1] === '') parts.pop();
  return parts.map((part) => part.trim());
}
function tableHeaderLines(text) {
  const lines = text.split(/\r?\n/);
  const headers = [];
  let fence;
  for (let i = 0; i < lines.length - 1; i++) {
    const marker = lines[i].match(/^ {0,3}(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && /^ {0,3}(?:`+|~+)\s*$/.test(lines[i])) fence = undefined;
      continue;
    }
    if (fence || /^(?: {4}|\t)/.test(lines[i]) || /^(?: {4}|\t)/.test(lines[i + 1])) continue;
    if (!lines[i].includes('|')) continue;
    const header = cells(lines[i]);
    const separator = cells(lines[i + 1]);
    if (header.length > 0 && header.length === separator.length && separator.every((cell) => /^:?-+:?$/.test(cell))) headers.push(i);
  }
  return headers;
}
module.exports = { tableHeaderLines };
