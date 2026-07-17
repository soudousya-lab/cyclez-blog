import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandInquiryCta } from "@/components/BrandInquiryCta";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/lineup/bisya" },
  title: "BISYA（毘沙）を岡山で試乗・相談するなら",
  description:
    "カーボンロードへの憧れを、もっと身近なものにするBISYA（毘沙）。名前に込めた思い、ものづくりの原点、TAMON・四号機・八号機を紹介します。",
  openGraph: {
    type: "website",
    url: "/lineup/bisya",
    title: "BISYA（毘沙）を岡山で試乗・相談するなら｜cycleZ",
    description:
      "憧れで終わらせず、走り始める人を増やしたい。BISYAがカーボンロードへ込めた思いと、モデルの個性をcycleZが紹介します。",
    images: [
      {
        url: "/images/brands/bisya-spirit.jpg",
        width: 1200,
        height: 800,
        alt: "BISYAの名が刻まれたカーボンフレーム",
      },
    ],
  },
};

const models = [
  {
    name: "TAMON（多聞）",
    role: "小さな体に、遠くまで行ける自由を",
    image: "/images/bikes/bisya-tamon.jpg",
    url: "https://bisya.jp/",
    description:
      "体に合うスポーツバイクが少ないことで、走る楽しさを諦めてほしくない。小柄な方やジュニアが、自分の力で景色を広げるための入口です。",
  },
  {
    name: "四号機 BIS004",
    role: "カーボンへの憧れを、最初の一歩に",
    image: "/images/bikes/bisya-bis004.jpg",
    url: "https://bisya.jp/bis004",
    description:
      "いつかと思っていたカーボンロードを、今日から走るための選択肢へ。気負わず付き合いながら、週末の距離を伸ばしていける一台です。",
  },
  {
    name: "八号機 BIS008",
    role: "もっと軽く、もっと遠くへ",
    image: "/images/bikes/bisya-bis008.jpg",
    url: "https://bisya.jp/bis008",
    description:
      "走る楽しさを知ったあと、次の峠やもう少し遠い町へ向かいたくなった人に。踏み出した力へ軽やかに応えるカーボンロードです。",
  },
];

const faqItems = [
  {
    question: "BISYAはいつでも試乗できますか？",
    answer:
      "展示車・試乗車は常設とは限らず、時期によってモデルとサイズが変わります。実車を見たい方は来店前に電話でご確認ください。",
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
    question: "県外から実車を見に行っても大丈夫ですか？",
    answer:
      "もちろんです。希望モデルとおおよその身長、来店予定時刻を事前にお知らせいただくと、実車の在店状況も含めてご案内できます。",
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

      <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-950 sm:aspect-[16/7]">
        <Image
          src="/images/brands/bisya-spirit.jpg"
          alt="マットブラックのフレームに刻まれたBISYAの文字"
          fill
          priority
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
        />
        <p className="absolute bottom-3 right-4 text-[10px] tracking-wide text-white/60">Photo: BISYA</p>
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
            憧れで終わらせず、走り出す。
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            新潟・上越で生まれたBISYAの原点は、「なぜカーボンロードは、こんなにも遠い存在なのか」という素朴な疑問でした。
            もっと多くの人に、軽やかに走る喜びを。その思いから始まったブランドです。
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
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">A SIMPLE QUESTION</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              高すぎるから、憧れで終わらせない。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              BISYAは複雑な流通を見直し、世界的なブランドを支えてきた工場の技術を、国内で企画・組み立て・サポートする形へつなぎました。削りたかったのは走りの質ではなく、乗り手までの遠回りです。
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              初めて風を切る人にも、もう一度自転車へ戻る人にも、カーボンの軽やかさを気負わず楽しんでほしい。手の届きやすさは、妥協ではなく、走り始める人を増やすための思想です。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="走り始める人にも、次へ進む人にも"
            subtitle="MODEL GUIDE"
            description="同じBISYAでも、体格や経験、見たい景色によって似合う一台は変わります。スペックの前に、これからの走りを思い浮かべてみてください。"
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
          <div className="grid items-center gap-8 md:grid-cols-[0.6fr_1.4fr] md:gap-14">
            <div className="text-center md:text-left">
              <p className="font-serif text-[7rem] leading-none text-[#c41e3a] sm:text-[9rem]" aria-hidden="true">毘</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#e96a7f]">THE NAME BISYA</p>
              <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug sm:text-3xl">
                苦しいとき、勝つ相手は自分。
              </h2>
              <p className="mt-5 text-sm leading-8 text-white/70 sm:text-base">
                「毘」の名は、越後の武将・上杉謙信が掲げた旗と、その信仰した毘沙門天に由来します。誰かより速いことだけが勝利ではありません。登りで足を止めたくなったとき、もう少し先へ進む。昨日より遠い場所へ行く。その小さな挑戦に寄り添うための名前です。
              </p>
              <p className="mt-4 text-sm leading-8 text-white/70 sm:text-base">
                速さを誇るためではなく、自分の世界を広げるために。BISYAの手の届きやすさの奥には、走り出す人へのまっすぐな願いがあります。
              </p>
            </div>
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
        heading="憧れを、自分の一台へ近づける。"
        description="初めてのロードでも、モデルを決めきれていなくても大丈夫です。体格や走りたい場所を伺い、無理なく楽しめる一台を一緒に探します。実車を見たい方は、来店前に在店状況をご確認ください。"
      />

      <div className="border-t border-gray-100 py-8 text-center">
        <a href="https://bisya.jp/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#c41e3a]">
          BISYA 公式サイトを見る <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
