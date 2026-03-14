import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "お支払方法",
  description:
    "cycleZでご利用いただけるお支払い方法のご案内。現金、銀行振込、クレジットカード、分割払いショッピングクレジットに対応しています。",
};

export default function PaymentPage() {
  const methods = [
    {
      title: "現金でのお支払い",
      text: "店頭での現金でのお支払いが可能です。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "銀行振込でのお支払い",
      text: "銀行振込でのお支払いが可能です。振込先口座などは店頭にてご案内いたします。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "クレジットカードでのお支払い",
      text: "クレジットカードでのお支払いが可能です。ほとんど全てのクレジットカードを全店舗でご利用いただけます。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      title: "分割払いショッピングクレジット",
      text: "フリーローンの分割払いショッピングクレジットが可能です。期間限定で金利手数料無料のキャンペーン等も行っていますのでお気軽にお申し付けください。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <PageBanner
        title="お支払方法"
        subtitle="PAYMENT"
        breadcrumbs={[{ label: "お支払方法" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* イントロ */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            サイクルゼットでは多彩なお支払い方法をご用意しております。
          </p>
        </div>

        {/* 支払い方法 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {methods.map((method) => (
            <div
              key={method.title}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#c41e3a]/10 text-[#c41e3a] rounded-full flex items-center justify-center">
                  {method.icon}
                </div>
                <h2 className="font-bold text-gray-900">{method.title}</h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {method.text}
              </p>
            </div>
          ))}
        </div>

        {/* 注意事項 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-800 text-sm">
            ※上記お支払方法は店頭でのお支払い方法になります。ウェブショップでのお支払方法は異なりますのでご注意ください。
          </p>
        </div>
      </div>
    </main>
  );
}
