const exec = require('child_process').execSync;
const path = require('path');
const pkg = require('../package.json');

const distDir = path.resolve(__dirname, '..', 'dist');

async function cli() {
  try {
    console.log(`Building: ${pkg.version}`);
    console.log();
    await exec('npm run build');

    console.log(`Publishing: ${pkg.version}`);
    console.log();
    await exec('npm publish');

    console.log('');
    console.log('Complete!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (require.main === module) {
  cli();
}