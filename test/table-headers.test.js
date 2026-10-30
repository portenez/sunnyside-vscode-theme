const { test } = require('node:test');
const assert = require('node:assert/strict');
const { tableHeaderLines } = require('../table-headers');
test('recognizes header and alignment row, with or without outer pipes', () => {
 assert.deepEqual(tableHeaderLines('| Name | Value |\n| :--- | ---: |\n| x | 1 |'), [0]);
 assert.deepEqual(tableHeaderLines('Name | Value\n--- | ---\nx | 1'), [0]);
});
test('ignores fenced code, indentation, and ordinary prose', () => {
 assert.deepEqual(tableHeaderLines('```md\n| a | b |\n| --- | --- |\n```'), []);
 assert.deepEqual(tableHeaderLines('    | a | b |\n    | --- | --- |'), []);
 assert.deepEqual(tableHeaderLines('| a | b |\nordinary text'), []);
});
test('rejects mismatched column counts', () => {
 assert.deepEqual(tableHeaderLines('| a | b |\n| --- |'), []);
});
