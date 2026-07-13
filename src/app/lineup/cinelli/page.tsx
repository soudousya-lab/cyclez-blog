import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "CINELLI（チネリ）取扱いモデル",
  description:
    "cycleZ（サイクルゼット・岡山）が取り扱うイタリア・ミラノの名門CINELLI（チネリ）の紹介。エアロレースのPressure、ロングライド向けPressure ADR、グラベルのKing Zydeco、街乗りクロモリのGazzettaまで。試乗・在庫のご相談は店頭で。",
};

const models = [
  {
    name: "Pressure II",
    category: "レーシング（エアロカーボン）",
    band: "50万円〜（フレームセット）",
    image: "/images/bikes/cinelli-pressure-ii.jpg",
    url: "https://cinelli-milano.com/collections/pressure",
    desc: "UCI承認のエアロレースカーボン。反応性の高いフレームで、レースやヒルクライムを本気で楽しみたい方に。",
  },
  {
    name: "Pressure ADR",
    category: "エンデュランス",
    band: "50万円〜",
    image: "/images/bikes/cinelli-pressure-adr.jpg",
    url: "https://cinelli-milano.com/collections/pressure-adr",
    desc: "「All Day Racing」を掲げる快適性重視のロングライド向けカーボンロード。速さと乗り心地を両立します。",
  },
  {
    name: "King Zydeco II",
    category: "グラベル",
    band: "50万円〜",
    image: "/images/bikes/cinelli-king-zydeco-ii.jpg",
    url: "https://cinelli-milano.com/collections/king-zydeco-ii",
    desc: "オールカーボンのグラベルバイク。舗装路も未舗装路も一台で。ツーリングやバイクパッキングにも向きます。",
  },
  {
    name: "Gazzetta della Strada",
    category: "街乗り（クロモリ・フラットバー）",
    band: "10〜25万円",
    image: "/images/bikes/cinelli-gazzetta.jpg",
    url: "https://cinelli-milano.com/collections/gazzetta-della-strada",
    desc: "クロモリ×フラットバーの街乗りツーリング。クラシックな佇まいで、通勤から週末の散策まで気軽に楽しめます。",
  },
];

export default function CinelliPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="CINELLI（チネリ）"
        subtitle="CINELLI"
        breadcrumbs={[{ label: "ラインナップ", href: "/lineup" }, { label: "CINELLI" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* ブランド紹介 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-[#c41e3a] font-bold text-xs sm:text-sm tracking-[0.2em] mb-2">MILANO, ITALY</p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">アートとレースが同居するミラノの名門</h2>
          <p className="text-gray-700 leading-relaxed">
            1948年創業、イタリア・ミラノ発のCINELLI（チネリ）。ハンドルやステムといったパーツで自転車文化を築き、今もアートとサイクリングを融合させた個性的なデザインで知られています。エアロレースのPressureから、クロモリの街乗りGazzettaまで、「人と被らない、けれど本物」を求める方にぴったりのブランドです。cycleZでは在庫・お取り寄せ・試乗のご相談を承っています。
          </p>
        </div>

        {/* モデル一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {models.map((m) => (
            <div key={m.name} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="relative w-full aspect-[3/2] bg-white flex items-center justify-center p-4">
                <Image
                  src={m.image}
                  alt={`CINELLI ${m.name}`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
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
