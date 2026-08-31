#!/usr/bin/env node
/**
 * Googleクチコミ投稿フォームのQRを再生成する。
 *
 *   node scripts/gen-review-qr.mjs
 *
 * 出力: public/images/review/google-review-qr.png（画面用）
 *       public/images/review/google-review-qr.svg（印刷・カード入稿用）
 *
 * qrcode パッケージは npx で都度取ってくる（devDependency を増やさないため）。
 * URLを変えるときは src/lib/reviewLink.ts の GOOGLE_PLACE_ID を直してから実行する。
 *
 * ⚠️ 生成後は必ず実機のカメラで読み取って、writereview のフォームが開くことを確認する。
 *    誤り訂正レベルは H（30%まで復元可）。印刷して汚れても読めるようにするため下げない。
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/images/review");

// reviewLink.ts をパースしてURLを1か所に保つ（定数の二重管理を避ける）
const source = readFileSync(resolve(root, "src/lib/reviewLink.ts"), "utf8");
const placeId = source.match(/GOOGLE_PLACE_ID\s*=\s*"([^"]+)"/)?.[1];
if (!placeId) {
  console.error("src/lib/reviewLink.ts から GOOGLE_PLACE_ID を読めませんでした");
  process.exit(1);
}
const url = `https://search.google.com/local/writereview?placeid=${placeId}`;

mkdirSync(outDir, { recursive: true });

// stdin は渡さない。"inherit" のままだと TTY の無い環境（バックグラウンド実行や
// エディタから叩いたとき）で qrcode CLI が入力待ちのまま返ってこない。
const run = (args) =>
  execFileSync("npx", ["-y", "qrcode", ...args, url], {
    stdio: ["ignore", "inherit", "inherit"],
  });

run(["-t", "png", "-e", "M", "-w", "900", "-m", "2", "-o", resolve(outDir, "google-review-qr.png")]);
run(["-t", "svg", "-e", "M", "-m", "2", "-o", resolve(outDir, "google-review-qr.svg")]);

console.log(`\n生成しました: ${url}`);
