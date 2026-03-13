#!/usr/bin/env node
/**
 * WordPress記事をMarkdownに一括変換
 * all-posts-full.json → content/posts/*.md
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_DIR = join(__dirname, '..');
const JSON_PATH = join(BASE_DIR, 'docs', 'wp-migration', 'all-posts-full.json');
const OUTPUT_DIR = join(BASE_DIR, 'content', 'posts');

// カテゴリマッピング
const CATEGORIES = {
  15: 'event',
  27: 'event-report',
  14: 'voice',
  7: 'news',
  19: 'maintenance-blog',
  13: 'lineup',
  17: 'road-bike',
  16: 'beginner-training',
  28: 'movie',
  1: 'uncategorized',
};

/**
 * HTMLエンティティをデコード
 */
function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8230;/g, '\u2026')
    .replace(/&nbsp;/g, ' ');
}

/**
 * HTMLをMarkdownに変換
 */
function htmlToMarkdown(html) {
  if (!html) return '';

  let text = html;

  // 改行を正規化
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // iframe → 埋め込みリンク
  text = text.replace(/<iframe[^>]*src="([^"]*)"[^>]*>.*?<\/iframe>/gi, '\n[埋め込みコンテンツ]($1)\n\n');
  text = text.replace(/<iframe[^>]*src="([^"]*)"[^>]*\/>/gi, '\n[埋め込みコンテンツ]($1)\n\n');

  // 見出し
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n\n');
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n\n');

  // 画像
  text = text.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)\n\n');
  text = text.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)\n\n');
  text = text.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)\n\n');

  // リンク
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // 太字・斜体（brの前に処理）
  text = text.replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**');
  text = text.replace(/<b\b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  text = text.replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*');

  // リスト
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  text = text.replace(/<\/?[ou]l[^>]*>/gi, '\n');

  // 段落
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

  // 改行
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // テーブル（簡易）
  text = text.replace(/<table[^>]*>/gi, '\n');
  text = text.replace(/<\/table>/gi, '\n');
  text = text.replace(/<tr[^>]*>/gi, '');
  text = text.replace(/<\/tr>/gi, '\n');
  text = text.replace(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi, '| $1 ');

  // div, span等の残りタグを除去
  text = text.replace(/<[^>]+>/g, '');

  // HTMLエンティティ
  text = decodeEntities(text);

  // 空行整理
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
}

function main() {
  // 既存のhand-written記事のslugを収集（上書きしない）
  const existingSlugs = new Set();
  if (existsSync(OUTPUT_DIR)) {
    for (const file of readdirSync(OUTPUT_DIR)) {
      if (file.endsWith('.md')) {
        existingSlugs.add(file.replace('.md', ''));
      }
    }
  } else {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  console.log(`既存記事: ${existingSlugs.size}件（スキップ対象）`);

  // JSONデータ読み込み
  const allPosts = JSON.parse(readFileSync(JSON_PATH, 'utf-8'));
  console.log(`WP記事: ${allPosts.length}件読み込み`);

  let converted = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of allPosts) {
    try {
      const slug = post.slug;

      // 既存記事はスキップ
      if (existingSlugs.has(slug)) {
        skipped++;
        continue;
      }

      const title = decodeEntities(post.title?.rendered || '');
      const date = (post.date || '').slice(0, 10);
      const contentHtml = post.content?.rendered || '';
      const categories = post.categories || [];
      const link = post.link || '';

      // カテゴリ名
      const catNames = categories.map(c => CATEGORIES[c] || 'other');
      const primaryCat = catNames[0] || 'uncategorized';

      // Markdown変換
      const contentMd = htmlToMarkdown(contentHtml);

      // タイトルのエスケープ
      const escapedTitle = title.replace(/"/g, '\\"');
      const tagsStr = catNames.map(c => `"${c}"`).join(', ');

      const mdContent = `---
title: "${escapedTitle}"
date: "${date}"
description: ""
category: "${primaryCat}"
tags: [${tagsStr}]
wp_id: ${post.id}
wp_url: "${link}"
---

${contentMd}
`;

      const filepath = join(OUTPUT_DIR, `${slug}.md`);
      writeFileSync(filepath, mdContent, 'utf-8');
      converted++;
    } catch (e) {
      console.error(`  エラー: ${post.slug || 'unknown'} - ${e.message}`);
      errors++;
    }
  }

  console.log(`\n完了:`);
  console.log(`  変換成功: ${converted}件`);
  console.log(`  スキップ（既存）: ${skipped}件`);
  console.log(`  エラー: ${errors}件`);
  console.log(`  合計: ${converted + skipped + errors}件`);
}

main();
