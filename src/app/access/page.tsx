import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "アクセス",
  description: "cycleZ（サイクルゼット）へのアクセス方法。JR岡山駅より徒歩約5分。岡山県岡山市北区島田本町1-1-47。",
};

export default function AccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="アクセスマップ"
        subtitle="ACCESS"
        breadcrumbs={[{ label: "アクセス" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* 店舗情報 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            店舗情報
          </h2>
          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <dt className="font-bold text-gray-900 sm:w-32 flex-shrink-0">店舗名</dt>
              <dd className="text-gray-700">cycleZ（サイクルゼット）</dd>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <dt className="font-bold text-gray-900 sm:w-32 flex-shrink-0">住所</dt>
              <dd className="text-gray-700">〒700-0033 岡山県岡山市北区島田本町1-1-47</dd>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <dt className="font-bold text-gray-900 sm:w-32 flex-shrink-0">電話番号</dt>
              <dd className="text-gray-700">
                <a href="tel:086-252-7744" className="text-[#c41e3a] font-bold hover:underline">086-252-7744</a>
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <dt className="font-bold text-gray-900 sm:w-32 flex-shrink-0">FAX</dt>
              <dd className="text-gray-700">086-252-8811</dd>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <dt className="font-bold text-gray-900 sm:w-32 flex-shrink-0">営業時間</dt>
              <dd className="text-gray-700">11:00〜19:00</dd>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <dt className="font-bold text-gray-900 sm:w-32 flex-shrink-0">定休日</dt>
              <dd className="text-gray-700">水曜日</dd>
            </div>
          </dl>
        </div>

        {/* Google Map */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            地図
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.5!2d133.918!3d34.667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQwJzAxLjIiTiAxMzPCsDU1JzA0LjgiRQ!5e0!3m2!1sja!2sjp!4v1!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="cycleZの地図"
            />
          </div>
        </div>

        {/* アクセス方法 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            アクセス方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            cycleZ（サイクルゼット）はアクセス良好の立地です。ご都合の良い交通手段をお選びください。
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 bg-[#c41e3a] text-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">徒歩</h3>
                <p className="text-gray-700">JR岡山駅より徒歩約5分。</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 bg-[#c41e3a] text-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">お車</h3>
                <p className="text-gray-700 leading-relaxed">
                  土・日曜日は軽自動車合わせて3台駐車可能です。分からないことがあればお気軽に086-252-7744までお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
