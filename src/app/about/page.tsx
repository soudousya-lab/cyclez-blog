import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "CycleZとは？",
  description: "岡山市のロードバイク専門店cycleZについて。入りやすくて何でも聞けるサイクルショップを目指しています。",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="CycleZとは？"
        subtitle="ABOUT CycleZ"
        breadcrumbs={[{ label: "CycleZとは？" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* イントロ */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            ロードバイク・スポーツ自転車と聞くとなにやら本格的な走りを目的とする自転車なんじゃないかと身構えてしまいませんか？
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            このごろ、ライフスタイルに合わせていろいろな乗り方を楽しむ方が増えているようです。
          </p>
          <p className="text-gray-700 leading-relaxed">
            cycleZは入りやすくて何でも聞けるサイクルショップを目指しています。これから始めてロードバイクに乗ってみようと思っている方、女性の方、学生さん、ロードバイク・スポーツ自転車のことをよく知らないという方、大歓迎です。
          </p>
        </div>

        {/* セクション */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
              ライフスタイルに合ったご提案
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ロードバイクを買ったからといって、レースなどに出場しなくっても大丈夫！どうか気軽に乗ってください。「ロードバイクに乗ってみたい」「オシャレな通勤用自転車が欲しい」「自転車でピクニックに出かけたい」「ダイエットをしたい」（効果あります！特に脚痩せ！）など、あなたのための1台がきっとあります。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
              サイクルゼットは全て試乗OK
            </h2>
            <p className="text-gray-700 leading-relaxed">
              「納得の1台」に巡り合い、できるだけ長く愛用していただくため、cycleZでは「試乗」をおすすめしています。店頭に並ぶ自転車はどれでも試乗OK。通勤や通学、健康維持、ダイエット、休日にのんびり走っているところなど、自転車を買ったらやりたいことをあれこれイメージしながら、お店の周りを走ってみてください。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
              ファッションにもこだわりを
            </h2>
            <p className="text-gray-700 leading-relaxed">
              おしゃれして、ロードバイクをもっと楽しく。cycleZは、着るだけでスピードアップしそうな本格的なウエアから、街の中で着ていても違和感のない、他にはないサイクルウエアや小物が並ぶ、オシャレなサイクルショップです。メンズだけでなくレディースもたくさん揃っています。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
              ロードバイクに乗る喜びを
            </h2>
            <p className="text-gray-700 leading-relaxed">
              風を切る爽快感、新しい体験やロードバイクに乗る喜びを多くの方に知っていただくために、cycleZでは定期的に「走行会」や「サイクルイベント」を開催しています。これらはcycleZでお買い上げではない自転車の方も参加していただけます。ぜひお友達を誘ってご参加ください。
            </p>
          </div>
        </div>

        {/* スタッフ挨拶リンク */}
        <div className="mt-10 text-center">
          <Link
            href="/about/greeting"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium"
          >
            スタッフ挨拶を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
