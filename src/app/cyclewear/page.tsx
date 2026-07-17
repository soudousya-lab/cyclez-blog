import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/cyclewear" },
  title: "中四国でサイクルウェアを試着するなら",
  description:
    "四国・山陰・福山・西播磨からも来店される、岡山のサイクルウェア専門店cycleZ。カジュアルからプレミアムまで、実物を見て試着し、元アパレル出身のスタッフに相談できます。",
  openGraph: {
    type: "website",
    url: "/cyclewear",
    title: "中四国でサイクルウェアを試着するなら｜cycleZ",
    description:
      "ネットでは分からないサイズ感や生地、シルエットを店頭で比較。岡山駅近くのcycleZで、自分に合う一着を。",
    images: [
      {
        url: "/images/cyclewear/cyclewear-hero.jpg",
        width: 2400,
        height: 1339,
        alt: "cycleZ店内のサイクルウェア売場",
      },
    ],
  },
};

const apparelBrands = [
  { name: "STEM DESIGN", style: "街に馴染むカジュアルウェア" },
  { name: "rin project", style: "普段使いしやすい自然なスタイル" },
  { name: "Isadore", style: "素材と着心地を楽しむプレミアムウェア" },
  { name: "ASSOS", style: "ロングライドを支えるテクニカルウェア" },
  { name: "ALBA OPTICS", style: "機能とデザインを両立したアイウェア" },
  { name: "beruf baggage", style: "自転車移動に強い機能的なバッグ" },
  { name: "GIRO", style: "ヘルメットからシューズまで" },
];

const visitAreas = [
  { area: "四国", detail: "香川・徳島・愛媛・高知" },
  { area: "山陰", detail: "鳥取・島根方面" },
  { area: "備後", detail: "福山・尾道方面" },
  { area: "西播磨", detail: "赤穂など兵庫西部" },
];

const faqItems = [
  {
    question: "試着だけでも大丈夫ですか？",
    answer:
      "はい。実物を見て、袖丈・肩まわり・前傾姿勢でのフィット感まで確かめてください。無理に購入をおすすめすることはありません。",
  },
  {
    question: "女性向けのウェアもありますか？",
    answer:
      "レディースのサイクルウェアや小物も取り扱っています。ピタッとしたレーシングウェアだけでなく、普段着に近いデザインもご相談いただけます。",
  },
  {
    question: "欲しいブランドやサイズが決まっていません。",
    answer:
      "大丈夫です。走り方、普段の服装、好み、予算を伺いながら候補を絞ります。バイクとの色合わせも含めてご提案します。",
  },
  {
    question: "遠方なので、来店前に在庫を確認できますか？",
    answer:
      "お電話またはメールで、気になるアイテム・性別・普段のサイズをお知らせください。季節や入荷状況によって品揃えが変わるため、事前確認がおすすめです。",
  },
  {
    question: "車で行けますか？",
    answer:
      "土・日曜日は軽自動車を合わせて3台駐車可能です。遠方からお越しの際は、当日の駐車状況もお電話でご確認ください。",
  },
];

const mailHref = `mailto:info@cycle-z.com?subject=${encodeURIComponent(
  "サイクルウェアの在庫・サイズ相談",
)}&body=${encodeURIComponent(
  "気になる商品・ブランド：\n性別：\n普段着ているサイズ：\n来店予定日：\nお住まいの地域：",
)}`;

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

export default function CyclewearPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section id="cyclewear-hero" className="relative isolate overflow-hidden bg-[#161616] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/cyclewear/cyclewear-hero.jpg"
            alt="cycleZ店内に並ぶサイクルウェア"
            fill
            priority
            loading="eager"
            className="object-cover object-[58%_center] opacity-55 md:object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        <div className="relative mx-auto flex min-h-[610px] max-w-6xl items-center px-4 py-16 sm:min-h-[660px] sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-white backdrop-blur-sm sm:text-xs">
              CYCLEWEAR DESTINATION / OKAYAMA
            </p>
            <h1 className="text-[2.45rem] font-bold leading-[1.18] tracking-tight sm:text-5xl md:text-6xl">
              中四国で、
              <br />
              サイクルウェアを
              <br />
              <span className="text-[#ff536d]">試着して選ぶ</span>なら。
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-200 sm:text-base sm:leading-8">
              サイズ表だけでは分からない、生地・シルエット・前傾姿勢での着心地。
              カジュアルからプレミアムまで、実物を比べて自分に合う一着を選べます。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:086-252-7744"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#c41e3a] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_35px_rgba(196,30,58,0.35)] transition hover:bg-[#a01830] sm:text-base"
              >
                <PhoneIcon />
                来店前に在庫・サイズを確認
              </a>
              <Link
                href="/access"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:text-base"
              >
                アクセスを見る
                <ArrowIcon />
              </Link>
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-300">
              営業時間 11:00〜19:00 / 水曜定休 / 岡山駅から徒歩約5分
            </p>
          </div>
        </div>
      </section>

      <section id="visit-areas-summary" className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-gray-100 px-4 py-3 md:grid-cols-4 md:divide-y-0">
          {visitAreas.map((item) => (
            <div key={item.area} className="px-3 py-4 text-center sm:px-5">
              <p className="text-sm font-bold text-gray-900 sm:text-base">{item.area}</p>
              <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-xs">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="px-4 pb-6 text-center text-xs leading-5 text-gray-500">
          実際に県外からウェアを見に来られるお客様が増えています。
        </p>
      </section>

      <section id="online-sizing-problem" className="bg-gray-50 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="ネットのサイズ表だけで、決めきれますか？"
            subtitle="WHY TRY ON"
            description="サイクルウェアは、普段着と同じサイズ表記でもブランドや用途によってフィット感が大きく変わります。"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "ブランドごとに違うサイズ感",
                text: "海外ブランドは表記の基準もさまざま。胸まわりが合っても、袖丈や着丈が合わないことがあります。",
              },
              {
                number: "02",
                title: "生地と色は画面で伝わりにくい",
                text: "伸び方、肌ざわり、透け感、実際の発色。毎回着たくなるかどうかは、触れて初めて分かります。",
              },
              {
                number: "03",
                title: "自転車に乗る姿勢で変わる",
                text: "立った状態ではなく、腕を前に出した姿勢で突っ張らないか。試着で確かめたい大切なポイントです。",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 80} className="h-full">
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="text-4xl font-bold tracking-tight text-[#c41e3a]/20">{item.number}</span>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="try-on-experience" className="overflow-hidden bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/images/blog/surly-clubride-report-2026-06/clubride-choosing.jpg"
                    alt="cycleZ店内でサイクルウェアの実物を選ぶ様子"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                </div>
                <div className="absolute -bottom-5 -right-2 rounded-2xl bg-[#c41e3a] px-5 py-4 text-white shadow-lg sm:right-5">
                  <p className="text-xs font-bold tracking-[0.16em] text-white/75">TRY & COMPARE</p>
                  <p className="mt-1 text-lg font-bold">見て、触れて、着比べる</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <p className="text-xs font-bold tracking-[0.2em] text-[#c41e3a]">IN STORE EXPERIENCE</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                同じ日に比べるから、
                <br />
                違いが分かる。
              </h2>
              <p className="mt-6 text-sm leading-8 text-gray-600 sm:text-base">
                cycleZでは、街でも着やすいカジュアルウェアから、長距離で快適なテクニカルウェアまで取り扱っています。
                メンズ・レディースとも、目的や好みに合わせてご相談ください。
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  "普段着に近い、ゆとりのあるスタイル",
                  "ロードバイク向けのフィット感と機能性",
                  "ウェア・アイウェア・バッグまでまとめて相談",
                  "バイクの色や普段の服に合わせたコーディネート",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-medium text-gray-800">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#c41e3a] text-[10px] text-white">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="apparel-brands" className="bg-[#171717] py-16 text-white sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-[#ff536d]">SELECTED BRANDS</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">速さだけではなく、着たくなる一着を。</h2>
            <p className="mt-5 text-sm leading-7 text-gray-300 sm:text-base">
              元アパレル出身のオーナーが、機能だけでなく服としての着心地や日常への馴染み方も見て選んだラインナップです。
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {apparelBrands.map((brand, index) => (
              <ScrollReveal key={brand.name} delay={index * 40} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                  <p className="text-lg font-bold text-white">{brand.name}</p>
                  <p className="mt-2 text-xs leading-5 text-gray-400">{brand.style}</p>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={280} className="h-full">
              <Link
                href="/lineup"
                className="flex h-full min-h-28 items-center justify-between rounded-2xl border border-[#ff536d]/50 bg-[#c41e3a]/15 p-6 text-sm font-bold text-white transition hover:bg-[#c41e3a]/30"
              >
                取扱ラインナップを詳しく見る
                <ArrowIcon />
              </Link>
            </ScrollReveal>
          </div>
          <p className="mt-6 text-center text-[11px] leading-5 text-gray-500">
            取扱ブランド・店頭在庫は季節や入荷状況によって変わります。
          </p>
        </div>
      </section>

      <section id="apparel-consultation" className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <p className="text-xs font-bold tracking-[0.2em] text-[#c41e3a]">FROM APPAREL TO CYCLING</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                「自転車用」だけでなく、
                <br />
                「あなたが着たいか」で選ぶ。
              </h2>
              <p className="mt-6 text-sm leading-8 text-gray-600 sm:text-base">
                cycleZのオーナーは元アパレルショップ勤務。走る距離や季節はもちろん、普段の服装や好きな色まで伺い、無理なく取り入れられる一着を一緒に探します。
              </p>
              <div className="mt-7 rounded-2xl border-l-4 border-[#c41e3a] bg-gray-50 p-6">
                <p className="text-sm font-bold leading-7 text-gray-900">
                  ピタッとしたレーシングウェアに抵抗がある方も、もっと快適な一着を探す経験者も歓迎です。
                </p>
              </div>
              <Link
                href="/about/staff/okada"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#c41e3a] hover:gap-3"
              >
                オーナー紹介を見る
                <ArrowIcon />
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/staff/staff-main.jpg"
                  alt="cycleZのスタッフ"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="regional-visitors" className="overflow-hidden bg-gradient-to-br from-[#f8f8f8] to-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="ウェアを見るために、県境を越えて。"
            subtitle="VISIT FROM CHUGOKU & SHIKOKU"
            description="実店舗でサイクルウェアを比較できる場所が限られる中、県外から車で来店される方も増えています。"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {visitAreas.map((item, index) => (
              <ScrollReveal key={item.area} delay={index * 70} className="h-full">
                <div className="relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
                  <span className="absolute -right-3 -top-6 text-8xl font-bold text-[#c41e3a]/[0.04]">Z</span>
                  <p className="relative text-xs font-bold tracking-[0.18em] text-[#c41e3a]">FROM</p>
                  <h3 className="relative mt-2 text-2xl font-bold text-gray-900">{item.area}</h3>
                  <p className="relative mt-2 text-sm leading-6 text-gray-500">{item.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl bg-[#171717] p-7 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-lg font-bold sm:text-xl">遠方からなら、出発前の在庫確認がおすすめです。</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                気になるブランド・性別・普段のサイズ・来店予定日をお伝えください。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:086-252-7744"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c41e3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a01830]"
              >
                <PhoneIcon />
                086-252-7744
              </a>
              <a
                href={mailHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-gray-900"
              >
                メールで相談
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="visit-guide" className="bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="遠方からでも、来店前に確認できます。"
            subtitle="PLAN YOUR VISIT"
            description="せっかくのご来店が無駄にならないよう、気になる条件を先にお知らせください。"
          />

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                number: "1",
                title: "希望を伝える",
                text: "ブランド名が分からなくても大丈夫。性別、普段のサイズ、好み、用途をお知らせください。",
              },
              {
                number: "2",
                title: "在庫を確認する",
                text: "店頭で比較できる候補やサイズ、当日の駐車状況をスタッフがご案内します。",
              },
              {
                number: "3",
                title: "店頭で試着する",
                text: "生地やシルエットを比べ、前傾姿勢での着心地まで確かめて選べます。",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 90}>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c41e3a] text-2xl font-bold text-white shadow-[0_10px_25px_rgba(196,30,58,0.25)]">
                    {item.number}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 grid overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-72 lg:min-h-[390px]">
              <Image
                src="/images/wp/2025-06-assos.jpg"
                alt="cycleZ店内のサイクルウェア展示"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-bold tracking-[0.18em] text-[#c41e3a]">SHOP INFORMATION</p>
              <h3 className="mt-3 text-2xl font-bold text-gray-900">岡山駅から徒歩約5分</h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                  <dt className="font-bold text-gray-900">住所</dt>
                  <dd className="leading-6 text-gray-600">岡山県岡山市北区島田本町1-1-47</dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                  <dt className="font-bold text-gray-900">営業時間</dt>
                  <dd className="text-gray-600">11:00〜19:00 / 水曜定休</dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                  <dt className="font-bold text-gray-900">駐車場</dt>
                  <dd className="leading-6 text-gray-600">土・日曜日は軽自動車を合わせて3台駐車可能</dd>
                </div>
              </dl>
              <Link
                href="/access"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full border border-[#c41e3a] px-6 py-3 text-sm font-bold text-[#c41e3a] transition hover:bg-[#c41e3a] hover:text-white"
              >
                地図と詳しいアクセスを見る
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="cyclewear-faq" className="bg-gray-50 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title="ご来店前によくある質問" subtitle="FAQ" />
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <ScrollReveal key={item.question} delay={index * 45}>
                <details className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm open:shadow-md sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
                    <span className="flex items-start gap-3">
                      <span className="text-[#c41e3a]">Q.</span>
                      {item.question}
                    </span>
                    <span className="relative h-5 w-5 flex-shrink-0 text-[#c41e3a]">
                      <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-gray-100 pt-4 text-sm leading-7 text-gray-600 sm:pl-8">
                    {item.answer}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="cyclewear-final-cta" className="relative isolate overflow-hidden bg-[#171717] py-20 text-white sm:py-24">
        <Image
          src="/images/cyclewear/cyclewear-hero.jpg"
          alt=""
          fill
          className="-z-20 object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold tracking-[0.22em] text-[#ff536d]">FIND YOUR CYCLEWEAR</p>
          <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-4xl md:text-5xl">
            <span className="block">次のライドで着たくなる</span>
            <span className="mt-1 block">一着を、岡山で見つけよう。</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            遠方からお越しの方は、気になるブランドやサイズを先に確認しておくと安心です。
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:086-252-7744"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#c41e3a] px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#a01830] sm:text-base"
            >
              <PhoneIcon />
              電話で在庫・サイズを確認
            </a>
            <a
              href={mailHref}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:text-base"
            >
              メールで相談する
              <ArrowIcon />
            </a>
          </div>
          <p className="mt-5 text-xs text-gray-400">086-252-7744 / 11:00〜19:00 / 水曜定休</p>
        </div>
      </section>
    </div>
  );
}
