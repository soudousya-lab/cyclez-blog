// 記事末尾の著者プロフィール表示コンポーネント（E-E-A-T強化）
// frontmatter の author フィールドで staff slug を指定すると表示される
import Link from "next/link";
import Image from "next/image";
import { getStaffBySlug } from "@/lib/staff";
import { FaCheckCircle } from "react-icons/fa";

export function AuthorProfile({ authorSlug }: { authorSlug?: string }) {
  if (!authorSlug) return null;

  const staff = getStaffBySlug(authorSlug);
  if (!staff) return null;

  return (
    <div className="mt-10 pt-6 border-t border-gray-100">
      <p className="text-sm font-medium text-gray-500 mb-4">この記事を書いたスタッフ</p>
      <Link
        href={`/about/staff#${staff.slug}`}
        className="block group"
      >
        <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors">
          {/* 著者写真 */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#c41e3a]/20">
            <Image
              src={staff.image}
              alt={staff.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          {/* 著者情報 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-gray-900 group-hover:text-[#c41e3a] transition-colors">
                {staff.name}
              </span>
              <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                {staff.role}
              </span>
            </div>
            {/* 資格バッジ */}
            {staff.certifications.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {staff.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 text-xs text-[#c41e3a] bg-[#c41e3a]/5 px-2 py-0.5 rounded-full"
                  >
                    <FaCheckCircle className="w-3 h-3" />
                    {cert}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {staff.introduction}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
