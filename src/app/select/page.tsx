import type { Metadata } from "next";
import { SelectionGateway } from "@/components/SelectionGateway";

export const metadata: Metadata = {
  alternates: { canonical: "/select" },
  title: "車体とサイクルウェアを実物から選ぶ",
  description:
    "ロードバイク、グラベル、e-BIKEとサイクルウェアを一つの店で。気になる車体と着たい一着から、cycleZのセレクトを見られます。",
  openGraph: {
    type: "website",
    url: "/select",
    title: "乗りたい。着てみたい。その気持ちから選ぶ。｜cycleZ",
    description: "車体も、ウェアも、画面の中だけで決めない。気になる方からcycleZのセレクトへ。",
    images: [
      {
        url: "/images/cyclewear/cyclewear-hero.jpg",
        width: 2400,
        height: 1339,
        alt: "cycleZ店内の車体とサイクルウェア",
      },
    ],
  },
};

export default function SelectPage() {
  return <SelectionGateway />;
}
