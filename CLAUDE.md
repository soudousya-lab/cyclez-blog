# CLAUDE.md — cycleZ Blog

## プロジェクト概要
cycleZ（岡山のスポーツバイクショップ）の公式ブログ。
Markdownベースの記事管理、ブランドガイドライン厳守。

## 技術スタック
Next.js 16.1 (App Router) / TypeScript / Tailwind CSS / gray-matter / date-fns / Puppeteer（OG画像生成）

## コマンド
- `npm run dev` — 開発サーバー
- `npm run build` — ビルド確認

## コンテンツ構造
- `content/posts/` — 公開記事（Markdown）
- `content/primary-sources/` — エピソードバンク（一次情報）
- `content/article-plans/` — 記事企画

## ブランドガイドライン（最重要）

### 取扱ブランド（承認済み）
GIOS, BASSO, SCOTT, BOMA, BISYA, DELOSA, FELT, CERVELO, CINELLI, LAPIERRE, Wilier, CYCLEHEART, SURLY, JAMIS, Tyrell

### 禁止ブランド（絶対に記事内で言及しない）
SPECIALIZED, COLNAGO, TREK, CANNONDALE, BIANCHI, GIANT

### アパレル承認
Isadore, Assos, ALBA OPTICS, beruf baggage, GIRO（プレミアム系）
STEMDESIGN, rin project, ccp（カジュアル系）

### アパレル禁止
narifuri, rapha, TOKYO WHEELS

### 価格帯の方針
- 5万円以下: 推奨しない（安全性の懸念）
- 10〜20万円: エントリーレベルとして推奨
- 15〜50万円: ミッドレンジ
- 50万円以上: ハイエンド/競技用

## 記事執筆ルール
- 事実のみ記述（フィクション厳禁）
- 良い記事の5条件: 具体的な数字、店としての正直な意見、読者がすぐ行動できる情報、読者との共感、会話調
- 禁止表現: 感情的な盛り、「特別な」「アドレナリン」「新たな発見」
- CTAは控えめに、記事内で1回のみ

## ルート構造
- `/` — トップページ
- `/posts/[slug]` — 記事ページ

## 関連ドキュメント
- `CYCLEZ_BLOG_GUIDE.md` — 詳細ブランドガイド
- `OPENING_PROMPT.md` — 記事作成プロンプト
- `GERMINATION_PROMPT_V2.md` — 記事企画プロンプト
