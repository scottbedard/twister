const exec = require('child_process').execSync;
const fs = require('fs-extra');
const path = require('path');
const pkg = require('../package.json');

const indexPath = path.resolve(__dirname, '../src/index.ts');

async function cli() {
  const src = String(fs.readFileSync(indexPath)).replace('x.y.z', pkg.version);

  fs.writeFileSync(indexPath, src);

  exec('npm run rollup');
}

if (require.main === module) {
  cli();
}
