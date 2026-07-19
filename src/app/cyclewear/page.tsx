import type { Metadata } from "next";
import { CyclewearLanding } from "@/components/CyclewearLanding";

export const metadata: Metadata = {
  alternates: { canonical: "/cyclewear" },
  title: "MATE.BIKEとサイクルウェアを実物で選ぶ",
  description:
    "岡山のcycleZでMATE.BIKEとサイクルウェアを実物から選ぶ。STEM DESIGN、rin project、ASSOS、Isadore、PEdALED、GIRO、831ソーイングなどを店頭で相談できます。",
  openGraph: {
    type: "website",
    url: "/cyclewear",
    title: "乗るものも、着るものも。自分らしく選ぶ。｜cycleZ",
    description:
      "MATE.BIKEから、街に馴染む服、走りを支える一着まで。画面では分からない質感を、cycleZで。",
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
