import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "メンテナンス",
  description: "ロードバイクに長く快適に乗るためのメンテナンス情報。cycleZでは初心者の方にもていねいに説明しています。",
};

export default function MaintenancePage() {
  const items = [
    {
      num: "01",
      title: "スポーツバイクに乗る際に大切な事4選",
      text: "乗車前に知っておきたい4つの基本ポイント。安全・快適に走るための必須知識をまとめています。",
      videoId: "v3wJXLkxkv8",
    },
    {
      num: "02",
      title: "空気の入れ方",
      text: "スポーツバイク用の空気入れ（フロアポンプ）の使い方を解説。仏式バルブの操作方法や適正空気圧の確認方法がわかります。",
      videoId: "WH34uv4pmz8",
    },
    {
      num: "03",
      title: "車体の掃除",
      text: "フレームやホイールの汚れ落としの手順を紹介。定期的な掃除でパーツの寿命が大きく変わります。",
      videoId: "x0wjWOjEiFg",
    },
    {
      num: "04",
      title: "チェーン洗浄",
      text: "チェーンクリーナーと注油の手順を解説。駆動系のメンテナンスは走りの軽さに直結します。",
      videoId: "m7OpKWD9pOc",
    },
    {
      num: "05",
      title: "パンク修理（チューブ交換）",
      text: "ライド中のパンクに備えて覚えておきたいチューブ交換の手順。タイヤの外し方からチューブの入れ方まで、一連の流れを説明しています。",
      videoId: "nm2UgQIevew",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="メンテナンス"
        subtitle="MAINTENANCE"
        breadcrumbs={[{ label: "メンテナンス" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed">
            ロードバイクに長く快適に乗るためには、なんといってもメンテナンスが大切です。何かわからないことがあったら何でも説明いたします。いつでもサイクルゼットまでお越しください。
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.num} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* 動画 */}
              <div className="p-5 md:p-6 pb-0">
                <div className="aspect-video w-full rounded-xl overflow-hidden ring-1 ring-black/5">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              {/* 説明 */}
              <div className="p-5 md:p-6 pt-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 bg-[#c41e3a] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.num}
                  </span>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1">{item.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium"
          >
            メンテナンスの相談をする
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
