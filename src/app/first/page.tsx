import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SearchIntentAnswer from "@/components/SearchIntentAnswer";

export const metadata: Metadata = {
  title: "初めての方へ | 初心者歓迎の岡山自転車屋",
  description: "岡山でロードバイク・クロスバイクを始めたい初心者の方へ。cycleZは試乗車を多数ご用意し、初心者講習会も定期開催。自転車選びからウェア、メンテナンスまで丁寧にサポートします。",
  keywords: ["初心者", "ロードバイク 初心者", "自転車 初心者 岡山", "クロスバイク 初心者", "試乗", "初心者講習会"],
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
    {
      num: "05",
      title: "続けられる仕組みがある",
      text: "ロードバイクで一番難しいのは「始めること」ではなく「続けること」だと、店をやっていてつくづく感じます。最初は週末ごとに乗っていたのに、いつの間にか月1回になり、気がつけば押し入れにしまったまま——これはサイクリストあるあるです。cycleZでは「続けられる仕組み」を用意することに力を入れています。初心者講習会、グループライド、貸切バスを使ったサイクリングツアーなど、一人だと行かない距離・行けない場所を、仲間と一緒に体験できる場を定期的に作っています。ペースが速い人もゆっくりな人も同じイベントで満足できる、年齢を重ねても気軽に参加できる。ロードバイクを買うことより、5年後・10年後もペダルを回している自分でいることのほうが、ずっと大事だと考えています。",
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

        <SearchIntentAnswer
          eyebrow="岡山でロードバイク初心者の相談先を探している方へ"
          title="最初の一台は、速さよりも「続けられるか」を基準に選ぶのがおすすめです。"
          answer="cycleZでは、予算・体格・走りたい場所・服装の好みを聞いたうえで、ロードバイク、クロスバイク、ミニベロ、ウェア、メンテナンスまでまとめて提案します。買って終わりではなく、初心者講習会やイベントで乗り続けるきっかけも作っています。"
          facts={[
            "10万〜25万円前後の初めての一台も相談可能",
            "試乗や店頭相談でサイズ感・乗り味を確認",
            "ウェアやヘルメットまでトータルで提案",
            "購入後のメンテナンス・イベント参加もサポート",
          ]}
          primaryLink={{ href: "/lineup", label: "取扱ブランドを見る" }}
          secondaryLink={{ href: "/contact", label: "初心者相談をする" }}
        />

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
