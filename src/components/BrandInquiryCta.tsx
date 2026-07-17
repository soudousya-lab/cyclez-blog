import Link from "next/link";

interface BrandInquiryCtaProps {
  brand: string;
  heading: string;
  description: string;
}

export function BrandInquiryCta({ brand, heading, description }: BrandInquiryCtaProps) {
  const mailHref = `mailto:info@cycle-z.com?subject=${encodeURIComponent(
    `${brand}の実車・在庫について`,
  )}&body=${encodeURIComponent(
    `気になるモデル：\n身長：\nお住まいの地域：\n来店希望日：\n試乗希望：あり・なし\n\nその他のご相談：`,
  )}`;

  return (
    <section id="brand-inquiry" className="bg-[#c41e3a] py-14 text-white sm:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-xs font-bold tracking-[0.2em] text-white/70">BEFORE YOUR VISIT</p>
        <h2 className="jp-phrase-wrap mt-3 text-2xl font-bold leading-snug sm:text-3xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
          {description}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="tel:086-252-7744"
            className="mx-10 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[#c41e3a] transition-colors hover:bg-gray-100 sm:mx-0"
          >
            電話で実車・在庫を確認
          </a>
          <a
            href={mailHref}
            className="mx-10 inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#c41e3a] sm:mx-0"
          >
            メールで相談内容を送る
          </a>
        </div>
        <p className="mt-5 text-xs leading-6 text-white/70">
          086-252-7744 / 11:00〜19:00 / 水曜定休 ・ <Link href="/access" className="underline underline-offset-4">アクセス</Link>
        </p>
      </div>
    </section>
  );
}
