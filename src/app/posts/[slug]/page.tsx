import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["cycleZ"],
    },
  };
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Line breaks
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br />');

  // Wrap in paragraphs
  html = '<p>' + html + '</p>';

  // Fix list items
  html = html.replace(/<\/p><li>/g, '</p><ul><li>');
  html = html.replace(/<\/li><p>/g, '</li></ul><p>');
  html = html.replace(/<\/li><br \/><li>/g, '</li><li>');

  return html;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date
    ? format(new Date(post.date), "yyyy年MM月dd日", { locale: ja })
    : "";

  const htmlContent = markdownToHtml(post.content);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#c41e3a]">
              ホーム
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/category/${post.category === "初心者向け" ? "beginner" : post.category === "メンテナンス" ? "maintenance" : "course"}`}
              className="hover:text-[#c41e3a]"
            >
              {post.category}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <span className="inline-block bg-[#c41e3a] text-white text-sm px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500">
            <time className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose max-w-none bg-white rounded-lg shadow-sm p-6 md:p-10"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-sm font-medium text-gray-500 mb-3">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#c41e3a] to-[#e85a70] rounded-lg p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-3">
            ロードバイクのことならcycleZにお任せください
          </h3>
          <p className="opacity-90 mb-6">
            初心者の方も女性の方も、お気軽にご相談ください。
            <br />
            あなたにぴったりの一台を一緒に見つけましょう。
          </p>
          <a
            href="https://cycle-z.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#c41e3a] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            店舗サイトを見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Back to list */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c41e3a] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            記事一覧に戻る
          </Link>
        </div>
      </article>
    </div>
  );
}
