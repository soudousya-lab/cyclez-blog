# cycleZ ブログプロジェクト 現状まとめ

**最終更新日**: 2026-01-31

---

## プロジェクト概要

- **店舗名**: cycleZ（サイクルゼット）
- **所在地**: 岡山県
- **業種**: ロードバイク専門店
- **メインサイト**: https://cycle-z.com
- **ブログURL**: https://cyclez-blog.vercel.app
- **GitHubリポジトリ**: https://github.com/soudousya-lab/cyclez-blog

---

## 技術スタック

- **フレームワーク**: Next.js 16.1.6
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ホスティング**: Vercel
- **コンテンツ**: Markdown（content/posts/配下）
- **ブランドカラー**: #c41e3a（赤）

---

## ディレクトリ構造

```
/Users/soudousya/cyclez-blog/
├── content/posts/          # 記事（Markdownファイル）
├── public/                 # 画像ファイル
│   ├── logo.png           # ロゴ画像
│   ├── beginner.jpg       # スライダー用
│   ├── woman.jpg          # スライダー用
│   ├── contact.jpg        # スライダー用・CTA背景
│   ├── recommend01.jpg
│   └── recommend06.jpg
├── src/
│   ├── app/
│   │   ├── page.tsx       # トップページ
│   │   └── posts/[slug]/page.tsx  # 記事詳細ページ
│   ├── components/
│   │   ├── Header.tsx     # ヘッダー（ロゴ・ナビ・SNSリンク）
│   │   ├── Footer.tsx     # フッター
│   │   ├── HeroSlider.tsx # 画像スライダー
│   │   └── PostCard.tsx   # 記事カード
│   └── lib/
│       └── posts.ts       # 記事取得ロジック
```

---

## SNSリンク

- **LINE**: https://page.line.me/vdn8858u
- **Instagram**: https://www.instagram.com/cyclez2015/
- **Facebook**: （未設定 - プレースホルダーのまま）

---

## 現在の記事一覧（8本）

| ファイル名 | タイトル | 日付 | カテゴリ |
|-----------|---------|------|----------|
| roadbike-beginner-guide.md | 【2026年版】岡山でロードバイクを始める初心者のための完全ガイド | 2026-01-31 | 初心者向け |
| okayama-cycling-course-kibiji.md | 【初心者OK】吉備路サイクリングコース完全ガイド | 2026-01-28 | コース紹介 |
| casual-cycle-wear.md | サイクルジャージはダサい？カジュアルサイクルウェアという新しい選択肢 | 2026-01-28 | アパレル |
| okayama-cycle-apparel-guide.md | 【岡山】サイクルアパレル完全ガイド｜cycleZ取扱ブランド紹介 | 2026-01-26 | アパレル |
| roadbike-maintenance-basic.md | 【保存版】ロードバイク基本メンテナンス | 2026-01-25 | メンテナンス |
| roadbike-cafe-outfit.md | ロードバイクでカフェに行く服装｜おしゃれコーデ例 | 2026-01-24 | アパレル |
| women-roadbike-start.md | 【女性必見】ロードバイクを始めたい女性へ | 2026-01-20 | 初心者向け |
| roadbike-price-guide-2026.md | 【2026年】ロードバイクの予算相場 | 2026-01-15 | 初心者向け |

---

## 取扱ブランド（自転車）

### 使用OK
- GIOS
- BASSO
- SCOTT
- BOMA
- BISYA
- DELOSA
- FELT
- CERVELO
- CINELLI
- LAPIERRE
- Wilier
- CYCLEHEART
- SURLY
- JAMIS
- Tyrell

### 電動バイク
- デイトナ

### 電動キックボード
- VERACITY
- デイトナ

### 禁止ブランド（絶対に記事に載せない）
- **SPECIALIZED**
- **COLNAGO**
- **TREK**
- **CANNONDALE**
- **BIANCHI**
- **GIANT**

---

## 取扱ブランド（アパレル）

### カジュアルライン
- STEMDESIGN（ステムデザイン）
- TOKYOWHEELS（トーキョーウィールズ）
- rin project（リンプロジェクト）
- ccp
- cycleZオリジナル

### プレミアムライン
- Isadore（イザドア）
- Assos（アソス）
- ALBA OPTICS（アルバオプティクス）
- beruf baggage（ベルーフバゲージ）
- GIRO（ジロ）

### 禁止ブランド（絶対に記事に載せない）
- **narifuri**
- **rapha**

---

## アパレルのコンセプト

> 自転車に適した素材、機能性を持ちながら、そのままカフェに入れるスタイル

- 店長が元アパレル業界出身
- レーシングジャージではなく、カジュアルサイクルウェアを推し
- 岡山で独自性のある品揃え

---

## 店舗に関する重要事項

1. **女性スタッフはいない**
   - 「女性スタッフによる接客」という記述は削除済み

2. **女性限定の講習会はやっていない**
   - 「女性向け講習会」「女性限定講習会」という記述は削除済み
   - ただし、女性のお客様を歓迎する姿勢は維持

3. **毎月の初心者講習会は開催している**（性別不問）

---

## 実装済みの機能

- [x] HeroSlider（beginner, woman, contact画像のスライダー）
- [x] ロゴ画像をヘッダーに配置
- [x] LINE・Instagramリンク
- [x] 記事一覧表示
- [x] 記事詳細ページ
- [x] カテゴリナビゲーション
- [x] サムネイル画像のサイズ調整（ロゴが見切れない対応）

---

## 最近の修正履歴

### 2026-01-31
1. **サムネイル画像サイズ調整**
   - PostCard.tsxで`object-cover`→`object-contain`に変更
   - ロゴ画像が見切れないように修正

2. **アパレルSEO記事3本追加**
   - casual-cycle-wear.md
   - okayama-cycle-apparel-guide.md
   - roadbike-cafe-outfit.md

3. **禁止ブランドの削除対応**
   - 自転車: SPECIALIZED, COLNAGO, TREK, CANNONDALE, BIANCHI, GIANT
   - アパレル: narifuri, rapha
   - 全記事をgrepで検索し、該当箇所を修正済み

4. **GitHubリポジトリ作成・連携**
   - https://github.com/soudousya-lab/cyclez-blog
   - Vercelにデプロイ完了

---

## 記事に使用しているモデル例（禁止ブランド削除後）

### 10〜15万円帯（人気モデル）
- GIOS SIERA（ジオス シエラ）
- BASSO IMOLA（バッソ イモーラ）
- FELT VR60（フェルト VR60）

### 小柄な方向け
- GIOS SIERA / FENICE（XXSサイズあり）
- BASSO IMOLA（450サイズ：157-162cm対応）
- Wilier（日本限定XXSサイズ展開あり）

---

## 今後の課題・TODO

- [ ] Facebookリンクの正式URL設定
- [ ] カテゴリページの実装（/category/xxx）
- [ ] 記事のサムネイル画像を個別に用意
- [ ] サイトマップ・SEO対策の強化
- [ ] Google Search Console連携

---

## コマンドメモ

```bash
# 開発サーバー起動
cd /Users/soudousya/cyclez-blog && npm run dev

# ビルド
npm run build

# Vercelデプロイ（本番）
npx vercel --prod

# 強制デプロイ（キャッシュクリア）
npx vercel --prod --force

# 禁止ブランドの検索
grep -ri "specialized\|colnago\|trek\|cannondale\|bianchi\|giant" content/posts/
grep -ri "narifuri\|rapha" content/posts/
```

---

## 連絡先・参考URL

- メインサイト: https://cycle-z.com
- ブログ: https://cyclez-blog.vercel.app
- GitHub: https://github.com/soudousya-lab/cyclez-blog
- LINE: https://page.line.me/vdn8858u
- Instagram: https://www.instagram.com/cyclez2015/
