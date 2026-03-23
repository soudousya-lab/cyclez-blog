"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const slides = [
  { image: "/images/slider/beginner.jpg", alt: "初心者の方へ", href: "/first/beginner" },
  { image: "/images/slider/woman.jpg", alt: "女性のお客様へ", href: "/first/women" },
  { image: "/images/slider/rinko.jpg", alt: "輪行で広がるサイクリング", href: "/first/rinko" },
  { image: "/images/slider/cafe.jpg", alt: "カフェライドを楽しむ", href: "/first/cafe-ride" },
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
          <Link
            key={index}
            href={slide.href}
            className={`absolute inset-0 block transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            aria-label={slide.alt}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </Link>
        ))}

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
