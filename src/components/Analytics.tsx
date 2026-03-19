"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useCallback, Suspense } from "react";

// GA4 測定ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";
// Microsoft Clarity トラッキングID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";
// Meta Pixel ID（今後配信開始時に設定）
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

// event_id生成（CAPI重複排除用）
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// ページ名マップ（GA4レポートで日本語名表示用）
const PAGE_NAME_MAP: Record<string, string> = {
  "/": "トップページ",
  "/about": "cycleZとは",
  "/about/greeting": "代表挨拶",
  "/first": "初めての方へ",
  "/first/beginner": "初心者講習会",
  "/beginners": "初心者向けメンテナンス",
  "/introduction": "初心者向け動画",
  "/maintenance": "メンテナンス",
  "/fitting": "フィッティング",
  "/faq": "よくある質問",
  "/access": "アクセスマップ",
  "/contact": "お問い合わせ",
  "/payment": "お支払方法",
  "/privacy": "個人情報保護方針",
  "/lineup": "ラインナップ",
  "/blog": "ブログ一覧",
};

// パスからページ名を取得
function getPageName(pathname: string): string {
  if (PAGE_NAME_MAP[pathname]) return PAGE_NAME_MAP[pathname];
  if (pathname.startsWith("/blog/")) return "ブログ記事";
  if (pathname.startsWith("/category/")) return "カテゴリ一覧";
  return pathname;
}

// =========================================
// GA4 イベント送信
// =========================================

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// =========================================
// Microsoft Clarity カスタムイベント連携
// =========================================

function clarityTag(key: string, value: string) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("set", key, value);
  }
}

function clarityEvent(eventName: string) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", eventName);
  }
}

// =========================================
// Meta Pixel イベント送信
// =========================================

export const trackMetaEvent = (eventName: string, params?: Record<string, unknown>) => {
  const eventId = generateEventId();
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params, { eventID: eventId });
  }
};

export const trackMetaCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  const eventId = generateEventId();
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, params, { eventID: eventId });
  }
};

// =========================================
// CTAクリック統一トラッキング
// =========================================

export const trackCTAClick = (
  ctaType: "phone" | "email" | "instagram" | "facebook" | "youtube" | "contact_form",
  pagePath: string,
  buttonLocation: string,
  buttonText?: string,
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "conversion",
      event_label: `${ctaType}_${getPageName(pagePath)}_${buttonLocation}`,
      cta_type: ctaType,
      page_path: pagePath,
      page_name: getPageName(pagePath),
      button_location: buttonLocation,
      button_text: (buttonText || "").slice(0, 100),
    });
  }
  clarityEvent(`cta_${ctaType}`);

  // Meta Pixel: Contact イベント（電話・メール）
  if (ctaType === "phone" || ctaType === "email" || ctaType === "contact_form") {
    trackMetaEvent("Contact", {
      content_name: `${ctaType}_click`,
      content_category: getPageName(pagePath),
    });
  }
};

// スクロール深度トラッキング
export const trackScrollDepth = (percent: number, pagePath: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll_depth", {
      event_category: "engagement",
      event_label: `${getPageName(pagePath)}_${percent}%`,
      percent: percent,
      page_path: pagePath,
      page_name: getPageName(pagePath),
    });
  }
  if (percent >= 75) {
    trackMetaCustomEvent(`ScrollDepth_${percent}`, {
      page_path: pagePath,
    });
  }
};

// ブログ記事の読了時間トラッキング
export const trackReadingTime = (pagePath: string, seconds: number, slug: string, maxScrollPercent: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "reading_time", {
      event_category: "engagement",
      event_label: `${slug}_${seconds}s`,
      page_path: pagePath,
      blog_slug: slug,
      reading_seconds: seconds,
      reading_minutes: Math.round(seconds / 60 * 10) / 10,
      max_scroll_percent: maxScrollPercent,
    });
  }
};

// SNSシェアクリック
export const trackShareClick = (platform: string, pagePath: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "share_click", {
      event_category: "engagement",
      event_label: `${platform}_${getPageName(pagePath)}`,
      share_platform: platform,
      page_path: pagePath,
    });
  }
  clarityEvent(`share_${platform}`);
};

// セクション表示トラッキング
export const trackSectionView = (sectionId: string, pagePath: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "section_view", {
      event_category: "engagement",
      event_label: `${getPageName(pagePath)}_${sectionId}`,
      section_id: sectionId,
      page_path: pagePath,
    });
  }
};

// =========================================
// User Properties（GA4 ユーザースコープ属性）
// =========================================

function setUserProperties() {
  if (typeof window === "undefined") return;

  // 初回接触情報の永続化
  const firstTouchKey = "cz_first_touch";
  if (!localStorage.getItem(firstTouchKey)) {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source") || document.referrer || "direct";
    const medium = params.get("utm_medium") || "none";
    const campaign = params.get("utm_campaign") || "none";
    localStorage.setItem(firstTouchKey, JSON.stringify({
      source, medium, campaign, timestamp: Date.now(),
    }));
  }

  // セッション数カウント
  const sessionKey = "cz_session_count";
  const lastSession = sessionStorage.getItem("cz_session_active");
  if (!lastSession) {
    const count = parseInt(localStorage.getItem(sessionKey) || "0") + 1;
    localStorage.setItem(sessionKey, String(count));
    sessionStorage.setItem("cz_session_active", "1");
  }

  // GA4 User Properties 送信
  const firstTouch = JSON.parse(localStorage.getItem(firstTouchKey) || "{}");
  const sessionCount = parseInt(localStorage.getItem(sessionKey) || "1");

  if (window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      user_properties: {
        first_touch_source: firstTouch.source || "unknown",
        first_touch_medium: firstTouch.medium || "unknown",
        first_touch_campaign: firstTouch.campaign || "unknown",
        user_type: sessionCount <= 1 ? "new" : "returning",
        session_count: sessionCount,
      },
    });
  }
}

// =========================================
// 自動トラッキングコンポーネント群
// =========================================

// ページビュートラッキング
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isInitialRender = useCallback(() => {
    if (typeof window === "undefined") return true;
    const key = "__cz_initial_pv_sent";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (!w[key]) {
      w[key] = true;
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    pageview(url);
    setUserProperties();

    // Clarity: ページ情報をタグ付け
    clarityTag("page_name", getPageName(pathname));

    // Meta Pixel PageView（SPA遷移時のみ）
    if (!isInitialRender()) {
      const pageViewEventId = generateEventId();
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PageView", {}, { eventID: pageViewEventId });
      }
    }
  }, [pathname, searchParams, isInitialRender]);

  return null;
}

// 自動リンククリックトラッキング
function LinkClickTracker() {
  const pathname = usePathname();

  const handleClick = useCallback((e: MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";
    const text = (anchor.textContent || "").trim();
    const section = anchor.closest("section");
    const sectionId = section?.id || "";
    const location = sectionId
      || (anchor.closest("nav") ? "nav" : "")
      || (anchor.closest("footer") ? "footer" : "")
      || "body";

    // 電話リンク
    if (href.startsWith("tel:")) {
      trackCTAClick("phone", pathname, location, text);
    }
    // メールリンク
    else if (href.startsWith("mailto:")) {
      trackCTAClick("email", pathname, location, text);
    }
    // Instagram
    else if (href.includes("instagram.com")) {
      trackCTAClick("instagram", pathname, location, text);
    }
    // Facebook
    else if (href.includes("facebook.com")) {
      trackCTAClick("facebook", pathname, location, text);
    }
    // YouTube
    else if (href.includes("youtube.com") || href.includes("youtu.be")) {
      trackCTAClick("youtube", pathname, location, text);
    }
    // お問い合わせページへの遷移
    else if (href === "/contact") {
      trackCTAClick("contact_form", pathname, location, text);
    }
    // 内部ナビゲーション
    else if (href.startsWith("/") && !href.startsWith("//")) {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "navigation_click", {
          event_category: "navigation",
          event_label: `${getPageName(pathname)} → ${getPageName(href.split("?")[0].split("#")[0])}`,
          from_page: pathname,
          to_page: href.split("?")[0].split("#")[0],
          click_text: text.slice(0, 100),
          click_location: location,
        });
      }
    }
    // SNSシェア（Twitter/LINE）
    else if (href.includes("twitter.com/intent") || href.includes("x.com/intent")) {
      trackShareClick("twitter", pathname);
    }
    else if (href.includes("line.me/R/msg")) {
      trackShareClick("line", pathname);
    }
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  return null;
}

// セクション表示の自動トラッキング
function SectionViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const viewedSections = new Set<string>();
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (!viewedSections.has(id)) {
              viewedSections.add(id);
              trackSectionView(id, pathname);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

// スクロール深度の自動トラッキング
function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const tracked: Record<number, boolean> = { 25: false, 50: false, 75: false, 90: false };

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      for (const threshold of [25, 50, 75, 90]) {
        if (scrollPercent >= threshold && !tracked[threshold]) {
          tracked[threshold] = true;
          trackScrollDepth(threshold, pathname);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}

// ブログ記事の読了時間トラッキング（/blog/[slug] のみ発火）
function BlogReadingTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/blog/") || pathname === "/blog/") return;

    const slug = pathname.replace("/blog/", "");
    const startTime = Date.now();
    let maxScroll = 0;
    let sent30 = false;
    let sent60 = false;
    let sent180 = false;

    const handleScroll = () => {
      const percent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (percent > maxScroll) maxScroll = percent;
    };

    const interval = setInterval(() => {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      if (elapsed >= 30 && !sent30) {
        sent30 = true;
        trackReadingTime(pathname, 30, slug, maxScroll);
      }
      if (elapsed >= 60 && !sent60) {
        sent60 = true;
        trackReadingTime(pathname, 60, slug, maxScroll);
      }
      if (elapsed >= 180 && !sent180) {
        sent180 = true;
        trackReadingTime(pathname, 180, slug, maxScroll);
      }
    }, 5000);

    const handleBeforeUnload = () => {
      const totalSeconds = Math.round((Date.now() - startTime) / 1000);
      if (totalSeconds < 5) return;
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "reading_time_total", {
          event_category: "engagement",
          event_label: `${slug}_${totalSeconds}s`,
          page_path: pathname,
          blog_slug: slug,
          reading_seconds: totalSeconds,
          reading_minutes: Math.round(totalSeconds / 60 * 10) / 10,
          max_scroll_percent: maxScroll,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      const totalSeconds = Math.round((Date.now() - startTime) / 1000);
      if (totalSeconds >= 5) {
        trackReadingTime(pathname, totalSeconds, slug, maxScroll);
      }
    };
  }, [pathname]);

  return null;
}

// Meta Pixelスクリプトコンポーネント
function MetaPixelScript() {
  if (!META_PIXEL_ID) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          var _initEventId = '${Date.now()}-' + Math.random().toString(36).substring(2, 11);
          fbq('track', 'PageView', {}, {eventID: _initEventId});
        `,
      }}
    />
  );
}

// =========================================
// メインのAnalyticsコンポーネント
// =========================================

export default function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${CLARITY_ID}";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script");
            `,
          }}
        />
      )}

      {/* Meta Pixel（環境変数が設定されている場合のみ有効化） */}
      <Suspense fallback={null}>
        <MetaPixelScript />
      </Suspense>

      {/* ページビュートラッキング */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>

      {/* ユーザージャーニートラッキング */}
      <LinkClickTracker />
      <SectionViewTracker />
      <ScrollDepthTracker />
      <BlogReadingTracker />
    </>
  );
}

// TypeScript用のwindow拡張
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: Record<string, unknown>[];
    fbq: (
      command: "init" | "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
    clarity: (
      command: "set" | "event" | "identify",
      ...args: string[]
    ) => void;
  }
}
