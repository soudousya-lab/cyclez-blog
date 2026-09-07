import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import SimpleEventRegistrationForm from "@/components/SimpleEventRegistrationForm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

/**
 * イベント申込ページ。
 *
 * 告知記事（/blog/<slug>）の中にも同じフォームが入っているが、
 * LINE・Instagram・店頭POPから「申し込むためだけ」に飛んでくる人には
 * 2,000字の記事を読ませずにフォームだけ出したい。そのための別URL。
 *
 * noindex にしている理由:
 * - 内容は告知記事の要約＋フォームで、検索から来る人には記事のほうが有用
 * - 記事とほぼ同じ内容のページを2枚インデックスさせると自社記事と食い合う
 * - robots.txt の Disallow ではなく meta の noindex を使う（Disallow だと
 *   Googleがページを読めず noindex 自体を認識できない）
 * sitemap.ts は固定ページを明示列挙しているので、そちらにも足さない。
 *
 * 対象は frontmatter に registration_mode: "simple" を持つ記事だけ。
 * バス＆サイクリングツアーのような有料・詳細入力ありのイベントは、
 * 従来どおり記事内のフォームで受ける（支払い方法の説明が記事本文に必要なため）。
 */

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * "2026-09-23" → "2026年9月23日(水)"
 * 曜日は必ずUTC基準で組み立てる。new Date("...T00:00:00+09:00") をローカル時刻で
 * 整形すると、Vercel（UTC）でのビルド時に前日の曜日になる。
 */
function formatEventDate(value: string): string {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const day = Number(m[3]);
  const d = new Date(Date.UTC(y, mo - 1, day));
  if (Number.isNaN(d.getTime())) return value;
  return `${y}年${mo}月${day}日(${WEEKDAYS[d.getUTCDay()]})`;
}

function getSimpleEventPost(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) return null;
  if (post.registration_mode !== "simple") return null;
  if (!post.registration_open) return null;
  return post;
}

export function generateStaticParams() {
  return getAllPosts()
    .filter((p) => p.registration_mode === "simple" && p.registration_open)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getSimpleEventPost(slug);
  if (!post) return { title: "お申し込み", robots: { index: false, follow: false } };

  return {
    alternates: { canonical: `/events/${slug}` },
    title: `お申し込み｜${post.title}`,
    description: post.description,
    robots: { index: false, follow: false },
  };
}

export default async function EventRegistrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getSimpleEventPost(slug);
  if (!post) notFound();

  const eventDate = post.event_date || "";
  const formattedDate = eventDate ? formatEventDate(eventDate) : "";

  const schedule = (post.event_schedule || []).map((row) => {
    const [time, ...rest] = row.split("|");
    return { time: time.trim(), body: rest.join("|").trim() };
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="イベントのお申し込み"
        subtitle="ENTRY"
        breadcrumbs={[
          { label: "ブログ", href: "/blog" },
          { label: "お申し込み" },
        ]}
      />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* イベント概要 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
          <p className="text-xs font-bold text-[#c41e3a] mb-2">{formattedDate}</p>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed">{post.description}</p>

          {/* 定員は表に出さない（2026-09-07 岡田指示）。frontmatter の capacity は
              サーバー側の受付上限としてだけ使う。 */}
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <dt className="text-xs text-gray-500">参加費</dt>
              <dd className="font-bold text-gray-900">無料</dd>
            </div>
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <dt className="text-xs text-gray-500">開催日</dt>
              <dd className="font-bold text-gray-900">{formattedDate}</dd>
            </div>
          </dl>
        </div>

        {/* 当日の流れ */}
        {schedule.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
            <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-5 pb-3 border-b-2 border-[#c41e3a]">
              <span className="w-1.5 h-6 bg-[#c41e3a] rounded-full flex-shrink-0" />
              当日の流れ
            </h2>
            <ol className="space-y-3">
              {schedule.map((row) => (
                <li key={`${row.time}-${row.body}`} className="flex gap-4 text-sm">
                  <span className="font-bold text-[#c41e3a] tabular-nums flex-shrink-0 w-16">
                    {row.time}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{row.body}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 申込フォーム */}
        <SimpleEventRegistrationForm
          eventSlug={post.registration_event_slug || post.slug}
          eventTitle={post.title}
          capacity={post.capacity || 0}
          eventDate={eventDate}
          onSiteCostNote={post.onsite_cost_note}
          completionNote={post.completion_note}
          organizers={post.organizers}
        />

        {/* 記事へ戻る */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            コース・試乗車・持ち物など、くわしい内容はこちら
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 border-2 border-[#c41e3a] text-[#c41e3a] font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#c41e3a] hover:text-white transition-colors"
          >
            告知記事を読む
          </Link>
        </div>
      </div>
    </div>
  );
}
