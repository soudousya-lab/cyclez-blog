"use client";

import { useEffect, useState } from "react";

/**
 * フローティングSNSボタン
 * 画面右下に固定表示されるInstagram・YouTube・LINEのリンクボタン
 */
export default function FloatingSns() {
  // マウント時のフェードインアニメーション用
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 少し遅延させてフェードインを見せる
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-4 z-50 flex flex-col gap-3 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Instagram */}
      <a
        href="https://www.instagram.com/cyclez2015/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex items-center justify-center w-10 h-10 md:w-[44px] md:h-[44px] rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 shadow-lg transition-transform hover:scale-110"
      >
        {/* Instagram アイコン */}
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608C4.519 2.567 5.786 2.293 7.152 2.233 8.418 2.175 8.798 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.13 4.602.393 3.635 1.36 2.668 2.327 2.405 3.5 2.347 4.778.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.321 2.451 1.288 3.418.967.967 2.14 1.23 3.418 1.288C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.451-.321 3.418-1.288.967-.967 1.23-2.14 1.288-3.418.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.321-2.451-1.288-3.418C19.398.393 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-10.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/@cyclez1504"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="flex items-center justify-center w-10 h-10 md:w-[44px] md:h-[44px] rounded-full bg-red-600 shadow-lg transition-transform hover:scale-110"
      >
        {/* YouTube アイコン */}
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a2.994 2.994 0 00-2.107-2.117C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.391.523A2.994 2.994 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 002.107 2.117c1.886.523 9.391.523 9.391.523s7.505 0 9.391-.523a2.994 2.994 0 002.107-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>

      {/* LINE — URLが設定されるまで非表示 */}
      {/* TODO: LINE公式アカウントのURLを設定したらコメントアウトを外す */}
    </div>
  );
}
