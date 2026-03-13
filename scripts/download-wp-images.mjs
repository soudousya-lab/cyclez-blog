#!/usr/bin/env node
/**
 * WP画像を一括ダウンロードしてpublic/images/wp/に配置
 * + Markdown内のURLをローカルパスに書き換え
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_DIR = join(__dirname, '..');
const POSTS_DIR = join(BASE_DIR, 'content', 'posts');
const IMAGES_DIR = join(BASE_DIR, 'public', 'images', 'wp');

// ダウンロード関数（リダイレクト対応）
function downloadFile(url, dest, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));

    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      // リダイレクト対応
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const u = new URL(url);
          redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
        }
        return downloadFile(redirectUrl, dest, maxRedirects - 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (buffer.length < 100) {
          return reject(new Error('File too small'));
        }
        const dir = dirname(dest);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        writeFileSync(dest, buffer);
        resolve(buffer.length);
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// 安全なファイル名生成
function sanitizeFilename(url) {
  try {
    const u = new URL(url);
    // /wp-content/uploads/YYYY/MM/filename.ext → YYYY-MM-filename.ext
    const pathParts = u.pathname.replace('/wp-content/uploads/', '').split('/');
    if (pathParts.length >= 3) {
      const [year, month, ...rest] = pathParts;
      return `${year}-${month}-${rest.join('-')}`;
    }
    return pathParts.join('-');
  } catch {
    return basename(url).split('?')[0];
  }
}

async function main() {
  mkdirSync(IMAGES_DIR, { recursive: true });

  // 全Markdownファイルからwp-content/uploads URLを抽出
  const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`${files.length}個のMarkdownファイルをスキャン中...`);

  const urlMap = new Map(); // WP URL → ローカルパス
  const urlRegex = /https?:\/\/cycle-z\.com\/wp-content\/uploads\/[^\s)"\]]+/g;

  // 全URLを収集
  for (const file of files) {
    const content = readFileSync(join(POSTS_DIR, file), 'utf-8');
    const matches = content.match(urlRegex);
    if (matches) {
      for (const url of matches) {
        if (!urlMap.has(url)) {
          const filename = sanitizeFilename(url);
          urlMap.set(url, `/images/wp/${filename}`);
        }
      }
    }
  }

  console.log(`${urlMap.size}個のユニーク画像URLを検出`);

  // 画像ダウンロード（並列、同時5件まで）
  const entries = [...urlMap.entries()];
  let downloaded = 0;
  let skipped = 0;
  let errors = 0;
  const CONCURRENCY = 5;

  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    const promises = batch.map(async ([url, localPath]) => {
      const dest = join(BASE_DIR, 'public', localPath);

      // 既にダウンロード済みならスキップ
      if (existsSync(dest)) {
        skipped++;
        return;
      }

      try {
        const size = await downloadFile(url, dest);
        downloaded++;
        if ((downloaded + skipped) % 50 === 0) {
          console.log(`  進捗: ${downloaded + skipped + errors}/${urlMap.size}`);
        }
      } catch (e) {
        errors++;
        console.error(`  エラー: ${basename(url)} - ${e.message}`);
      }
    });
    await Promise.all(promises);
  }

  console.log(`\nダウンロード完了:`);
  console.log(`  成功: ${downloaded}件`);
  console.log(`  スキップ（既存）: ${skipped}件`);
  console.log(`  エラー: ${errors}件`);

  // Markdown内のURLをローカルパスに置換
  console.log(`\nMarkdownファイルのURL書き換え中...`);
  let filesUpdated = 0;

  for (const file of files) {
    const filepath = join(POSTS_DIR, file);
    let content = readFileSync(filepath, 'utf-8');
    let changed = false;

    for (const [url, localPath] of urlMap) {
      if (content.includes(url)) {
        content = content.split(url).join(localPath);
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(filepath, content, 'utf-8');
      filesUpdated++;
    }
  }

  console.log(`  ${filesUpdated}ファイルを更新`);
  console.log('\n完了！');
}

main().catch(console.error);
