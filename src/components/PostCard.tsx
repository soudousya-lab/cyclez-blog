"use client";

import Link from "next/link";
import { PostData } from "@/lib/posts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { FaBicycle } from "react-icons/fa";

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date
    ? format(new Date(post.date), "yyyy年MM月dd日", { locale: ja })
    : "";

  return (
    <article className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Subtle bike decoration on hover */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FaBicycle size={16} className="text-[#c41e3a]/30" />
      </div>

      {/* Thumbnail */}
      <Link href={`/posts/${post.slug}`}>
        <div className="relative h-36 sm:h-40 md:h-48 bg-gradient-to-br from-[#c41e3a] to-[#e85a70] overflow-hidden">
          {post.image ? (
            <div className="w-full h-full flex items-center justify-center bg-white p-2 sm:p-3 md:p-4 group-hover:scale-105 transition-transform duration-300">
              <img
                src={post.image}
                alt={post.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaBicycle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white/20" />
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white text-[#c41e3a] text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content - with subtle background card effect */}
      <div className="relative p-3 sm:p-4 md:p-5 bg-gradient-to-b from-white to-gray-50/50">
        {/* Decorative line */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#c41e3a]/10 to-transparent" />

        <time className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5">
          <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate}
        </time>
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-sm sm:text-base md:text-lg font-bold mt-1.5 sm:mt-2 text-gray-900 hover:text-[#c41e3a] transition-colors line-clamp-2 group-hover:text-[#c41e3a]">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-xs sm:text-sm mt-1.5 sm:mt-2 line-clamp-2">
          {post.description}
        </p>

        {/* Tags - hide on very small screens */}
        {post.tags && post.tags.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-xs text-gray-500 bg-gray-100/80 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center gap-1 text-[#c41e3a] text-xs sm:text-sm font-medium mt-3 sm:mt-4 group-hover:gap-2 transition-all"
        >
          続きを読む
          <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
