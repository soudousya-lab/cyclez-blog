"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  { image: "/beginner.jpg", alt: "初心者の方へ", width: 2400, height: 1000 },
  { image: "/woman.jpg", alt: "女性のお客様へ", width: 2400, height: 1000 },
  { image: "/contact.jpg", alt: "お気軽にご相談ください", width: 1920, height: 584 },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-white">
      {/* Current slide image - full width, auto height */}
      <Image
        src={slides[currentSlide].image}
        alt={slides[currentSlide].alt}
        width={slides[currentSlide].width}
        height={slides[currentSlide].height}
        className="w-full h-auto"
        sizes="100vw"
        priority
      />

      {/* Slide indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6 sm:w-8 shadow-md"
                : "bg-white/50 hover:bg-white/70 w-1.5 sm:w-2 shadow-md"
            }`}
            aria-label={`スライド${index + 1}へ`}
          />
        ))}
      </div>
    </div>
  );
}
