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
      className={`fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-3 transition-opacity duration-500 ${
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

      {/* LINE */}
      <a
        href="https://line.me/R/ti/p/@vdn8858u"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINE"
        className="flex items-center justify-center w-10 h-10 md:w-[44px] md:h-[44px] rounded-full bg-[#06C755] shadow-lg transition-transform hover:scale-110"
      >
        {/* LINE アイコン */}
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      </a>
    </div>
  );
}
