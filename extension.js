const vscode = require('vscode');
const { tableHeaderLines } = require('./table-headers');
function activate(context) {
  const legend = new vscode.SemanticTokensLegend(['sunnysideTableHeader']);
  context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(
    { language: 'markdown' },
    {
      provideDocumentSemanticTokens(document) {
        const tokens = new vscode.SemanticTokensBuilder(legend);
        for (const line of tableHeaderLines(document.getText())) {
          const text = document.lineAt(line).text;
          if (text.length) tokens.push(line, 0, text.length, 0, 0);
        }
        return tokens.build();
      },
    }, legend,
  ));
}
module.exports = { activate };
