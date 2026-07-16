import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { FaqJsonLd } from "@/components/JsonLd";
import SearchIntentAnswer from "@/components/SearchIntentAnswer";

export const metadata: Metadata = {
  alternates: { canonical: "/maintenance" },
  title: "メンテナンス・自転車修理相談 | 岡山のロードバイク店",
  description: "岡山でロードバイク・クロスバイクのメンテナンスや修理相談ならcycleZへ。タイヤ交換、パンク、変速・ブレーキ調整など、初心者にもわかりやすく案内します。",
};

const maintenanceFaqs = [
  {
    question: "岡山でロードバイクやクロスバイクの修理を相談できますか？",
    answer:
      "cycleZではロードバイク・クロスバイクのメンテナンス相談を受け付けています。タイヤ交換、パンク、変速やブレーキの調整など、車種や状態を確認したうえで店頭で見積もります。",
  },
  {
    question: "他店や通販で購入した自転車も相談できますか？",
    answer:
      "他店で購入した自転車も承ります。部品規格や車体の状態によっては部品手配や預かりになる場合があるため、急ぎの場合は事前に電話で状況をお知らせください。",
  },
  {
    question: "タイヤ交換の費用はいくらですか？",
    answer:
      "タイヤ交換の工賃は1本1,650円からです。タイヤ本体・チューブ・リムテープなどの部品代は別途必要で、サイズや状態によって総額は変わります。",
  },
  {
    question: "予約なしでもメンテナンスできますか？",
    answer:
      "作業内容や混雑状況によって対応時間が変わるため、事前に予約フォームまたは電話で相談いただくとスムーズです。急なトラブルの場合はまずお電話ください。",
  },
];

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
      <FaqJsonLd faq={maintenanceFaqs} />
      <PageBanner
        title="メンテナンス"
        subtitle="MAINTENANCE"
        breadcrumbs={[{ label: "メンテナンス" }]}
      />

      <SearchIntentAnswer
        eyebrow="岡山で自転車修理・メンテナンスを探している方へ"
        title="ロードバイクやクロスバイクの不調は、症状を見ながら必要な作業だけを一緒に確認します。"
        answer="パンクやタイヤ交換、変速・ブレーキの違和感、乗る前の点検などは、状態によって原因も費用も変わります。cycleZでは初心者にもわかる言葉で説明し、店頭見積りのうえで作業内容を決めます。"
        facts={[
          "タイヤ交換工賃は1本1,650円から",
          "他店購入・通販購入のスポーツバイクも相談可能",
          "ブレーキ・変速・パンクは車体確認後に見積り",
          "急ぎの相談は086-252-7744へ電話が確実",
        ]}
        primaryLink={{ href: "/maintenance/reserve", label: "メンテナンスを予約する" }}
        secondaryLink={{ href: "/contact", label: "電話・問い合わせ先を見る" }}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed">
            ロードバイクに長く快適に乗るためには、なんといってもメンテナンスが大切です。何かわからないことがあったら何でも説明いたします。いつでもサイクルゼットまでお越しください。
          </p>
        </div>

        {/* 料金の目安 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">料金の目安</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-baseline justify-between border-b border-gray-100 pb-2">
              <span>タイヤ交換（工賃・1本）</span>
              <span className="font-bold text-[#c41e3a]">1,650円〜</span>
            </li>
            <li className="flex items-baseline justify-between border-b border-gray-100 pb-2">
              <span>パンク修理・変速やブレーキの調整</span>
              <span className="text-gray-500 text-sm">店頭でお見積り</span>
            </li>
          </ul>
          <p className="text-gray-500 text-sm mt-4">
            料金は車種・状態により異なります。詳しくは店頭またはお電話でお気軽にお問い合わせください。他店でご購入の自転車も承ります。
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">メンテナンス前によくある質問</h2>
          <div className="space-y-5">
            {maintenanceFaqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-bold text-gray-900 mb-2">Q. {faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">A. {faq.answer}</p>
              </div>
            ))}
          </div>
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

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/maintenance/reserve"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium w-full sm:w-auto justify-center"
          >
            メンテナンスを予約する
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#c41e3a] border-2 border-[#c41e3a] px-8 py-3 rounded-full hover:bg-[#c41e3a] hover:text-white transition-colors font-medium w-full sm:w-auto justify-center"
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
