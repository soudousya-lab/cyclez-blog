# WordPress → Next.js 移行ステータス

**最終更新**: 2026-02-18
**ステータス**: 調査完了・計画策定済み・実装未着手

---

## 調査結果サマリー

### WordPress (cycle-z.com) の構成

| 項目 | 内容 |
|------|------|
| 固定ページ | 19ページ |
| 投稿 | ~500件超（2016年〜2026年2月） |
| カテゴリ | 10種（お知らせ272, イベント188, 初心者講習会95, ラインナップ76, メンテナンスブログ48, イベントレポート19, ロードバイク15, お客様の声4, 動画紹介3, 未分類2） |
| メディア | /wp-content/uploads/YYYY/MM/ パターン |
| カスタム投稿タイプ | なし |
| REST API | https://cycle-z.com/wp-json/wp/v2/ でフルアクセス可能 |

### 固定ページ一覧（WP ID付き）

| WP ID | タイトル | 現URL | 移行先URL |
|-------|---------|-------|-----------|
| 1431 | HOME | / | / (新デザイン) |
| 6 | CycleZとは？ | /about/ | /about |
| 36 | 代表挨拶 | /about/greet/ | /about/greeting |
| 8 | アクセスマップ | /access/ | /access |
| 42 | 初めての方へ | /first/ | /beginner |
| 859 | 初心者講習会について | /first/beginner/ | /beginner/workshop |
| 2288 | 初心者向け講習動画 | /introduction/ | /beginner/videos |
| 2269 | 初心者向けメンテナンス方法 | /beginners/ | /beginner/maintenance |
| 697 | メンテナンス | /maintenance/ | /maintenance |
| 706 | フィッティング | /fitting/ | /fitting |
| 1499 | よくある質問 | /faq/ | /faq |
| 10 | お問い合わせ | /contact/ | /contact |
| 708 | お支払方法 | /payment/ | /payment |
| 434 | フォトギャラリー | /about/photogallery/ | /gallery |
| 3342 | イベント情報一覧 | /event_all/ | /events |
| 103 | 個人情報保護 | /privacy/ | /privacy |
| 101 | サイトマップ | /sitemap/ | /sitemap |
| 438,439 | イベントアーカイブ×2 | /about/photogallery/... | (統合先検討) |

### WP投稿カテゴリのID対応

| カテゴリ名 | WP ID | スラッグ |
|-----------|-------|---------|
| お知らせ | 7 | news |
| イベント | 15 | event |
| 初心者講習会 | 16 | beginner-training |
| ラインナップ | 17 | lineup |
| メンテナンスブログ | 18 | maintenance-blog |
| イベントレポート | 19 | event-report |
| ロードバイク | 20 (推定) | road-bike |
| アパレル | 13 | (確認必要) |
| お客様の声 | (確認必要) | voice |
| 動画紹介 | (確認必要) | movie |

---

## 方針（決定済み）

1. **ドメイン**: cycle-z.com に統一（Vercelデプロイ）
2. **WP投稿**: HTMLのまま保持（markdown変換しない）。JSONメタデータ + HTML
3. **WP APIランタイム呼び出し**: なし。全コンテンツは事前抽出して静的生成
4. **ブログ記事**: `/blog` に移動。ルート `/` はショップのメインページ
5. **画像**: `public/wp-images/` にダウンロードしてセルフホスト
6. **WPページスタイル**: `.wp-content` CSSスコープでBootstrapクラスをTailwind化

---

## 実行順序（Phase 0〜6）

### Phase 0: WPコンテンツ抽出 ← **次に着手するステップ**
- `scripts/wp-extract.mjs` スクリプト作成
- REST APIで全ページ・投稿・カテゴリ取得
- 画像ダウンロード → `public/wp-images/`
- HTML内画像URLを書き換え

### Phase 1: ルーティング構造
- 新URL設計（上記参照）
- `next.config.ts` にリダイレクト設定

### Phase 2: レイアウト・コンポーネント更新
- `layout.tsx` メタデータ更新
- `Header.tsx` / `Footer.tsx` のリンク内部化
- 新ホームページ作成
- ブログを `/blog` に移動

### Phase 3: WP固定ページ実装
- `WpPageLayout.tsx`, `WpContent.tsx` 共通コンポーネント
- `content/pages/*.ts` にページデータ
- `globals.css` にWPコンテンツCSS
- 特別対応: contact(フォーム), access(地図), gallery(ライトボックス), faq(アコーディオン)

### Phase 4: WP投稿アーカイブ
- `content/wp-posts/index.json` + `[slug].html`
- `src/lib/wp-posts.ts` データアクセス
- `/news` 一覧・詳細・カテゴリページ

### Phase 5: お問い合わせフォーム
- `ContactForm.tsx` + `api/contact/route.ts`
- resend パッケージでメール送信

### Phase 6: SEO・ドメイン移行
- sitemap.ts / robots.ts 更新
- 構造化データ (JsonLd.tsx)
- Vercelドメイン設定 (cycle-z.com)
- Search Console更新

---

## 技術的メモ

- WP REST APIエンドポイント: `https://cycle-z.com/wp-json/wp/v2/`
  - ページ: `/pages?per_page=100`
  - 投稿: `/posts?per_page=100&page=N`
  - カテゴリ: `/categories?per_page=100`
  - メディア: `/media?per_page=100&page=N`
- WP投稿のHTMLはBootstrapクラス使用 (col-sm-6, division, row, main-title, sub-title, etc.)
- WPフォームプラグイン: mwform (mwform_formkey)
- 画像URLパターン: `https://cycle-z.com/wp-content/uploads/YYYY/MM/filename.jpg`

---

## 関連ファイル

- 詳細計画: `.claude/plans/humble-fluttering-ladybug.md`
- ブログガイド: `CYCLEZ_BLOG_GUIDE.md`
- 記事執筆プロンプト: `OPENING_PROMPT.md`
