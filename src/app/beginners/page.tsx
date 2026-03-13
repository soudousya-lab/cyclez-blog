import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "初心者向けメンテナンス方法",
  description:
    "スポーツバイクを安心して安全に楽しむための基本メンテナンス方法を動画でレクチャー。空気の入れ方、車体の掃除、チェーン洗浄について解説します。",
};

export default function BeginnersMaintenancePage() {
  const steps = [
    {
      num: "01",
      title: "空気の入れ方",
      text: "ほとんどのスポーツバイクが仏式バルブ方式になっています。（英語だとプレスタ・バルブ）空気圧の管理は1〜2週間に1回ぐらいを目安にやるようにしてください。また、ちょっとの空気圧の違いで乗り心地がかなり変わってくるのでお好みの空気圧を探してみてください！",
    },
    {
      num: "02",
      title: "車体の掃除",
      text: "スポーツバイクには泥除けが付いていないことが多いので自転車のフレーム等に「泥はね」や「チェーンの油汚れ」が付きやすくなっています。意外と簡単なのでスポーツバイクに乗った後は、なるべくこまめに掃除をするようにしましょう！",
    },
    {
      num: "03",
      title: "チェーン洗浄",
      text: "チェーンの汚れは放っておくとチェーンだけの劣化ではなくその他のギア周りのパーツも摩耗して劣化を早めてしまいます。普段おろそかになってしまいがちですが長く乗るためにはチェーンの洗浄は意外と重要なので定期的にやるようにしてください！",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-[#c41e3a] to-[#e85a70] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm mb-4 text-white/80">
            <Link href="/" className="hover:text-white">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span>初心者向けメンテナンス</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">
            初心者向けメンテナンス方法
          </h1>
          <p className="mt-2 text-white/90 text-sm">BEGINNERS MAINTENANCE</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* イントロ */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            スポーツバイクを安心して安全に楽しむためには普段からのメンテナンスがとても重要です。メンテナンスがちゃんと出来ていないと本来の性能を発揮することが出来ません。サイクルZが分かりやすくレクチャーさせていただきます！
          </p>
        </div>

        {/* ステップ */}
        {steps.map((step) => (
          <section key={step.num} className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 bg-[#c41e3a] text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step.num}
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{step.text}</p>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">
            メンテナンスについてわからないことがあれば、お気軽にご相談ください。
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
