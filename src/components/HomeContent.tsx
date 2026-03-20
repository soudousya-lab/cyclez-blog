"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { PostData } from "@/lib/posts";

// 回転するホイールSVG（CTA装飾用）
function SpinningWheel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`animate-spin-slow ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="32" cy="32" r="30" className="text-white/10" />
      <circle cx="32" cy="32" r="20" className="text-white/10" />
      <circle cx="32" cy="32" r="4" className="text-white/20" fill="currentColor" />
      {/* スポーク */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="32" y1="8" x2="32" y2="28"
          className="text-white/10"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
    </svg>
  );
}

interface HomeContentProps {
  latestNews: PostData[];
  eventPosts: PostData[];
}

export default function HomeContent({ latestNews, eventPosts }: HomeContentProps) {
  return (
    <>
      {/* ニュースティッカー */}
      {latestNews.length > 0 && (
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <span className="text-gray-400 text-sm flex-shrink-0 font-mono">
              {format(new Date(latestNews[0].date), "yyyy.MM.dd", { locale: ja })}
            </span>
            <span className="bg-[#c41e3a] text-white text-[10px] px-3 py-0.5 rounded-full flex-shrink-0 font-bold tracking-wider uppercase">
              news
            </span>
            <span className="text-gray-800 text-sm truncate flex-1 font-medium">
              {latestNews[0].title}
            </span>
            <Link
              href={`/blog/${latestNews[0].slug}`}
              className="flex-shrink-0 group bg-[#c41e3a] text-white text-xs px-5 py-2 rounded-full hover:bg-[#a01830] transition-all hover:shadow-md flex items-center gap-1.5"
            >
              もっと見る
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* 店舗紹介動画 MOVIE */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-10 right-0 w-32 h-32 opacity-[0.03]">
          <SpinningWheel className="w-full h-full text-gray-900" />
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="店舗紹介動画"
            subtitle="MOVIE"
            description="サイクルゼットはロードバイク・グッズ・ウエアの販売だけではなく、カウンセリング接客方式でお客様のご要望に合ったご提案をさせていただき、納得いくまで対応させていただきます。"
          />
          <ScrollReveal>
            <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/_lI89tCg5OQ"
                title="cycleZ 店舗紹介"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* イベント開催情報 EVENT */}
      <section className="py-20 md:py-28 bg-gray-50/80">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="イベント開催情報"
            subtitle="EVENT"
            description="サイクルゼットでは、自転車をもっともっと楽しんでいただけるよう、定期的にイベントを開催しています。気になるイベントがあれば、ぜひお気軽にご参加ください。"
          />
          <div className="space-y-0 text-left">
            {eventPosts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-center gap-3 md:gap-4 py-4 border-b border-gray-200 hover:bg-white hover:shadow-sm transition-all px-4 -mx-4 rounded-lg"
                >
                  <span className="text-gray-400 text-sm flex-shrink-0 w-24 font-mono">
                    {format(new Date(post.date), "yyyy.MM.dd", { locale: ja })}
                  </span>
                  <span className="bg-[#c41e3a] text-white text-[10px] px-3 py-0.5 rounded-full flex-shrink-0 font-bold tracking-wider">
                    EVENT
                  </span>
                  <span className="text-gray-800 text-sm md:text-base truncate group-hover:text-[#c41e3a] transition-colors">
                    {post.title}
                  </span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#c41e3a] group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={400}>
            <div className="text-center mt-10">
              <Link
                href="/category/event"
                className="group inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-3.5 rounded-full hover:bg-[#a01830] transition-all hover:shadow-lg font-medium"
              >
                一覧を見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* サイクルZが選ばれる理由 REASON */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            title="サイクルZが選ばれる理由"
            subtitle="REASON"
            description="自転車ライフを始めたくなったら、サイクルゼットにお越しください。お好みや体格、そしてご予算に合わせ、あなただけの一台をお探しします。"
          />

          {/* 理由01 */}
          <ScrollReveal direction="left">
            <div className="flex flex-col md:flex-row items-stretch mb-1 rounded-2xl overflow-hidden shadow-lg">
              <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] group">
                <Image
                  src="/images/reason/reason-beginner.jpg"
                  alt="始めての方大歓迎"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center text-left">
                <p className="text-[#c41e3a]/30 text-5xl font-black mb-2">01</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">始めての方大歓迎</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  「ロードバイクって楽しそう！でも何から揃えればよいのかわからない...」そんな方もご心配なく！まずは自転車を見に来るだけのつもりで、お店に遊びに来てみてください。無理におすすめするようなことはいたしませんので、ロードバイクについて知りたいことがあれば何でも気軽にお声をかけてくださいね。
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 理由02 */}
          <ScrollReveal direction="right">
            <div className="flex flex-col md:flex-row-reverse items-stretch mb-1 rounded-2xl overflow-hidden shadow-lg">
              <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] group">
                <Image
                  src="/images/reason/reason-apparel.jpg"
                  alt="おしゃれなウエアが豊富です"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center text-left">
                <p className="text-[#c41e3a]/30 text-5xl font-black mb-2">02</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">おしゃれなウエアが豊富です</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  「どうせならオシャレにライドしたい！」「小物にもこだわりたい！」サイクルゼットのオーナーはアパレル出身。店内には自転車だけでなくちょっと他にはないデザインのウエアや小物もたくさん揃っています。バイクのカラーに合わせたり、あなたらしさ溢れるコーディネートのご提案も得意です。
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 理由03 */}
          <ScrollReveal direction="left">
            <div className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden shadow-lg">
              <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] group">
                <Image
                  src="/images/reason/reason-maintenance.jpg"
                  alt="アフターフォローもおまかせください"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center text-left">
                <p className="text-[#c41e3a]/30 text-5xl font-black mb-2">03</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">アフターフォローもおまかせください</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  自転車を長く快適に乗り続けるには、やはり定期的なメンテナンスが欠かせません。近くまでお越しの際は是非サイクルゼットにもお寄りください。タイヤの空気入れや各ボルトの締め直し、車輪の揺れのチェックなどちょっとしたメンテナンスにも対応しています。おうちでできる点検の手順などもご指導いたします。
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* おススメコンテンツ RECOMMENDED CONTENTS */}
      <section className="py-20 md:py-28 bg-gray-50/80">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            title="おススメコンテンツ"
            subtitle="RECOMMENDED CONTENTS"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { href: "/first", image: "/images/reason/reason-beginner.jpg", title: "初心者の方へ", sub: "MESSAGE FOR BEGINNERS", desc: "ロードバイクに乗ると言っても、流線型のいかついヘルメットやピタピタの黒いサイクルパンツを履く必要はありません。気軽にロードバイクに乗りたい方、大歓迎。" },
              { href: "/maintenance", image: "/images/reason/reason-maintenance.jpg", title: "メンテナンス", sub: "MAINTENANCE", desc: "ロードバイクに長く快適に乗るためには、なんといってもメンテナンスが大切です。何かわからないことがあったら何でも説明いたします。" },
              { href: "/about/greeting", image: "/images/staff/staff-main.jpg", title: "スタッフ挨拶", sub: "STAFF MESSAGE", desc: "cycleZスタッフからのメッセージ。自転車文化の普及を目指しています。" },
            ].map((item, index) => (
              <ScrollReveal key={item.href} delay={index * 150}>
                <Link href={item.href} className="group block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 text-left">
                    <p className="text-[#c41e3a] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">{item.sub}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#c41e3a] transition-colors">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[#c41e3a] text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                      もっと見る
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* チェーン区切り線 */}
      <div className="chain-divider" />

      {/* 動画紹介 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            title="動画紹介"
            subtitle="MOVIE"
            description="サイクルゼットが開催している四季折々のイベントや自転車ライフにぴったりな情報を動画でご紹介いたします。サイクルゼットについて興味がある方は、ぜひご視聴してみてください。"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: "/images/youtube/youtube-thumb01.jpg", alt: "動画1" },
              { src: "/images/youtube/youtube-thumb02.jpg", alt: "動画2" },
              { src: "/images/youtube/youtube-thumb03.jpg", alt: "動画3" },
            ].map((video, index) => (
              <ScrollReveal key={video.alt} delay={index * 150}>
                <a
                  href="https://www.youtube.com/@cyclez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <Image
                    src={video.src}
                    alt={video.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-6 h-6 text-[#c41e3a] ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={400}>
            <div className="text-center mt-10">
              <a
                href="https://www.youtube.com/@cyclez"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg font-medium"
              >
                もっと見る
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta/contact.jpg"
            alt="お問い合わせ"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/95 to-[#8b1428]/95" />
        </div>
        {/* 装飾ホイール */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-100">
          <SpinningWheel className="w-full h-full" />
        </div>
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-100">
          <SpinningWheel className="w-full h-full" />
        </div>

        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              ロードバイクのことなら<br />何でもご相談ください
            </h2>
            <p className="text-white/80 mb-8 sm:mb-10 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
              cycleZでは初心者の方向けに、無料の講習会を毎月開催しています。お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-white text-[#c41e3a] px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-gray-50 transition-all hover:shadow-xl font-bold text-sm sm:text-base"
              >
                お問い合わせ
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-white/10 transition-all font-medium border-2 border-white/70 hover:border-white text-sm sm:text-base"
              >
                CycleZとは？
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
