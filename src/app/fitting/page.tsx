import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "フィッティング",
  description: "ロードバイクのフィッティング（ポジション調整）について。自分の身体と乗り方にピッタリくるフィッティングで走りが変わります。",
};

export default function FittingPage() {
  const sections = [
    {
      num: "01",
      title: "フィッティングしていないバイクなんて…",
      text: "どんなに優れたロードバイク・スポーツ自転車でも、フレームのサイズやサドルの高さが自分の体に合っていなければただの宝の持ち腐れです。体に合ったロードバイクに乗ることは安全で快適なサイクルライフのためにはとっても大事なこと。一度、ご自分の身体にぴったりフィットしたロードバイク・自転車に乗ってみれば、一発でご理解いただけると思います。",
    },
    {
      num: "02",
      title: "自分の身体や乗り方に合ったポジションを",
      text: "実はバイクフィッティングに教科書的な正解はありません。乗る人の体型や体格、体力、手足の長さや柔軟性、また想定している乗り方などでフィッティングはさまざま。乗り降りを繰り返しますし、ひとりでするよりも自転車に詳しい信頼できる人と相談しながらフィッティングしていくのもいいかもしれません。",
    },
    {
      num: "03",
      title: "理想的なポジションへ",
      text: "乗る人の体型や体格、手足の長さや柔軟性や特徴に合わせて、またフィーリングや違和感がないかなどを確認しながら、理想的なポジションを探していきます。ポジション調整がロードバイクの楽しみと奥の深さの一つであるといっても過言ではありません。また、一度フィッティングすればずっとそのままということもありません。気になる箇所が出てきたら、再び調整していきましょう。",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="フィッティング"
        subtitle="FITTING"
        breadcrumbs={[{ label: "フィッティング" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed">
            ロードバイク・スポーツ自転車を買ったら、さっそくフィッティング（ポジションの調整）に取りかかりましょう。自分の身体と乗り方にピッタリくるフィッティングで、走りが劇的に変わります！
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.num} className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-12 h-12 bg-[#c41e3a] text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {section.num}
                </span>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.text}</p>
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
            フィッティングの相談をする
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
