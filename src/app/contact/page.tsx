import { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "cycleZ（サイクルゼット）へのお問い合わせ。お電話（086-252-7744）またはフォームでお気軽にどうぞ。",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="お問い合わせ"
        subtitle="CONTACT"
        breadcrumbs={[{ label: "お問い合わせ" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <p className="text-gray-700 leading-relaxed mb-2">
            お問い合わせは24時間対応しております。早急にご返信いたしますので、少々お待ちください。
          </p>
          <p className="text-gray-700 leading-relaxed">
            お急ぎの場合は、下記連絡先にお電話にてご連絡くださいますようお願いいたします。
          </p>
        </div>

        {/* 電話 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            お電話でのお問い合わせ
          </h2>
          <div className="text-center py-4">
            <p className="text-gray-600 text-sm mb-2">cycleZ（サイクルゼット）</p>
            <a href="tel:086-252-7744" className="inline-flex items-center gap-3 text-[#c41e3a] text-3xl md:text-4xl font-bold hover:opacity-80 transition-opacity">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              086-252-7744
            </a>
            <p className="text-gray-500 text-sm mt-2">営業時間 11:00〜19:00（水曜定休）</p>
          </div>
        </div>

        {/* メールフォーム案内 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            メールでのお問い合わせ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            メールでのお問い合わせは下記アドレスまでお送りください。
          </p>
          <div className="text-center py-4">
            <p className="text-gray-700 text-lg">
              <span className="font-medium">メール：</span>
              <span className="text-[#c41e3a] font-bold">info@cycle-z.com</span>
            </p>
          </div>
        </div>

        {/* 店舗情報 */}
        <div className="mt-8 bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-6">
          <p className="font-bold text-gray-900 mb-2">cycleZ（サイクルゼット）</p>
          <p className="text-gray-700 text-sm">〒700-0033 岡山県岡山市北区島田本町1-1-47</p>
          <p className="text-gray-700 text-sm">営業時間 11:00〜19:00 / 定休日 水曜日</p>
          <Link href="/access" className="inline-flex items-center gap-1 text-[#c41e3a] text-sm font-medium mt-2 hover:underline">
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
