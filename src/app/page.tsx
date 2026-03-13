import { getEventPosts, getEventReportPosts, getLatestNewsPosts } from "@/lib/posts";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function Home() {
  const latestNews = getLatestNewsPosts(1);
  const eventPosts = getEventPosts(6);
  const eventReports = getEventReportPosts(4);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* ニュースティッカー */}
      {latestNews.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <span className="text-gray-500 text-sm flex-shrink-0">
              {format(new Date(latestNews[0].date), "yyyy.MM.dd", { locale: ja })}
            </span>
            <span className="bg-[#c41e3a] text-white text-xs px-3 py-0.5 rounded flex-shrink-0 font-medium">
              news
            </span>
            <span className="text-gray-800 text-sm truncate flex-1">
              {latestNews[0].title}
            </span>
            <Link
              href={`/blog/${latestNews[0].slug}`}
              className="flex-shrink-0 bg-[#c41e3a] text-white text-xs px-4 py-1.5 rounded-full hover:bg-[#a01830] transition-colors flex items-center gap-1"
            >
              もっと見る
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* 店舗紹介動画 MOVIE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">店舗紹介動画</h2>
          <p className="text-[#c41e3a] text-sm font-medium mb-6">MOVIE</p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
            サイクルゼットはロードバイク・グッズ・ウエアの販売だけではなく、
            <br className="hidden md:block" />
            カウンセリング接客方式でお客様のご要望に合ったご提案をさせていただき、納得いくまで対応させていただきます。
          </p>
          <div className="aspect-video w-full max-w-3xl mx-auto">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/_lI89tCg5OQ"
              title="cycleZ 店舗紹介"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* イベント開催情報 EVENT */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">イベント開催情報</h2>
          <p className="text-[#c41e3a] text-sm font-medium mb-4">EVENT</p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
            サイクルゼットでは、自転車をもっともっと楽しんでいただけるよう、定期的にイベントを開催しています。
            <br className="hidden md:block" />
            気になるイベントがあれば、ぜひお気軽にご参加ください。
          </p>
          <div className="space-y-0 text-left">
            {eventPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-3 md:gap-4 py-4 border-b border-gray-200 hover:bg-gray-100 transition-colors px-2 -mx-2 rounded"
              >
                <span className="text-gray-500 text-sm flex-shrink-0 w-24">
                  {format(new Date(post.date), "yyyy.MM.dd", { locale: ja })}
                </span>
                <span className="bg-[#c41e3a] text-white text-xs px-3 py-0.5 rounded flex-shrink-0 font-medium">
                  イベント開催情報
                </span>
                <span className="text-gray-800 text-sm md:text-base truncate">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/category/event"
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium mt-8"
          >
            一覧を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* イベントレポート EVENT REPORT */}
      {eventReports.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">イベントレポート</h2>
            <p className="text-[#c41e3a] text-sm font-medium mb-10">EVENT REPORT</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventReports.map((report) => (
                <Link
                  key={report.slug}
                  href={`/blog/${report.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md"
                >
                  {report.image ? (
                    <Image
                      src={report.image}
                      alt={report.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500" />
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute top-2 right-2">
                    <span className="text-white text-xs font-medium bg-[#c41e3a] px-2 py-0.5 rounded">REPORT</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs mb-1">
                      {format(new Date(report.date), "yyyy年MM月dd日", { locale: ja })}
                    </p>
                    <h3 className="text-white text-sm font-bold line-clamp-2 leading-tight">
                      {report.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/category/event-report"
              className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3 rounded-full hover:bg-[#a01830] transition-colors font-medium mt-8"
            >
              一覧を見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* サイクルZが選ばれる理由 REASON */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">サイクルZが選ばれる理由</h2>
          <p className="text-[#c41e3a] text-sm font-medium mb-4">REASON</p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-12">
            自転車ライフを始めたくなったら、サイクルゼットにお越しください。
            <br className="hidden md:block" />
            お好みや体格、そしてご予算に合わせ、あなただけの一台をお探しします。
          </p>

          {/* 理由01: 始めての方大歓迎 */}
          <div className="flex flex-col md:flex-row items-stretch mb-0">
            <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto">
              <Image
                src="/images/reason-beginner.jpg"
                alt="始めての方大歓迎"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center text-left">
              <p className="text-[#c41e3a] text-2xl font-bold mb-2">01</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">始めての方大歓迎</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                「ロードバイクって楽しそう！でも何から揃えればよいのかわからない…」そんな方もご心配なく！まずは自転車を見に来るだけのつもりで、お店に遊びに来てみてください。無理におすすめするようなことはいたしませんので、ロードバイクについて知りたいことがあれば何でも気軽にお声をかけてくださいね。
              </p>
            </div>
          </div>

          {/* 理由02: おしゃれなウエアが豊富です（逆配置） */}
          <div className="flex flex-col md:flex-row-reverse items-stretch mb-0">
            <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto">
              <Image
                src="/images/reason-apparel.jpg"
                alt="おしゃれなウエアが豊富です"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center text-left">
              <p className="text-[#c41e3a] text-2xl font-bold mb-2">02</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">おしゃれなウエアが豊富です</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                「どうせならオシャレにライドしたい！」「小物にもこだわりたい！」サイクルゼットのオーナーはアパレル出身。店内には自転車だけでなくちょっと他にはないデザインのウエアや小物もたくさん揃っています。バイクのカラーに合わせたり、あなたらしさ溢れるコーディネートのご提案も得意です。
              </p>
            </div>
          </div>

          {/* 理由03: アフターフォローもおまかせください */}
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto">
              <Image
                src="/images/reason-maintenance.jpg"
                alt="アフターフォローもおまかせください"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center text-left">
              <p className="text-[#c41e3a] text-2xl font-bold mb-2">03</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">アフターフォローもおまかせください</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                自転車を長く快適に乗り続けるには、やはり定期的なメンテナンスが欠かせません。近くまでお越しの際は是非サイクルゼットにもお寄りください。タイヤの空気入れや各ボルトの締め直し、車輪の揺れのチェックなどちょっとしたメンテナンスにも対応しています。おうちでできる点検の手順などもご指導いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* おススメコンテンツ RECOMMENDED CONTENTS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">おススメコンテンツ</h2>
          <p className="text-[#c41e3a] text-sm font-medium mb-10">RECOMMENDED CONTENTS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 初心者の方へ */}
            <Link href="/first" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/reason-beginner.jpg"
                  alt="初心者の方へ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1">初心者の方へ</h3>
                <p className="text-[#c41e3a] text-xs font-medium mb-3">MESSAGE FOR BEGINNERS</p>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  ロードバイクに乗ると言っても、流線型のいかついヘルメットやピタピタの黒いサイクルパンツを履く必要はありません。気軽にロードバイクに乗りたい方、大歓迎。
                </p>
                <span className="inline-flex items-center gap-1 text-[#c41e3a] text-sm font-medium mt-3">
                  もっと見る
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* メンテナンス */}
            <Link href="/maintenance" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/reason-maintenance.jpg"
                  alt="メンテナンス"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1">メンテナンス</h3>
                <p className="text-[#c41e3a] text-xs font-medium mb-3">MAINTENANCE</p>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  ロードバイクに長く快適に乗るためには、なんといってもメンテナンスが大切です。何かわからないことがあったら何でも説明いたします。
                </p>
                <span className="inline-flex items-center gap-1 text-[#c41e3a] text-sm font-medium mt-3">
                  もっと見る
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* 代表挨拶 */}
            <Link href="/about/greeting" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/reason-apparel.jpg"
                  alt="代表挨拶"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1">代表挨拶</h3>
                <p className="text-[#c41e3a] text-xs font-medium mb-3">MESSAGE FROM THE OWNER</p>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  サイクルゼットについて興味がある方は、ぜひご視聴してみてください。
                </p>
                <span className="inline-flex items-center gap-1 text-[#c41e3a] text-sm font-medium mt-3">
                  もっと見る
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 動画紹介 */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">動画紹介</h2>
          <p className="text-[#c41e3a] text-sm font-medium mb-4">MOVIE</p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
            サイクルゼットが開催している四季折々のイベントや自転車ライフにぴったりな情報を動画でご紹介いたします。
            <br className="hidden md:block" />
            サイクルゼットについて興味がある方は、ぜひご視聴してみてください。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://www.youtube.com/@cyclez"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/youtube-thumb01.jpg"
                alt="動画1"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
            <a
              href="https://www.youtube.com/@cyclez"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/youtube-thumb02.jpg"
                alt="動画2"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
            <a
              href="https://www.youtube.com/@cyclez"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/youtube-thumb03.jpg"
                alt="動画3"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </div>
          <a
            href="https://www.youtube.com/@cyclez"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors font-medium mt-8"
          >
            もっと見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/contact.jpg"
            alt="お問い合わせ"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#c41e3a]/90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
            ロードバイクのことなら<br />何でもご相談ください
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
            cycleZでは初心者の方向けに、無料の講習会を毎月開催しています。
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#c41e3a] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105 font-bold text-sm sm:text-base"
            >
              お問い合わせ
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-white/10 transition-all font-medium border-2 border-white text-sm sm:text-base"
            >
              CycleZとは？
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
