"use client";

import { FaBicycle } from "react-icons/fa";
import { MdPedalBike } from "react-icons/md";

// 背景装飾用の自転車アイコン
export function BikePatternBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div className="absolute top-10 left-10">
        <FaBicycle size={60} className="text-[#c41e3a]" />
      </div>
      <div className="absolute top-20 right-20 rotate-12">
        <MdPedalBike size={40} className="text-[#c41e3a]" />
      </div>
      <div className="absolute bottom-20 left-1/4 -rotate-6">
        <FaBicycle size={50} className="text-[#c41e3a]" />
      </div>
      <div className="absolute bottom-10 right-10 rotate-[-15deg]">
        <MdPedalBike size={45} className="text-[#c41e3a]" />
      </div>
    </div>
  );
}

// セクション区切り用のチェーンライン
export function ChainDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-8 opacity-20">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full border-2 border-[#c41e3a]" />
        ))}
      </div>
      <FaBicycle size={24} className="text-[#c41e3a]" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full border-2 border-[#c41e3a]" />
        ))}
      </div>
    </div>
  );
}

// セクションタイトル用の装飾
export function SectionDecorator({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center gap-3">
      <FaBicycle size={20} className="text-[#c41e3a] opacity-30" />
      {children}
      <FaBicycle size={20} className="text-[#c41e3a] opacity-30 scale-x-[-1]" />
    </div>
  );
}
