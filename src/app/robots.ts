import { MetadataRoute } from 'next';

// プレビュー（vercel deploy）は作業ツリーをそのまま上げるため、承認前の記事が載る。
// preview ドメインは noindex ヘッダが付かず robots.txt も本番と同じだと
// 未承認記事つきの複製サイトがクロール可能になる（重複コンテンツ・薄いページ判定のリスク）。
// 本番（VERCEL_ENV=production）以外は全面 Disallow にする。
const isProduction = process.env.VERCEL_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://cycle-z.com/sitemap.xml',
  };
}
