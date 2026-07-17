import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandInquiryCta } from "@/components/BrandInquiryCta";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/lineup/lapierre" },
  title: "LAPIERREを岡山で見て相談するなら",
  description:
    "フランス・ディジョンで磨かれてきたLAPIERRE（ラピエール）。レースから受け継ぐ走り、美しいフレーム造形、cycleZスタッフが乗る実車を紹介します。",
  openGraph: {
    type: "website",
    url: "/lineup/lapierre",
    title: "LAPIERREを岡山で見て相談するなら｜cycleZ",
    description:
      "フランスの美意識と、道の上で磨かれた性能。スタッフが実際に乗るLAPIERREを、実車の感触から紹介します。",
    images: [
      {
        url: "/images/brands/lapierre-engineering.jpg",
        width: 1600,
        height: 900,
        alt: "光の中に浮かぶLAPIERREのレーシングフレーム",
      },
    ],
  },
};

const models = [
  {
    name: "XELIUS SL",
    role: "RACE / CLIMB",
    image: "/images/bikes/lapierre-xelius-sl.jpg",
    description: "登りで力を受け止め、下りで狙った線を描く。競技の緊張感を、いつもの峠やロングライドまで連れてくるロードです。",
    url: "https://azuma-1911.jp/lapierre/products/xelius-sl-5-0/",
  },
  {
    name: "SENSIUM",
    role: "ENDURANCE",
    image: "/images/bikes/lapierre-sensium.jpg",
    description: "目的地を急ぐより、一日を長く味わいたい人へ。速さを失わず、遠くの景色まで心地よく連れていくロードです。",
    url: "https://azuma-1911.jp/lapierre/products/sensium-2-0/",
  },
  {
    name: "CROSSHILL",
    role: "GRAVEL",
    image: "/images/bikes/lapierre-crosshill.jpg",
    description: "アスファルトが途切れた場所も、道の続きに変えてくれる。旅の荷物を載せ、知らない曲がり角へ進みたくなるグラベルです。",
    url: "https://azuma-1911.jp/lapierre/products/crosshill-3-0/",
  },
  {
    name: "SHAPER",
    role: "FITNESS / CITY",
    image: "/images/bikes/lapierre-shaper.jpg",
    description: "フランスのスポーツバイクらしい軽やかさを、通勤や街の移動へ。日常の距離まで少し特別にしてくれます。",
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
      "駐車スペースがあります。駐車状況と希望モデルの在店状況を、出発前に電話で確認していただくと確実です。",
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
          <p className="text-xs font-bold tracking-[0.2em] text-[#c41e3a]">FRENCH ENGINEERING, DIJON</p>
          <h1 className="jp-phrase-wrap mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            速さの先にある、フランスの美意識。
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            ディジョンで受け継がれてきた設計と、レースの極限で磨かれた走り。
            LAPIERREは、速さを数字だけで終わらせず、美しい輪郭と正確な感触に変えてきたブランドです。
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">MADE FOR THE ROAD</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              見せるためではなく、走るための輪郭。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              LAPIERREの中心にあるのはフレームです。空気をほどく形、踏み込んだ力を受け止める剛性、下りで迷いなく向きを変える精度。ディジョンで積み重ねたものづくりと、プロレースから持ち帰った経験が一本の線に溶け込んでいます。
            </p>
            <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
              それでも、機械然としすぎないのがフランスらしさ。光の当たり方で表情を変える塗装や、立ち姿の美しさまで含めて、走る前から心を動かす自転車です。
            </p>
          </div>
          <figure>
            <div className="relative aspect-video overflow-hidden bg-gray-950">
              <Image
                src="/images/brands/lapierre-engineering.jpg"
                alt="LAPIERREのフレームを手にするサイクリスト"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <figcaption className="mt-2 text-right text-[11px] text-gray-400">Photo: LAPIERRE</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-14">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">AT CYCLEZ</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              惹かれた人が、店にいる。
            </h2>
          </div>
          <div className="border-l-2 border-[#c41e3a] pl-5 sm:pl-8">
            <p className="text-sm leading-8 text-gray-600 sm:text-base">
              スタッフ西井の愛車はXELIUS SL ULTIMATE。現行車とは仕様が違っても、長く所有してきたから話せる乗り味や、写真だけでは分からないフレームの存在感があります。LAPIERREに惹かれた理由から、じっくりお話しします。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-14 text-white sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-[#e96a7f]">ROADS AHEAD</p>
            <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              走りたい景色が変われば、選ぶ一台も変わる。
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              峠の頂上、遠い町、土の道、毎朝の通勤。LAPIERREの幅広さは、速さの形が一つではないことを教えてくれます。
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
            title="見た目に惹かれた、その先を確かめる"
            subtitle="BEYOND THE SILHOUETTE"
            description="自転車の美しさは、眺めるだけでは完結しません。自分の体と、走りたい道に重ねて初めて、一台の意味が見えてきます。"
          />
          <div className="grid border-y border-gray-200 md:grid-cols-3 md:divide-x md:divide-gray-200">
            {[
              { eyebrow: "SHAPE", title: "造形を近くで見る", text: "チューブの線、塗装の奥行き、細部の収まり。写真で惹かれた理由を、実車の前でもう一度確かめます。" },
              { eyebrow: "POSITION", title: "自分の体に重ねる", text: "憧れのモデルを無理なく楽しめるよう、体格と姿勢からサイズや組み方を考えます。" },
              { eyebrow: "ROAD", title: "走る場所を思い浮かべる", text: "速く走りたいのか、遠くへ行きたいのか。いつもの道を聞きながら、モデルの個性を選びます。" },
            ].map((item) => (
              <div key={item.eyebrow} className="border-b border-gray-200 px-4 py-7 last:border-b-0 md:border-b-0 md:px-8">
                <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">{item.eyebrow}</p>
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
        heading="写真で惹かれた一台を、実車の感触へ。"
        description="モデルを決めきれていなくても大丈夫です。走りたい道や好きな佇まいから、候補を一緒に探します。遠方からお越しの方は、実車や在庫の状況を事前にご確認いただけます。"
      />

      <div className="border-t border-gray-100 py-8 text-center">
        <a href="https://www.lapierrebikes.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#c41e3a]">
          LAPIERRE 公式サイトを見る <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
