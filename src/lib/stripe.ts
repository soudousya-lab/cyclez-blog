import Stripe from 'stripe';

// サーバーサイド専用のStripeクライアント（遅延初期化）
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY が設定されていません');
  }
  _stripe = new Stripe(key);
  return _stripe;
}

// 後方互換用
export const stripe = null as unknown as Stripe;
