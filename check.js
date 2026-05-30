const fs = require('fs');
const html = fs.readFileSync('D:\\Web\\Mastors CDN\\Main\\playground\\index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
if (!m) { console.log('NO SCRIPT BLOCK FOUND'); process.exit(); }
try {
  new Function(m[1]);
  console.log('JS SYNTAX OK');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  const lines = m[1].split('\n');
  const ln = parseInt((e.message.match(/line (\d+)/)||[])[1] || 0);
  for (let i = Math.max(0, ln-5); i < Math.min(lines.length, ln+5); i++) {
    console.log((i+1) + ': ' + lines[i]);
  }
}
