import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { staffMembers } from "@/lib/staff";

export const metadata: Metadata = {
  alternates: { canonical: "/about/staff" },
  title: "スタッフ紹介",
  description:
    "cycleZ（サイクルゼット）のスタッフをご紹介します。代表の岡田をはじめ、経験豊富なスタッフがお客様のサイクルライフをサポートします。",
};

export default function StaffListPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="スタッフ紹介"
        subtitle="STAFF"
        breadcrumbs={[
          { label: "cycleZについて", href: "/about" },
          { label: "スタッフ紹介" },
        ]}
      />

      {/* イントロ */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-10">
          <p className="text-gray-700 leading-relaxed text-center">
            cycleZでは、スタッフ全員が自転車を愛するサイクリスト。
            <br className="hidden md:block" />
            お客様一人ひとりに寄り添い、最高のサイクルライフをご提案いたします。
          </p>
        </div>

        {/* スタッフカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {staffMembers.map((staff) => (
            <Link
              key={staff.slug}
              href={`/about/staff/${staff.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-b-4 border-transparent group-hover:border-[#c41e3a] transition-all duration-300 group-hover:-translate-y-1">
                {/* 写真 */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* 役職バッジ */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#c41e3a] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {staff.role}
                    </span>
                  </div>
                </div>

                {/* 情報 */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {staff.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{staff.nameEn}</p>
                  <p className="text-[#c41e3a] font-bold text-sm mb-3">
                    {staff.catchphrase}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {staff.introduction}
                  </p>

                  {/* 得意分野タグ */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {staff.specialties.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-[#c41e3a]/10 text-[#c41e3a] px-2 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* 詳しく見る */}
                  <div className="mt-4 text-[#c41e3a] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    詳しく見る
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
