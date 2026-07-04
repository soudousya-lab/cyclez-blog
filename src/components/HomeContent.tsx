"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import ProgressRing from "./ProgressRing";
import type { PostData } from "@/lib/posts";
import { getCategoryLabel, getCategoryColor } from "@/lib/categories";
import DiagnosisQuiz from "./DiagnosisQuiz";
import { MdPedalBike } from "react-icons/md";
import SearchIntentAnswer from "./SearchIntentAnswer";

// 回転するホイールSVG（CTA装飾用）
function SpinningWheel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`animate-spin-slow ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="32" cy="32" r="30" className="text-white/10" />
      <circle cx="32" cy="32" r="20" className="text-white/10" />
      <circle cx="32" cy="32" r="4" className="text-white/20" fill="currentColor" />
      {/* スポーク */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="32" y1="8" x2="32" y2="28"
          className="text-white/10"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
    </svg>
  );
}

// 緊急判定：タイトルに「緊急」「至急」「重要」を含むか
function isUrgentPost(title: string): boolean {
  return /緊急|至急|重要/.test(title);
}

// スクロールで自動再生する動画コンポーネント
function AutoPlayVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      {/* 再生中でないときはオーバーレイ */}
      <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center ${isInView ? "opacity-0" : "opacity-100"}`}>
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-[#c41e3a] ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface HomeContentProps {
  latestNews: PostData[];
  eventPosts: PostData[];
  latestPosts: PostData[];
}

export default function HomeContent({ latestNews, eventPosts, latestPosts }: HomeContentProps) {
  return (
    <>
      {/* ニュースティッカー（緊急時は赤ライン付き） */}
      {latestNews.length > 0 && (
        <div className={`border-b shadow-sm ${
          isUrgentPost(latestNews[0].title)
            ? "bg-white border-[#c41e3a]"
            : "bg-white border-gray-100"
        }`}>
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] sm:text-xs flex-shrink-0 font-mono text-gray-400">
              {format(new Date(latestNews[0].date), "MM/dd", { locale: ja })}
            </span>
            {isUrgentPost(latestNews[0].title) ? (
              <span className="bg-[#c41e3a] text-white text-[10px] px-2 py-0.5 rounded flex-shrink-0 font-bold">
                緊急
              </span>
            ) : (
              (() => {
                const color = getCategoryColor(latestNews[0].category);
                return (
                  <span className={`${color.bg} ${color.text} text-[10px] px-2 py-0.5 rounded flex-shrink-0 font-bold`}>
                    {getCategoryLabel(latestNews[0].category)}
                  </span>
                );
              })()
            )}
            <Link
              href={`/blog/${latestNews[0].slug}`}
              className={`text-xs sm:text-sm truncate flex-1 font-medium transition-colors ${
                isUrgentPost(latestNews[0].title)
                  ? "text-gray-900 font-bold hover:text-[#c41e3a]"
                  : "text-gray-800 hover:text-[#c41e3a]"
              }`}
            >
              {latestNews[0].title}
            </Link>
          </div>
        </div>
      )}

      {/* ファーストビュー — 店舗の信念を3秒で伝える */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
            「何から始めればいいかわからない」
            <br className="hidden sm:block" />
            その気持ち、私たちも同じでした。
          </p>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            cycleZは、自転車選びからウェア・旅の楽しみ方まで、
            <br className="hidden md:block" />
            あなたのサイクルライフをトータルで提案するショップです。
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <Link href="/lineup" className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-[#c41e3a] hover:text-white transition-colors">試乗車多数</Link>
            <Link href="/first/beginner" className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-[#c41e3a] hover:text-white transition-colors">初心者講習会あり</Link>
            <Link href="/maintenance" className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-[#c41e3a] hover:text-white transition-colors">購入後もサポート</Link>
          </div>
        </div>
      </section>

      <SearchIntentAnswer
        eyebrow="岡山でロードバイク・クロスバイクを始めたい方へ"
        title="cycleZは、購入前の相談からメンテナンス、イベント参加まで一店で相談できる岡山駅近くのスポーツ自転車店です。"
        answer="初めての一台を選ぶ人、久しぶりに自転車を再開したい人、買った後の整備が不安な人に向けて、車体・ウェア・フィッティング・メンテナンス・ライドイベントまでまとめて提案します。押し売りではなく、使い方や予算を聞きながら一緒に選ぶ接客を大切にしています。"
        facts={[
          "岡山市北区島田本町、岡山駅から徒歩圏内",
          "ロードバイク・クロスバイク・サイクルウェアを相談可能",
          "初心者講習会やイベントで購入後の継続もサポート",
          "メンテナンスや修理相談は電話・予約フォームから受付",
        ]}
        primaryLink={{ href: "/first", label: "初めての方向けを見る" }}
        secondaryLink={{ href: "/maintenance", label: "メンテナンスを見る" }}
      />

      {/* バイク診断バナーCTA */}
      <section className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <Link
          href="#bike-diagnosis"
          className="block max-w-6xl mx-auto px-4 py-5 sm:py-6"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("bike-diagnosis")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c41e3a] flex items-center justify-center flex-shrink-0 animate-pulse">
                <MdPedalBike className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">どのバイクが合う？ 5問でわかるバイク診断</p>
                <p className="text-gray-300 text-xs mt-0.5 hidden sm:block">所要時間30秒 — あなたの使い方・予算に合った1台をご提案</p>
              </div>
            </div>
            <div className="flex-shrink-0 bg-[#c41e3a] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full hover:bg-[#a01830] transition-colors">
              診断する →
            </div>
          </div>
        </Link>
      </section>

      {/* お知らせ一覧 NEWS */}
      <section className="py-10 sm:py-14 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <SectionHeader
            title="お知らせ"
            subtitle="NEWS"
          />
          <div className="divide-y divide-gray-100">
            {latestPosts.map((post, index) => {
              const urgent = isUrgentPost(post.title);
              const color = getCategoryColor(post.category);
              return (
                <ScrollReveal key={post.slug} delay={index * 50}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`group flex items-start sm:items-center gap-2 sm:gap-3 py-3 sm:py-3.5 transition-all px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-lg ${
                      urgent
                        ? "bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-400"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    {/* 日付（小さめ） */}
                    <span className={`text-[10px] sm:text-xs flex-shrink-0 font-mono pt-0.5 sm:pt-0 w-10 sm:w-12 ${
                      urgent ? "text-gray-900/50" : "text-gray-400"
                    }`}>
                      {format(new Date(post.date), "MM/dd", { locale: ja })}
                    </span>
                    {/* カテゴリタグ（色分け / 緊急は黒黄色） */}
                    {urgent ? (
                      <span className="bg-gray-900 text-yellow-400 text-[10px] px-2 py-0.5 rounded flex-shrink-0 font-bold whitespace-nowrap animate-pulse-urgent">
                        緊急
                      </span>
                    ) : (
                      <span className={`${color.bg} ${color.text} text-[10px] px-2 py-0.5 rounded flex-shrink-0 font-bold whitespace-nowrap`}>
                        {getCategoryLabel(post.category)}
                      </span>
                    )}
                    {/* タイトル */}
                    <span className={`text-sm leading-snug flex-1 transition-colors line-clamp-2 sm:truncate ${
                      urgent
                        ? "text-gray-900 font-bold group-hover:text-yellow-700"
                        : "text-gray-800 group-hover:text-[#c41e3a]"
                    }`}>
                      {post.title}
                    </span>
                    {/* 矢印（PC） */}
                    <svg className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 hidden sm:block ${
                      urgent ? "text-yellow-500 group-hover:text-yellow-700" : "text-gray-300 group-hover:text-[#c41e3a]"
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal delay={300}>
            <div className="text-center mt-8">
              <Link
                href="/category/news"
                className="group inline-flex items-center gap-2 text-[#c41e3a] text-sm font-medium hover:underline underline-offset-4"
              >
                お知らせ一覧を見る
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* 動画紹介 MOVIE（3本統合） */}
      <section className="py-10 sm:py-14 md:py-20 bg-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-10 right-0 w-32 h-32 opacity-[0.03]">
          <SpinningWheel className="w-full h-full text-gray-900" />
        </div>
        <div className="absolute bottom-10 left-0 w-24 h-24 opacity-[0.03]">
          <SpinningWheel className="w-full h-full text-gray-900" />
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            title="動画紹介"
            subtitle="MOVIE"
            description="サイクルゼットの雰囲気やイベント、自転車ライフにぴったりな情報を動画でご紹介いたします。"
          />

          {/* メイン動画（大きく表示） */}
          <ScrollReveal>
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5 mb-4 sm:mb-6">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/_lI89tCg5OQ"
                title="cycleZ 店舗紹介"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </ScrollReveal>

          {/* サブ動画（2本横並び） */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 hover:shadow-2xl transition-shadow duration-300">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/oslYFlo1O4Q"
                  title="cycleZ 動画"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 hover:shadow-2xl transition-shadow duration-300">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/tPrJscpKSsc"
                  title="cycleZ 動画"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
          </div>

          {/* YouTubeチャンネルリンク */}
          <ScrollReveal delay={300}>
            <div className="text-center mt-8 sm:mt-10">
              <a
                href="https://www.youtube.com/@cyclez1504"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg font-medium text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTubeチャンネルを見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* イベント開催情報 EVENT（背景動画 + 透過オーバーレイ） */}
      <section className="relative py-10 sm:py-14 md:py-20 overflow-hidden">
        {/* 背景動画 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "scale(1.5)" }}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/oslYFlo1O4Q?autoplay=1&mute=1&loop=1&playlist=oslYFlo1O4Q&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
              title="背景動画"
              allow="autoplay; encrypted-media"
              style={{ border: "none" }}
            />
          </div>
          <div className="absolute inset-0 bg-white/90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-3 sm:px-4">
          <SectionHeader
            title="イベント開催情報"
            subtitle="EVENT"
            description="サイクルゼットでは、自転車をもっともっと楽しんでいただけるよう、定期的にイベントを開催しています。気になるイベントがあれば、ぜひお気軽にご参加ください。"
          />
          <div className="divide-y divide-gray-200">
            {eventPosts.map((post, index) => {
              const urgent = isUrgentPost(post.title);
              const color = getCategoryColor(post.category);
              return (
                <ScrollReveal key={post.slug} delay={index * 80}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`group flex items-start sm:items-center gap-2 sm:gap-3 py-3 sm:py-3.5 transition-all px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-lg ${
                      urgent
                        ? "bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-400"
                        : "hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <span className={`text-[10px] sm:text-xs flex-shrink-0 font-mono pt-0.5 sm:pt-0 w-10 sm:w-12 ${
                      urgent ? "text-gray-900/50" : "text-gray-400"
                    }`}>
                      {format(new Date(post.date), "MM/dd", { locale: ja })}
                    </span>
                    {urgent ? (
                      <span className="bg-gray-900 text-yellow-400 text-[10px] px-2 py-0.5 rounded flex-shrink-0 font-bold whitespace-nowrap animate-pulse-urgent">
                        緊急
                      </span>
                    ) : (
                      <span className={`${color.bg} ${color.text} text-[10px] px-2 py-0.5 rounded flex-shrink-0 font-bold whitespace-nowrap`}>
                        {getCategoryLabel(post.category)}
                      </span>
                    )}
                    <span className={`text-sm leading-snug flex-1 transition-colors line-clamp-2 sm:truncate ${
                      urgent
                        ? "text-gray-900 font-bold group-hover:text-yellow-700"
                        : "text-gray-800 group-hover:text-[#c41e3a]"
                    }`}>
                      {post.title}
                    </span>
                    <svg className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 hidden sm:block ${
                      urgent ? "text-yellow-500 group-hover:text-yellow-700" : "text-gray-300 group-hover:text-[#c41e3a]"
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal delay={400}>
            <div className="text-center mt-8">
              <Link
                href="/category/event"
                className="group inline-flex items-center gap-2 bg-[#c41e3a] text-white px-7 py-3 rounded-full hover:bg-[#a01830] transition-all hover:shadow-lg font-medium text-sm"
              >
                一覧を見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* サイクルZが選ばれる理由 REASON（プログレスリング + カウントアップ付き） */}
      <section className="py-10 sm:py-14 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            title="サイクルZが選ばれる理由"
            subtitle="REASON"
            description="自転車ライフを始めたくなったら、サイクルゼットにお越しください。お好みや体格、そしてご予算に合わせ、あなただけの一台をお探しします。"
          />

          {/* 理由01 */}
          <ScrollReveal direction="left">
            <div className="flex flex-col md:flex-row items-stretch mb-1 rounded-2xl overflow-hidden shadow-lg">
              <Link href="/first" className="md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] group block">
                <Image
                  src="/images/reason/reason-beginner.jpg"
                  alt="始めての方大歓迎"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center text-left">
                <ProgressRing number="01" size={80} className="mb-3" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">始めての方大歓迎</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  「ロードバイクって楽しそう！でも何から揃えればよいのかわからない...」そんな方もご心配なく！まずは自転車を見に来るだけのつもりで、お店に遊びに来てみてください。無理におすすめするようなことはいたしませんので、ロードバイクについて知りたいことがあれば何でも気軽にお声をかけてくださいね。
                </p>
                <Link href="/first" className="inline-flex items-center gap-1.5 text-[#c41e3a] text-sm font-medium mt-4 hover:gap-3 transition-all">
                  もっと見る
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* 理由02 */}
          <ScrollReveal direction="right">
            <div className="flex flex-col md:flex-row-reverse items-stretch mb-1 rounded-2xl overflow-hidden shadow-lg">
              <Link href="/lineup" className="md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] group block">
                <Image
                  src="/images/reason/reason-apparel.jpg"
                  alt="おしゃれなウエアが豊富です"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center text-left">
                <ProgressRing number="02" size={80} className="mb-3" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">おしゃれなウエアが豊富です</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  「どうせならオシャレにライドしたい！」「小物にもこだわりたい！」サイクルゼットのオーナーはアパレル出身。店内には自転車だけでなくちょっと他にはないデザインのウエアや小物もたくさん揃っています。バイクのカラーに合わせたり、あなたらしさ溢れるコーディネートのご提案も得意です。
                </p>
                <Link href="/lineup" className="inline-flex items-center gap-1.5 text-[#c41e3a] text-sm font-medium mt-4 hover:gap-3 transition-all">
                  もっと見る
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* 理由03 */}
          <ScrollReveal direction="left">
            <div className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden shadow-lg">
              <Link href="/maintenance" className="md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] group block">
                <Image
                  src="/images/reason/reason-maintenance.jpg"
                  alt="アフターフォローもおまかせください"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center text-left">
                <ProgressRing number="03" size={80} className="mb-3" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">アフターフォローもおまかせください</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  自転車を長く快適に乗り続けるには、やはり定期的なメンテナンスが欠かせません。近くまでお越しの際は是非サイクルゼットにもお寄りください。タイヤの空気入れや各ボルトの締め直し、車輪の揺れのチェックなどちょっとしたメンテナンスにも対応しています。おうちでできる点検の手順などもご指導いたします。
                </p>
                <Link href="/maintenance" className="inline-flex items-center gap-1.5 text-[#c41e3a] text-sm font-medium mt-4 hover:gap-3 transition-all">
                  もっと見る
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* バイク診断 BIKE DIAGNOSIS（埋め込み） */}
      <section id="bike-diagnosis" className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-[#1a1a2e] to-[#0f3460] relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#c41e3a] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider">
              無料・30秒で完了
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              あなたにぴったりの一台は？
            </h2>
            <p className="text-xs sm:text-sm tracking-[0.3em] text-gray-400 mt-2 font-light">
              BIKE DIAGNOSIS
            </p>
            <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed">
              5つの質問に答えるだけで、使い方・予算・好みに合った<br className="hidden sm:block" />スポーツバイクが見つかります。
            </p>
          </div>
          <ScrollReveal>
            <DiagnosisQuiz />
          </ScrollReveal>
        </div>
      </section>

      {/* 中間バナー（背景動画 + 透過オーバーレイ） */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "scale(1.5)" }}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/tPrJscpKSsc?autoplay=1&mute=1&loop=1&playlist=tPrJscpKSsc&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
              title="背景動画"
              allow="autoplay; encrypted-media"
              style={{ border: "none" }}
            />
          </div>
          <Image
            src="/images/cta/contact.jpg"
            alt=""
            fill
            className="object-cover -z-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60" />
        </div>
        <ScrollReveal>
          <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
            <p className="text-[#c41e3a] text-xs font-bold tracking-[0.2em] uppercase mb-3">YOUR CYCLING LIFE</p>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 leading-relaxed">
              あなたの自転車ライフを<br className="sm:hidden" />トータルサポート
            </h2>
            <p className="text-white/70 text-sm max-w-lg mx-auto">
              バイク選びからウエア、メンテナンス、ライドイベントまで。cycleZは岡山で自転車ライフを楽しむすべてをお手伝いします。
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* おススメコンテンツ RECOMMENDED CONTENTS */}
      <section className="py-10 sm:py-14 md:py-20 bg-gray-50/80">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            title="おススメコンテンツ"
            subtitle="RECOMMENDED CONTENTS"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { href: "/first", image: "/images/reason/reason-beginner.jpg", title: "初心者の方へ", sub: "MESSAGE FOR BEGINNERS", desc: "ロードバイクに乗ると言っても、流線型のいかついヘルメットやピタピタの黒いサイクルパンツを履く必要はありません。気軽にロードバイクに乗りたい方、大歓迎。" },

              { href: "/maintenance", image: "/images/reason/reason-maintenance.jpg", title: "メンテナンス", sub: "MAINTENANCE", desc: "ロードバイクに長く快適に乗るためには、なんといってもメンテナンスが大切です。何かわからないことがあったら何でも説明いたします。" },
              { href: "/about/staff", image: "/images/staff_page/31227_0.jpg", title: "スタッフ紹介", sub: "OUR STAFF", desc: "cycleZのスタッフをご紹介します。自転車のこと、ウエアのこと、何でもお気軽にご相談ください。" },
            ].map((item, index) => (
              <ScrollReveal key={item.href} delay={index * 150}>
                <Link href={item.href} className="group block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 text-left">
                    <p className="text-[#c41e3a] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">{item.sub}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#c41e3a] transition-colors">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[#c41e3a] text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                      もっと見る
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* HOW TO タグクラウド（背景動画 + 透過オーバーレイ） */}
      <section className="relative py-10 sm:py-14 md:py-20 overflow-hidden">
        {/* 背景動画 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "scale(1.5)" }}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/v3wJXLkxkv8?autoplay=1&mute=1&loop=1&playlist=v3wJXLkxkv8&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
              title="背景動画"
              allow="autoplay; encrypted-media"
              style={{ border: "none" }}
            />
          </div>
          <div className="absolute inset-0 bg-gray-50/92" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <SectionHeader
            title="お役立ち情報"
            subtitle="HOW TO"
            description="自転車ライフに役立つ情報を、動画や記事でわかりやすくまとめています。"
          />
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {[
                { label: "空気の入れ方", href: "/maintenance" },
                { label: "チェーン洗浄", href: "/maintenance" },
                { label: "パンク修理", href: "/maintenance" },
                { label: "輪行のやり方", href: "/first/rinko" },
                { label: "初心者講習会", href: "/first/beginner" },
                { label: "フィッティング", href: "/fitting" },
                { label: "メンテナンス予約", href: "/maintenance/reserve" },
                { label: "バイク診断", href: "/diagnosis" },
                { label: "取扱ブランド", href: "/lineup" },
                { label: "女性のお客様へ", href: "/first/women" },
                { label: "カフェライド", href: "/first/cafe-ride" },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="group inline-flex items-center gap-1.5 bg-gray-100 hover:bg-[#c41e3a] text-gray-700 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md"
                >
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  {tag.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section（背景動画 + 透過オーバーレイ） */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          {/* 背景動画（YouTube iframe、ミュート自動再生） */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "scale(1.5)" }}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_lI89tCg5OQ?autoplay=1&mute=1&loop=1&playlist=_lI89tCg5OQ&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
              title="背景動画"
              allow="autoplay; encrypted-media"
              style={{ border: "none" }}
            />
          </div>
          {/* フォールバック画像（動画読み込み前） */}
          <Image
            src="/images/cta/contact.jpg"
            alt=""
            fill
            className="object-cover -z-10"
            sizes="100vw"
          />
          {/* 透過オーバーレイ（赤系、少し透けて動画が見える） */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/85 to-[#8b1428]/85" />
        </div>
        {/* 装飾ホイール */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-100">
          <SpinningWheel className="w-full h-full" />
        </div>
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-100">
          <SpinningWheel className="w-full h-full" />
        </div>

        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              ロードバイクのことなら<br />何でもご相談ください
            </h2>
            <p className="text-white/80 mb-8 sm:mb-10 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
              cycleZでは初心者の方向けに、無料の講習会を毎月開催しています。お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-white text-[#c41e3a] px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-gray-50 transition-all hover:shadow-xl font-bold text-sm sm:text-base"
              >
                お問い合わせ
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-white/10 transition-all font-medium border-2 border-white/70 hover:border-white text-sm sm:text-base"
              >
                CycleZとは？
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
