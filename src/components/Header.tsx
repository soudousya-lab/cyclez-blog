"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar - matching main site */}
      <div className="bg-[#c41e3a] text-white text-xs py-1 px-4 text-center">
        <span>岡山にあるロードバイク・クロスバイク・スポーツ自転車・サイクルウェアを楽しめるサイクルショップ</span>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo - matching main site style */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              {/* Helmet icon */}
              <svg className="w-10 h-10 text-[#c41e3a]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <div className="ml-1">
                <span className="text-2xl font-bold text-gray-900">cycle</span>
                <span className="text-2xl font-bold text-[#c41e3a]">Z</span>
                <div className="text-[10px] text-gray-500 tracking-wider">ーサイクルゼットー</div>
              </div>
            </div>
            <span className="ml-2 text-sm text-[#c41e3a] font-medium border-l-2 border-[#c41e3a] pl-2">ブログ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#c41e3a] transition-colors text-sm"
            >
              記事一覧
            </Link>
            <Link
              href="/category/beginner"
              className="text-gray-700 hover:text-[#c41e3a] transition-colors text-sm"
            >
              初めての方へ
            </Link>
            <Link
              href="/category/maintenance"
              className="text-gray-700 hover:text-[#c41e3a] transition-colors text-sm"
            >
              メンテナンス
            </Link>
            <Link
              href="/category/course"
              className="text-gray-700 hover:text-[#c41e3a] transition-colors text-sm"
            >
              コース紹介
            </Link>
            <a
              href="https://cycle-z.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c41e3a] text-white px-5 py-2 rounded-full hover:bg-[#a01830] transition-colors flex items-center gap-2 text-sm"
            >
              店舗サイト
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#c41e3a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                記事一覧
              </Link>
              <Link
                href="/category/beginner"
                className="text-gray-700 hover:text-[#c41e3a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                初めての方へ
              </Link>
              <Link
                href="/category/maintenance"
                className="text-gray-700 hover:text-[#c41e3a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                メンテナンス
              </Link>
              <Link
                href="/category/course"
                className="text-gray-700 hover:text-[#c41e3a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                コース紹介
              </Link>
              <a
                href="https://cycle-z.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c41e3a] text-white px-5 py-2 rounded-full hover:bg-[#a01830] transition-colors text-center flex items-center justify-center gap-2"
              >
                店舗サイト
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
