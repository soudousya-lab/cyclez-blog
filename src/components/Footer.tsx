import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="cycleZ - サイクルゼット"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>〒700-0033</p>
              <p>岡山県岡山市北区島田本町1-1-47</p>
              <p>営業時間　11:00〜19:00</p>
              <p>定休日　水曜日</p>
            </div>
            <a
              href="https://cycle-z.com/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-[#c41e3a] text-white px-6 py-2.5 rounded-full hover:bg-[#a01830] transition-colors text-sm font-medium"
            >
              お問い合わせ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Contact & Access */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <svg className="w-4 h-4 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <a href="https://cycle-z.com/#access" target="_blank" rel="noopener noreferrer" className="hover:text-[#c41e3a]">アクセス</a>
            </div>
            <a href="tel:086-252-7744" className="flex items-center gap-2 text-[#c41e3a] font-bold text-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              086-252-7744
            </a>
          </div>

          {/* お知らせ */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">お知らせ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/#news" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  イベント開催
                </a>
              </li>
            </ul>
          </div>

          {/* 初めての方へ */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">初めての方へ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/beginner/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  初心者講習会について
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/beginner/#workshop" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  初心者講習会
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/beginner/#video" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  初心者向け講習動画
                </a>
              </li>
            </ul>
          </div>

          {/* メンテナンス + フィッティング + CycleZとは */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">メンテナンス</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/maintenance/#video" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  メンテナンス動画
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/maintenance/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  メンテナンスブログ
                </a>
              </li>
            </ul>

            <h3 className="font-bold text-gray-900 mb-3">フィッティング</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/fitting/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  フィッティングとは
                </a>
              </li>
            </ul>

            <h3 className="font-bold text-gray-900 mb-3">CycleZとは？</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/about/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  代表挨拶
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/about/#voice" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  お客様の声
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#c41e3a]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
                <a href="https://cycle-z.com/about/#movie" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#c41e3a]">
                  動画紹介
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar - red background like main site */}
      <div className="bg-[#c41e3a] text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          <a href="https://cycle-z.com/privacy/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            個人情報保護方針
          </a>
          <p>Copyright CycleZ（サイクルゼット）岡山駅すぐのロードバイク・クロスバイク・スポーツ自転車屋さん . All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
