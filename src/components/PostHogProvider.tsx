"use client";

import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

// PostHog設定
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

// =========================================
// PostHog初期化（シングルトン）
// =========================================

let posthogInitialized = false;

function initPostHog() {
  if (
    typeof window === "undefined" ||
    !POSTHOG_KEY ||
    posthogInitialized
  ) {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Next.js App Routerではhistory変更を手動でキャプチャ
    capture_pageview: false,
    capture_pageleave: true,
    // パフォーマンス: セッションリプレイは必要時のみ有効化
    disable_session_recording: false,
    // プライバシー: IPからの位置情報は使用しない
    ip: false,
    // パフォーマンス最適化
    loaded: (ph) => {
      // 開発環境ではデバッグモード
      if (process.env.NODE_ENV === "development") {
        ph.debug();
      }
    },
    // Cookie設定（日本のプライバシー基準対応）
    persistence: "localStorage+cookie",
    // クロスサブドメイントラッキング
    cross_subdomain_cookie: true,
    // Autocapture有効（ボタンクリック等を自動取得）
    autocapture: true,
  });

  posthogInitialized = true;
}

// =========================================
// PostHogイベント送信ヘルパー
// =========================================

/**
 * PostHogカスタムイベント送信
 * Analytics.tsxから呼び出して、GA4と並行してPostHogにもイベントを送る
 */
export function capturePostHogEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !POSTHOG_KEY) return;
  posthog.capture(eventName, properties);
}

/**
 * PostHogユーザー識別（将来のCRM連携用）
 */
export function identifyPostHogUser(
  userId: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !POSTHOG_KEY) return;
  posthog.identify(userId, properties);
}

// =========================================
// CTA/フォーム専用イベント（CYCLEZ LP用）
// =========================================

/**
 * CTAクリックイベント（PostHog側）
 * GA4の trackCTAClick と並行して呼ぶ
 */
export function captureCtaClick(
  ctaType: "phone" | "email" | "instagram" | "facebook" | "youtube" | "contact_form" | "line",
  pagePath: string,
  buttonLocation: string,
  buttonText?: string
) {
  capturePostHogEvent("cta_click", {
    cta_type: ctaType,
    page_path: pagePath,
    button_location: buttonLocation,
    button_text: (buttonText || "").slice(0, 100),
    $current_url: typeof window !== "undefined" ? window.location.href : "",
  });
}

/**
 * フォーム送信イベント（PostHog側）
 * お問い合わせ・イベント申込・メンテナンス予約
 */
export function captureFormSubmit(
  formType: "contact" | "event_registration" | "maintenance_reserve" | "diagnosis",
  pagePath: string,
  formData?: Record<string, unknown>
) {
  capturePostHogEvent("form_submit", {
    form_type: formType,
    page_path: pagePath,
    $current_url: typeof window !== "undefined" ? window.location.href : "",
    ...formData,
  });
}

// =========================================
// ページビュートラッカー（App Router対応）
// =========================================

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    // PostHog初期化
    initPostHog();

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // 同一URLの重複送信を防止
    if (url === prevPathRef.current) return;
    prevPathRef.current = url;

    posthog.capture("$pageview", {
      $current_url: typeof window !== "undefined" ? `${window.location.origin}${url}` : url,
    });
  }, [pathname, searchParams]);

  return null;
}

// =========================================
// PostHogProviderコンポーネント
// =========================================

/**
 * PostHog Analytics Provider
 *
 * layout.tsx の <Analytics /> の隣に配置する。
 * 環境変数 NEXT_PUBLIC_POSTHOG_KEY が未設定なら何もレンダリングしない。
 *
 * ```tsx
 * // src/app/layout.tsx
 * <Analytics />
 * <PostHogProvider />
 * ```
 */
export default function PostHogProvider() {
  // キーが未設定なら完全スキップ
  if (!POSTHOG_KEY) return null;

  return (
    <Suspense fallback={null}>
      <PostHogPageViewTracker />
    </Suspense>
  );
}
