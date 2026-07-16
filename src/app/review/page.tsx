import { Metadata } from "next";
import ReviewGenerator from "@/components/ReviewGenerator";

export const metadata: Metadata = {
  alternates: { canonical: "/review" },
  title: "口コミを投稿する | cycleZ",
  description: "cycleZのGoogle口コミ投稿をお手伝いします。",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-4 text-center">
        <h1 className="text-lg font-bold text-gray-800">
          cycleZ の口コミを書く
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          かんたん3ステップで口コミが完成します
        </p>
      </div>
      <ReviewGenerator />
    </div>
  );
}
