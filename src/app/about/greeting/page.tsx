import { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "スタッフ挨拶",
  description: "cycleZスタッフからのメッセージ。自転車文化の普及を目指し、最大限の情熱を持って対応させていただいています。",
};

export default function GreetingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="スタッフ挨拶"
        subtitle="STAFF MESSAGE"
        breadcrumbs={[
          { label: "CycleZとは？", href: "/about" },
          { label: "スタッフ挨拶" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* スタッフ画像 */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image
              src="/images/staff/staff-main.jpg"
              alt="cycleZ スタッフ"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            自転車ライフを始めたくなった方、cycleZ（サイクルゼット）でお待ちしています。大事にしていること ・仲間 ・絆 ・出会い…サイクルゼットのスタッフからみなさまへ。
          </p>

          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            ロードバイク最大の魅力は、その爽快感
          </h2>
          <p className="text-gray-700 leading-relaxed mb-10">
            こんにちは！cycleZ（サイクルゼット）の岡田です。ロードバイクは、スポーツ自転車の中で最も高い巡航性能を誇ります。その、シティサイクル、いわゆるママチャリとは全く異なるスピード感、ペダルを踏む時の感触、そして風を切って走る爽快感といったら同じ自転車と言っても全く別物です。日ごろ溜まったストレスの解消になったり、リフレッシュ効果が得られたり。ロードバイクに乗ってペダルを回せば、人生までもが少し変わりはじめます。私たちは、自転車が人生をより良くする一つのツールであると信じています。自転車の持つ無限の可能性をもっとみなさまに知ってもらうため、自転車文化の普及を目指しています。ロードバイク専門店として、取扱う商品、ファッション性、メンテナンス、サービス、アフターフォローにいたるまで、全てのことにこだわりを持ち、最大限の情熱を持ってスタッフ一同対応させていただいています。
          </p>

          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            自転車には、人の価値観を変えてしまうほどの力が
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            「自転車」はひとりでも楽しめる趣味ですが、仲間がたくさんいればもっと楽しくなります。日々のモチベーションもアップしますし、休日に集まってサイクリングに出かけたり、いつでも情報交換ができます。そんな自転車仲間が増え、自分の属するコミュニティの輪が広がっていくにつれ、自転車がもっともっと楽しくなります。cycleZ（サイクルゼット）が目指すのは、「岡山で自転車を楽しみたい！」と思っている方がいつでも気軽に立ち寄れる場所。お客様に最適な自転車選びのお手伝いはもちろん、自転車を使った楽しい遊び方まで、ニーズに合わせ、親切ていねいにご案内させていただきます。いつでも気軽に、ご来店ください。
          </p>

          <div className="text-right text-gray-700 font-medium">
            <p>cycleZ（サイクルゼット）スタッフ一同</p>
          </div>
        </div>
      </div>
    </div>
  );
}
