"use client";

import dynamic from "next/dynamic";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";

// Leafletはwindowオブジェクトに依存するためSSR無効化
const RouteMap = dynamic(() => import("@/components/RouteMap"), { ssr: false });

export default function RoutesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="おすすめサイクリングコース"
        subtitle="RIDE ROUTES"
        breadcrumbs={[{ label: "おすすめサイクリングコース" }]}
      />

      {/* イントロ */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-4">
        <p className="text-gray-700 leading-relaxed">
          cycleZがおすすめする岡山周辺のサイクリングコースをご紹介します。
          初心者の方でも安心して走れるフラットなコースから、
          ベテランライダーも満足のヒルクライムコースまで、
          レベルに合ったルートをお選びください。
        </p>
      </div>

      {/* マップ + ルートカード */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <RouteMap />
      </div>

      {/* CTA */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            ルートの詳細はスタッフまで
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            各コースの走り方のコツ、補給ポイント、おすすめの時期など、
            <br className="hidden md:block" />
            スタッフが丁寧にご案内します。お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#c41e3a] hover:bg-[#a01830] text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
