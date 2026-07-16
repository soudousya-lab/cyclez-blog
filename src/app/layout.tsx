import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { SiteJsonLd } from "@/components/JsonLd";
import FloatingSns from "@/components/FloatingSns";
import FloatingCta from "@/components/FloatingCta";
import PostHogProvider from "@/components/PostHogProvider";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  // canonical と og:url を絶対URLに解決させるための基点。
  // canonical 自体はここに書かない（全ページが同じ値を継承してしまうため、各ページで指定する）
  metadataBase: new URL("https://cycle-z.com"),
  title: {
    default: "cycleZ | 岡山のロードバイク・自転車情報",
    template: "%s | cycleZ",
  },
  description:
    "岡山市のロードバイク専門店cycleZ。初心者向けの選び方ガイド、メンテナンス情報、岡山のサイクリングコース紹介など、自転車ライフを楽しむための情報を発信しています。",
  keywords: [
    "岡山",
    "ロードバイク",
    "初心者",
    "自転車",
    "自転車屋",
    "岡山 自転車屋",
    "サイクリング",
    "スポーツバイク",
    "クロスバイク",
    "初心者 自転車",
    "cycleZ",
    "女性",
    "ロードバイク 選び方",
    "自転車 メンテナンス 岡山",
  ],
  authors: [{ name: "cycleZ" }],
  // Meta domain認証（今後の広告配信用）
  other: {
    "facebook-domain-verification": process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION || "",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://cycle-z.com",
    siteName: "cycleZ",
    title: "cycleZ | 岡山のロードバイク・自転車情報",
    description:
      "岡山市のロードバイク専門店cycleZ。初心者向けガイド、メンテナンス情報、サイクリングコース紹介など。",
    images: [
      {
        url: "https://cycle-z.com/images/common/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "cycleZ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://cycle-z.com/images/common/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <SiteJsonLd />
      </head>
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <Analytics />
        <PostHogProvider />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <FloatingSns />
        <FloatingCta />
      </body>
    </html>
  );
}
