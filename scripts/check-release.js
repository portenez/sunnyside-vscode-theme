const assert = require('node:assert/strict');
const fs = require('node:fs');
const manifest = require('../package.json');

assert.equal(process.env.RELEASE_VERSION, manifest.version,
  'Requested release version must match package.json');
if (process.env.REQUIRE_RELEASE_READY === 'true') {
  assert.notEqual(manifest.license, 'UNLICENSED', 'Choose a distribution license before publishing');
  assert.ok(!fs.readFileSync('LICENSE', 'utf8').includes('No public distribution license'),
    'Replace the placeholder LICENSE before publishing');
  assert.match(manifest.repository?.url || '', /^https:\/\/github\.com\/.+\/.+/,
    'Set the actual public GitHub repository URL before publishing');
}
console.log(`Release version verified: ${manifest.version}`);
