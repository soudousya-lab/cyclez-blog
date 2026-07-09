import { Metadata } from "next";
import Link from "next/link";
import { getPostsByCategory } from "@/lib/posts";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "ラインナップ",
  description: "cycleZ（サイクルゼット）の取り扱いブランド一覧。GIOS、BASSO、SCOTT、Wilier、macchi cyclesなどのロードバイクから、STEM DESIGN、rin projectなどのサイクルアパレルまで。",
};

const bikebrands = [
  {
    name: "GIOS",
    country: "イタリア",
    url: "https://www.gios-apac.com/",
    description: "深いコバルトブルー「Gios Blue」で知られるイタリアの名門。クロモリスチールのクラシカルなフレームから、カーボンレーサーまで幅広いラインナップ。",
  },
  {
    name: "BASSO",
    country: "イタリア",
    url: "https://bassobikes.com/",
    description: "イタリア・ヴェネト州の老舗ブランド。エアロ形状のカーボンフレーム、内装ケーブルルーティングなど最新技術を取り入れた美しいバイクが揃います。",
  },
  {
    name: "SCOTT",
    country: "スイス",
    url: "https://www.scott-japan.com/",
    description: "超軽量フレーム「Addict RC」で知られるスイスブランド。インテグレーテッドコクピット、エアロダイナミクスに優れたハイパフォーマンスバイク。",
  },
  {
    name: "BOMA",
    country: "日本",
    url: "https://www.boma.jp/",
    description: "日本の国産カーボンフレームメーカー。日本人の体格に合わせた設計と丁寧なものづくりが魅力。レース志向からロングライドまで対応。",
  },
  {
    name: "BISYA",
    country: "日本",
    url: "https://bisya.jp/",
    description: "新潟・上越の老舗繊維問屋が手がけるフルカーボンロードバイクブランド「毘沙」。有名ブランドのOEM工場で生産された高品質カーボンフレームを、手の届きやすい価格で提供。",
  },
  {
    name: "De Rosa",
    country: "イタリア",
    url: "https://www.derosa.jp/",
    description: "1953年創業のイタリア名門。ハート型のヘッドバッジがアイコン。クロモリからカーボンまで、職人の技術が光るフレームづくり。",
  },
  {
    name: "FELT",
    country: "アメリカ",
    url: "https://www.riteway-jp.com/bicycle/felt/",
    description: "エアロロードからトライアスロンまで、高い技術力で知られるアメリカンブランド。コストパフォーマンスにも優れたラインナップ。",
  },
  {
    name: "CERVELO",
    country: "カナダ",
    url: "https://www.cervelo.com/",
    description: "エアロダイナミクスの先駆者。トライアスロンやタイムトライアルで圧倒的な実績を持つハイエンドブランド。",
  },
  {
    name: "CINELLI",
    country: "イタリア",
    url: "https://cinelli-milano.com/",
    description: "ミラノ発の老舗。アートとサイクリングを融合させた個性的なデザインが特徴。ピストからロードまで展開。",
  },
  {
    name: "LAPIERRE",
    country: "フランス",
    url: "https://www.lapierrebikes.com/",
    description: "フランス・ディジョンを拠点とする総合自転車メーカー。MTBからロードまで幅広く展開し、独自の技術でレースシーンでも活躍。",
  },
  {
    name: "Wilier",
    country: "イタリア",
    url: "https://wilier.jp/",
    description: "「Filante SLR」に代表されるエアロフラッグシップモデルが人気。マットブラック＋レッドアクセントの洗練されたデザイン。",
  },
  {
    name: "CYCLEHEART",
    country: "日本",
    url: "https://www.cycleheart.jp/",
    description: "日本の自転車ブランド。ユニークなコンセプトと確かな品質で、こだわりのあるサイクリストに支持されています。",
  },
  {
    name: "SURLY",
    country: "アメリカ",
    url: "https://surlybikes.com/",
    description: "スチールフレームにこだわるアメリカンブランド。ツーリング、グラベル、街乗りまで、冒険心をくすぐるタフなバイクが揃います。",
  },
  {
    name: "JAMIS",
    country: "アメリカ",
    url: "https://www.jamis-japan.com/",
    description: "アメリカ東海岸発のブランド。ロード、グラベル、MTBまで幅広いカテゴリーをカバー。快適性を重視した設計が特徴。",
  },
  {
    name: "Tyrell",
    country: "日本",
    url: "https://www.tyrellbike.com/",
    description: "讃岐発の折りたたみ自転車・ミニベロブランド。走行性能と携帯性を高次元で両立した美しい小径車。",
  },
  {
    name: "macchi cycles",
    country: "日本",
    url: "http://www.macchicycles.com/",
    description: "滋賀県信楽に工房を構えるビルダー植田真貴氏によるハンドメイドクロモリブランド。レースでも戦える「よく走るクロモリ」を追求したラグドフレームが特徴。体格や用途に合わせたフルオーダーに対応。",
  },
];

const apparelBrands = [
  {
    name: "STEM DESIGN",
    category: "カジュアル",
    url: "https://www.stem-design.net/",
    description: "普段着に見えるのにサイクリング機能付き。アースカラーのドライTシャツやペダリングパンツが人気。",
  },
  {
    name: "rin project",
    category: "カジュアル",
    url: "https://www.rinproject.com/",
    description: "インディゴ染めのサイクリングキャップやウールセーターなど、レトロ＆ナチュラルなスタイルが魅力。",
  },
  {
    name: "ccp",
    category: "カジュアル",
    url: "https://ccp.fm/",
    description: "カジュアルなサイクルウェアブランド。気軽に着られるデザインで、日常使いにも最適。",
  },
  {
    name: "Isadore",
    category: "プレミアム",
    url: "https://isadore.com/",
    description: "スロバキア発。メリノウール素材とアースカラーのタイムレスデザイン。サステナブルな素材選びも魅力。",
  },
  {
    name: "ASSOS",
    category: "プレミアム",
    url: "https://www.assos.com/",
    description: "スイスの最高峰サイクルウェア。EQUIPE RSラインに代表されるスリムフィットのテクニカルウェア。",
  },
  {
    name: "ALBA OPTICS",
    category: "プレミアム",
    url: "https://albaoptics.cc/",
    description: "イタリアのサイクリングアイウェアブランド。洗練されたデザインと高い機能性を兼ね備えたサングラス。",
  },
  {
    name: "beruf baggage",
    category: "プレミアム",
    url: "https://berufbaggage.com/",
    description: "日本のメッセンジャーバッグブランド。自転車通勤やライドに最適な機能的バッグを展開。",
  },
  {
    name: "GIRO",
    category: "プレミアム",
    url: "https://www.giro.com/",
    description: "アメリカの老舗ヘルメット＆シューズブランド。安全性とデザイン性を高次元で両立。",
  },
];

export default function LineupPage() {
  const lineupPosts = getPostsByCategory("lineup").slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="取り扱いブランド"
        subtitle="LINEUP"
        breadcrumbs={[{ label: "ラインナップ" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* 紹介文 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed">
            サイクルゼットでは、イタリア・スイス・日本を中心とした信頼のブランドを取り扱っています。初めての一台からレース用のハイエンドモデルまで、お客様のご要望に合わせてご提案いたします。ウェアやアクセサリーも充実していますので、ぜひ店頭でご覧ください。
          </p>
        </div>

        {/* ロードバイクブランド */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            ロードバイク・フレーム
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bikebrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 rounded-xl p-5 hover:border-[#c41e3a]/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#c41e3a] transition-colors">{brand.name}</h3>
                  <span className="text-xs text-gray-500">/ {brand.country}</span>
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c41e3a] transition-colors ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{brand.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* サイクルアパレル */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            サイクルアパレル・アクセサリー
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apparelBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 rounded-xl p-5 hover:border-[#c41e3a]/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#c41e3a] transition-colors">{brand.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    brand.category === "プレミアム"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {brand.category}
                  </span>
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c41e3a] transition-colors ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{brand.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* ラインナップ記事 */}
        {lineupPosts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
              ラインナップ関連記事
            </h2>
            <div className="space-y-0">
              {lineupPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-3 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded"
                >
                  <span className="text-gray-400 text-sm flex-shrink-0 w-24">{post.date}</span>
                  <span className="text-gray-800 text-sm truncate">{post.title}</span>
                  <svg className="w-3 h-3 text-gray-400 flex-shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/category/lineup"
                className="inline-flex items-center gap-2 text-[#c41e3a] text-sm font-medium hover:underline"
              >
                すべてのラインナップ記事を見る
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* 次の一歩 CTA — 迷ったら診断、決まってたら来店相談 */}
        <div className="mt-8 bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-6">
          <p className="font-bold text-gray-900 mb-2">どれを選べばいいか迷ったら</p>
          <p className="text-gray-600 text-sm mb-4">
            使い方と予算を5問答えるだけで、あなたに合う1台のタイプがわかります。気になるブランドの在庫・お取り寄せ・試乗も、お気軽にご相談ください。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-6 py-2.5 rounded-full hover:bg-[#a01830] transition-colors text-sm font-medium"
            >
              3分でバイク診断
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white border border-[#c41e3a] text-[#c41e3a] px-6 py-2.5 rounded-full hover:bg-[#c41e3a] hover:text-white transition-colors text-sm font-medium"
            >
              来店・お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
