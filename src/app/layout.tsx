import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: "cycleZ ブログ | 岡山のロードバイク・自転車情報",
    template: "%s | cycleZ ブログ",
  },
  description:
    "岡山市のロードバイク専門店cycleZのブログ。初心者向けの選び方ガイド、メンテナンス情報、岡山のサイクリングコース紹介など、自転車ライフを楽しむための情報を発信しています。",
  keywords: [
    "岡山",
    "ロードバイク",
    "初心者",
    "自転車",
    "サイクリング",
    "cycleZ",
    "女性",
    "ロードバイク 選び方",
  ],
  authors: [{ name: "cycleZ" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://blog.cycle-z.com",
    siteName: "cycleZ ブログ",
    title: "cycleZ ブログ | 岡山のロードバイク・自転車情報",
    description:
      "岡山市のロードバイク専門店cycleZのブログ。初心者向けガイド、メンテナンス情報、サイクリングコース紹介など。",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
