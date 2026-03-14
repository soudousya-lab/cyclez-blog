import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden">
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
      {/* テキストコンテンツ */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-6 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-3">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          {subtitle && (
            <p className="text-white/70 text-xs md:text-sm tracking-wider mb-1">{subtitle}</p>
          )}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
}
