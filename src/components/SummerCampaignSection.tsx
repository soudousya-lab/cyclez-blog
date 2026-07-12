"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import { summerCampaign, type CampaignBike } from "@/data/summerCampaign";

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

function BikeCard({ bike, href }: { bike: CampaignBike; href: string }) {
  const off = bike.listPrice - bike.salePrice;
  const pct = Math.round((off / bike.listPrice) * 100);

  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <Image
          src={bike.image}
          alt={bike.alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 400px"
        />
        {/* 割引バッジ（大きく・左上） */}
        <div className="absolute top-0 left-0 bg-[#c41e3a] text-white pl-3 pr-4 py-1.5 rounded-br-2xl shadow-md">
          <span className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">
            {pct}
            <span className="text-sm sm:text-base align-top">%</span>
          </span>
          <span className="ml-1 text-xs font-bold tracking-wider">OFF</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-bold tracking-wide text-gray-500">
            {bike.brand}
          </span>
          <span className="text-[11px] text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
            サイズ {bike.size}
          </span>
        </div>
        <p className="mt-0.5 font-bold text-gray-900 text-base sm:text-lg leading-snug">
          {bike.model}
        </p>
        {bike.note && (
          <p className="mt-1 text-[11px] text-amber-700 font-medium">※{bike.note}</p>
        )}

        {/* 値引き表示（定価→特価を大きく） */}
        <div className="mt-3">
          <div className="text-xs text-gray-400">
            定価 <span className="line-through">{yen(bike.listPrice)}</span> から
          </div>
          <div className="mt-0.5 flex items-end gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#c41e3a] leading-none">
              {yen(bike.salePrice)}
            </span>
          </div>
          <div className="mt-2 inline-flex items-center bg-[#c41e3a] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
            {yen(off)} お得
          </div>

          {/* 値引きメーター */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>値引き率</span>
              <span className="font-bold text-[#c41e3a]">{pct}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-[#c41e3a] rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SummerCampaignSection() {
  const c = summerCampaign;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // 在庫あり（soldOutを除く）を価格の安い順に
  const bikes = c.bikes
    .filter((b) => !b.soldOut)
    .sort((a, b) => a.salePrice - b.salePrice);

  const stepPx = (t: HTMLDivElement) =>
    t.children.length > 1
      ? (t.children[1] as HTMLElement).offsetLeft - (t.children[0] as HTMLElement).offsetLeft
      : (t.children[0] as HTMLElement)?.clientWidth ?? 1;

  const onScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setActive(Math.round(t.scrollLeft / stepPx(t)));
  }, []);

  const go = (dir: -1 | 1) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * stepPx(t), behavior: "smooth" });
  };

  const toIndex = (i: number) => {
    const t = trackRef.current;
    if (!t || !t.children[i]) return;
    t.scrollTo({ left: (t.children[i] as HTMLElement).offsetLeft, behavior: "smooth" });
  };

  if (!c.active || bikes.length === 0) return null;

  const articleHref = `/blog/${c.articleSlug}`;
  const maxPct = Math.max(
    ...bikes.map((b) => Math.round(((b.listPrice - b.salePrice) / b.listPrice) * 100))
  );
  const maxOff = Math.max(...bikes.map((b) => b.listPrice - b.salePrice));

  return (
    <section
      id="summer-campaign"
      className="relative py-10 sm:py-14 md:py-20 bg-gradient-to-b from-amber-50 via-orange-50/70 to-white overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[#c41e3a] font-bold text-xs sm:text-sm tracking-[0.2em]">
              {c.eyebrow}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#c41e3a] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c41e3a]" />
              </span>
              <span className="text-xs font-bold text-[#c41e3a] tracking-widest">{c.badge}</span>
            </div>
            <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {c.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {c.lead}
            </p>

            {/* 値引き感を一目で（数値チップ） */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="inline-flex items-baseline gap-1 bg-white border border-orange-200 rounded-full px-4 py-1.5 shadow-sm">
                <span className="text-[11px] text-gray-500">最大</span>
                <span className="text-base sm:text-lg font-extrabold text-[#c41e3a]">{maxPct}%</span>
                <span className="text-[11px] font-bold text-[#c41e3a]">OFF</span>
              </span>
              <span className="inline-flex items-baseline gap-1 bg-white border border-orange-200 rounded-full px-4 py-1.5 shadow-sm">
                <span className="text-[11px] text-gray-500">最大</span>
                <span className="text-base sm:text-lg font-extrabold text-[#c41e3a]">{yen(maxOff)}</span>
                <span className="text-[11px] font-bold text-[#c41e3a]">引き</span>
              </span>
              <span className="inline-flex items-baseline gap-1 bg-white border border-orange-200 rounded-full px-4 py-1.5 shadow-sm">
                <span className="text-[11px] text-gray-500">下取り最大</span>
                <span className="text-base sm:text-lg font-extrabold text-[#c41e3a]">{yen(c.tradeInMax)}</span>
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* スライダー */}
        <div className="relative">
          {/* 前へ */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="前の特価車へ"
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-[40%] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-[#c41e3a] hover:text-white hover:border-[#c41e3a] transition-colors disabled:opacity-40"
            disabled={active <= 0}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {bikes.map((bike) => (
              <div
                key={`${bike.brand}-${bike.model}`}
                className="snap-start shrink-0 basis-[82%] sm:basis-[46%] lg:basis-[31.5%]"
              >
                <BikeCard bike={bike} href={articleHref} />
              </div>
            ))}
          </div>

          {/* 次へ */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="次の特価車へ"
            className="hidden sm:flex absolute -right-3 lg:-right-5 top-[40%] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-[#c41e3a] hover:text-white hover:border-[#c41e3a] transition-colors disabled:opacity-40"
            disabled={active >= bikes.length - 1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ドット */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {bikes.map((bike, i) => (
            <button
              key={`dot-${bike.brand}-${bike.model}`}
              type="button"
              onClick={() => toIndex(i)}
              aria-label={`${i + 1}台目へ`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-[#c41e3a]" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-[11px] sm:text-xs text-gray-500">
          スワイプで他の特価車も見られます。{c.note}
        </p>

        {/* CTA */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={articleHref}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#c41e3a] text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-[#a51830] transition-colors shadow-sm"
          >
            特価車の詳細を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white border border-[#c41e3a] text-[#c41e3a] font-bold text-sm px-7 py-3 rounded-full hover:bg-[#c41e3a] hover:text-white transition-colors"
          >
            在庫・試乗を相談する
          </Link>
        </div>
      </div>
    </section>
  );
}
