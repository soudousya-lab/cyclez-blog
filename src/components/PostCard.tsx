import Link from "next/link";
import { PostData } from "@/lib/posts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date
    ? format(new Date(post.date), "yyyy年MM月dd日", { locale: ja })
    : "";

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <Link href={`/posts/${post.slug}`}>
        <div className="relative h-48 bg-gradient-to-br from-[#c41e3a] to-[#e85a70]">
          {post.image ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-4">
              <img
                src={post.image}
                alt={post.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-white text-[#c41e3a] text-xs font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <time className="text-gray-500 text-sm">{formattedDate}</time>
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-lg font-bold mt-2 text-gray-900 hover:text-[#c41e3a] transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center gap-1 text-[#c41e3a] text-sm font-medium mt-4 hover:gap-2 transition-all"
        >
          続きを読む
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
