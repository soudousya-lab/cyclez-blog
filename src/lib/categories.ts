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

// カテゴリごとの色設定（bg, text）
export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  news: { bg: "bg-red-100", text: "text-red-700" },
  event: { bg: "bg-blue-100", text: "text-blue-700" },
  "event-report": { bg: "bg-indigo-100", text: "text-indigo-700" },
  "beginner-training": { bg: "bg-green-100", text: "text-green-700" },
  lineup: { bg: "bg-amber-100", text: "text-amber-700" },
  "maintenance-blog": { bg: "bg-teal-100", text: "text-teal-700" },
  voice: { bg: "bg-pink-100", text: "text-pink-700" },
  movie: { bg: "bg-purple-100", text: "text-purple-700" },
  "初心者向け": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "アパレル": { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
  "ミニベロ": { bg: "bg-orange-100", text: "text-orange-700" },
  "コース紹介": { bg: "bg-cyan-100", text: "text-cyan-700" },
};

const DEFAULT_COLOR = { bg: "bg-gray-100", text: "text-gray-700" };

/**
 * カテゴリスラッグから色設定を取得
 */
export function getCategoryColor(slug: string): { bg: string; text: string } {
  return CATEGORY_COLORS[slug] || DEFAULT_COLOR;
}
