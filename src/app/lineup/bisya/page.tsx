import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandInquiryCta } from "@/components/BrandInquiryCta";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/lineup/bisya" },
  title: "BISYA（毘沙）を岡山で試乗・相談するなら",
  description:
    "BISYA（毘沙）を扱い、2023年から試乗会を重ねてきた岡山のcycleZ。TAMON・四号機・八号機の違い、向いている人、実車・試乗の確認方法を紹介します。",
  openGraph: {
    type: "website",
    url: "/lineup/bisya",
    title: "BISYA（毘沙）を岡山で試乗・相談するなら｜cycleZ",
    description:
      "価格だけでは分からないBISYAの違いを、試乗会を重ねてきたcycleZが紹介。来店前に実車・試乗の確認もできます。",
    images: [
      {
        url: "/images/bikes/bisya-bis004.jpg",
        width: 1200,
        height: 750,
        alt: "BISYA 四号機のカーボンロードバイク",
      },
    ],
  },
};

const models = [
  {
    name: "TAMON（多聞）",
    role: "小柄な方・ジュニア・初めての一台",
    image: "/images/bikes/bisya-tamon.jpg",
    url: "https://bisya.jp/",
    description:
      "小さいサイズの選択肢を探している方へ。値段だけで決めず、またがったときの姿勢、ブレーキ操作、足つきを確認したいモデルです。",
  },
  {
    name: "四号機 BIS004",
    role: "初めてのカーボンロード",
    image: "/images/bikes/bisya-bis004.jpg",
    url: "https://bisya.jp/bis004",
    description:
      "カーボンフレームを現実的な予算から検討したい方へ。完成車の仕様だけでなく、サイズと使い方を合わせて考えます。",
  },
  {
    name: "八号機 BIS008",
    role: "走りを一段上げたい方",
    image: "/images/bikes/bisya-bis008.jpg",
    url: "https://bisya.jp/bis008",
    description:
      "軽快さや反応をもう一段求める方向のカーボンロード。四号機との違いは、実際の用途と予算を並べて整理します。",
  },
];

const faqItems = [
  {
    question: "BISYAはいつでも試乗できますか？",
    answer:
      "常設とは限りません。cycleZでは試乗会を継続してきましたが、時期によって試乗できるモデルとサイズが変わります。来店前に電話でご確認ください。",
  },
  {
    question: "TAMONは子どもや小柄な人なら誰でも合いますか？",
    answer:
      "身長だけでなく、股下、腕の長さ、ブレーキへ指が届くかまで確認が必要です。実車がある場合は、またがって操作姿勢を確かめます。",
  },
  {
    question: "四号機と八号機の違いを相談できますか？",
    answer:
      "はい。乗る距離、速さの目標、現在の自転車、予算を伺い、フレームだけでなく完成車全体の仕様として比較します。",
  },
  {
    question: "県外から試乗会へ行っても大丈夫ですか？",
    answer:
      "もちろんです。希望モデルとおおよその身長、来店予定時刻を事前にお知らせいただくと、当日の案内がスムーズです。",
  },
];

export default function BisyaPage() {
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

      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#f5f5f3] sm:aspect-[16/7]">
        <Image
          src="/images/bikes/bisya-bis004.jpg"
          alt="BISYA 四号機のカーボンロードバイク"
          fill
          priority
          loading="eager"
          className="object-contain p-3 sm:p-8"
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
            <span>BISYA</span>
          </nav>
          <p className="text-xs font-bold tracking-[0.2em] text-[#c41e3a]">BISYA / 毘沙</p>
          <h1 className="jp-phrase-wrap mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            手が届く。その先を、試して決める。
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            BISYAは、新潟・上越から生まれたロードバイクブランドです。
            cycleZは2023年から試乗会を重ね、価格表だけでは分からないサイズ感と走りを確かめる機会をつくってきました。
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[1024/481] overflow-hidden border border-gray-100 bg-white">
            <Image
              src="/images/wp/2023-12-BISYA-1024x481.png"
              alt="BISYA Full Carbon Road Bike"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">WHY BISYA</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              「カーボンだから」だけで選ばない。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              BISYAの入口は、手の届きやすい価格であること。けれど、自転車はフレーム素材だけで良し悪しが決まるものではありません。
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              体に合うサイズか、普段走る距離に合うか、ブレーキや変速を無理なく扱えるか。cycleZでは、実車や試乗機会があるときこそ、その基本を一つずつ確認します。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="三つの入口から選ぶ"
            subtitle="MODEL GUIDE"
            description="価格や仕様は時期で変わります。まずは誰が、どんな走りに使うのかで候補を分けます。"
          />
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {models.map((model, index) => (
              <article key={model.name} className="grid items-center gap-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
                <div className={`relative aspect-[3/2] overflow-hidden bg-white ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image src={model.image} alt={`BISYA ${model.name}`} fill className="object-contain p-3" sizes="(max-width: 768px) 100vw, 45vw" />
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <p className="text-xs font-bold tracking-[0.16em] text-[#c41e3a]">{model.role}</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">{model.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-gray-600">{model.description}</p>
                  <a href={model.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-bold text-[#c41e3a] hover:underline">
                    メーカー情報を見る <span className="ml-2" aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-14 text-white sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#e96a7f]">TEST RIDE HISTORY</p>
              <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug sm:text-3xl">
                一度だけでなく、試せる機会を続けてきました。
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/70">
                展示だけでは分からないから、cycleZではBISYAの試乗会を継続して開催しています。
              </p>
            </div>
            <ol className="border-l border-white/20 pl-6 sm:pl-8">
              {[
                { year: "2023", text: "4月、BISYA試乗会を開催", href: "" },
                { year: "2024", text: "4月、BISYA試乗会を開催", href: "/blog/event202404_02" },
                { year: "2025", text: "6月、TAMONを含む歴代モデル試乗会を開催", href: "/blog/cyclez_event_202505" },
              ].map((event) => (
                <li key={event.year} className="relative pb-7 last:pb-0">
                  <span className="absolute -left-[1.9rem] top-1 h-2.5 w-2.5 rounded-full bg-[#e96a7f] sm:-left-[2.35rem]" />
                  <p className="text-xs font-bold tracking-[0.16em] text-[#e96a7f]">{event.year}</p>
                  <p className="mt-1 text-sm leading-7 text-white/80">{event.text}</p>
                  {event.href && (
                    <Link href={event.href} className="mt-2 inline-flex text-xs font-bold text-white hover:text-[#e96a7f]">
                      告知記事を見る <span className="ml-2" aria-hidden="true">→</span>
                    </Link>
                  )}
                </li>
              ))}
            </ol>
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
        brand="BISYA（毘沙）"
        heading="試したいモデルとサイズを、来店前に確認できます。"
        description="試乗車・展示車は時期で変わります。希望モデル、身長、来店予定日をお知らせいただければ、その時点で確認できる選択肢をご案内します。"
      />

      <div className="border-t border-gray-100 py-8 text-center">
        <a href="https://bisya.jp/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#c41e3a]">
          BISYA 公式サイトを見る <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
