import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { loadDefaultJapaneseParser } from "budoux";

// 日本語の文節境界を解析するパーサ（サーバー側で一度だけ生成）
const jpParser = loadDefaultJapaneseParser();

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageBannerProps = {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
};

export default function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
  // 文節ごとに <wbr>（改行可能点）を挿入。h1 の word-break:keep-all と併用することで
  // 「日本／価格」のような語の途中改行を全ブラウザ（iOS Safari含む）で防ぐ。
  const titleSegments = jpParser.parse(title);

  return (
    <div className="relative w-full min-h-[12rem] md:min-h-[16rem] overflow-hidden flex flex-col justify-end">
      {/* 背景画像 */}
      <Image
        src="/images/common/page-banner.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* 暗いオーバーレイ */}
      <div className="absolute inset-0 bg-black/40" />
      {/* テキストコンテンツ（高さは中身に合わせて伸びる＝長いタイトルでも溢れない） */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full py-6 md:py-8">
        {/* パンくず: 常に1行。最後（タイトル）だけ省略表示にして、ホーム/ブログが潰れないようにする */}
        <nav className="flex items-center gap-2 text-sm text-white/80 mb-3 min-w-0">
          <Link href="/" className="shrink-0 whitespace-nowrap hover:text-white transition-colors">
            ホーム
          </Link>
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span
                key={i}
                className={`flex items-center gap-2 ${isLast ? "min-w-0 flex-1" : "shrink-0"}`}
              >
                <span className="shrink-0">/</span>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="whitespace-nowrap shrink-0 hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={`text-white ${isLast ? "truncate min-w-0" : "whitespace-nowrap"}`}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
        {subtitle && (
          <p className="text-white/70 text-xs md:text-sm tracking-wider mb-1">{subtitle}</p>
        )}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug [word-break:keep-all] [overflow-wrap:anywhere] [text-wrap:balance]">
          {titleSegments.map((seg, i) => (
            <Fragment key={i}>
              {i > 0 && <wbr />}
              {seg}
            </Fragment>
          ))}
        </h1>
      </div>
    </div>
  );
}
