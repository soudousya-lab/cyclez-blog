// cycleZ 構造化データ（JSON-LD）
// LocalBusiness + WebSite + BreadcrumbList

// 店舗情報（共通定数）
const STORE_INFO = {
  name: "cycleZ（サイクルゼット）",
  url: "https://cycle-z.com",
  phone: "086-206-2346",
  email: "info@cycle-z.com",
  address: {
    streetAddress: "北区田中624-1",
    addressLocality: "岡山市",
    addressRegion: "岡山県",
    postalCode: "700-0951",
    addressCountry: "JP",
  },
  geo: {
    latitude: 34.6655,
    longitude: 133.9197,
  },
  openingHours: [
    "Tu-Sa 11:00-19:00",
    "Su 11:00-18:00",
  ],
  closedDays: "月曜日（祝日の場合は翌火曜日）",
  priceRange: "¥¥-¥¥¥",
  image: "https://cycle-z.com/images/common/og-image.jpg",
  logo: "https://cycle-z.com/images/logo/logo.png",
  socialLinks: [
    "https://www.instagram.com/cyclez_okayama/",
    "https://www.facebook.com/cyclez2015/",
    "https://www.youtube.com/@cyclez",
  ],
};

// LocalBusiness + WebSite JSON-LD（トップページ・全ページ共通）
export function SiteJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "BikeStore",
    "@id": `${STORE_INFO.url}/#localbusiness`,
    name: STORE_INFO.name,
    url: STORE_INFO.url,
    telephone: STORE_INFO.phone,
    email: STORE_INFO.email,
    image: STORE_INFO.image,
    logo: STORE_INFO.logo,
    address: {
      "@type": "PostalAddress",
      ...STORE_INFO.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_INFO.geo.latitude,
      longitude: STORE_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "11:00",
        closes: "18:00",
      },
    ],
    priceRange: STORE_INFO.priceRange,
    sameAs: STORE_INFO.socialLinks,
    description:
      "岡山市のロードバイク専門店cycleZ。SCOTT・GIOS・BASSOなどの正規取扱店。初心者向けの丁寧なカウンセリング接客、フィッティング、メンテナンスまで、自転車ライフをトータルサポートします。",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "サービス一覧",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "ロードバイク販売" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "メンテナンス・修理" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "フィッティング" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "サイクルウェア販売" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "初心者講習会" },
        },
      ],
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "駐車場あり", value: true },
      { "@type": "LocationFeatureSpecification", name: "試乗可能", value: true },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${STORE_INFO.url}/#website`,
    name: "cycleZ ブログ",
    url: STORE_INFO.url,
    description:
      "岡山市のロードバイク専門店cycleZのブログ。初心者向けの選び方ガイド、メンテナンス情報、岡山のサイクリングコース紹介など。",
    publisher: {
      "@id": `${STORE_INFO.url}/#localbusiness`,
    },
    inLanguage: "ja",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

// ブログ記事用 Article JSON-LD
export function ArticleJsonLd({
  title,
  description,
  slug,
  date,
  modifiedDate,
  image,
  category,
  wordCount,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  modifiedDate?: string;
  image?: string;
  category?: string;
  wordCount?: number;
}) {
  const articleUrl = `${STORE_INFO.url}/blog/${slug}`;
  const articleImage = image
    ? (image.startsWith("http") ? image : `${STORE_INFO.url}${image}`)
    : STORE_INFO.image;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: articleUrl,
    image: articleImage,
    datePublished: date,
    dateModified: modifiedDate || date,
    author: {
      "@type": "Organization",
      name: "cycleZ",
      url: STORE_INFO.url,
    },
    publisher: {
      "@type": "Organization",
      name: "cycleZ",
      logo: {
        "@type": "ImageObject",
        url: STORE_INFO.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    ...(category && { articleSection: category }),
    ...(wordCount && { wordCount }),
    inLanguage: "ja",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: STORE_INFO.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ブログ",
        item: `${STORE_INFO.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

// パンくずリスト JSON-LD（サブページ用）
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: STORE_INFO.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${STORE_INFO.url}${item.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
    />
  );
}
