import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandInquiryCta } from "@/components/BrandInquiryCta";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/lineup/lapierre" },
  title: "LAPIERREを岡山で見て相談するなら",
  description:
    "LAPIERRE（ラピエール）を扱う岡山のcycleZ。スタッフ所有のXELIUS SLをはじめ、ロード・エンデュランス・グラベル・フラットバーの選び方と来店前の確認方法を紹介します。",
  openGraph: {
    type: "website",
    url: "/lineup/lapierre",
    title: "LAPIERREを岡山で見て相談するなら｜cycleZ",
    description:
      "スタッフが実際に乗るLAPIERRE。用途別の違いを整理して、実車・在庫・取り寄せを相談できます。",
    images: [
      {
        url: "/images/staff/nishii-bike-lapierre.jpg",
        width: 1567,
        height: 1044,
        alt: "cycleZスタッフが所有するLAPIERRE XELIUS SL ULTIMATE",
      },
    ],
  },
};

const models = [
  {
    name: "XELIUS SL",
    role: "RACE / CLIMB",
    image: "/images/bikes/lapierre-xelius-sl.jpg",
    description: "登りと加速の反応を重視したロード。レース志向だけでなく、軽快な走りが好きな方の候補です。",
    url: "https://azuma-1911.jp/lapierre/products/xelius-sl-5-0/",
  },
  {
    name: "SENSIUM",
    role: "ENDURANCE",
    image: "/images/bikes/lapierre-sensium.jpg",
    description: "ロングライドや初めてのロードに。速さだけでなく、長い時間を無理なく楽しむ方向で考えたい一台です。",
    url: "https://azuma-1911.jp/lapierre/products/sensium-2-0/",
  },
  {
    name: "CROSSHILL",
    role: "GRAVEL",
    image: "/images/bikes/lapierre-crosshill.jpg",
    description: "舗装路の先まで走りたい人へ。太めのタイヤと積載を生かし、旅や未舗装路まで用途を広げられます。",
    url: "https://azuma-1911.jp/lapierre/products/crosshill-3-0/",
  },
  {
    name: "SHAPER",
    role: "FITNESS / CITY",
    image: "/images/bikes/lapierre-shaper.jpg",
    description: "フラットバーで扱いやすく、街乗りからフィットネスまで。ロードの速さを日常に取り入れたい方に。",
    url: "https://azuma-1911.jp/lapierre/products/shaper-3-0-disc/",
  },
];

const faqItems = [
  {
    question: "LAPIERREの実車はいつでも見られますか？",
    answer:
      "スタッフ所有車はありますが、乗車中などで店頭にない場合があります。展示車・試乗車・在庫も時期で変わるため、遠方からお越しの際は事前確認をお願いします。",
  },
  {
    question: "モデルを決めずに相談しても大丈夫ですか？",
    answer:
      "はい。走る距離、路面、前傾姿勢への慣れ、予算からロード・エンデュランス・グラベルなどの方向を整理します。",
  },
  {
    question: "取り寄せの場合もサイズを相談できますか？",
    answer:
      "できます。メーカー表だけで決めず、体格や現在のポジションを確認して候補を絞ります。仕様と納期はその時点の国内在庫を確認してご案内します。",
  },
  {
    question: "県外から車で来店できますか？",
    answer:
      "土・日曜日は軽自動車を合わせて3台駐車可能です。駐車状況と希望モデルの在店状況を、出発前に電話で確認していただくと確実です。",
  },
];

export default function LapierrePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100 sm:aspect-[16/7]">
        <Image
          src="/images/staff/nishii-bike-lapierre.jpg"
          alt="cycleZスタッフが乗っているLAPIERRE XELIUS SL ULTIMATE"
          fill
          priority
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <section className="border-b border-gray-100 py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <nav aria-label="パンくず" className="mb-5 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#c41e3a]">ホーム</Link>
            <span className="mx-2">/</span>
            <Link href="/lineup" className="hover:text-[#c41e3a]">ラインナップ</Link>
            <span className="mx-2">/</span>
            <span>LAPIERRE</span>
          </nav>
          <p className="text-xs font-bold tracking-[0.2em] text-[#c41e3a]">DIJON, FRANCE</p>
          <h1 className="jp-phrase-wrap mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            LAPIERREを、実車から考える。
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            カタログの軽さやスペックだけでは、自分に合うかは決まりません。
            cycleZでは、実際にLAPIERREへ乗るスタッフの経験も交え、用途と体格から一台を整理します。
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">STAFF OWNED</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              「売っている」だけでなく、スタッフが乗ってきたブランドです。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              スタッフ西井の愛車はXELIUS SL ULTIMATE。写真の一台を通して、フレームの造形、サイズ感、組み合わせるパーツ、実際の使い方まで話せます。
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              現行モデルと年式や仕様が異なる部分はありますが、ブランドを長く所有する人の目線は、初めてLAPIERREを検討する方にも役立つはずです。
            </p>
          </div>
          <div className="border-l border-gray-200 pl-5 sm:pl-8">
            <dl className="divide-y divide-gray-200 border-y border-gray-200">
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 text-sm">
                <dt className="font-bold text-gray-900">所有モデル</dt>
                <dd className="text-gray-600">XELIUS SL ULTIMATE</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 text-sm">
                <dt className="font-bold text-gray-900">相談できること</dt>
                <dd className="text-gray-600">用途・サイズ・仕様・取り寄せ</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 text-sm">
                <dt className="font-bold text-gray-900">遠方の方へ</dt>
                <dd className="text-gray-600">来店前に実車と在庫を電話確認</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-14 text-white sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-[#e96a7f]">FOUR DIRECTIONS</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              速さ、距離、未舗装路、日常。まず用途を決める。
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              取扱いや国内在庫は時期で変わります。ここでは、LAPIERREを検討するときの代表的な4方向を紹介します。
            </p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2">
            {models.map((model) => (
              <article key={model.name} className="bg-gray-950 p-5 sm:p-7">
                <div className="relative aspect-[3/2] overflow-hidden bg-black">
                  <Image src={model.image} alt={`LAPIERRE ${model.name}`} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <p className="mt-5 text-xs font-bold tracking-[0.16em] text-[#e96a7f]">{model.role}</p>
                <h3 className="mt-2 text-xl font-bold">{model.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{model.description}</p>
                <a href={model.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-bold text-white hover:text-[#e96a7f]">
                  正規取扱元で仕様を見る <span className="ml-2" aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="遠方から来る前に確認すること"
            subtitle="PLAN YOUR VISIT"
            description="四国・山陰・福山・西播磨から車で来られる場合、目的のモデルが見られる状態かを先に合わせておくと無駄がありません。"
          />
          <div className="grid border-y border-gray-200 md:grid-cols-3 md:divide-x md:divide-gray-200">
            {[
              { number: "01", title: "モデルとサイズ", text: "候補が曖昧でも、身長と走り方が分かれば確認できます。" },
              { number: "02", title: "実車・試乗の可否", text: "スタッフ車、展示車、試乗車は常設とは限りません。希望を事前にお知らせください。" },
              { number: "03", title: "国内在庫と納期", text: "取り寄せになる場合は、カラーやサイズごとの状況を来店前に確認します。" },
            ].map((item) => (
              <div key={item.number} className="border-b border-gray-200 px-4 py-7 last:border-b-0 md:border-b-0 md:px-8">
                <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">{item.number}</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeader title="よくある質問" subtitle="FAQ" />
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
                  <span>{item.question}</span>
                  <span className="text-xl font-normal text-[#c41e3a] transition-transform group-open:rotate-45" aria-hidden="true">＋</span>
                </summary>
                <p className="pt-4 text-sm leading-7 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BrandInquiryCta
        brand="LAPIERRE"
        heading="見たいモデルを決めきれなくても、ご相談ください。"
        description="走る距離、路面、予算、身長を伺い、候補と確認すべき実車・在庫を整理します。遠方の方は出発前の電話確認がおすすめです。"
      />

      <div className="border-t border-gray-100 py-8 text-center">
        <a href="https://www.lapierrebikes.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#c41e3a]">
          LAPIERRE 公式サイトを見る <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
