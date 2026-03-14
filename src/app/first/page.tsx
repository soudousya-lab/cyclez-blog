import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "初めての方へ",
  description: "ロードバイク初心者の方へ。cycleZでは初めての方を応援しています。気軽にロードバイクを楽しみましょう。",
};

export default function FirstPage() {
  const points = [
    {
      num: "01",
      title: "オシャレが楽しめる",
      text: "ここ数年、女性のライダーも増えてきており、大手のロードバイクメーカーがこぞって女性をターゲットとしたブランドを立ち上げ、女性向けアイテムを充実させてきています。また新進気鋭のブランドも国内外に出現しており、メンズ、レディース共にハイセンスなサイクルウエアやグッズも昔と比べてずっと増えました。自転車を始めたら、グッズ選びも楽しんでくださいね。",
    },
    {
      num: "02",
      title: "無理なく運動不足解消",
      text: "サイクリングは身体に優しいスポーツ。マイペースで無理なく続けられる有酸素運動として、日頃の運動不足も簡単に解消できます！スポーツに苦手意識がある方でも体力維持や健康管理ができますよ。さわやかな風を頬に受けながら街や緑の中を駆け抜ける爽快感で、スポーツ嫌いな方でも続けられるのがロードバイクです。",
    },
    {
      num: "03",
      title: "ダイエット、特に美脚効果が抜群！",
      text: "ロードバイクって実は全身運動。「二の腕」「腹筋・背筋」「おしり」「もも裏」の筋肉を少しずつ、バランスよく使います。軽めのギアで回転数を上げて走れば、美脚＆ヒップアップが可能です。ちなみに、競輪選手の太ももが太いのは、短距離を全速力で走るトレーニングを積むから。女性の方、決してロードバイクで足が太くなることはありませんので、ご心配なく！",
    },
    {
      num: "04",
      title: "友達が増える",
      text: "「ファンライド」と呼ばれるサイクリングイベントもすっかり定着し、移動手段としての自転車だけでなく、趣味として自転車に乗る方が増えています。サイクルZでも楽しいイベントを定期的に開催しています。アスリート志向の方だけでなく初心者の方も大勢参加してくださっています。ひとりで走るのも楽しいですが、大勢で走るのもまた楽しいものです。",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="初めての方へ"
        subtitle="MESSAGE FOR BEGINNERS"
        breadcrumbs={[{ label: "初めての方へ" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* イントロ */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            ロードバイクに乗ると言っても、流線型のいかついヘルメットやピタピタの黒いサイクルパンツを履く必要はありません。気軽にロードバイクに乗りたい方、大歓迎。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            天気の良い休日、ひょいとロードバイクにまたがり気ままにペダルをこいでみる…などという乗り方もとってもステキ。
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            本格的なライダー仕様のものから、気軽な街乗りにもOKなオシャレなロードバイク、ミニベロまで、いろいろ揃うサイクルゼットへ、ぜひどうぞ。
          </p>
          <div className="bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-5">
            <p className="text-gray-800 font-medium leading-relaxed">
              「間近でバイクをじっくり見てみたい」「ロードバイクって何がそんなに魅力なの？」「ロードバイクに興味はあるけど周りに詳しい人がいない」など、ロードバイク・スポーツ自転車が気になる方は、今すぐサイクルゼットへ！「ちょっと自転車見せて」という方も歓迎です。
            </p>
          </div>
        </div>

        {/* おすすめポイント */}
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6">
          <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
          初心者の方へおすすめのポイント
        </h2>

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

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium"
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
