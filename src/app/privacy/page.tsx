import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "個人情報保護方針",
  description: "cycleZ（サイクルゼット）のプライバシーポリシー。個人情報保護法及び電気通信事業法を遵守しています。",
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="プライバシーポリシー"
        subtitle="PRIVACY POLICY"
        breadcrumbs={[{ label: "個人情報保護方針" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="prose-cyclez text-gray-700 leading-relaxed space-y-6">
            <p>
              cycleZ（サイクルゼット）のウェブサイト（以下「本サイト」という）は、cycleZ（サイクルゼット）（以下「当社」という）が運営しています。
            </p>

            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>当社では、本サイトにおいて提供するサービスの円滑な運営に必要な範囲で、本サイトを利用される皆様の情報を収集しています。</li>
              <li>収集した情報は、個人情報を保護するため、以下に示すプライバシーポリシーに基づき、適切に取り扱います。</li>
              <li>本サイトを利用する前に、このプライバシーポリシーをお読みください。</li>
            </ul>

            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-7 bg-[#c41e3a] rounded-full flex-shrink-0" />
              基本方針について
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>当社は、個人情報保護法及び通信の秘密に係る電気通信事業法の規定その他の関係法令を遵守します。</li>
              <li>当社を利用される皆様の個人情報がプライバシーにかかわる情報であることを認識し、その適切な管理に努めます。</li>
              <li>当社はEUの策定したGDPRの規定にそっています。</li>
              <li>当社は、電気通信事業における個人情報保護に関するガイドラインを遵守します。</li>
              <li>当社で業務に従事するすべての者は、会員皆様をはじめとする各種個人情報を守り、その信頼に応えます。</li>
              <li>当社は、情報への不正アクセス、情報の紛失、破壊、改ざん及び漏えいなどを防ぐため、必要かつ適切な安全管理措置を講じるとともにその改善に努めます。</li>
            </ul>

            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-7 bg-[#c41e3a] rounded-full flex-shrink-0" />
              個人情報の収集について
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>当社は、皆様に個人情報のご提供をお願いする場合には、利用目的などをあらかじめ公表いたします。</li>
              <li>収集する個人情報の範囲は、利用の目的を達成するために必要な限度を超えないものとし、収集にあたっては適法かつ公正な手段によりこれを行います。</li>
              <li>収集する個人情報の取り扱いについては、本人から明確な同意を得て行います。</li>
              <li>当社はセンシティブデータ（健康、人権、性的指向、信仰、政治的信条に関する情報等）についての情報は収集しておりません。</li>
            </ul>

            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-7 bg-[#c41e3a] rounded-full flex-shrink-0" />
              個人情報の利用について
            </h2>
            <p className="text-sm">
              当社は、皆様からご提供いただいた個人情報を、利用目的を達成するために必要な期間と範囲内で、業務のために取り扱います。当社のサービスの提供、会員の本人確認、料金の請求、お問合せ対応、当社のサービス等の変更・休廃止の通知、各種イベント・キャンペーンの案内に利用いたします。
            </p>

            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-7 bg-[#c41e3a] rounded-full flex-shrink-0" />
              個人情報の安全対策について
            </h2>
            <p className="text-sm">
              当社は、取得した皆様の個人情報について、適切な安全措置を講ずることにより、個人情報の漏えい、紛失、改ざん及び個人情報への不正な侵入の防止など、セキュリティ対策に努めます。
            </p>

            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-7 bg-[#c41e3a] rounded-full flex-shrink-0" />
              個人情報の第三者への開示について
            </h2>
            <p className="text-sm mb-3">
              当社は、皆様の個人情報を、あらかじめ皆様に同意を得た場合を除き、第三者に提供いたしません。ただし、次に掲げる事項に該当する場合は、皆様の同意を得ることなく、第三者に提供することがあります。
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>法令の定めに基づく場合</li>
              <li>人の生命、身体又は財産の保護のために必要であって、皆様に同意を得ることが困難な場合</li>
              <li>国の機関若しくは地方公共団体又はその委託を受けた者が法令で定める事業を遂行することに対して協力する必要がある場合</li>
            </ul>

            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-7 bg-[#c41e3a] rounded-full flex-shrink-0" />
              個人データ侵害の通知について
            </h2>
            <p className="text-sm">
              個人データの侵害が発生した場合、原則として72時間以内に、管轄監督機関に通知いたします。高いリスクを引き起こしえる場合、本人に個人データの侵害について通知いたします。
            </p>

            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-7 bg-[#c41e3a] rounded-full flex-shrink-0" />
              担当窓口
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="font-bold text-gray-900 mb-2">cycleZ（サイクルゼット）個人情報窓口</p>
              <p>〒700-0033 岡山県岡山市北区島田本町1-1-47</p>
              <p>TEL: <a href="tel:086-252-7744" className="text-[#c41e3a]">086-252-7744</a></p>
              <p>E-mail: info@cycle-z.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
