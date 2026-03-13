# CLAUDE.md — cycleZ Blog

## プロジェクト概要
cycleZ（岡山のスポーツバイクショップ）の公式ブログ。
WordPressから完全移行済み。Markdownベースの記事管理、ブランドガイドライン厳守。

## 技術スタック
Next.js 16.1 (App Router) / TypeScript / Tailwind CSS / gray-matter / date-fns / Puppeteer（OG画像生成）

## コマンド
- `npm run dev` — 開発サーバー
- `npm run build` — ビルド確認

## デプロイ
- Vercel（blog.cycle-z.com）
- GitHub: soudousya-lab/cyclez-blog
- `git push origin main` で自動デプロイ

## コンテンツ構造
- `content/posts/` — 公開記事（Markdown、421件）
- `content/primary-sources/` — エピソードバンク（一次情報）
- `content/article-plans/` — 記事企画
- `public/images/wp/` — WPから移行した画像（842枚）
- `public/images/` — 手動追加のカスタム画像

## ルート構造
- `/` — トップページ（HeroSlider + 記事一覧）
- `/blog/[slug]` — 記事ページ
- `/category/[slug]` — カテゴリ別記事一覧
- `/about` — CycleZとは？
- `/about/greeting` — 代表挨拶
- `/first` — 初めての方へ
- `/first/beginner` — 初心者講習会
- `/beginners` — 初心者向けメンテナンス
- `/introduction` — 初心者向け動画
- `/maintenance` — メンテナンス
- `/fitting` — フィッティング
- `/faq` — よくある質問
- `/access` — アクセスマップ
- `/contact` — お問い合わせ
- `/payment` — お支払方法
- `/privacy` — 個人情報保護方針

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

## 関連ドキュメント
- `docs/CYCLEZ_BLOG_GUIDE.md` — 詳細ブランドガイド
- `docs/OPENING_PROMPT.md` — 記事作成プロンプト
- `docs/GERMINATION_PROMPT_V2.md` — 記事企画プロンプト
- `docs/wp-migration/` — WordPress移行データ

---

## 進行中タスク（次のセッションへの引き継ぎ）

### 完了済み
- [x] WordPress記事405件をMarkdownに一括変換（content/posts/に421件配置）
- [x] WP固定ページ13ページをNext.jsページとして実装
- [x] カテゴリページ機能（/category/[slug]）14カテゴリ自動生成
- [x] Header/Footerを全て内部リンク化
- [x] 301リダイレクト設定（/blog/YYYY/MM/DD/slug → /blog/slug）
- [x] WP画像842枚をpublic/images/wp/にダウンロード・ローカル化
- [x] Markdown内の画像URLを全てローカルパスに置換
- [x] next.config.tsからremotePatterns（cycle-z.com依存）を削除
- [x] サイトマップに全ページ追加（454ページ）
- [x] ビルド成功・Vercelデプロイ済み

### 残タスク

#### 1. HeroSlider画像の差し替え（AdobeStock → AI生成）✅ 完了
- 旧AdobeStockの画像は利用規約的にNG（RESTA山本さんからの指摘）→ AI生成に全面差し替え済み
- 不要画像（recommend01.jpg, recommend06.jpg, *_backup.jpg）削除済み
- HeroSliderを3枚→4枚に拡張済み（HeroSlider.tsx更新済み、ビルド確認済み）
- HeroSlider対象ファイル:
  - `public/beginner.jpg` (2400x1000, 396KB) — 田舎道ライド / BASSO Astra / STEM DESIGN
  - `public/woman.jpg` (2400x1000, 418KB) — 女性ライダー春アパレル / GIOS / STEM DESIGN + rin project
  - `public/rinko.jpg` (2400x1000, 404KB) — 輪行シーン / SCOTT Addict RC / rin project
  - `public/cafe.jpg` (2400x1000, 573KB) — カフェシーン / Wilier Filante / STEM DESIGN
- CTAセクション背景:
  - `public/contact.jpg` (1920x584, 284KB) — ショップ相談 / BASSO・GIOS（背景展示）※HeroSliderには含まない

#### 2. Cloudflareへのドメイン移管
- 山本さん（RESTA/バリューページ）にAuthCode発行を依頼 → まだ未送信
- cycle-z.comをお名前.com → Cloudflareに移管
- Cloudflare Email Routing でinfo@cycle-z.comの転送を維持（無料）
- 転送先: cyclez2015@gmail.com, shumei826@gmail.com

#### 3. 山本さんへの返信（未送信）
- ドメイン移管のAuthCode発行依頼
- さくらサーバーのcycle-z.com分の解除依頼
- メール転送の現状確認（さくらのメール機能？）
- AdobeStock画像は新サイトで不使用と伝える

### RESTA山本さんからの情報まとめ
- ドメイン: お名前.com、山本名義（okada soumei）、期限2026/09/17
- サーバー: さくらレンタルサーバー（他顧客と共用）、期限2027/03/31
- 費用: さくら6,600円 + ドメイン1,800円 + バックアップ2,500円 + 郵送100円 = 年11,000円
- 保守契約: 特になし、実作業都度請求
- 写真素材: 自前写真OK、AdobeStock画像（トップの女性・海外男性）はNG
- メール: info@cycle-z.com → cyclez2015@gmail.com, shumei826@gmail.com に転送中

---

## AI画像生成ナレッジ（Google AI Studio）

### 使用ツール・設定
- **ツール**: Google AI Studio（https://aistudio.google.com）via Chrome MCP
- **モデル**: Nano Banana Pro（gemini-3-pro-image-preview）※Nano Banana 2はAI感が出やすい
- **アスペクト比**: 16:9
- **解像度**: 4K（出力: 5504x3072）

### 画像加工パイプライン
1. AI Studioで16:9 4K画像生成（5504x3072）
2. blob URLからJavaScriptでダウンロード（`a.download`方式）
3. `sips`でクロップ・リサイズ:
   - 2400x1000用: `sips --cropToHeightWidth 2293 5504` → `sips -z 1000 2400`
   - 1920x584用: `sips --cropToHeightWidth 1674 5504` → `sips -z 584 1920`

### AI感を消すためのプロンプトテクニック
- **カメラ設定を明記**: 「Shot on Sony A7IV with 35mm f/1.8」
- **フィルム指定**: 「Kodak Portra 400 film grain」
- **人物は遠景・後ろ姿**: 顔のアップはAI感が出やすい、中距離以上で撮影
- **自然光**: 「natural daylight」「golden hour」
- **質感指定**: 「natural skin texture, no airbrushed look」
- **ドキュメンタリー風**: 「documentary feel, candid moment」

### ロードバイクブランド詳細（プロンプト用）

#### BASSO（イタリア）
- カーボンフレーム、エアロ形状のダウンチューブ
- ドロップドシートステー、内装ケーブルルーティング
- ダウンチューブに「BASSO」ロゴ
- 代表モデル: Astra（フルカーボン、ディスクブレーキ）

#### GIOS（イタリア）
- **Gios Blue**（深いコバルトブルー）が最大の特徴
- クロモリスチール、細身のラウンドチューブ
- 外装ケーブル、シルバーパーツ
- ダウンチューブに「GIOS」白ブロック文字
- クラシカルなイタリアンスチールバイク

#### SCOTT（スイス）
- Addict RC: 超軽量カーボン（フレーム599g）
- インテグレーテッドコクピット、エアロダイナミック
- ディスクブレーキ、フル内装ケーブル
- マットブラック基調、ミニマルデザイン
- ダウンチューブに「SCOTT」ロゴ

#### Wilier（イタリア）
- Filante SLR: エアロフラッグシップ
- マットブラック＋レッドアクセント
- スーパーシンベアリング、フルケーブル内装
- ダウンチューブに筆記体「Wilier」ロゴ
- イタリアントリコロールの小さなアクセント

### サイクルアパレルブランド詳細（プロンプト用）

#### STEM DESIGN（日本・カジュアル系）
- ドライサイクルTシャツ、ポロジャージ、ペダリングパンツ
- アースカラー（カーキ、モカ、チャコール）
- コットンライクなマットな質感
- 普段着に見えるがサイクリング機能付き
- **レーシングライクラではない、カジュアルな見た目が重要**

#### rin project（日本・カジュアル系）
- インディゴ染めのサイクリングキャップ
- ウールセーター、アーバンサイクリング向け
- レトロ・ナチュラルなスタイル
- 藍染め、天然素材の雰囲気

#### ASSOS（スイス・テクニカル系）
- スリムフィット、テクニカル
- EQUIPE RSライン
- モノトーン基調

#### Isadore（スロバキア・テクニカル系）
- メリノウール、アースカラー
- タイムレスデザイン、サステナブル

### 重要な注意点
- **タイトなレーシングライクラは避ける** — cycleZのターゲットは初心者・カジュアル層
- **アパレルブランドの承認・禁止リストを厳守**（上記「ブランドガイドライン」参照）
- **自転車のフレーム形状・ロゴを正確に描写** — ユーザーから「全然違う」とフィードバックあり、詳細な特徴をプロンプトに入れること
- AI Studioのダウンロードボタンが効かない場合はJavaScriptの`a.download`方式で取得可能
