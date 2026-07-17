import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandInquiryCta } from "@/components/BrandInquiryCta";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/lineup/macchi" },
  title: "macchi cyclesを岡山で相談・オーダーするなら",
  description:
    "滋賀・信楽の工房で、乗り手とビルダーの対話から生まれるmacchi cycles。クロモリのしなり、オーダーフレームの魅力、cycleZスタッフが乗る実車を紹介します。",
  openGraph: {
    type: "website",
    url: "/lineup/macchi",
    title: "macchi cyclesを岡山で相談・オーダーするなら｜cycleZ",
    description:
      "乗り手の体と走り方を映す、信楽生まれのクロモリ。スタッフの実車を見ながら、まだ形のない一台について話せます。",
    images: [
      {
        url: "/images/blog/macchi-2026-06/staff-macchi-ride.jpg",
        width: 1600,
        height: 1067,
        alt: "cycleZスタッフが乗るmacchi cyclesのクロモリロードバイク",
      },
    ],
  },
};

const staffBikes = [
  {
    name: "岡田のmacchi",
    image: "/images/staff/okada-bike-macchi.jpg",
    alt: "赤いmacchi cyclesのオーダークロモリロードバイク",
  },
  {
    name: "仙田のmacchi",
    image: "/images/staff/senda-bike-macchi.jpg",
    alt: "cycleZ仙田が所有するmacchi cyclesのオーダーバイク",
  },
  {
    name: "西井のmacchi",
    image: "/images/staff/nishii-bike-macchi.jpg",
    alt: "青いmacchi cyclesのオーダークロモリロードバイク",
  },
];

const orderSteps = [
  {
    eyebrow: "TALK",
    title: "まだ名前のない一台から",
    text: "好きな道、いつか走りたい場所、今の自転車で感じていること。完成形を決める前に、乗り手の物語を聞かせてください。",
  },
  {
    eyebrow: "FIT",
    title: "体の声を、寸法にする",
    text: "手足の長さや柔軟性、長く乗ったときの疲れ方まで確かめます。数字を合わせるためではなく、自然に走れる姿を探すための採寸です。",
  },
  {
    eyebrow: "SHAPE",
    title: "鉄と色に、意思を宿す",
    text: "しなやかさ、反応、佇まい。パイプや色、組み合わせる部品を選びながら、その人らしい輪郭へ近づけていきます。",
  },
  {
    eyebrow: "RIDE",
    title: "完成してから、関係が始まる",
    text: "cycleZで組み上げ、最初の一走りへ。距離を重ねるほど体になじみ、傷や艶まで自分だけの一台になっていきます。",
  },
];

const faqItems = [
  {
    question: "オーダーフレームが初めてでも相談できますか？",
    answer:
      "はい。モデル名や細かな仕様を決めてくる必要はありません。今の自転車、走りたい距離、好み、予算から順番に整理します。",
  },
  {
    question: "店頭でmacchiの実車を見られますか？",
    answer:
      "スタッフ所有車を見ていただけます。ただしライドや業務で店頭にない日もあるため、遠方から来店される場合は事前にご確認ください。",
  },
  {
    question: "相談した日に決めないといけませんか？",
    answer:
      "いいえ。仕様や納期の目安を聞いて持ち帰り、比較してから決めていただけます。まず実物を見て話を聞くだけでも大丈夫です。",
  },
  {
    question: "県外からでも納車後の相談はできますか？",
    answer:
      "点検やポジション調整のタイミングも含めて納車時にご案内します。来店頻度を考えた現実的な付き合い方をご相談ください。",
  },
];

export default function MacchiPage() {
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
          src="/images/blog/macchi-2026-06/staff-macchi-ride.jpg"
          alt="ライド先に停めたcycleZスタッフのmacchi cycles"
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
            <span>macchi cycles</span>
          </nav>
          <p className="text-xs font-bold tracking-[0.2em] text-[#c41e3a]">HANDMADE IN SHIGA</p>
          <h1 className="jp-phrase-wrap mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            自分のための一台を、話しながらつくる。
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            macchi cyclesは、滋賀・信楽の工房で一本ずつつくられるクロモリフレームです。
            乗り手の体と、走りたい道と、つくり手の感覚。そのすべてが重なって、誰かのための一台になります。
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
            <Image
              src="/images/blog/macchi-2026-06/staff-macchi-shop.jpg"
              alt="cycleZに並ぶ仕様の異なる2台のmacchi cycles"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">SYMPATHY</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              乗り手と、同じ目線でつくられる。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              macchiが大切にする言葉は「sympathy」。ビルダー自身が乗り手であり、メカニックでもあるから、速さや用途だけでなく、どんな気持ちで自転車と付き合いたいかまで共有してつくります。
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              細いパイプが描く飽きのこない姿、壊れにくい安心感、体へやさしく返ってくる鉄のしなり。新しさを競うのではなく、長く乗るほど好きになれることがmacchiの魅力です。
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="一台が生まれるまで"
            subtitle="FROM TALK TO RIDE"
            description="オーダーは、完成車を選ぶ買い方とは少し違います。まだ形のない一台を、会話から少しずつ見つけていく時間です。"
          />
          <ol className="border-y border-gray-200 md:grid md:grid-cols-2">
            {orderSteps.map((step, index) => (
              <li
                key={step.eyebrow}
                className={`px-3 py-7 sm:px-7 ${index < 3 ? "border-b border-gray-200" : ""} ${index >= 2 ? "md:border-b-0" : ""} ${index % 2 === 0 ? "md:border-r md:border-gray-200" : ""}`}
              >
                <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">{step.eyebrow}</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gray-950 py-14 text-white sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.18em] text-[#e96a7f]">RIDDEN, NOT DISPLAYED</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              飾るためではなく、走るためにつくられた。
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              スタッフのmacchiは、色も仕様も走ってきた道もそれぞれです。完成直後の美しさだけでなく、乗り込んだクロモリがまとっていく表情まで見ていただけます。
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {staffBikes.map((bike) => (
              <figure key={bike.name}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                  <Image src={bike.image} alt={bike.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <figcaption className="mt-3 text-sm font-bold">{bike.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="border-l-4 border-[#c41e3a] pl-5 sm:pl-8">
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">THE CHARM OF STEEL</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              新しいのに、どこか懐かしい。乗るほど、景色になじんでいく。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              クロモリの細い線は、山の緑にも、古い町並みにも、不思議となじみます。塗装の色を選び、部品を組み、いつもの道へ連れ出すたびに、工房で生まれたフレームが自分の風景へ変わっていきます。
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              速い自転車はたくさんあります。けれど、ふと振り返って眺めたくなる一台、次の休日も一緒に出かけたくなる一台は多くありません。macchiは、そんな関係をつくるための自転車です。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-16 md:py-20">
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
        brand="macchi cycles"
        heading="まだ形のない一台の話を、始めませんか。"
        description="モデルや仕様を決めていなくても大丈夫です。好きな道、今の自転車で感じていること、思い描く色からお聞かせください。スタッフの実車を見たい方は、来店前に在店状況をご確認いただけます。"
      />

      <div className="border-t border-gray-100 py-8 text-center">
        <a href="http://www.macchicycles.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#c41e3a]">
          macchi cycles 公式サイトを見る <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
