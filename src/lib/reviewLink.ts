/**
 * Googleクチコミの投稿導線で使う定数。
 *
 * 短縮形 https://g.page/r/CYeP5Ys-lqSWEBM/review でも同じフォームに着地するが、
 * 短縮IDはGoogle側の都合で変わりうる。プレイスIDは店舗に固定で、印刷物のQRに
 * 焼き込むことも考えてこちらを正とする。
 * 2026-08-29に両方とも同じ writereview フォームへ解決することを実測で確認済み。
 * 取得元: オーナーでログインしたGoogle検索の自社パネル →「クチコミを増やす」。
 */
export const GOOGLE_PLACE_ID = "ChIJ8fx0C60HVDURh4_liz6WpJY";

/** クチコミ投稿フォーム。★も本文もGoogle側の画面で本人が入力する。 */
export const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

/**
 * 上記URLのQR。`node scripts/gen-review-qr.mjs` で再生成する。
 * 誤り訂正レベルはM（理由はスクリプト側のコメント参照）。
 */
export const GOOGLE_REVIEW_QR_PNG = "/images/review/google-review-qr.png";
export const GOOGLE_REVIEW_QR_SVG = "/images/review/google-review-qr.svg";
