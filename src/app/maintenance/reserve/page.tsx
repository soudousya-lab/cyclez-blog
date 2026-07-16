import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "メンテナンス予約",
  description:
    "cycleZ（サイクルゼット）のメンテナンス予約はお電話で承ります。点検・調整、チェーン洗浄、ブレーキ調整、タイヤ交換、オーバーホールなど、車体を拝見したうえでお見積りします。",
};

export default function MaintenanceReservePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="メンテナンス予約"
        subtitle="MAINTENANCE RESERVATION"
        breadcrumbs={[
          { label: "メンテナンス", href: "/maintenance" },
          { label: "予約" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed mb-2">
            メンテナンスのご予約は、お電話で承っております。
          </p>
          <p className="text-gray-700 leading-relaxed">
            症状や車体の状態をお伺いしたうえで、作業内容とおおよその納期をその場でお伝えできます。他店・通販でお求めのスポーツバイクもご相談いただけます。
          </p>
        </div>

        {/* 電話 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            お電話でのご予約
          </h2>
          <div className="text-center py-4">
            <p className="text-gray-600 text-sm mb-2">cycleZ（サイクルゼット）</p>
            <a
              href="tel:086-252-7744"
              className="inline-flex items-center gap-3 text-[#c41e3a] text-3xl md:text-4xl font-bold hover:opacity-80 transition-opacity"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              086-252-7744
            </a>
            <p className="text-gray-500 text-sm mt-2">営業時間 11:00〜19:00（水曜定休）</p>
          </div>
        </div>

        {/* お伝えいただきたいこと */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            お電話でお伝えいただきたいこと
          </h2>
          <ul className="space-y-3">
            {[
              "車種・メーカー（わからない場合はそのままで大丈夫です）",
              "気になっている症状（音鳴り、変速の不調、パンクなど）",
              "ご希望の日時",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 bg-[#c41e3a] rounded-full flex-shrink-0 mt-2" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 text-sm mt-6 leading-relaxed">
            ブレーキ・変速・パンクは、車体を拝見したうえでのお見積りとなります。メニューと料金の目安は
            <Link href="/maintenance" className="text-[#c41e3a] font-medium hover:underline mx-1">
              メンテナンスのページ
            </Link>
            でご確認いただけます。
          </p>
        </div>

        {/* 店舗情報 */}
        <div className="mt-8 bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-6">
          <p className="font-bold text-gray-900 mb-2">cycleZ（サイクルゼット）</p>
          <p className="text-gray-700 text-sm">〒700-0033 岡山県岡山市北区島田本町1-1-47</p>
          <p className="text-gray-700 text-sm">営業時間 11:00〜19:00 / 定休日 水曜日</p>
          <Link
            href="/access"
            className="inline-flex items-center gap-1 text-[#c41e3a] text-sm font-medium mt-2 hover:underline"
          >
            アクセスマップを見る
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
