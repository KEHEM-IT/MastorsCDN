// compile-scss.js — runs from the project root, no path-with-spaces issues
const { execSync } = require('child_process');
const path = require('path');

const root = __dirname;
const input  = path.join(root, 'src/scss/mastorscdn.scss');
const output = path.join(root, 'dist/css/mastorscdn.css');
const sass   = path.join(root, 'node_modules/.bin/sass');

try {
  execSync(`"${sass}" "${input}" "${output}" --style=compressed --no-source-map`, {
    cwd: root,
    stdio: 'inherit',
  });
  console.log('✓ SCSS compiled successfully → dist/css/mastorscdn.css');
} catch (e) {
  process.exit(1);
}
