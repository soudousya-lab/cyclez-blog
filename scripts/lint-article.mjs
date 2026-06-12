#!/usr/bin/env node
/**
 * cycleZ ブログ記事リンター
 *
 * 使い方:
 *   node scripts/lint-article.mjs <slug>          # 1記事をチェック
 *   node scripts/lint-article.mjs --all           # 全記事をチェック
 *   node scripts/lint-article.mjs --new           # frontmatter date が直近30日の記事のみ
 *   node scripts/lint-article.mjs --staged        # gitステージ済みの記事のみ（pre-commit用）
 *
 * 終了コード: 0=OK / 1=エラーあり
 *
 * 検査項目:
 *   A. 事実性    （手動チェック項目を案内）
 *   B. 禁止表現  「特別な」「アドレナリン」「新たな発見」「もはや」など
 *   C. 禁止ブランド（SPECIALIZED, COLNAGO, TREK, CANNONDALE, BIANCHI, GIANT 等）
 *   D. CTA回数  電話/お問い合わせ/「ご来店」等を集計、2回以上で警告
 *   E. 文字数   2000-3000字レンジ
 *   F. WP残骸   gallery_shortcode / &#038; / 行頭タブ / 自己ドメイン絶対URL
 *   G. ブランド  禁止アパレルの混入
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const POSTS_DIR = join(ROOT, 'content/posts');

// ──────────── ルール定義 ────────────

const FORBIDDEN_PHRASES = [
  '特別な', 'アドレナリン', '新たな発見',
  'もはや', '圧倒的な', '最高の体験', '究極の', '革命的',
  '究極', '至高', '極上',
];

const FORBIDDEN_BRANDS = [
  'SPECIALIZED', 'Specialized', 'specialized',
  'COLNAGO', 'Colnago', 'colnago',
  'TREK', 'Trek', 'trek',
  'CANNONDALE', 'Cannondale', 'cannondale',
  'BIANCHI', 'Bianchi', 'bianchi',
  'GIANT', 'Giant', // ※「ジャイアントストア」言及は誤検出する可能性。要注意。
];

// 「trek」「giant」など一般名詞と被るので、文脈で除外する語
const BRAND_EXCEPTIONS = [
  'Giant Store', 'ジャイアントストア',  // 競合店名としての言及はギリギリ許容
  'streak', 'street', 'great',          // trekを含む英単語
];

const FORBIDDEN_APPAREL = ['narifuri', 'rapha', 'Rapha', 'TOKYO WHEELS', 'Tokyo Wheels', 'tokyo wheels'];

// CTA判定パターン（記事内で1回のみ）
const CTA_PATTERNS = [
  /\[?086-252-7744\]?/g,                              // 電話番号
  /tel:086-252-7744/g,                                // 電話リンク
  /お気軽に[^\n]{0,15}(店頭|お電話|お問い合わせ)/g,    // 「お気軽に店頭まで」「お気軽にお電話」
  /\/contact\b/g,                                     // お問い合わせページリンク
  /ご来店[^\n]{0,10}(お待ち|歓迎|ください)/g,         // 「ご来店お待ちしております」
  /(お待ちして|お会いできるのを楽しみに)/g,           // 結びのCTA
];

const PRICE_WARN_RE = /([1-4]\.?\d?万円|[1-4]\d{1,3},?\d{3}円|3\d{4}円|4\d{4}円)(?!以上)/g; // 5万円以下を示唆する金額

const WP_REMNANTS = {
  galleryShortcode: /gallery_shortcode\(\)/,
  galleryCss: /#gallery-\d+\s*\{/,
  htmlEntity: /&#0?38;|&#9658;|&nbsp;|&amp;[a-z]/,
  leadingTab: /^\t+\S/m,
  selfAbsoluteUrl: /\]\(https?:\/\/cycle-z\.com\/(blog|first|maintenance|fitting|contact|access|about)/,
  wpEmbed: /\[埋め込みコンテンツ\]\(/,
  brokenBanner: /\[\!\[\]\([^)]*beginner-[sp]p[^)]*\.jpg\)\s*\]\(/,
};

const TARGET_MIN_CHARS = 2000;
const TARGET_MAX_CHARS = 3000;

// ──────────── ヘルパー ────────────

function loadArticle(path) {
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { frontmatter: '', body: raw, raw };
  return { frontmatter: m[1], body: m[2], raw };
}

function countOccurrences(text, pattern) {
  const re = pattern instanceof RegExp
    ? new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
    : new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  return (text.match(re) || []);
}

function color(code, s) {
  return process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s;
}
const red = s => color(31, s);
const yellow = s => color(33, s);
const green = s => color(32, s);
const dim = s => color(2, s);
const bold = s => color(1, s);

// ──────────── 検査ロジック ────────────

function lintArticle(filePath) {
  const slug = basename(filePath, '.md');
  const { frontmatter, body, raw } = loadArticle(filePath);
  const errors = [];
  const warnings = [];
  const info = [];

  // B. 禁止表現
  for (const phrase of FORBIDDEN_PHRASES) {
    const hits = countOccurrences(body, phrase);
    if (hits.length > 0) errors.push(`B: 禁止表現「${phrase}」を ${hits.length} 箇所で使用`);
  }

  // C. 禁止ブランド
  for (const brand of FORBIDDEN_BRANDS) {
    // 例外（Giant Store等）を除外したテキストで検索
    let searchText = body;
    for (const exc of BRAND_EXCEPTIONS) searchText = searchText.split(exc).join('');
    if (searchText.includes(brand)) {
      errors.push(`C: 禁止ブランド「${brand}」が混入`);
    }
  }

  // G. 禁止アパレル
  for (const ap of FORBIDDEN_APPAREL) {
    if (body.includes(ap)) errors.push(`G: 禁止アパレル「${ap}」が混入`);
  }

  // D. CTA数 — パターンごとにマッチを集約。位置の近い（200文字以内）マッチは1グループとみなす
  const ctaPositions = [];
  for (const pat of CTA_PATTERNS) {
    const re = new RegExp(pat.source, 'g');
    let m;
    while ((m = re.exec(body)) !== null) ctaPositions.push(m.index);
  }
  ctaPositions.sort((a, b) => a - b);
  const ctaGroups = [];
  for (const pos of ctaPositions) {
    if (ctaGroups.length === 0 || pos - ctaGroups[ctaGroups.length - 1] > 300) ctaGroups.push(pos);
  }
  if (ctaGroups.length > 1) {
    errors.push(`D: CTAが ${ctaGroups.length} 箇所に分散（記事内1回のみのルール違反）`);
  } else if (ctaGroups.length === 0) {
    warnings.push('D: CTAが見つからない（電話番号またはお問い合わせリンクが1つあると良い）');
  } else {
    info.push(`D: CTA 1箇所 ✓`);
  }

  // E. 文字数（frontmatter除いた本文）
  const charCount = body.replace(/\s/g, '').length;
  if (charCount < TARGET_MIN_CHARS) {
    warnings.push(`E: 文字数 ${charCount}字 (目標 ${TARGET_MIN_CHARS}〜${TARGET_MAX_CHARS}字)`);
  } else if (charCount > TARGET_MAX_CHARS) {
    warnings.push(`E: 文字数 ${charCount}字 (目標 ${TARGET_MIN_CHARS}〜${TARGET_MAX_CHARS}字超過)`);
  } else {
    info.push(`E: 文字数 ${charCount}字 ✓`);
  }

  // F. WP残骸
  for (const [name, re] of Object.entries(WP_REMNANTS)) {
    if (re.test(body)) errors.push(`F: WP残骸「${name}」を検出`);
  }

  // 5万円以下の価格言及（警告のみ）
  const priceHits = body.match(PRICE_WARN_RE);
  if (priceHits) {
    warnings.push(`安全方針: 5万円以下を示唆する金額表記の可能性 (${priceHits.slice(0, 3).join(', ')}...)`);
  }

  // 出力
  const status = errors.length === 0
    ? (warnings.length === 0 ? green('PASS') : yellow('WARN'))
    : red('FAIL');
  console.log(`${status}  ${bold(slug)}`);
  for (const e of errors)   console.log(`  ${red('✗')} ${e}`);
  for (const w of warnings) console.log(`  ${yellow('⚠')} ${w}`);
  for (const i of info)     console.log(`  ${dim('·')} ${dim(i)}`);
  return { errors: errors.length, warnings: warnings.length };
}

// ──────────── ファイル選定 ────────────

function listFiles(arg) {
  if (arg === '--all') {
    return readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).map(f => join(POSTS_DIR, f));
  }
  if (arg === '--new') {
    const cutoff = Date.now() - 30 * 24 * 3600 * 1000;
    return readdirSync(POSTS_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => join(POSTS_DIR, f))
      .filter(p => {
        const m = readFileSync(p, 'utf8').match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m);
        if (!m) return false;
        return new Date(m[1]).getTime() >= cutoff;
      });
  }
  if (arg === '--staged') {
    try {
      const out = execSync('git diff --cached --name-only --diff-filter=AM', { cwd: ROOT, encoding: 'utf8' });
      return out.split('\n')
        .filter(f => f.startsWith('content/posts/') && f.endsWith('.md'))
        .map(f => join(ROOT, f));
    } catch { return []; }
  }
  // 単一スラッグ指定
  const candidates = [
    join(POSTS_DIR, arg.endsWith('.md') ? arg : arg + '.md'),
  ];
  return candidates.filter(p => existsSync(p));
}

// ──────────── メイン ────────────

const arg = process.argv[2];
if (!arg) {
  console.error('Usage: node scripts/lint-article.mjs <slug | --all | --new | --staged>');
  process.exit(2);
}

const files = listFiles(arg);
if (files.length === 0) {
  console.error(`No files matched for: ${arg}`);
  process.exit(2);
}

let totalErrors = 0;
let totalWarnings = 0;
for (const f of files) {
  const { errors, warnings } = lintArticle(f);
  totalErrors += errors;
  totalWarnings += warnings;
}

console.log(`\n${files.length} files checked.  errors=${totalErrors}  warnings=${totalWarnings}`);
process.exit(totalErrors > 0 ? 1 : 0);
