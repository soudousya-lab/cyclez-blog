// サマーキャンペーン特価車データ
// ── 運用メモ（店主向け）─────────────────────────────
// ・キャンペーンを終了する → active を false にするだけでLPからセクションが消えます。
// ・在庫が売れた車体   → その bike に soldOut: true を足すと「SOLD OUT」表示になり、
//                        クリックできなくなります（削除ではなく soldOut 推奨。実績が残る）。
// ・価格・割引率は listPrice / salePrice から自動計算されるので、定価と特価だけ直せばOK。
// ・元記事: content/posts/summer-sale-2026.md（/blog/summer-sale-2026）と数字を必ず一致させる。
// ───────────────────────────────────────────────

export type CampaignBike = {
  brand: string;
  model: string;
  size: string;
  listPrice: number; // 税込・メーカー希望小売価格
  salePrice: number; // 税込・特価
  image: string;
  alt: string;
  note?: string; // 例: フロントフォーク訳あり
  soldOut?: boolean; // 売り切れたら true
};

export const summerCampaign = {
  active: true, // 終了したら false
  eyebrow: "SUMMER CAMPAIGN",
  badge: "開催中",
  title: "気になった一台、今ならお得に。",
  lead: "診断で見えてきた一台を、この夏の特価で。対象車は定価から最大18万円超オフ＋お手持ちの自転車を最大3万円で下取りします。",
  note: "各モデル1台限り・サイズ固定。なくなり次第終了です。価格はすべて税込。",
  tradeInMax: 30000,
  articleSlug: "summer-sale-2026",
  // 価格の安い順（初めての一台にちょうどいい車体を先頭に）
  bikes: [
    {
      brand: "BASSO",
      model: "IMOLA",
      size: "51",
      listPrice: 173800,
      salePrice: 118000,
      image: "/images/blog/summer-sale-2026/basso-imola.jpg",
      alt: "BASSO IMOLA。ホワイトのアルミロードフレーム",
      note: "フロントフォーク訳あり",
      soldOut: true, // 2026-07-17 売約済み
    },
    {
      brand: "GIOS",
      model: "PANTO 105",
      size: "510",
      listPrice: 209000,
      salePrice: 128000,
      image: "/images/blog/summer-sale-2026/gios-panto.jpg",
      alt: "GIOS PANTO。鮮やかなジオスブルーの小径ロード",
    },
    {
      brand: "SCOTT",
      model: "SPEEDSTER 30",
      size: "S",
      listPrice: 203500,
      salePrice: 187000,
      image: "/images/blog/summer-sale-2026/scott-speedster30.jpg",
      alt: "SCOTT SPEEDSTER 30。バーガンディのディスクロード",
      soldOut: true, // 2026-07-12 売約済み
    },
    {
      brand: "BOMA",
      model: "D-OLA Ⅱ",
      size: "M",
      listPrice: 383100,
      salePrice: 284954,
      image: "/images/blog/summer-sale-2026/boma-d-ola2.jpg",
      alt: "BOMA D-OLA Ⅱ。ブロックタイヤのグラベル系フレーム",
    },
    {
      brand: "GIOS",
      model: "NATURE CARBON",
      size: "53",
      listPrice: 451000,
      salePrice: 305800,
      image: "/images/blog/summer-sale-2026/gios-nature-carbon.jpg",
      alt: "GIOS NATURE CARBON。ブラックのカーボンフレームにジオスブルーの差し色",
    },
    {
      brand: "BOMA",
      model: "ALLUMER disc",
      size: "S",
      listPrice: 468600,
      salePrice: 350000,
      image: "/images/blog/summer-sale-2026/boma-allumer-disc.jpg",
      alt: "BOMA ALLUMER disc。ティールグリーンのディスクロード",
    },
    {
      brand: "BOMA",
      model: "RASOR Ⅱ",
      size: "M",
      listPrice: 615300,
      salePrice: 428000,
      image: "/images/blog/summer-sale-2026/boma-rasor2.jpg",
      alt: "BOMA RASOR Ⅱ。マットブラックのカーボンレーシングロード",
    },
  ] as CampaignBike[],
};

export type SummerCampaign = typeof summerCampaign;
