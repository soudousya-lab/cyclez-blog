// カテゴリのスラッグ→日本語名マッピング
export const CATEGORY_LABELS: Record<string, string> = {
  news: "お知らせ",
  event: "イベント",
  "event-report": "イベントレポート",
  "beginner-training": "初心者講習会",
  lineup: "ラインナップ",
  "maintenance-blog": "メンテナンス",
  voice: "お客様の声",
  movie: "動画",
  uncategorized: "未分類",
  other: "その他",
  // 手書き記事用（日本語スラッグ）
  "初心者向け": "初心者向け",
  "アパレル": "アパレル",
  "ミニベロ": "ミニベロ",
  "コース紹介": "コース紹介",
};

/**
 * カテゴリスラッグから日本語ラベルを取得
 */
export function getCategoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] || slug;
}
