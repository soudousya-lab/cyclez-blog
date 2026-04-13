"use client";

import { useEffect, useState } from "react";

/**
 * モバイル固定CTA
 * スマホ画面下部に「電話する」「アクセス」ボタンを固定表示
 * PCでは非表示（md以上で隠す）
 */
export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // スクロール後に表示（ファーストビューでは非表示）
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* 上部のグラデーション影 */}
      <div className="h-3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="flex">
          {/* 電話ボタン */}
          <a
            href="tel:086-252-7744"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#c41e3a] text-white font-bold text-sm active:bg-[#a01830] transition-colors"
            aria-label="電話する"
          >
            {/* 電話アイコン */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            電話する
          </a>
          {/* アクセスボタン */}
          <a
            href="/access"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white font-bold text-sm active:bg-gray-800 transition-colors"
            aria-label="アクセス"
          >
            {/* 地図ピンアイコン */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            アクセス
          </a>
        </div>
      </div>
    </div>
  );
}
