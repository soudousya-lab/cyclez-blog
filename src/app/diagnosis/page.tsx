import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import DiagnosisQuiz from "@/components/DiagnosisQuiz";

export const metadata: Metadata = {
  title: "あなたにぴったりの一台は？",
  description:
    "5つの質問に答えるだけで、あなたにぴったりのスポーツバイクのタイプがわかります。cycleZスタッフが厳選したおすすめブランドもご紹介。",
};

export default function DiagnosisPage() {
  return (
    <>
      <PageBanner
        title="あなたにぴったりの一台は？"
        subtitle="BIKE DIAGNOSIS"
        breadcrumbs={[{ label: "バイク診断" }]}
      />
      <DiagnosisQuiz />
    </>
  );
}
