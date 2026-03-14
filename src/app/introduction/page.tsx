import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "初心者向け講習動画",
  description:
    "スポーツバイク初心者のための基本テクニック動画。自転車の乗り降り、乗車姿勢、手信号、ブレーキのかけ方、パンク修理を動画で解説します。",
};

export default function IntroductionPage() {
  const techniques = [
    {
      num: "01",
      title: "自転車の乗り降り",
      description: "動画15秒",
    },
    {
      num: "02",
      title: "乗車姿勢",
      description: "動画1分35秒",
    },
    {
      num: "03",
      title: "手信号",
      description: "動画2分07秒",
    },
    {
      num: "04",
      title: "ブレーキのかけ方",
      description: "動画3分21秒",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <PageBanner
        title="初心者向け講習動画"
        subtitle="INTRODUCTION"
        breadcrumbs={[{ label: "初心者向け講習動画" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* イントロ */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            スポーツバイクは少し練習すれば時速30キロぐらいで走れるようになります。長距離や高速で走行するスポーツバイクはきちんとした姿勢や知識がないと事故や大怪我につながる可能性もあります。
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            サイクルZではスポーツバイクで楽しく安全に快適なサイクルライフを送ってもらうために、知っておいてもらいたいテクニックをまとめました。これをおさえておけば初心者でもすぐにスポーツバイクを楽しむことができます！
          </p>
        </div>

        {/* 基本テクニック4選 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-[#c41e3a] rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">
              スポーツバイク初心者のための基本テクニック4選
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techniques.map((tech) => (
              <div
                key={tech.num}
                className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-10 h-10 bg-[#c41e3a] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {tech.num}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{tech.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* パンク修理 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-[#c41e3a] rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">パンク修理の仕方</h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-700 leading-relaxed">
              走行中にいつ起こるか分からないトラブルといえばパンクです。いざ起こってしまった時のために絶対に必要なスキルになってきます。自分でパンク修理ができるようになりましょう！
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">
            動画を見てもわからないことがあれば、店頭でスタッフが直接レクチャーします。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium"
          >
            お問い合わせ
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
