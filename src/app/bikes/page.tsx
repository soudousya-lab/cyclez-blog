import type { Metadata } from "next";
import { BikeSelectionLanding } from "@/components/BikeSelectionLanding";

export const metadata: Metadata = {
  alternates: { canonical: "/bikes" },
  title: "気になるロードバイク・e-BIKEを実物から選ぶ",
  description:
    "De Rosa、macchi cycles、BISYA、ORBEA、SURLY、MATE.BIKEを中心に、cycleZの全取扱ブランドをこれからの走り方から選ぶ車体セレクト。",
  openGraph: {
    type: "website",
    url: "/bikes",
    title: "気になる一台を、画面の外で。｜cycleZ",
    description: "De Rosa、macchi cycles、BISYA、ORBEA、SURLY、MATE.BIKEを中心に、全取扱ブランドを確認できます。",
    images: [
      {
        url: "/images/posts/derosa-wheel-2026-07/idol-white.jpg",
        width: 1600,
        height: 1000,
        alt: "De Rosa IDOLのロードバイク",
      },
    ],
  },
};

export default function BikesPage() {
  return <BikeSelectionLanding />;
}
