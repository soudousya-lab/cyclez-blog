import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  alternates: { canonical: "/first/rinko" },
  title: "輪行で広がるサイクリング",
  description: "輪行袋を使えば電車やバスで自転車を運べます。輪行の基本やおすすめルートをご紹介します。",
};

export default function RinkoPage() {
  const points = [
    {
      num: "01",
      title: "輪行の魅力",
      text: "岡山から電車に乗れば、しまなみ海道の入口・尾道まで約1時間半。瀬戸内の島々を渡るサイクリングも日帰りで楽しめます。他にも蒜山高原や吉備路など、輪行を使えば行動範囲が一気に広がります。帰りは電車に乗って帰ればいいので、片道だけ走るコース設計もできます。",
    },
    {
      num: "02",
      title: "輪行に必要なもの",
      text: "輪行に必要なのは「輪行袋」と、前後の車輪を外す工具だけ。慣れれば10分ほどでパッキングできるようになります。サイクルゼットでは輪行袋の選び方から、車輪の外し方・パッキングの手順まで、実際にお見せしながらていねいにご説明しています。",
    },
    {
      num: "03",
      title: "輪行のマナー",
      text: "公共交通機関を利用するため、周りの方への配慮が大切です。混雑する時間帯を避ける、車両の端に置く、汚れが付かないようにカバーを使うなど、基本的なマナーを守って気持ちよく輪行を楽しみましょう。詳しくはサイクルゼットのスタッフにお気軽にお尋ねください。",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="輪行で広がるサイクリング"
        subtitle="RINKO - TRAVEL WITH YOUR BIKE"
        breadcrumbs={[
          { label: "初めての方へ", href: "/first" },
          { label: "輪行で広がるサイクリング" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            「輪行（りんこう）」とは、自転車を専用の袋に入れて電車やバスなどの公共交通機関で運ぶこと。輪行ができると、自宅から遠く離れた場所でもサイクリングを楽しむことができます。
          </p>
          <div className="bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-5">
            <p className="text-gray-800 font-medium leading-relaxed">
              「輪行って難しそう…」と思われるかもしれませんが、一度やり方を覚えれば意外とカンタン。サイクルゼットではパッキングの練習もお手伝いしています。
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {points.map((point) => (
            <div key={point.num} className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-12 h-12 bg-[#c41e3a] text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {point.num}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{point.text}</p>
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
            輪行について相談する
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
