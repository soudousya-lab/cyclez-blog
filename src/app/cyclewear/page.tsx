import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 sm:aspect-[12/5]">
        <Image
          src="/images/cyclewear/cyclewear-hero.jpg"
          alt="cycleZ店内に並ぶサイクルウェア"
          fill
          priority
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <section id="cyclewear-hero" className="border-b border-gray-100 bg-white py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="jp-phrase-wrap text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            サイクルウェアは、実際に着て選ぶ。
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            サイズ表を見比べても、生地の伸び方や色、前傾姿勢での着心地までは分かりません。
            cycleZでは、カジュアルからテクニカルまで、店頭で着比べながら選べます。
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:086-252-7744"
              className="mx-12 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c41e3a] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#a01830] sm:mx-0"
            >
              <PhoneIcon />
              在庫・サイズを電話で確認
            </a>
            <Link
              href="/access"
              className="mx-12 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c41e3a] px-7 py-3 text-sm font-bold text-[#c41e3a] transition-colors hover:bg-[#c41e3a] hover:text-white sm:mx-0"
            >
              アクセスを見る
              <ArrowIcon />
            </Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-gray-500">
            11:00〜19:00 / 水曜定休 / 岡山駅から徒歩約5分
          </p>
        </div>
      </section>

      <section aria-label="県外からの来店地域" className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 border-b border-gray-100 px-4 md:grid-cols-4">
          {visitAreas.map((item) => (
            <div key={item.area} className="border-b border-gray-100 px-3 py-5 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <p className="text-sm font-bold text-gray-900">{item.area}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="px-4 py-4 text-center text-xs leading-5 text-gray-500">
          ウェアを見に、県外から車で来店されるお客様も増えています。
        </p>
      </section>

      <section id="online-sizing-problem" className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="ネットだけでは決めにくいこと"
            subtitle="WHY TRY ON"
            description="サイクルウェアは、同じサイズ表記でもブランドや用途によって着た感じが変わります。"
          />
          <div className="grid border-y border-gray-200 md:grid-cols-3 md:divide-x md:divide-gray-200">
            {[
              {
                number: "01",
                title: "サイズ感",
                text: "胸まわりが合っても、袖丈や着丈が合わないことがあります。海外ブランドは表記の基準もさまざまです。",
              },
              {
                number: "02",
                title: "生地と色",
                text: "伸び方、肌ざわり、透け感、実際の発色。画面で見た印象と違うことも少なくありません。",
              },
              {
                number: "03",
                title: "乗車姿勢",
                text: "腕を前に出したときに肩が突っ張らないか。立った状態だけでなく、自転車に乗る姿勢で確認します。",
              },
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

      <section id="try-on-experience" className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/blog/surly-clubride-report-2026-06/clubride-choosing.jpg"
              alt="cycleZ店内でサイクルウェアの実物を選ぶ様子"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="jp-phrase-wrap text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              店内で、気になるものを着比べてください。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              街でも着やすいカジュアルウェアから、長距離で快適なテクニカルウェアまで取り扱っています。
              メンズ・レディースとも、走り方や普段の服装に合わせてご相談ください。
            </p>
            <ul className="mt-6 divide-y divide-gray-100 border-y border-gray-100 text-sm text-gray-800">
              {[
                "普段着に近い、ゆとりのあるスタイル",
                "ロードバイク向けのフィット感と機能性",
                "ウェア・アイウェア・バッグまでまとめて相談",
                "バイクの色や普段の服に合わせたコーディネート",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 py-3.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-[#c41e3a]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="apparel-brands" className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="速さだけではなく、着たくなる一着を。"
            subtitle="SELECTED BRANDS"
            description="元アパレル出身のオーナーが、機能だけでなく服としての着心地や日常への馴染み方も見て選んでいます。"
          />
          <div className="grid border-y border-gray-200 md:grid-cols-2 md:gap-x-10">
            {apparelBrands.map((brand) => (
              <div key={brand.name} className="flex items-baseline justify-between gap-4 border-b border-gray-200 py-4 last:border-b-0">
                <h3 className="text-sm font-bold text-gray-900 sm:text-base">{brand.name}</h3>
                <p className="text-right text-xs leading-5 text-gray-500">{brand.style}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/lineup"
              className="inline-flex items-center gap-2 rounded-full border border-[#c41e3a] px-7 py-3 text-sm font-bold text-[#c41e3a] transition-colors hover:bg-[#c41e3a] hover:text-white"
            >
              取扱ラインナップを見る
              <ArrowIcon />
            </Link>
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-gray-500">
            取扱ブランド・店頭在庫は季節や入荷状況によって変わります。
          </p>
        </div>
      </section>

      <section id="apparel-consultation" className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <h2 className="jp-phrase-wrap text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
              自転車用だからではなく、あなたが着たいかどうか。
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
              cycleZのオーナーは元アパレルショップ勤務。走る距離や季節だけでなく、普段の服装や好きな色も伺いながら、無理なく取り入れられる一着を一緒に探します。
            </p>
            <p className="mt-5 border-l-4 border-[#c41e3a] pl-5 text-sm font-medium leading-7 text-gray-800">
              ピタッとしたウェアに抵抗がある方も、今より快適な一着を探す経験者も歓迎です。
            </p>
            <Link
              href="/about/staff/okada"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c41e3a] hover:underline"
            >
              オーナー紹介を見る
              <ArrowIcon />
            </Link>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl lg:order-2">
            <Image
              src="/images/staff/staff-main.jpg"
              alt="cycleZのスタッフ"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section id="regional-visitors" className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="県外からのご来店も増えています"
            subtitle="VISIT FROM CHUGOKU & SHIKOKU"
            description="実店舗でサイクルウェアを比較できる場所が少ないため、四国・山陰・福山・西播磨から車で来られる方もいます。"
          />
          <div className="grid grid-cols-2 border-y border-gray-200 md:grid-cols-4 md:divide-x md:divide-gray-200">
            {visitAreas.map((item) => (
              <div key={item.area} className="px-3 py-6 text-center">
                <h3 className="text-lg font-bold text-gray-900">{item.area}</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 bg-[#c41e3a] p-6 text-white sm:p-8 md:flex-row md:items-center">
            <div>
              <p className="font-bold">遠方からなら、出発前に在庫をご確認ください。</p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                ブランド・性別・普段のサイズ・来店予定日を伺います。
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="tel:086-252-7744"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#c41e3a] transition-colors hover:bg-gray-100"
              >
                <PhoneIcon />
                086-252-7744
              </a>
              <a
                href={mailHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#c41e3a]"
              >
                メールで相談
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="visit-guide" className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="来店前に確認しておくと安心です"
            subtitle="PLAN YOUR VISIT"
            description="せっかくのご来店が無駄にならないよう、気になる条件を先にお知らせください。"
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {[
              {
                number: "1",
                title: "希望を伝える",
                text: "ブランド名が分からなくても大丈夫です。性別、普段のサイズ、好み、用途をお知らせください。",
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
            ].map((item) => (
              <li key={item.number} className="border-t-2 border-[#c41e3a] pt-5">
                <span className="text-sm font-bold text-[#c41e3a]">{item.number}</span>
                <h3 className="mt-2 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid overflow-hidden rounded-2xl bg-gray-50 lg:grid-cols-[0.9fr_1.1fr]">
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
              <h3 className="text-2xl font-bold text-gray-900">岡山駅から徒歩約5分</h3>
              <dl className="mt-6 divide-y divide-gray-200 border-y border-gray-200 text-sm">
                <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="font-bold text-gray-900">住所</dt>
                  <dd className="leading-6 text-gray-600">岡山県岡山市北区島田本町1-1-47</dd>
                </div>
                <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="font-bold text-gray-900">営業時間</dt>
                  <dd className="text-gray-600">11:00〜19:00 / 水曜定休</dd>
                </div>
                <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="font-bold text-gray-900">駐車場</dt>
                  <dd className="leading-6 text-gray-600">土・日曜日は軽自動車を合わせて3台駐車可能</dd>
                </div>
              </dl>
              <Link
                href="/access"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full border border-[#c41e3a] px-6 py-3 text-sm font-bold text-[#c41e3a] transition-colors hover:bg-[#c41e3a] hover:text-white"
              >
                地図と詳しいアクセスを見る
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="cyclewear-faq" className="bg-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeader title="ご来店前によくある質問" subtitle="FAQ" />
          <div className="border-y border-gray-200">
            {faqItems.map((item) => (
              <details key={item.question} className="group border-b border-gray-200 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold text-gray-900">
                  <span className="flex items-start gap-3">
                    <span className="text-[#c41e3a]">Q.</span>
                    {item.question}
                  </span>
                  <span className="relative h-5 w-5 flex-shrink-0 text-[#c41e3a]">
                    <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-7 text-gray-600 sm:pl-8">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cyclewear-final-cta" className="bg-[#c41e3a] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="jp-phrase-wrap text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            気になる一着があれば、来店前にご確認ください。
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            ブランドやサイズが決まっていなくても大丈夫です。普段の服装や走り方から一緒に考えます。
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:086-252-7744"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#c41e3a] transition-colors hover:bg-gray-100"
            >
              <PhoneIcon />
              電話で在庫・サイズを確認
            </a>
            <a
              href={mailHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#c41e3a]"
            >
              メールで相談する
              <ArrowIcon />
            </a>
          </div>
          <p className="mt-5 text-xs text-white/70">086-252-7744 / 11:00〜19:00 / 水曜定休</p>
        </div>
      </section>
    </div>
  );
}
