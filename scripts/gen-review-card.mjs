#!/usr/bin/env node
/**
 * 店頭で手渡す「クチコミのお願い」カード（名刺サイズ）を生成する。
 *
 *   node scripts/gen-review-card.mjs
 *
 * 出力: docs/review-card/review-card.pdf        … 入稿用（97×61mm＝仕上がり91×55mm＋塗り足し3mm）
 *       docs/review-card/review-card.png        … 確認用（300dpi）
 *       docs/review-card/review-card-guide.png  … 裁ち位置・文字安全域を重ねた確認用（入稿しない）
 *       docs/review-card/review-card.html       … 生成された中間HTML（デザイン調整用）
 *
 * ■ 塗り足しの考え方（ここを間違えると刷り上がりが事故る）
 *   仕上がり 91×55mm の外側に各3mm、断裁のズレを吸収するための塗り足しを付ける。
 *   塗り足し部分は「裁ち落とされる前提の余白」なので、そこの色は必ず
 *   隣接するデザインの色をそのまま伸ばす。別の色を置くと、断裁が内側にズレたときに
 *   仕上がりの縁にその色が細く残る。
 *   文字は仕上がり線からさらに3mm以上内側に置く（外にズレたときの欠け防止）。
 *
 * QRは public/images/review/google-review-qr.svg をそのまま埋め込む（ベクターなので
 * 印刷で潰れない）。URLを変えたときは先に scripts/gen-review-qr.mjs を回すこと。
 *
 * ⚠️ 刷る前に必ず実物のスマホカメラでQRを読み、Googleの投稿フォームが開くことを確認する。
 */
import puppeteer from "puppeteer";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "docs/review-card");
mkdirSync(outDir, { recursive: true });

const qrSvg = readFileSync(resolve(root, "public/images/review/google-review-qr.svg"), "utf8")
  .replace(/<\?xml[^>]*\?>/, "")
  .replace(/<!DOCTYPE[^>]*>/, "")
  .trim();

const logoDataUri = `data:image/png;base64,${readFileSync(
  resolve(root, "public/images/logo/logo.png"),
).toString("base64")}`;

// showGuide=true のときだけ、裁ち位置（仕上がり線）と文字安全域を重ねる。
const buildHtml = (showGuide) => `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><style>
  @page { size: 97mm 61mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 97mm; height: 61mm; }
  body {
    font-family: "Hiragino Sans", "Noto Sans JP", sans-serif;
    background: #ffffff;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    position: relative;
  }
  /* 全面（塗り足し込み97×61mm）を使う。各ブロックの色は断裁される端まで伸ばす。 */
  .card { position: absolute; inset: 0; display: flex; }

  /* 左: 白。左・上・下の塗り足し3mmぶんを padding に足して文字を内側へ入れる */
  .left {
    width: 56mm; background: #ffffff;
    padding: 7mm 3mm 7mm 8mm;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .lead { font-size: 4mm; font-weight: 700; color: #1a1a1a; line-height: 1.4; }
  .lead .accent { color: #c41e3a; }
  .sub { font-size: 2.5mm; color: #555; line-height: 1.55; margin-top: 1.5mm; }
  .shop { border-top: .3mm solid #e5e5e5; padding-top: 2mm; }
  .shop img { height: 4.4mm; display: block; margin-bottom: 1.2mm; }
  .shop p { font-size: 2.3mm; color: #444; line-height: 1.5; }
  .shop .tel { font-size: 2.8mm; font-weight: 700; color: #c41e3a; letter-spacing: .02em; margin-bottom: .4mm; }

  /* 右: 薄グレーの面。右端まで（塗り足しの外まで）伸ばすので断裁がズレても色が途切れない */
  .right {
    flex: 1; background: #f7f7f7; border-left: .3mm solid #ececec;
    padding: 6mm 6mm 6mm 3mm;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2mm;
  }
  .qr { width: 28mm; height: 28mm; background: #fff; padding: 1mm; border-radius: .5mm; }
  .qr svg { width: 100%; height: 100%; display: block; }
  .qr-note { font-size: 2.3mm; color: #666; text-align: center; line-height: 1.5; }

  /* 確認用ガイド（入稿PDFには出さない） */
  .guide-trim {
    position: absolute; top: 3mm; left: 3mm; width: 91mm; height: 55mm;
    outline: .2mm dashed #e5007f; pointer-events: none;
  }
  .guide-safe {
    position: absolute; top: 6mm; left: 6mm; width: 85mm; height: 49mm;
    outline: .2mm dashed #00a0e9; pointer-events: none;
  }
  .guide-label {
    position: absolute; top: .4mm; left: 1mm;
    font-size: 1.7mm; color: #e5007f; letter-spacing: .02em;
    background: rgba(255,255,255,.85); padding: .2mm .6mm;
  }
</style></head>
<body>
  <div class="card">
    <div class="left">
      <div>
        <p class="lead">よかったら<br><span class="accent">クチコミ</span>を<br>残してください</p>
        <p class="sub">感じたままで大丈夫です。<br>1分ほどで終わります。</p>
      </div>
      <div class="shop">
        <img src="${logoDataUri}" alt="">
        <p class="tel">086-252-7744</p>
        <p>岡山市北区島田本町1-1-47<br>11:00〜19:00／水曜定休</p>
      </div>
    </div>
    <div class="right">
      <div class="qr">${qrSvg}</div>
      <p class="qr-note">カメラで読み取ると<br>Googleの投稿ページが<br>開きます</p>
    </div>
  </div>
  ${
    showGuide
      ? `<div class="guide-trim"></div><div class="guide-safe"></div>
         <div class="guide-label">ピンク=仕上がり91×55mm／水色=文字安全域（このガイドは入稿PDFには入りません）</div>`
      : ""
  }
</body></html>`;

const html = buildHtml(false);
writeFileSync(resolve(outDir, "review-card.html"), html, "utf8");

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setContent(html, { waitUntil: "load" });
await page.pdf({
  path: resolve(outDir, "review-card.pdf"),
  width: "97mm",
  height: "61mm",
  printBackground: true,
  pageRanges: "1",
});

// 300dpi相当（CSS 97mm ≈ 367px を deviceScaleFactor 3.125 で拡大）
await page.setViewport({ width: 367, height: 231, deviceScaleFactor: 3.125 });
await page.screenshot({ path: resolve(outDir, "review-card.png") });

await page.setContent(buildHtml(true), { waitUntil: "load" });
await page.setViewport({ width: 367, height: 231, deviceScaleFactor: 3.125 });
await page.screenshot({ path: resolve(outDir, "review-card-guide.png") });

await browser.close();
console.log(`生成しました: ${outDir}`);
