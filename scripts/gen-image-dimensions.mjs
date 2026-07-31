// 本文画像（Markdownの ![]() ）の実寸法マニフェストを生成する。
//
// なぜプリビルドの別スクリプトなのか:
//   next/image は width/height（もしくは fill）が必須。だが本文画像のパスは
//   Markdown内の動的文字列で、描画時（blog/[slug]/page.tsx）に寸法を知る術がない。
//   かといって page.tsx や lib/posts.ts で public/images を fs 走査すると、
//   Vercel の関数トレースが public/images（数百MB）を関数バンドルに巻き込み
//   250MB上限を超えてデプロイが失敗する（lib/posts.ts のコメント参照）。
//   → ビルド前の独立プロセスでここだけ fs で寸法を読み、静的JSONに落とす。
//     JSON は page.tsx（サーバーコンポーネント）だけが import するのでバンドル無害。
//
// 失敗しても絶対にビルドを止めない（読めない画像はスキップして続行）。

import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content/posts");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT = path.join(ROOT, "src/data/blog-image-dimensions.json");

const VIDEO_RE = /\.(mp4|webm|mov)$/i;
// 本文の画像記法 ![alt](/images/...) からローカルパスを拾う
const IMG_RE = /!\[[^\]]*\]\((\/images\/[^)\s]+)\)/g;

function collectSrcs() {
  const srcs = new Set();
  let files = [];
  try {
    files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  } catch (e) {
    console.warn("[gen-image-dimensions] posts読み取り失敗:", e.message);
    return srcs;
  }
  for (const file of files) {
    let body = "";
    try {
      body = readFileSync(path.join(POSTS_DIR, file), "utf8");
    } catch {
      continue;
    }
    let m;
    while ((m = IMG_RE.exec(body)) !== null) {
      const src = m[1].trim();
      if (VIDEO_RE.test(src)) continue;
      srcs.add(src);
    }
  }
  return srcs;
}

async function main() {
  const srcs = collectSrcs();
  const manifest = {};
  let ok = 0;
  let skipped = 0;

  for (const src of srcs) {
    // src は "/images/..."。public 配下の実ファイルへ。%エンコード名も復号して解決
    const rel = decodeURIComponent(src.replace(/^\//, ""));
    const full = path.join(PUBLIC_DIR, rel);
    // public の外に出る指定は弾く（防御）
    if (!full.startsWith(PUBLIC_DIR + path.sep)) {
      skipped++;
      continue;
    }
    if (!existsSync(full)) {
      skipped++;
      continue;
    }
    try {
      const meta = await sharp(full).metadata();
      let w = meta.width;
      let h = meta.height;
      // EXIF orientation 5〜8 は表示上 縦横が入れ替わる
      if (meta.orientation && meta.orientation >= 5 && meta.orientation <= 8) {
        [w, h] = [h, w];
      }
      if (w && h) {
        manifest[src] = { w, h };
        ok++;
      } else {
        skipped++;
      }
    } catch {
      // HEIC等 sharp が読めない形式はスキップ（本文imgフォールバックで表示される）
      skipped++;
    }
  }

  // キー順を安定させて差分を小さく保つ
  const sorted = {};
  for (const k of Object.keys(manifest).sort()) sorted[k] = manifest[k];
  writeFileSync(OUT, JSON.stringify(sorted, null, 0) + "\n", "utf8");
  console.log(
    `[gen-image-dimensions] ${ok}枚の寸法を書き出し / ${skipped}枚スキップ → src/data/blog-image-dimensions.json`,
  );
}

main().catch((e) => {
  // ここに来てもビルドは止めない。空/既存のマニフェストで続行させる
  console.warn("[gen-image-dimensions] 生成中に想定外エラー（続行）:", e.message);
  if (!existsSync(OUT)) writeFileSync(OUT, "{}\n", "utf8");
});
