"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressRingProps {
  number: string;      // "01", "02", "03"
  size?: number;       // SVGのサイズ（px）
  strokeWidth?: number;
  className?: string;
}

/**
 * スクロールで表示されたときにリングが描画されるプログレスリングコンポーネント
 */
export default function ProgressRing({ number, size = 80, strokeWidth = 3, className = "" }: ProgressRingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* 背景リング */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-[#c41e3a]/10"
        />
        {/* アニメーションリング */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-[#c41e3a]"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: isVisible ? 0 : circumference,
            transition: "stroke-dashoffset 1.2s ease-out",
          }}
        />
      </svg>
      {/* 中央の数字 */}
      <span
        className={`absolute text-2xl md:text-3xl font-black text-[#c41e3a]/30 transition-all duration-700 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {number}
      </span>
    </div>
  );
}
