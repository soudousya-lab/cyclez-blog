#!/usr/bin/env node
// バイク診断（DiagnosisQuiz.tsx）の外部リンク（メーカー/正規代理店）の生存監視。
// 使い方: node scripts/check-bike-links.mjs
//   404/410（＝本当にページが消えた）が1件でもあれば 終了コード1 + dead[] を出力。
//   403/401/429/5xx/タイムアウトは「ボット保護 or 一過性」として dead 扱いにしない
//     （ORBEA/Wilier等は自動アクセスに403を返すが実ブラウザでは開ける＝生存）。inconclusive[] に記録。
// cron/定期エージェントから実行し、dead が出たら「うちで内部ページを作る」対応につなげる想定。
// ※fetchはサイトのTLS/ボット保護で誤検知するため、実ブラウザに近い curl を使う。

import { readFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUIZ = join(__dirname, "..", "src", "components", "DiagnosisQuiz.tsx");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36";

/** bikeData から { name, url }（外部httpのみ）を抽出 */
function extractLinks() {
  const src = readFileSync(QUIZ, "utf-8");
  const block = src.slice(src.indexOf("const bikeData"), src.indexOf("// ─── 型定義"));
  const re = /\n\s*"([^"]+)":\s*\{[^}]*?url:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(block))) {
    if (/^https?:\/\//.test(m[2])) out.push({ name: m[1], url: m[2] });
  }
  return out;
}

/** curl でHTTPステータスを取得（リダイレクト追従・ブラウザUA） */
function curlStatus(url) {
  return new Promise((resolve) => {
    execFile(
      "curl",
      ["-sL", "-o", "/dev/null", "-w", "%{http_code}", "-A", UA, "-H", "Accept-Language: ja,en", "--max-time", "25", url],
      { timeout: 30000 },
      (err, stdout) => resolve(err ? "000" : (stdout || "").trim()),
    );
  });
}

async function check(url) {
  let s = await curlStatus(url);
  if (s === "404" || s === "410" || s === "200") return s; // 確定系はそのまま
  await new Promise((r) => setTimeout(r, 1500)); // 一過性対策で1回だけ再試行
  return curlStatus(url);
}

const links = extractLinks();
const dead = []; // 404/410 = 本当に消えた → 内部ページ化の対象
const inconclusive = []; // 403等 = 保護/一過性 → 自動対応せず要目視
for (const { name, url } of links) {
  const status = await check(url);
  const code = Number(status);
  let tag;
  if (code === 404 || code === 410) {
    tag = "DEAD";
    dead.push({ name, url, status });
  } else if (code >= 200 && code < 400) {
    tag = "OK";
  } else {
    tag = "WARN";
    inconclusive.push({ name, url, status });
  }
  console.error(`${tag}\t${status}\t${name}`);
}

const report = {
  checkedAt: new Date().toISOString(),
  total: links.length,
  deadCount: dead.length,
  dead, // ← これがあれば「うちで内部ページを作る」
  inconclusive, // ← 403等。多くはボット保護で実際は生存。要目視。
};
console.log(JSON.stringify(report, null, 2));
process.exit(dead.length > 0 ? 1 : 0);
