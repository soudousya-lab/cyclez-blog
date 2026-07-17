import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandInquiryCta } from "@/components/BrandInquiryCta";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/lineup/macchi" },
  title: "macchi cyclesを岡山で相談・オーダーするなら",
  description:
    "2017年からmacchi cyclesを扱い、スタッフも実際に乗る岡山のcycleZ。クロモリオーダーの考え方、実車、相談から納車までの流れを紹介します。",
  openGraph: {
    type: "website",
    url: "/lineup/macchi",
    title: "macchi cyclesを岡山で相談・オーダーするなら｜cycleZ",
    description:
      "スタッフの実車を見ながら、体格・用途・色まで相談。2017年から付き合うcycleZが、オーダー前の疑問に答えます。",
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
    number: "01",
    title: "乗り方を言葉にする",
    text: "速さを狙うのか、長距離を楽に走るのか、グラベルも含めるのか。今の自転車で気になる点も伺います。",
  },
  {
    number: "02",
    title: "体格とポジションを確認",
    text: "身長だけで決めず、手足の長さ、柔軟性、今のポジションを確認。必要な寸法を一緒に詰めます。",
  },
  {
    number: "03",
    title: "フレームと仕様を決める",
    text: "モデル、パイプ、コンポーネント、カラーを予算に合わせて整理。見た目と使い方の両方から決めます。",
  },
  {
    number: "04",
    title: "組み上げて、乗りながら合わせる",
    text: "完成後はcycleZで組み立てと納車説明。乗り始めてからのポジションやメンテナンスも継続して相談できます。",
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
            cycleZは2017年から試乗会やオーダー会を重ね、スタッフ自身も乗り続けています。
          </p>
        </div>
      </section>

      <section aria-label="cycleZとmacchiの実績" className="border-b border-gray-100">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-gray-100 px-4 sm:px-6">
          {[
            { value: "2017", label: "取扱いの始まり" },
            { value: "3台", label: "スタッフ実車" },
            { value: "2件＋2件", label: "2026年の成約・相談" },
          ].map((item) => (
            <div key={item.label} className="px-2 py-6 text-center sm:py-8">
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{item.value}</p>
              <p className="mt-1 text-[11px] leading-5 text-gray-500 sm:text-xs">{item.label}</p>
            </div>
          ))}
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
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">SINCE 2017</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              カタログの説明より、乗ってきた人の話を。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              同じmacchiでも、用途、寸法、色、パーツで見た目も乗り味も変わります。
              cycleZにはスタッフの完成車があるので、写真だけでは分からないパイプの細さや塗装、組み方を実物で確かめられます。
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              「クロモリが欲しい」と決めていなくても構いません。今のカーボンロードと何が違うか、既製サイズで感じている違和感をどう解決できるか。そこから話を始めます。
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="相談から納車まで"
            subtitle="ORDER FLOW"
            description="オーダーは、最初から正解を知っている人のためのものではありません。会話を重ねて決めていく買い方です。"
          />
          <ol className="border-y border-gray-200 md:grid md:grid-cols-2">
            {orderSteps.map((step, index) => (
              <li
                key={step.number}
                className={`px-3 py-7 sm:px-7 ${index < 3 ? "border-b border-gray-200" : ""} ${index >= 2 ? "md:border-b-0" : ""} ${index % 2 === 0 ? "md:border-r md:border-gray-200" : ""}`}
              >
                <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">{step.number}</p>
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
            <p className="text-xs font-bold tracking-[0.18em] text-[#e96a7f]">THREE REAL BIKES</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              三人三様。同じブランドでも、同じ一台にはならない。
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              スタッフの車体は色も仕様も別々です。遠方から実車確認に来られる場合は、希望の車体が店頭にあるか事前にご確認ください。
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
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">FROM THE SHOP FLOOR</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              広島・福山からも来店。2026年のオーダー会で見えたこと。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              2026年6月の試乗・オーダー会では、県外からの来店もあり、当日にオーダー2件、継続相談2件につながりました。
              決め手はスペック表ではなく、ビルダーやスタッフに自分の乗り方を話し、その場で疑問を解けたことでした。
            </p>
            <Link
              href="/blog/macchi-cycles-event-report-2026-06-07"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#c41e3a] hover:underline"
            >
              開催レポートを読む <span aria-hidden="true">→</span>
            </Link>
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
        heading="遠方からの来店前に、見たい実車をご確認ください。"
        description="スタッフ車の在店状況、次回の試乗・オーダー相談、納期の目安をお伝えします。気になる用途や現在の自転車も添えてご相談ください。"
      />

      <div className="border-t border-gray-100 py-8 text-center">
        <a href="http://www.macchicycles.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#c41e3a]">
          macchi cycles 公式サイトを見る <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
