const readFileSync = require('fs').readFileSync
const execSync = require('child_process').execSync
const inInstall = require('in-publish').inInstall
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

if (inInstall())
  process.exit(0)

const exec = (command, env) =>
  execSync(command, { stdio: 'inherit', env })

exec('npm run build-lib')
exec('npm run build-min')

console.log(
  '\ngzipped, the UMD build is ' + prettyBytes(
    gzipSize.sync(readFileSync('umd/expect.min.js'))
  )
)

let start = Date.now();
require('../umd/expect.js');
console.log(`expect.js too ${Date.now() - start}ms to initialise`)

start = Date.now();
require('../umd/expect.min.js');
console.log(`expect.min.js too ${Date.now() - start}ms to initialise`)
