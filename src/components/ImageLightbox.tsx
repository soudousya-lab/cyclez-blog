"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  // 本文画像の実寸法（プリビルドのマニフェスト由来）。あれば高さを予約しCLSを防ぐ。
  width?: number;
  height?: number;
}

// ブログ記事内の画像をクリックで拡大表示するコンポーネント。
// サムネイルは next/image を通して自動リサイズ/WebP配信（原寸配信をやめ読み込みを軽くする）。
// 拡大表示だけは原寸の <img> を必要時に読み込む。
export default function ImageLightbox({ src, alt, className = "", width, height }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  // ブログ本文の表示幅（max-w-2xl = 672px）に合わせて配信サイズを絞る
  const sizes = "(max-width: 768px) 100vw, 672px";
  const hasDims = typeof width === "number" && typeof height === "number" && width > 0 && height > 0;

  return (
    <>
      {hasDims ? (
        // 実寸法あり: アスペクト比が確定するので読み込み前から高さを予約（レイアウトシフト無し）
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={`${className} h-auto cursor-zoom-in`}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        // 実寸法なし（マニフェスト未収録の新規画像など）: 寸法不明でも最適化はかける
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={sizes}
          style={{ width: "100%", height: "auto" }}
          className={`${className} cursor-zoom-in`}
          onClick={() => setIsOpen(true)}
        />
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="閉じる"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* 拡大時は原寸を見せたいので next/image を通さず素の img で読み込む */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
