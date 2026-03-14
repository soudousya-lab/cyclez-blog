import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "ロードバイク初心者の方からよくいただく質問をご紹介。価格、メーカー選び、パーツ、ヘルメットなどについて。",
};

export default function FaqPage() {
  const faqs = [
    {
      q: "ロードバイクって高そう",
      a: "確かにツールドフランスに出場するような一流選手は5〜60万、中には100万円を超えるロードバイクに乗っていますが、実は安いものは7万円台からあります。最初から高級な自転車に乗る必要は全くありませんが、初めての1台には10〜20万円程度のものをおススメします。というのも、このくらいの価格帯からどのメーカーのラインナップも豊富になり、フレーム素材や部品を選べるようになってくるからです。いかがでしょうか。",
    },
    {
      q: "どのメーカーがおススメですか？",
      a: "イタリア製、フランス製、アメリカ製、そして我らが日本製、さまざまな国でさまざまなロードバイクが製造されています。まずは直感でピンとくるデザインやメーカーを選び、「このバイクってどう？」とスタッフに声をかけてみてください。素材やパーツの特徴、スペックなど、はりきってご説明いたします。ただし、少し長くなったらごめんなさい。自転車について質問を受けるといつも、つい熱く語ってしまいます。",
    },
    {
      q: "パーツとかよくわかりません",
      a: "最初の1台にはリアが10段変速ほどで十分かもしれません。やはり、どんなパーツも良いものほど値段も高くなってきます。もちろんご予算が許す範囲内で、パーツを選んでいただきたいのですが、そもそもサイクルゼットで粗悪パーツは仕入れませんのでご安心ください。もちろん、パーツについてのご質問にも何でもお応えしています。",
    },
    {
      q: "ポジションの調整が難しそう",
      a: "ロードバイクに快適に乗ろうとすると、ポジションの調整（フィッティング）が重要になってきます。サドルの角度、ハンドルまでの距離、乗る人の身長や体力、乗り方、走る距離、パーツのサイズなども考えた上での調整なんてめんどくさく感じるかもしれませんが、調整がぴったりハマり自分の身体にしっくりきた時の快感は、サイコーです。",
    },
    {
      q: "ヘルメットは必要ですか？",
      a: "はい、必要です！サイクルゼットでは、ガチガチの流線型ヘルメットだけでなく街の中でかぶっても目立たないようなオシャレなヘルメットもいろいろ扱っています。ぜひ気に入ったヘルメットで安全に乗ってください。また、ロードバイクは意外と手も酷使します。ですからグローブもおススメです。常にハンドルを握る手のひらの保護、スリップ予防、ケガの予防、日焼け予防になります。",
    },
    {
      q: "メンテナンスが不安です",
      a: "自転車を長く快適に乗り続けるためには、やはり定期的なメンテナンスが欠かせません。サイクルゼットではアフターフォローもしっかり対応させていただいております。近くを通りかかった際は、ついでにぜひサイクルゼットにもお寄りください。タイヤの空気入れやボルトのしめ直し、車輪の揺れチェックなど、いつでも対応します。おうちでできる点検法などもていねいにご指導させていただきます。",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="よくある質問"
        subtitle="FAQ"
        breadcrumbs={[{ label: "よくある質問" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed">
            サイクルゼットに来店されるロードバイク初心者の方からお受けする質問をいくつかここにご紹介いたします。きっとみなさん同じような疑問や不安をお持ちだと思いますので、ぜひご一読ください。
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-[#c41e3a] text-white rounded-full flex items-center justify-center text-lg font-bold">
                    Q
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 pt-1">{faq.q}</h2>
                </div>
                <div className="flex items-start gap-4 ml-0 md:ml-14">
                  <span className="flex-shrink-0 w-10 h-10 bg-gray-100 text-[#c41e3a] rounded-full flex items-center justify-center text-lg font-bold">
                    A
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-1">{faq.a}</p>
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
            その他のご質問はお気軽に
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
