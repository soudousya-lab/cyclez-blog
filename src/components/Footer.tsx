import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#c41e3a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <div className="ml-2">
                <span className="text-xl font-bold">cycleZ</span>
                <div className="text-[10px] opacity-80">ーサイクルゼットー</div>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              〒700-0033<br />
              岡山県岡山市北区島田本町1-1-47<br />
              営業時間 11:00〜19:00<br />
              定休日 水曜日
            </p>
            <a
              href="tel:086-252-7744"
              className="inline-flex items-center gap-2 mt-3 text-white font-bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              086-252-7744
            </a>
          </div>

          {/* お知らせ */}
          <div>
            <h3 className="text-lg font-bold mb-4">お知らせ</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/" className="hover:text-white transition-colors">
                  イベント開催
                </Link>
              </li>
            </ul>
          </div>

          {/* 初めての方へ */}
          <div>
            <h3 className="text-lg font-bold mb-4">初めての方へ</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/category/beginner" className="hover:text-white transition-colors">
                  初心者講習会について
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/category/beginner" className="hover:text-white transition-colors">
                  初心者講習会
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/category/beginner" className="hover:text-white transition-colors">
                  初心者向け講習動画
                </Link>
              </li>
            </ul>
          </div>

          {/* メンテナンス */}
          <div>
            <h3 className="text-lg font-bold mb-4">メンテナンス</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/category/maintenance" className="hover:text-white transition-colors">
                  メンテナンス動画
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/category/maintenance" className="hover:text-white transition-colors">
                  メンテナンスブログ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          <p>Copyright CycleZ（サイクルゼット）岡山駅すぐのロードバイク・クロスバイク・スポーツ自転車屋さん . All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
