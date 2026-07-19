"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useCallback, Suspense } from "react";
import { captureCtaClick as posthogCtaClick, captureFormSubmit as posthogFormSubmit } from "./PostHogProvider";

// GA4 測定ID
const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_ID || "").trim();
// Google Ads タグID（コンバージョン計測用）
const GOOGLE_ADS_TAG_ID = (process.env.NEXT_PUBLIC_GOOGLE_ADS_TAG_ID || "").trim();
// Google Ads コンバージョンラベル。Ads管理画面が自動生成する不透明な文字列で、
// 任意の名前（旧実装の "phone_call" 等）を書いても存在しないラベル扱いで黙って捨てられる。
// 2026-07-16に管理画面で CVアクション「Click-to-Call」を新規作成して発行された実値。
// 秘密情報ではなく送信先の識別子なので env 化しない（env漏れで再びサイレント失敗させないため）。
const ADS_CONVERSION_LABEL_PHONE = "D1z0CLvEr9EcEMKszZcD";
// Microsoft Clarity トラッキングID
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID || "").trim();
// Meta Pixel ID（今後配信開始時に設定）
const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();

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
  "/maintenance": "メンテナンス",
  "/fitting": "フィッティング",
  "/faq": "よくある質問",
  "/access": "アクセスマップ",
  "/contact": "お問い合わせ",
  "/privacy": "個人情報保護方針",
  "/lineup": "ラインナップ",
  "/lineup/bisya": "BISYAブランドガイド",
  "/lineup/macchi": "macchi cyclesブランドガイド",
  "/cyclewear": "サイクルウェアLP",
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
    const pageLocation = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_location: pageLocation,
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
// SNS流入トラッキング
// =========================================

const SOCIAL_SOURCES = [
  "instagram",
  "facebook",
  "threads",
  "line",
  "youtube",
  "x",
  "twitter",
  "messenger",
  "audience_network",
  "meta",
] as const;

const SOCIAL_SOURCE_ALIASES: Record<string, typeof SOCIAL_SOURCES[number]> = {
  fb: "facebook",
  ig: "instagram",
  th: "threads",
  msg: "messenger",
  an: "audience_network",
};

const SOCIAL_REFERRERS: Array<{ platform: string; host: string }> = [
  { platform: "instagram", host: "instagram.com" },
  { platform: "instagram", host: "l.instagram.com" },
  { platform: "facebook", host: "facebook.com" },
  { platform: "facebook", host: "l.facebook.com" },
  { platform: "facebook", host: "m.facebook.com" },
  { platform: "messenger", host: "messenger.com" },
  { platform: "messenger", host: "m.me" },
  { platform: "threads", host: "threads.net" },
  { platform: "line", host: "line.me" },
  { platform: "youtube", host: "youtube.com" },
  { platform: "youtube", host: "youtu.be" },
  { platform: "x", host: "x.com" },
  { platform: "twitter", host: "t.co" },
  { platform: "twitter", host: "twitter.com" },
];

type SocialLandingInfo = {
  platform: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  placement: string;
  referrer: string;
};

function normalizeSocialSource(source: string | null): string {
  const normalized = (source || "").toLowerCase().trim();
  const aliased = SOCIAL_SOURCE_ALIASES[normalized] || normalized;
  if (SOCIAL_SOURCES.includes(aliased as typeof SOCIAL_SOURCES[number])) {
    return aliased;
  }
  return "";
}

function getReferrerPlatform(referrer: string): string {
  if (!referrer) return "";

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    const match = SOCIAL_REFERRERS.find((item) => host === item.host || host.endsWith(`.${item.host}`));
    return match?.platform || "";
  } catch {
    return "";
  }
}

function getSocialLandingInfo(): SocialLandingInfo | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const rawUtmSource = params.get("utm_source");
  const utmSource = normalizeSocialSource(rawUtmSource);
  const utmMedium = (params.get("utm_medium") || "").toLowerCase();
  const referrerPlatform = getReferrerPlatform(document.referrer);
  const isSocialMedium = ["social", "paid_social", "organic_social"].includes(utmMedium);
  const platform = utmSource || referrerPlatform;

  if (!platform && !isSocialMedium) return null;

  return {
    platform: platform || "social",
    source: utmSource || rawUtmSource || platform || "unknown",
    medium: params.get("utm_medium") || (referrerPlatform ? "social_referral" : "social"),
    campaign: params.get("utm_campaign") || "none",
    content: params.get("utm_content") || "none",
    term: params.get("utm_term") || "none",
    placement: params.get("placement") || "none",
    referrer: document.referrer || "direct",
  };
}

function trackSocialLanding(info: SocialLandingInfo, pagePath: string, pageUrl: string) {
  const eventKey = [
    "cz_social_landing_sent",
    pagePath,
    info.source,
    info.medium,
    info.campaign,
    info.content,
    info.placement,
  ].join(":");

  if (sessionStorage.getItem(eventKey)) return;
  sessionStorage.setItem(eventKey, "1");
  sessionStorage.setItem("cz_last_social_touch", JSON.stringify({
    ...info,
    page_path: pagePath,
    page_location: pageUrl,
    timestamp: Date.now(),
  }));

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "social_landing", {
      event_category: "acquisition",
      event_label: `${info.platform}_${info.campaign}_${info.content}`,
      social_platform: info.platform,
      traffic_source: info.source,
      traffic_medium: info.medium,
      traffic_campaign: info.campaign,
      traffic_content: info.content,
      traffic_term: info.term,
      traffic_placement: info.placement,
      page_path: pagePath,
      page_location: pageUrl,
      referrer: info.referrer,
    });
  }

  clarityTag("traffic_source", info.source);
  clarityTag("traffic_medium", info.medium);
  clarityTag("traffic_campaign", info.campaign);
  clarityTag("traffic_content", info.content);
  clarityTag("traffic_placement", info.placement);
  clarityTag("social_platform", info.platform);
  clarityEvent("social_landing");
}

// =========================================
// Meta Pixel イベント送信
// =========================================

type MetaEventCommand = "track" | "trackCustom";

type PendingMetaEvent = {
  command: MetaEventCommand;
  eventName: string;
  params?: Record<string, unknown>;
  eventId: string;
};

const META_VIEW_CONTENT_MAP: Record<string, { name: string; id: string; category: string }> = {
  "/cyclewear": { name: "中四国サイクルウェアLP", id: "cyclewear", category: "cyclewear" },
  "/lineup/bisya": { name: "BISYAブランドガイド", id: "bisya", category: "road_bike_brand" },
  "/lineup/macchi": { name: "macchi cyclesブランドガイド", id: "macchi", category: "road_bike_brand" },
};

function dispatchMetaEvent(command: MetaEventCommand, eventName: string, params?: Record<string, unknown>) {
  if (!META_PIXEL_ID || typeof window === "undefined") return;

  const pendingEvent: PendingMetaEvent = {
    command,
    eventName,
    params,
    eventId: generateEventId(),
  };

  if (window.fbq) {
    window.fbq(command, eventName, params, { eventID: pendingEvent.eventId });
    return;
  }

  window.__czMetaEventQueue = window.__czMetaEventQueue || [];
  window.__czMetaEventQueue.push(pendingEvent);
}

export const trackMetaEvent = (eventName: string, params?: Record<string, unknown>) => {
  dispatchMetaEvent("track", eventName, params);
};

export const trackMetaCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  dispatchMetaEvent("trackCustom", eventName, params);
};

// =========================================
// CTAクリック統一トラッキング
// =========================================

// SNSへの外部遷移は来店リードではないため cta_click に混ぜない。
// これらは social_click として別イベントで計測する。
const SOCIAL_CTA_TYPES: readonly string[] = ["instagram", "facebook", "youtube"];

export const trackCTAClick = (
  ctaType: "phone" | "email" | "instagram" | "facebook" | "youtube" | "contact_form",
  pagePath: string,
  buttonLocation: string,
  buttonText?: string,
) => {
  const isSocial = SOCIAL_CTA_TYPES.includes(ctaType);

  if (typeof window !== "undefined" && window.gtag) {
    // cta_click は電話・メール・お問い合わせのみ＝来店リードだけを表す。
    // SNS離脱を混ぜるとキーイベントとして意味を成さなくなるため social_click に振り分ける。
    window.gtag("event", isSocial ? "social_click" : "cta_click", {
      event_category: isSocial ? "engagement" : "conversion",
      event_label: `${ctaType}_${getPageName(pagePath)}_${buttonLocation}`,
      cta_type: ctaType,
      page_path: pagePath,
      page_name: getPageName(pagePath),
      button_location: buttonLocation,
      button_text: (buttonText || "").slice(0, 100),
    });
    // 電話タップは専用のクリーンなキーイベントも発火させる。
    // 「実来店リード＝電話」だけを分離してGA4キーイベント化→Adsにインポートできるようにする。
    if (ctaType === "phone") {
      window.gtag("event", "phone_call", {
        event_category: "conversion",
        event_label: `phone_${getPageName(pagePath)}_${buttonLocation}`,
        page_path: pagePath,
        page_name: getPageName(pagePath),
        button_location: buttonLocation,
      });
    }
  }
  clarityEvent(`cta_${ctaType}`);

  // Google Ads コンバージョンイベント（電話タップ = 実来店リード）
  // contact_form 側は、対応するCVアクションがAds側に存在せず /contact にフォームも無いため送らない。
  // 必要になったらAds管理画面でCVアクションを作り、発行されたラベルを定数に足すこと。
  if (typeof window !== "undefined" && window.gtag && GOOGLE_ADS_TAG_ID) {
    if (ctaType === "phone") {
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_TAG_ID}/${ADS_CONVERSION_LABEL_PHONE}`,
        value: 1,
        currency: "JPY",
      });
    }
  }

  // Meta Pixel: Contact イベント（電話・メール）
  if (ctaType === "phone" || ctaType === "email" || ctaType === "contact_form") {
    trackMetaEvent("Contact", {
      content_name: `${ctaType}_click`,
      content_category: getPageName(pagePath),
    });
  }

  // PostHog: cta_click イベント
  posthogCtaClick(ctaType, pagePath, buttonLocation, buttonText);
};

// フォーム送信トラッキング（GA4 + PostHog統合）
export const trackFormSubmit = (
  formType: "contact" | "event_registration" | "maintenance_reserve" | "diagnosis",
  pagePath: string,
  formData?: Record<string, unknown>,
) => {
  // GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submit", {
      event_category: "conversion",
      event_label: `${formType}_${getPageName(pagePath)}`,
      form_type: formType,
      page_path: pagePath,
      page_name: getPageName(pagePath),
    });
  }
  clarityEvent(`form_submit_${formType}`);

  // Meta Pixel
  if (formType === "contact") {
    trackMetaEvent("Lead", {
      content_name: "contact_form_submit",
      content_category: getPageName(pagePath),
    });
  }

  // PostHog: form_submit イベント
  posthogFormSubmit(formType, pagePath, formData);
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

    const socialLandingInfo = getSocialLandingInfo();
    if (socialLandingInfo) {
      trackSocialLanding(socialLandingInfo, url, window.location.href);
    }

    const metaContent = META_VIEW_CONTENT_MAP[pathname];
    if (metaContent) {
      trackMetaEvent("ViewContent", {
        content_name: metaContent.name,
        content_category: metaContent.category,
        content_ids: [metaContent.id],
        content_type: "product_group",
      });
    }

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

    // onClickで明示的にトラッキング済みの要素は、ここで拾うと二重計上になる
    if (anchor.dataset.ctaTracked) return;

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
          var _initEventId = Date.now() + '-' + Math.random().toString(36).substring(2, 11);
          fbq('track', 'PageView', {}, {eventID: _initEventId});
          var _pendingMetaEvents = window.__czMetaEventQueue || [];
          _pendingMetaEvents.forEach(function(item) {
            fbq(item.command, item.eventName, item.params || {}, {eventID: item.eventId});
          });
          window.__czMetaEventQueue = [];
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
                  page_path: window.location.pathname + window.location.search,
                  page_location: window.location.href,
                  send_page_view: true
                });
                ${GOOGLE_ADS_TAG_ID ? `gtag('config', '${GOOGLE_ADS_TAG_ID}');` : ''}
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
    __czMetaEventQueue?: PendingMetaEvent[];
    clarity: (
      command: "set" | "event" | "identify",
      ...args: string[]
    ) => void;
  }
}
