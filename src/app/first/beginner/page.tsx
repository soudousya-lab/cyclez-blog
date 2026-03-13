import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "初心者講習会について",
  description:
    "cycleZの無料初心者講習会。ロードバイクの乗り方の基本から公道のマナーまで、スタッフがイチからレクチャーします。",
};

export default function BeginnerWorkshopPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-[#c41e3a] to-[#e85a70] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm mb-4 text-white/80">
            <Link href="/" className="hover:text-white">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/first" className="hover:text-white">
              初めての方へ
            </Link>
            <span className="mx-2">/</span>
            <span>初心者講習会</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">初心者講習会について</h1>
          <p className="mt-2 text-white/90 text-sm">BEGINNERS WORKSHOP</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* イントロ */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            自転車ライフを始めたくなったら、サイクルゼットにお越しください。楽しく安全にロードバイクに乗っていただきたくて、無料の初心者講習会を開催しています。
          </p>
        </div>

        {/* セクション1 */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#c41e3a] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900">
              ロードバイクを始めたい！でも乗り方を聞ける人がいない…
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            そんなお悩みのある方、ない方、とっても楽しいサイクルゼットの「初心者講習会」にぜひご参加ください。ロードバイク歴の長いスタッフが、乗り方の基本をイチからレクチャーいたします！次回の開催日時はトップページを確認、またはスタッフまで。
          </p>
        </section>

        {/* セクション2 */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#c41e3a] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900">
              乗り方から公道の安全マナーまで
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            他に参加されている初心者の方とのコミュニケーションも楽しみながら、楽しくペダルを踏んでいきましょう。講習会が終わる頃には、すっかりロードバイクの魅力のとりこになっているはずです。
          </p>
        </section>

        {/* セクション3 */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#c41e3a] rounded-full" />
            <h2 className="text-xl font-bold text-gray-900">走るルートについて</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            例えば、サイクルゼット前を出発し、東山〜曹源寺〜操山公園里山センター〜西大寺町を回ってサイクルゼット前で解散。平地だけでなく坂を上ったり下ったり、ロードバイクの基本的操作が身につくルートです。詳しくはサイクルゼットのスタッフまで。
          </p>
        </section>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium"
          >
            講習会について問い合わせる
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
          </Link>
        </div>
      </div>
    </main>
  );
}
