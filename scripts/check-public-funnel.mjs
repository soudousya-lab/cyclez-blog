#!/usr/bin/env node
/**
 * cycleZの主要公開ページが「お客様向けの相談・来店導線」から外れていないか確認する。
 *
 * 公開面は、内部分析よりも「誰が読むか」「次に何をすればよいか」を優先する。
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();

const rules = [
  {
    name: 'ホーム',
    file: 'src/components/HomeContent.tsx',
    audience: '岡山でスポーツ自転車を始めたい人・相談先を探す人',
    required: [
      'SearchIntentAnswer',
      '購入前の相談からメンテナンス、イベント参加まで',
      'primaryLink={{ href: "/first"',
      'secondaryLink={{ href: "/maintenance"',
      'href="/contact"',
    ],
  },
  {
    name: 'メンテナンス',
    file: 'src/app/maintenance/page.tsx',
    audience: '自転車修理・点検を相談したい人',
    required: [
      'SearchIntentAnswer',
      '岡山で自転車修理・メンテナンスを探している方へ',
      'primaryLink={{ href: "/maintenance/reserve"',
      'secondaryLink={{ href: "/contact"',
      'メンテナンスを予約する',
    ],
  },
  {
    name: '初めての方へ',
    file: 'src/app/first/page.tsx',
    audience: 'ロードバイク・クロスバイク初心者',
    required: [
      'SearchIntentAnswer',
      '岡山でロードバイク初心者の相談先を探している方へ',
      'primaryLink={{ href: "/lineup"',
      'secondaryLink={{ href: "/contact"',
      '初心者相談をする',
    ],
  },
];

const violations = [];

for (const rule of rules) {
  const text = fs.readFileSync(path.join(root, rule.file), 'utf8');
  for (const token of rule.required) {
    if (!text.includes(token)) {
      violations.push({ page: rule.name, file: rule.file, audience: rule.audience, missing: token });
    }
  }
}

if (violations.length === 0) {
  console.log('✅ 主要ページの読者定義・相談/来店導線は維持されています');
  process.exit(0);
}

console.error('❌ 主要ページの読者定義または相談/来店導線が欠落しています\n');
for (const v of violations) {
  console.error(`  ${v.page} (${v.file})`);
  console.error(`    想定読者: ${v.audience}`);
  console.error(`    不足: ${v.missing}\n`);
}
process.exit(1);
