-- Run from the repository root: nvim --headless -u NONE -l test/neovim.lua
vim.opt.runtimepath:prepend(vim.fn.getcwd() .. '/neovim')
local function rgb(hex) return tonumber(hex:sub(2), 16) end
for _, variant in ipairs({ 'light', 'dark', 'light' }) do
  local theme = vim.json.decode(table.concat(vim.fn.readfile('sunnyside-' .. variant .. '.json'), '\n'))
  local c = theme.colors
  vim.o.background = variant
  vim.cmd.colorscheme('sunnyside')
  assert(vim.g.colors_name == 'sunnyside')
  local function check(group, key, expected)
    local actual = vim.api.nvim_get_hl(0, { name = group, link = false })[key]
    assert(actual == expected, group .. '.' .. key .. ' mismatch for ' .. variant)
  end
  check('Normal', 'bg', rgb(c['editor.background']))
  check('Normal', 'fg', rgb(c['editor.foreground']))
  check('Visual', 'bg', rgb(c['editor.selectionBackground']))
  check('@lsp.type.function', 'fg', rgb(theme.semanticTokenColors['function']))
  check('@lsp.type.property', 'fg', rgb(theme.semanticTokenColors.property))
  local roles = { c['terminal.ansiYellow'], theme.semanticTokenColors.type,
    theme.semanticTokenColors['function'], theme.semanticTokenColors.property,
    c['terminal.ansiGreen'], c['terminal.ansiRed'] }
  for i, color in ipairs(roles) do
    check('markdownH' .. i, 'fg', rgb(color))
    check('@markup.heading.' .. i, 'fg', rgb(color))
    check('@markup.heading.' .. i, 'bold', true)
  end
  check('DiagnosticError', 'fg', rgb(c['terminal.ansiRed']))
  local names = { 'Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White' }
  for i, name in ipairs(names) do
    assert(vim.g['terminal_color_' .. (i - 1)] == c['terminal.ansi' .. name])
    assert(vim.g['terminal_color_' .. (i + 7)] == c['terminal.ansiBright' .. name])
  end
  vim.cmd('enew')
  vim.bo.filetype = 'markdown'
  vim.cmd('syntax enable')
  vim.cmd('enew')
  vim.bo.filetype = 'typescript'
  print('Sunnyside ' .. variant .. ': highlights and terminal palette passed')
end
-- Setting background reloads the scheme without an explicit colorscheme command.
vim.o.background = 'dark'
assert(vim.api.nvim_get_hl(0, { name = 'Normal' }).bg == rgb('#24211D'))
vim.o.background = 'light'
assert(vim.api.nvim_get_hl(0, { name = 'Normal' }).bg == rgb('#F8F2E8'))
