import type { Metadata } from "next";
import { CyclewearLanding } from "@/components/CyclewearLanding";

export const metadata: Metadata = {
  alternates: { canonical: "/cyclewear" },
  title: "サイクルウェアを実物で着比べて選ぶ",
  description:
    "岡山のcycleZでサイクルウェアを実物から選ぶ。STEM DESIGN、rin project、ASSOS、Isadore、PEdALED、GIRO、831ソーイングなどを店頭で試着・相談できます。",
  openGraph: {
    type: "website",
    url: "/cyclewear",
    title: "着るものを、自分らしく選ぶ。｜cycleZ",
    description:
      "街に馴染む服から、走りを支える一着、ヘルメットまで。画面では分からない質感を、cycleZで。",
    images: [
      {
        url: "/images/cyclewear/cyclewear-hero.jpg",
        width: 2400,
        height: 1339,
        alt: "cycleZ店内のサイクルウェア売場",
      },
    ],
  },
};

export default function CyclewearPage() {
  return <CyclewearLanding />;
}
