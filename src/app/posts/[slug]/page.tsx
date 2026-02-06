import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import React, { ReactElement } from "react";

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

// Rich markdown parser inspired by FIREFITNESS blog
function formatContent(content: string): ReactElement[] {
  const lines = content.split("\n");
  const elements: ReactElement[] = [];
  let keyIndex = 0;
  let inTable = false;
  let tableRows: string[][] = [];
  let inCustomBlock = false;
  let customBlockType = "";
  let customBlockLines: string[] = [];

  // Parse inline markdown (bold, links)
  const parseInline = (text: string): (string | ReactElement)[] => {
    const parts: (string | ReactElement)[] = [];
    let remaining = text;
    let inlineKey = 0;

    while (remaining.length > 0) {
      // Bold **text**
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      // Link [text](url)
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

      // Find earliest match
      const boldIndex = boldMatch?.index ?? Infinity;
      const linkIndex = linkMatch?.index ?? Infinity;

      if (boldIndex === Infinity && linkIndex === Infinity) {
        parts.push(remaining);
        break;
      }

      const isBoldFirst = boldIndex <= linkIndex;
      const matchToUse = isBoldFirst ? boldMatch : linkMatch;
      const matchType = isBoldFirst ? 'bold' : 'link';
      const matchIndex = isBoldFirst ? boldIndex : linkIndex;

      if (!matchToUse) {
        parts.push(remaining);
        break;
      }

      if (matchIndex > 0) {
        parts.push(remaining.substring(0, matchIndex));
      }

      if (matchType === 'bold') {
        parts.push(
          <strong key={`bold-${inlineKey++}`} className="font-bold text-[#c41e3a]">
            {matchToUse[1]}
          </strong>
        );
      } else if (matchType === 'link') {
        parts.push(
          <Link key={`link-${inlineKey++}`} href={matchToUse[2]} className="text-[#c41e3a] hover:underline">
            {matchToUse[1]}
          </Link>
        );
      }

      remaining = remaining.substring(matchIndex + matchToUse[0].length);
    }

    return parts.length > 0 ? parts : [text];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Multi-line custom block: closing :::
    if (inCustomBlock && line.trim() === ":::") {
      const blockText = customBlockLines.join(" ");
      if (customBlockType === "point") {
        elements.push(
          <div key={`point-${keyIndex++}`} className="my-6 bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-[#c41e3a] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <p className="text-gray-800 font-medium leading-relaxed">
                {parseInline(blockText)}
              </p>
            </div>
          </div>
        );
      } else if (customBlockType === "warning") {
        elements.push(
          <div key={`warning-${keyIndex++}`} className="my-6 bg-gradient-to-r from-amber-50 to-amber-50/50 border-l-4 border-amber-500 rounded-r-xl p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              <p className="text-gray-800 font-medium leading-relaxed">
                {parseInline(blockText)}
              </p>
            </div>
          </div>
        );
      } else if (customBlockType === "success") {
        elements.push(
          <div key={`success-${keyIndex++}`} className="my-6 bg-gradient-to-r from-green-50 to-green-50/50 border-l-4 border-green-500 rounded-r-xl p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="text-gray-800 font-medium leading-relaxed">
                {parseInline(blockText)}
              </p>
            </div>
          </div>
        );
      }
      inCustomBlock = false;
      customBlockType = "";
      customBlockLines = [];
      continue;
    }

    // Multi-line custom block: opening :::type
    if (!inCustomBlock && (line.trim() === ":::point" || line.trim() === ":::warning" || line.trim() === ":::success")) {
      inCustomBlock = true;
      customBlockType = line.trim().replace(":::", "");
      customBlockLines = [];
      continue;
    }

    // Multi-line custom block: content lines
    if (inCustomBlock) {
      customBlockLines.push(line);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      // End table if we were in one
      if (inTable && tableRows.length > 0) {
        const headers = tableRows[0].map(c => c.trim());
        const dataRows = tableRows.slice(2);
        elements.push(
          <div key={`table-${keyIndex++}`} className="my-6">
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-[#c41e3a] text-white">
                    {headers.map((cell, cellIndex) => (
                      <th key={cellIndex} className="px-4 py-3 text-left text-sm font-medium">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-sm text-gray-700 border-t border-gray-100">
                          {parseInline(cell.trim())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile card layout */}
            <div className="sm:hidden space-y-3">
              {dataRows.map((row, rowIndex) => (
                <div key={rowIndex} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  {row.map((cell, cellIndex) => (
                    <div key={cellIndex} className={cellIndex === 0 ? "font-bold text-[#c41e3a] text-sm mb-1" : "text-sm text-gray-700 mb-1 last:mb-0"}>
                      {cellIndex > 0 && headers[cellIndex] && (
                        <span className="text-gray-400 text-xs mr-1">{headers[cellIndex]}:</span>
                      )}
                      {parseInline(cell.trim())}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
      continue;
    }

    // Table row detection
    if (line.includes("|")) {
      inTable = true;
      const cells = line.split("|").filter(cell => cell.trim() !== "");
      tableRows.push(cells);
      continue;
    }

    // H1 heading (main title style)
    if (line.startsWith("# ")) {
      const headingText = line.replace("# ", "");
      elements.push(
        <h1
          key={`h1-${keyIndex++}`}
          className="text-2xl md:text-3xl font-bold text-[#c41e3a] mt-8 mb-6 pb-4 border-b-3 border-[#c41e3a]"
        >
          {headingText}
        </h1>
      );
      continue;
    }

    // H2 heading (section style with left bar + bottom border)
    if (line.startsWith("## ")) {
      const headingText = line.replace("## ", "");
      elements.push(
        <h2
          key={`h2-${keyIndex++}`}
          className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-5 pb-3 border-b-2 border-[#c41e3a]"
        >
          <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
          {headingText}
        </h2>
      );
      continue;
    }

    // H3 heading (subsection with dot)
    if (line.startsWith("### ")) {
      const headingText = line.replace("### ", "");
      elements.push(
        <h3
          key={`h3-${keyIndex++}`}
          className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 mt-8 mb-4"
        >
          <span className="w-2.5 h-2.5 bg-[#c41e3a] rounded-full flex-shrink-0" />
          {headingText}
        </h3>
      );
      continue;
    }

    // Numbered list (with styled number badges)
    if (/^\d+\.\s/.test(line)) {
      const listText = line.replace(/^\d+\.\s/, "");
      const num = line.match(/^(\d+)\./)?.[1] || "1";
      elements.push(
        <div key={`ol-${keyIndex++}`} className="flex items-start gap-3 mb-4">
          <span className="flex-shrink-0 w-7 h-7 bg-[#c41e3a] text-white rounded-full flex items-center justify-center text-sm font-bold">
            {num}
          </span>
          <p className="text-gray-700 leading-relaxed pt-0.5">
            {parseInline(listText)}
          </p>
        </div>
      );
      continue;
    }

    // Bullet list (with styled dots)
    if (line.startsWith("- ")) {
      const listText = line.replace("- ", "");
      elements.push(
        <div key={`ul-${keyIndex++}`} className="flex items-start gap-3 mb-3 ml-2">
          <span className="flex-shrink-0 w-2 h-2 bg-[#c41e3a] rounded-full mt-2" />
          <p className="text-gray-700 leading-relaxed">
            {parseInline(listText)}
          </p>
        </div>
      );
      continue;
    }

    // Point box (:::point text :::)
    if (line.startsWith(":::point ")) {
      const pointText = line.replace(":::point ", "").replace(" :::", "");
      elements.push(
        <div key={`point-${keyIndex++}`} className="my-6 bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 border-l-4 border-[#c41e3a] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-[#c41e3a] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <p className="text-gray-800 font-medium leading-relaxed">
              {parseInline(pointText)}
            </p>
          </div>
        </div>
      );
      continue;
    }

    // Warning box (:::warning text :::)
    if (line.startsWith(":::warning ")) {
      const warningText = line.replace(":::warning ", "").replace(" :::", "");
      elements.push(
        <div key={`warning-${keyIndex++}`} className="my-6 bg-gradient-to-r from-amber-50 to-amber-50/50 border-l-4 border-amber-500 rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            <p className="text-gray-800 font-medium leading-relaxed">
              {parseInline(warningText)}
            </p>
          </div>
        </div>
      );
      continue;
    }

    // Success box (:::success text :::)
    if (line.startsWith(":::success ")) {
      const successText = line.replace(":::success ", "").replace(" :::", "");
      elements.push(
        <div key={`success-${keyIndex++}`} className="my-6 bg-gradient-to-r from-green-50 to-green-50/50 border-l-4 border-green-500 rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p className="text-gray-800 font-medium leading-relaxed">
              {parseInline(successText)}
            </p>
          </div>
        </div>
      );
      continue;
    }

    // Quote block (> text)
    if (line.startsWith("> ")) {
      const quoteText = line.replace("> ", "");
      elements.push(
        <blockquote key={`quote-${keyIndex++}`} className="my-6 border-l-4 border-[#c41e3a] bg-red-50 p-4 rounded-r-lg">
          <p className="text-gray-700 italic leading-relaxed">
            {parseInline(quoteText)}
          </p>
        </blockquote>
      );
      continue;
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push(
        <p key={`p-${keyIndex++}`} className="text-gray-700 leading-relaxed mb-5">
          {parseInline(line)}
        </p>
      );
    }
  }

  return elements;
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

  // Get related posts
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-[#c41e3a] to-[#e85a70] text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-white">
              ブログ
            </Link>
            <span>/</span>
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>

          <span className="inline-block bg-white text-[#c41e3a] text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Main content */}
          <article className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            {/* Author & Date info */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/cyclezmainlogo.png"
                    alt="cycleZ"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">cycleZ</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formattedDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article content */}
            <div className="prose-cyclez">
              {formatContent(post.content)}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-3">タグ</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-3">この記事をシェアする</p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://cyclez-blog.vercel.app/posts/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  ポスト
                </a>
                <a
                  href={`https://line.me/R/msg/text/?${encodeURIComponent(post.title + " " + `https://cyclez-blog.vercel.app/posts/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#00b900] text-white text-sm rounded-full hover:bg-[#00a000] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                  LINEで送る
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">関連記事</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/posts/${relatedPost.slug}`}
                      className="block group"
                    >
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#c41e3a] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {relatedPost.date ? format(new Date(relatedPost.date), "yyyy年MM月dd日", { locale: ja }) : ""}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#c41e3a] to-[#a01830] rounded-xl p-5 text-white">
              <h3 className="font-bold mb-2">初心者講習会開催中</h3>
              <p className="text-white/80 text-sm mb-4">
                ロードバイクの乗り方から基本を学べます。お気軽にご参加ください。
              </p>
              <a
                href="https://cycle-z.com/beginner/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-[#c41e3a] font-bold text-center py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors"
              >
                詳しく見る
              </a>
            </div>
          </aside>
        </div>

        {/* Back to list */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#c41e3a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
