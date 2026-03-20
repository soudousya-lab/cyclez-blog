import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "カフェライドを楽しむ",
  description: "自転車×カフェの楽しみ方。岡山周辺のおすすめカフェライドスポットやルートをご紹介します。",
};

export default function CafeRidePage() {
  const points = [
    {
      num: "01",
      title: "カフェライドの魅力",
      text: "走ることだけが目的ではなく、途中の景色や目的地での一杯を楽しむのがカフェライドの醍醐味です。仲間と一緒に走ればおしゃべりも弾みますし、一人でのんびり走るのも格別。レース志向でなくても、自転車の楽しさを存分に味わえるスタイルです。",
    },
    {
      num: "02",
      title: "カフェライドに必要なもの",
      text: "特別な装備は必要ありません。鍵（カフェに停めている間の盗難防止）、小さめのサドルバッグやポーチ（財布・スマホ）、カジュアルなサイクルウエア（カフェでも浮かない）があれば十分です。サイクルゼットにはカフェライドにぴったりのカジュアルなウエアが揃っています。",
    },
    {
      num: "03",
      title: "cycleZのライドイベント",
      text: "サイクルゼットでは、カフェライドを含むさまざまなグループライドイベントを開催しています。初心者の方も大歓迎。自転車仲間を作りたい方、一人で走るのが不安な方は、ぜひイベントにご参加ください。",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="カフェライドを楽しむ"
        subtitle="CAFE RIDE"
        breadcrumbs={[
          { label: "初めての方へ", href: "/first" },
          { label: "カフェライドを楽しむ" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            目的地のカフェを決めて、自転車で走って、美味しいコーヒーやスイーツを楽しむ。「カフェライド」は自転車の楽しみ方の中でも特に人気のスタイルです。
          </p>
          <div className="bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-5">
            <p className="text-gray-800 font-medium leading-relaxed">
              「走った後のコーヒーが格別なんです」そんなお客様の声をよくいただきます。ロードバイクの楽しみ方は人それぞれ。自分だけのお気に入りコースを見つけてみませんか？
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

        <div className="mt-10 text-center flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/category/event"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium"
          >
            イベント情報を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
          >
            お問い合わせ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
