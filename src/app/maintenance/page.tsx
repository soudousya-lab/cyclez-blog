import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "メンテナンス",
  description: "ロードバイクに長く快適に乗るためのメンテナンス情報。cycleZでは初心者の方にもていねいに説明しています。",
};

export default function MaintenancePage() {
  const sections = [
    {
      num: "01",
      title: "メンテナンスで、長く快適に走れます",
      text: "安心してロードバイクに乗るにはこまめなメンテナンスが大切。とはいえ初心者の方や、女性の中にはメンテナンスに苦手意識を持つ方は多いかもしれません。ロードバイクに親しむ方を増やしたいサイクルゼットでは、そういった方には特にていねいにメンテナンス手順など説明しています。",
    },
    {
      num: "02",
      title: "慣れてしまえば、案外カンタン",
      text: "ボルトのしめ直しや変速調整、チェーン調整、車輪の振れ…メンテナンスでチェックしたい項目は、書き出してみるとたくさんあるように感じますが、慣れると案外ささっと終わります。ロードバイクに乗る前の習慣にして、ずっと快適に走っていただけるとうれしいです。",
    },
    {
      num: "03",
      title: "手入れするごとに、愛着のわく一台に",
      text: "日常的に気軽に乗れる自転車、そしてロードバイクは、時には事故の危険と隣り合わせの乗り物だということは忘れないでください。ペダルをこぐと変にガタガタするなど、何か気になることがあれば、できるだけすぐ確認、必要なら早めにサイクルゼットまでお持ちください。",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-[#c41e3a] to-[#e85a70] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white">ホーム</Link>
            <span>/</span>
            <span className="text-white">メンテナンス</span>
          </nav>
          <p className="text-white/80 text-sm mb-2">MAINTENANCE</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">メンテナンス</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed">
            ロードバイクに長く快適に乗るためには、なんといってもメンテナンスが大切です。何かわからないことがあったら何でも説明いたします。いつでもサイクルゼットまでお越しください。
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
