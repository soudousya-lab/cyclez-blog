import { Metadata } from "next";

export const metadata: Metadata = {
  title: "おすすめサイクリングコース",
  description:
    "岡山周辺のおすすめサイクリングコースをインタラクティブマップで紹介。初心者向けの吉備路コースから上級者向けのしまなみ海道まで、レベルに合ったルートが見つかります。",
  keywords: [
    "岡山 サイクリングコース",
    "岡山 ロードバイク ルート",
    "吉備路 サイクリング",
    "旭川 サイクリングロード",
    "蒜山高原 ロードバイク",
    "しまなみ海道",
  ],
};

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
