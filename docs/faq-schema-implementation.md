# FAQ構造化データ（FAQPage schema）実装案

## 目的
- タイヤ交換記事でリッチスニペット（FAQ表示）獲得
- SERP占有面積拡大によるCTR改善
- 「費用」「時期」「持ち込み」等の頻出質問に直接回答

---

## 対象記事

### 1. crossbike-tire-replacement-cost-2026.md
- URL: `/blog/crossbike-tire-replacement-cost-2026/`
- 狙うKW: クロスバイク タイヤ交換 値段、クロスバイク タイヤ交換 費用、工賃

### 2. tire-replacement-2022-7-15.md
- URL: `/blog/tire-replacement-2022-7-15/`
- 狙うKW: ロードバイク タイヤ交換 費用、ロードバイク タイヤ 選び方、おすすめ

---

## FAQ内容

### crossbike-tire-replacement-cost-2026.md のFAQ（Frontmatterに追加）

**現在**
```yaml
faq:
  - question: "クロスバイクのタイヤ交換は自分でできますか？"
    answer: "前輪は比較的簡単ですが、後輪は変速機があるため初心者には難しいです。工具を揃える費用を考えると、最初はショップに任せるのがおすすめです。"
  - question: "タイヤ交換にどのくらい時間がかかりますか？"
    answer: "作業時間は15〜30分です。店内でお待ちいただくか、近くでお買い物していただく程度の時間です。"
  - question: "クロスバイクのタイヤ交換時期の目安は？"
    answer: "距離なら3,000〜5,000km、期間なら1〜2年が目安です。通勤で毎日往復10km乗る方なら、1年〜1年半で交換時期が来ます。"
```

**追加すべきFAQ**
```yaml
  - question: "クロスバイクのタイヤ交換、前後2本でいくらかかりますか？"
    answer: "当店cycleZでは、工賃が前後2本で¥3,300、タイヤ本体が¥8,000〜¥16,000程度。合計で¥11,300〜¥19,300が目安です。ミドルグレードのタイヤなら¥15,000前後で収まります。"
  - question: "ネットで買ったタイヤの持ち込みは可能ですか？"
    answer: "はい、可能です。工賃は店頭購入と同じ1本¥1,650です。サイズ（700×28C等）が合っているか事前に確認してからご来店ください。"
```

**合計5問のFAQ**
1. 自分でできるか（DIY vs ショップ）
2. 作業時間（15〜30分）
3. 交換時期（3,000〜5,000km、1〜2年）
4. **前後2本の総額（¥11,300〜¥19,300）** ← 新規追加
5. **持ち込み可否（可能、工賃¥1,650）** ← 新規追加

---

### tire-replacement-2022-7-15.md のFAQ（新規追加）

**現在**
- FAQなし

**追加すべきFAQ**
```yaml
faq:
  - question: "ロードバイクのタイヤ交換時期の目安は？"
    answer: "距離で2,000km〜4,000km、または使用期間1年が目安です。紫外線によるゴムの劣化もあるため、距離を走っていなくても1年で交換を検討してください。"
  - question: "タイヤのグレードで走りは変わりますか？"
    answer: "大きく変わります。5,000円以上のミドルグレードにすると、転がり抵抗の低さや路面からの振動吸収が体感できます。タイヤは地面と唯一接するパーツなので、コスパの良いアップグレードです。"
  - question: "おすすめのロードバイク用タイヤは？"
    answer: "バランス重視ならヴィットリア ルビノプロ（¥5,995）、耐パンク性能ならコンチネンタル ゲータースキン（¥8,000）、軽さ重視ならパナレーサー アジリスト ライト（¥6,820）がおすすめです。"
  - question: "タイヤ交換の費用はどのくらいですか？"
    answer: "タイヤ本体が1本¥2,000〜¥8,000、工賃が1本¥1,650程度。前後2本交換なら、工賃込みで¥10,000〜¥20,000が目安です。"
```

**合計4問のFAQ**
1. 交換時期（2,000〜4,000km、1年）
2. グレードの違い（5,000円以上推奨）
3. おすすめタイヤ（ヴィットリア、コンチネンタル、パナレーサー）
4. 費用（¥10,000〜¥20,000）

---

## 構造化データの出力形式（JSON-LD）

### FAQPage schema の仕様

**Google推奨形式**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "クロスバイクのタイヤ交換は自分でできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "前輪は比較的簡単ですが、後輪は変速機があるため初心者には難しいです。工具を揃える費用を考えると、最初はショップに任せるのがおすすめです。"
      }
    },
    {
      "@type": "Question",
      "name": "タイヤ交換にどのくらい時間がかかりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "作業時間は15〜30分です。店内でお待ちいただくか、近くでお買い物していただく程度の時間です。"
      }
    }
  ]
}
```

### テンプレート側の実装（想定）

**pages/blog/[slug].astro または components/BlogPost.astro**

```astro
---
const { frontmatter } = Astro.props;
const faq = frontmatter.faq || [];
---

{faq.length > 0 && (
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  })} />
)}
```

**または、別コンポーネントとして切り出す場合**

```astro
// components/FAQSchema.astro
---
const { faq } = Astro.props;
if (!faq || faq.length === 0) return null;

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faq.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

**使用例（BlogPost.astro内）**

```astro
<FAQSchema faq={frontmatter.faq} />
```

---

## 実装手順

### Phase 1: Frontmatterに追加（優先度1）

1. **crossbike-tire-replacement-cost-2026.md**
   - 既存FAQに2問追加（前後2本の総額、持ち込み可否）
   - 合計5問に

2. **tire-replacement-2022-7-15.md**
   - 新規FAQセクション追加（4問）
   - Frontmatterに `faq:` フィールド追加

### Phase 2: テンプレート側の実装確認（優先度2）

**確認項目**
- `faq` フィールドがFrontmatterに存在する場合、自動的にJSON-LD出力されているか？
- されていない場合、FAQSchema コンポーネントを作成・組み込み

**確認方法**
1. ローカルで `npm run dev` 実行
2. `/blog/crossbike-tire-replacement-cost-2026/` にアクセス
3. ページソースを表示し、`<script type="application/ld+json">` タグ内に FAQPage が出力されているか確認
4. Google Rich Results Test で検証: https://search.google.com/test/rich-results

### Phase 3: デプロイ・検証（優先度3）

1. 変更をコミット・プッシュ
2. 本番環境デプロイ
3. Google Search Console でURL検査
4. 「ページのインデックス登録」→「公開URLをテスト」でFAQ構造化データが認識されているか確認
5. 2〜4週間後、SERPでFAQ表示が出現するか確認

---

## 注意点・ベストプラクティス

### Googleガイドライン準拠

**推奨**
- 質問は実際にユーザーが検索しそうなもの（検索ボリュームがあるKW）
- 回答は簡潔（200〜300文字程度）
- 記事本文と矛盾しない内容

**禁止**
- 広告目的の質問（「当店の割引クーポンは？」等）
- 不適切なコンテンツ（暴力、性的表現等）
- 質問と回答が一致しない

### FAQ数の最適化

**推奨数: 3〜6問**
- 少なすぎ（1〜2問）: リッチスニペット表示されにくい
- 多すぎ（10問以上）: ユーザーが読みにくい、スパム判定リスク
- 今回の設定: クロスバイク5問、ロードバイク4問（適切）

### 回答の具体性

**良い例**
```
Q: クロスバイクのタイヤ交換、前後2本でいくらかかりますか？
A: 当店cycleZでは、工賃が前後2本で¥3,300、タイヤ本体が¥8,000〜¥16,000程度。合計で¥11,300〜¥19,300が目安です。ミドルグレードのタイヤなら¥15,000前後で収まります。
```
→ 具体的な金額・店舗名・グレード別の目安あり

**悪い例**
```
Q: タイヤ交換はいくらですか？
A: 店舗やタイヤの種類によって異なります。詳しくはお問い合わせください。
```
→ 情報価値ゼロ、ユーザーの疑問を解決していない

---

## 効果測定

### KPI

1. **リッチスニペット表示率**
   - Google Search Console「検索パフォーマンス」→「検索での見え方」でFAQ表示回数を確認
   - 目標: 対象KWの検索結果でFAQ表示が50%以上

2. **CTR改善**
   - 実装前後で「クロスバイク タイヤ交換 値段」「ロードバイク タイヤ交換」のCTRを比較
   - 目標: CTR 0.16% → 2.0%以上

3. **順位変動**
   - FAQ追加によるコンテンツ充実でE-E-A-T評価向上
   - 目標: 対象KWで順位1〜3位上昇（現在の順位データ不明のため要確認）

### 測定タイミング

- **2週間後**: Google Search ConsoleでFAQ構造化データ認識を確認
- **1ヶ月後**: CTR・順位変動を初回測定
- **3ヶ月後**: 中長期的な効果測定（リッチスニペット表示の安定性）

---

## 他記事への展開

### FAQ追加候補記事（今後の施策）

1. **gravel-bike-beginner-guide-2026**
   - 「グラベルバイクとは」「ロードバイクとの違い」「岡山で買える店」等のFAQ

2. **casual-cycle-wear**（CTR 6.37%と好調）
   - 「サイクルウェア 初心者 何から」「通勤に使える」等のFAQ
   - さらなるCTR向上（6.37% → 8%以上）

3. **bicycle-repair-okayama**（下書き段階）
   - 「自転車修理 岡山 持ち込み」「他店購入車の修理可否」等のFAQ

---

## まとめ

### 実装優先順位

1. **即実行**: Frontmatterに追加（5分で完了）
2. **要確認**: テンプレート側のJSON-LD出力確認（30分〜1時間）
3. **デプロイ後**: Google Search Consoleで検証（2週間後）

### 期待される効果

- **リッチスニペット獲得**: SERP占有面積拡大、視認性向上
- **CTR改善**: 0.16% → 2.0%目標（12.5倍）
- **検索意図の明確化**: 質問形式でユーザーの疑問を先回りして解決

---

**作成日**: 2026-06-21
**目的**: タイヤ交換記事でFAQ構造化データ実装しリッチスニペット獲得
**関連KPI**: organic_sessions_daily, CTR改善
