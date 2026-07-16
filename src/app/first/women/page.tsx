import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  alternates: { canonical: "/first/women" },
  title: "女性のお客様へ",
  description: "女性でも気軽にロードバイクを楽しめる環境がcycleZにはあります。ウエア選びからフィッティングまで、女性目線でサポートします。",
};

export default function WomenPage() {
  const points = [
    {
      num: "01",
      title: "おしゃれなウエアが揃っています",
      text: "サイクルゼットのオーナーはアパレル出身。レディースのサイクルウエアや小物も豊富に取り揃えています。「ピタピタの黒いウエアはちょっと…」という方も、普段着感覚で着られるおしゃれなサイクルウエアがきっと見つかります。バイクのカラーに合わせたコーディネートのご提案もお任せください。",
    },
    {
      num: "02",
      title: "体格に合った一台をご提案します",
      text: "女性は男性に比べて手が小さく、体格も異なります。サイクルゼットでは体格やライディングスタイルに合わせたフレームサイズ選びやハンドル幅の調整など、快適に乗れるようフィッティングにも力を入れています。すべての自転車は試乗OKですので、まずは乗ってみてください。",
    },
    {
      num: "03",
      title: "初心者講習会もあります",
      text: "「乗り方がわからない」「一人で走るのは不安」という方も、定期開催の初心者講習会にぜひご参加ください。女性の参加者も多く、同じ趣味の仲間ができるきっかけにもなっています。楽しく安全にロードバイクに乗っていただくために、スタッフがイチからレクチャーいたします。",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="女性のお客様へ"
        subtitle="FOR WOMEN"
        breadcrumbs={[
          { label: "初めての方へ", href: "/first" },
          { label: "女性のお客様へ" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            「ロードバイクは男性の趣味」なんてことはありません。最近では女性のサイクリストがとても増えています。サイクルゼットにも女性のお客様がたくさんいらっしゃいます。
          </p>
          <div className="bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-5">
            <p className="text-gray-800 font-medium leading-relaxed">
              「おしゃれに自転車に乗りたい」「女性でも大丈夫？」「何を選べばいいかわからない」…そんな方こそ、サイクルゼットにお越しください。女性目線でのウエア選びや自転車選びをお手伝いいたします。
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
            お気軽にお問い合わせください
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
