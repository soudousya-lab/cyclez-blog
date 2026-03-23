"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    image: "/images/slider/beginner.jpg",
    alt: "初心者の方へ",
    href: "/first/beginner",
    catchcopy: "試乗して決めよう、あなたの1台",
    subcopy: "初めてのスポーツバイク選びをプロがサポート",
    cta: "無料試乗を予約する",
  },
  {
    image: "/images/slider/woman.jpg",
    alt: "女性のお客様へ",
    href: "/first/women",
    catchcopy: "女性ライダー、増えてます",
    subcopy: "体格に合ったバイクとウェアをご提案",
    cta: "女性向けラインナップを見る",
  },
  {
    image: "/images/slider/rinko.jpg",
    alt: "輪行で広がるサイクリング",
    href: "/first/rinko",
    catchcopy: "電車+自転車で、岡山の先へ",
    subcopy: "輪行の始め方を店頭でレクチャー",
    cta: "輪行ガイドを読む",
  },
  {
    image: "/images/slider/cafe.jpg",
    alt: "カフェライドを楽しむ",
    href: "/first/cafe-ride",
    catchcopy: "走った先に、おいしいコーヒー",
    subcopy: "岡山のおすすめカフェライドコース",
    cta: "コースを見る",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, goToSlide]);

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden">
      {/* 全スライドを重ねて配置、opacityでフェード切り替え */}
      <div className="relative w-full" style={{ aspectRatio: "2400/1000" }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            {/* テキストオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
                <div className="max-w-lg">
                  <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                    {slide.catchcopy}
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 drop-shadow-md">
                    {slide.subcopy}
                  </p>
                  <Link
                    href={slide.href}
                    className="inline-flex items-center gap-2 mt-3 sm:mt-5 bg-[#c41e3a] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#a01830] transition-colors text-xs sm:text-sm font-medium shadow-lg"
                  >
                    {slide.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 下部グラデーションオーバーレイ */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-10" />
      </div>

      {/* プログレスバー付きインジケータ */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative h-1 rounded-full overflow-hidden bg-white/30 hover:bg-white/50 transition-colors"
            style={{ width: index === currentSlide ? "2rem" : "0.75rem" }}
            aria-label={`スライド${index + 1}へ`}
          >
            {index === currentSlide && (
              <span
                className="absolute inset-0 bg-white rounded-full origin-left"
                style={{
                  animation: "progress-bar 5s linear forwards",
                }}
              />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes progress-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
