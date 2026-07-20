import type { Metadata } from "next";
import { SelectionGateway } from "@/components/SelectionGateway";

export const metadata: Metadata = {
  alternates: { canonical: "/select" },
  title: "サイクルウェア・ヘルメット・シューズ・小物を実物から選ぶ",
  description:
    "サイクルウェア、シューズ、ヘルメット、アイウェアや小物まで。STEM DESIGN、rin project、ASSOS、Isadore、PEdALED、GIRO、831ソーイングなどを岡山のcycleZで実物から選べます。車体もあわせてご覧いただけます。",
  openGraph: {
    type: "website",
    url: "/select",
    title: "この店の棚は、文字にしきれない。｜cycleZ",
    description: "ウェア、シューズ、ヘルメット、アイウェア、バッグ、デニムまで。名前を並べても書ききれない品揃えを、岡山・島田本町のcycleZ店頭で。見るだけでもどうぞ。",
    images: [
      {
        url: "/images/cyclewear/cyclewear-hero.jpg",
        width: 2400,
        height: 1339,
        alt: "cycleZ店内に並ぶサイクルウェアとヘルメット",
      },
    ],
  },
};

export default function SelectPage() {
  return <SelectionGateway />;
}
