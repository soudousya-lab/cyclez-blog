"use client";

import Link from "next/link";
import { PostData } from "@/lib/posts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { FaBicycle } from "react-icons/fa";
import { getCategoryLabel } from "@/lib/categories";

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date
    ? format(new Date(post.date), "yyyy年MM月dd日", { locale: ja })
    : "";

  // カバー画像があるかどうか（/logo.png はデフォルトなので除外）
  const hasCoverImage = post.image && post.image !== "/logo.png";

  return (
    <article className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* サムネイル */}
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
          {hasCoverImage ? (
            <>
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a] to-[#e85a70]">
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                <FaBicycle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white/15" />
              </div>
            </div>
          )}
          {/* カテゴリバッジ */}
          <span className="absolute top-3 left-3 bg-white/95 text-[#c41e3a] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm tracking-wider z-10">
            {getCategoryLabel(post.category)}
          </span>
        </div>
      </Link>

      {/* コンテンツ */}
      <div className="relative p-4 sm:p-5">
        <time className="text-gray-400 text-xs flex items-center gap-1.5 font-mono">
          {formattedDate}
        </time>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-sm sm:text-base font-bold mt-2 text-gray-900 group-hover:text-[#c41e3a] transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
          {post.description}
        </p>

        {/* タグ */}
        {post.tags && post.tags.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 続きを読む */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-[#c41e3a] text-xs sm:text-sm font-medium mt-4 group-hover:gap-3 transition-all"
        >
          続きを読む
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
