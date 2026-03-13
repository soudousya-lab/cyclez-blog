import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import https from 'https';

const filepath = 'content/posts/20160410-event-photo.md';
const content = readFileSync(filepath, 'utf-8');

const urls = [...new Set(content.match(/https?:\/\/cycle-z\.com\/wp-content\/gallery\/[^\s)"\]]+/g) || [])];
console.log(`gallery画像: ${urls.length}個`);

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const dir = dirname(dest);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        writeFileSync(dest, buf);
        resolve(buf.length);
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

let updated = content;
let ok = 0;
let fail = 0;

for (const url of urls) {
  const pathPart = url.replace('https://cycle-z.com/wp-content/gallery/', '');
  const filename = 'gallery-' + pathPart.replace(/\//g, '-');
  const localPath = `/images/wp/${filename}`;
  const dest = join('public', localPath);

  try {
    if (!existsSync(dest)) {
      await downloadFile(url, dest);
    }
    updated = updated.split(url).join(localPath);
    ok++;
  } catch (e) {
    console.error(`  failed: ${url} - ${e.message}`);
    fail++;
  }
}

writeFileSync(filepath, updated, 'utf-8');
console.log(`完了: 成功=${ok} 失敗=${fail}`);
