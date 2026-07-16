import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  alternates: { canonical: "/lineup/bisya" },
  title: "BISYA（毘沙）取扱いモデル",
  description:
    "cycleZ（サイクルゼット・岡山）が取り扱う国産カーボンブランドBISYA（毘沙）の紹介。新潟・上越の老舗繊維問屋が手がける、高品質フルカーボンを手の届く価格で。入門アルミのTAMON、カーボンの四号機・八号機まで。試乗・在庫のご相談は店頭で。",
};

const models = [
  {
    name: "TAMON（多聞）",
    category: "入門アルミロード",
    band: "〜10万円",
    image: "/images/bikes/bisya-tamon.jpg",
    url: "https://bisya.jp/",
    desc: "小柄な方や小中学生にも合わせやすい入門アルミロード。軽量で扱いやすく、初めての一台にちょうどいい価格帯です。",
  },
  {
    name: "四号機 BIS004",
    category: "入門カーボンロード",
    band: "10〜25万円",
    image: "/images/bikes/bisya-bis004.jpg",
    url: "https://bisya.jp/bis004",
    desc: "OEM工場で生産された高品質フルカーボンを手の届く価格で。長距離も快適にこなす、はじめてのカーボンに。",
  },
  {
    name: "八号機 BIS008",
    category: "カーボンロード",
    band: "10〜25万円",
    image: "/images/bikes/bisya-bis008.jpg",
    url: "https://bisya.jp/bis008",
    desc: "毘沙のカーボンロード。コストパフォーマンスに優れ、走りの気持ちよさをしっかり味わえる一台です。",
  },
];

export default function BisyaPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="BISYA（毘沙）"
        subtitle="BISYA"
        breadcrumbs={[{ label: "ラインナップ", href: "/lineup" }, { label: "BISYA" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* ブランド紹介 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-[#c41e3a] font-bold text-xs sm:text-sm tracking-[0.2em] mb-2">MADE IN JAPAN</p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">手の届くフルカーボン、新潟発の国産ブランド</h2>
          <p className="text-gray-700 leading-relaxed">
            新潟・上越の老舗繊維問屋が手がけるフルカーボンロードバイクブランド「毘沙（BISYA）」。有名ブランドのOEM工場で生産された高品質なカーボンフレームを、手の届きやすい価格で提供しています。「カーボンは高い」というイメージを覆す一台を探している方に。cycleZでは在庫・お取り寄せ・試乗のご相談を承っています。
          </p>
        </div>

        {/* モデル一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {models.map((m) => (
            <div key={m.name} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="relative w-full aspect-[3/2] bg-white flex items-center justify-center p-4">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={`BISYA ${m.name}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-300">
                    <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="6.5" cy="16.5" r="3.5" strokeWidth={1.5} />
                      <circle cx="17.5" cy="16.5" r="3.5" strokeWidth={1.5} />
                      <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M6.5 16.5l4-8h5l2 8M10.5 8.5h3" />
                    </svg>
                    <span className="mt-1 text-[11px] text-gray-400">写真準備中</span>
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-[#c41e3a] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {m.band}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] text-gray-500 font-bold">{m.category}</span>
                <h3 className="mt-0.5 text-lg font-bold text-gray-900">{m.name}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{m.desc}</p>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-[#c41e3a] font-medium hover:underline"
                >
                  メーカー公式で詳細を見る
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-6">
          <p className="font-bold text-gray-900 mb-2">気になるモデルは、店頭でご相談ください</p>
          <p className="text-gray-600 text-sm mb-4">
            サイズ選びや在庫・お取り寄せ、試乗のご相談を承っています。価格は仕様・時期により変わるため、最新は店頭または公式サイトでご確認ください。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-6 py-2.5 rounded-full hover:bg-[#a01830] transition-colors text-sm font-medium"
            >
              来店・お問い合わせ
            </Link>
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-2 bg-white border border-[#c41e3a] text-[#c41e3a] px-6 py-2.5 rounded-full hover:bg-[#c41e3a] hover:text-white transition-colors text-sm font-medium"
            >
              自分に合う一台を診断する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
