"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top bar - matching main site exactly */}
      <div className="bg-[#c41e3a] text-white text-[9px] sm:text-[10px] md:text-xs py-1 sm:py-1.5 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-0.5 md:gap-0">
          <span className="text-center md:text-left">岡山のロードバイク・サイクルウェア専門店</span>
          <span className="hidden md:block">営業時間【11：00〜19：00】定休日：水曜日　〒700-0033 岡山県岡山市北区島田本町1−1−47</span>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 lg:h-24">
            {/* Logo - using actual logo image */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="cycleZ - サイクルゼット"
                width={180}
                height={60}
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Social icons + Contact (desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* LINE */}
              <a href="https://page.line.me/vdn8858u" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#06C755">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/cyclez2015/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFDC80"/>
                      <stop offset="50%" stopColor="#F56040"/>
                      <stop offset="100%" stopColor="#C13584"/>
                    </linearGradient>
                  </defs>
                  <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Access */}
              <a href="https://cycle-z.com/#access" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 hover:text-[#c41e3a] text-sm">
                <svg className="w-4 h-4 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                アクセス
              </a>

              {/* Phone */}
              <a href="tel:086-252-7744" className="flex items-center gap-1 text-[#c41e3a] font-bold text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                086-252-7744
              </a>

              {/* Contact button */}
              <a
                href="https://cycle-z.com/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c41e3a] text-white px-6 py-2.5 rounded-full hover:bg-[#a01830] transition-colors flex items-center gap-2 text-sm font-medium"
              >
                お問い合わせ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニュー"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar - matching main site */}
      <nav className="hidden md:block border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex justify-center gap-0">
            <li>
              <a href="https://cycle-z.com/#news" target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#c41e3a]">
                お知らせ
              </a>
            </li>
            <li>
              <a href="https://cycle-z.com/beginner/" target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#c41e3a]">
                初めての方へ
              </a>
            </li>
            <li>
              <a href="https://cycle-z.com/maintenance/" target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#c41e3a]">
                メンテナンス
              </a>
            </li>
            <li>
              <a href="https://cycle-z.com/fitting/" target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#c41e3a]">
                フィッティング
              </a>
            </li>
            <li>
              <a href="https://cycle-z.com/about/" target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#c41e3a]">
                CycleZとは？
              </a>
            </li>
            <li>
              <a href="https://cycle-z.com/lineup/" target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#c41e3a]">
                ラインナップ
              </a>
            </li>
            <li>
              <a href="https://cycle-z.com/faq/" target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#c41e3a]">
                よくある質問
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 border-t bg-white">
          <div className="flex flex-col">
            <a href="https://cycle-z.com/#news" className="px-6 py-3 text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50">お知らせ</a>
            <a href="https://cycle-z.com/beginner/" className="px-6 py-3 text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50">初めての方へ</a>
            <a href="https://cycle-z.com/maintenance/" className="px-6 py-3 text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50">メンテナンス</a>
            <a href="https://cycle-z.com/fitting/" className="px-6 py-3 text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50">フィッティング</a>
            <a href="https://cycle-z.com/about/" className="px-6 py-3 text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50">CycleZとは？</a>
            <a href="https://cycle-z.com/lineup/" className="px-6 py-3 text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50">ラインナップ</a>
            <a href="https://cycle-z.com/faq/" className="px-6 py-3 text-gray-700 hover:text-[#c41e3a] hover:bg-gray-50">よくある質問</a>
            <div className="px-6 py-4 border-t mt-2">
              <a
                href="https://cycle-z.com/#contact"
                className="block w-full bg-[#c41e3a] text-white px-5 py-3 rounded-full hover:bg-[#a01830] transition-colors text-center font-medium"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
