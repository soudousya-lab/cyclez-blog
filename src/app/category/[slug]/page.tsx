import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { getCategoryLabel } from "@/lib/categories";
import PostCard from "@/components/PostCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = getCategoryLabel(decodeURIComponent(slug));
  return {
    title: `${label}の記事一覧`,
    description: `cycleZブログの${label}カテゴリの記事一覧です。`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const label = getCategoryLabel(decodedSlug);
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) => post.category === decodedSlug);
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-[#c41e3a] to-[#e85a70] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm mb-4 text-white/80">
            <Link href="/" className="hover:text-white">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span>{label}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">{label}</h1>
          <p className="mt-2 text-white/90 text-sm">{posts.length}件の記事</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* カテゴリナビ */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/"
            className="text-sm px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors"
          >
            すべて
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                cat === decodedSlug
                  ? "bg-[#c41e3a] text-white border-[#c41e3a]"
                  : "border-gray-300 text-gray-600 hover:border-[#c41e3a] hover:text-[#c41e3a]"
              }`}
            >
              {getCategoryLabel(cat)}
            </Link>
          ))}
        </div>

        {/* 記事一覧 */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>このカテゴリの記事はまだありません。</p>
          </div>
        )}
      </div>
    </main>
  );
}
