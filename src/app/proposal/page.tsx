export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          cycleZ ウェブサイト 機能追加のご提案
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          2026年3月｜データ分析に基づくユーザー体験向上と来店コンバージョン強化
        </p>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="/cyclez_website_upgrade_proposal.pdf"
            className="w-full"
            style={{ height: "85vh" }}
            title="提案資料PDF"
          />
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          PDFが表示されない場合は
          <a
            href="/cyclez_website_upgrade_proposal.pdf"
            download
            className="text-red-600 underline ml-1"
          >
            こちらからダウンロード
          </a>
        </p>
      </div>
    </div>
  )
}
