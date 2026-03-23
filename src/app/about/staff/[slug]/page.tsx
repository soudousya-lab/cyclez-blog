import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { staffMembers, getStaffBySlug, getOtherStaff } from "@/lib/staff";

export function generateStaticParams() {
  return staffMembers.map((s) => ({ slug: s.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const staff = getStaffBySlug(slug);
  if (!staff) return {};
  return {
    title: `${staff.name}（${staff.role}）`,
    description: staff.introduction,
  };
}

export default async function StaffDetailPage({ params }: Props) {
  const { slug } = await params;
  const staff = getStaffBySlug(slug);
  if (!staff) notFound();

  const otherStaff = getOtherStaff(slug);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title={staff.name}
        subtitle={staff.nameEn.toUpperCase()}
        breadcrumbs={[
          { label: "cycleZについて", href: "/about" },
          { label: "スタッフ紹介", href: "/about/staff" },
          { label: staff.name },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* ヒーローセクション */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="md:flex">
            {/* 写真 */}
            <div className="md:w-2/5 relative aspect-[3/4] md:aspect-auto">
              <Image
                src={staff.image}
                alt={staff.name}
                fill
                className="object-cover"
              />
            </div>
            {/* 基本情報 */}
            <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
              <span className="inline-block bg-[#c41e3a] text-white text-sm font-bold px-4 py-1 rounded-full w-fit mb-4">
                {staff.role}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {staff.name}
              </h1>
              <p className="text-gray-500 text-sm mb-6">{staff.nameEn}</p>

              {/* 得意分野 */}
              <div className="flex flex-wrap gap-2">
                {staff.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-sm bg-[#c41e3a]/10 text-[#c41e3a] px-3 py-1.5 rounded-full font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* プロフィール */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            プロフィール
          </h2>
          <div className="space-y-4">
            {staff.profile.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* お客様へのメッセージ */}
        <div className="bg-gradient-to-r from-[#c41e3a]/10 to-[#c41e3a]/5 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            お客様へのメッセージ
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg italic">
            &ldquo;{staff.message}&rdquo;
          </p>
          <p className="text-right text-gray-600 mt-4 font-bold">
            — {staff.name}
          </p>
        </div>

        {/* 他のスタッフ */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            他のスタッフ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherStaff.map((s) => (
              <Link
                key={s.slug}
                href={`/about/staff/${s.slug}`}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-[#c41e3a] transition-colors">
                    {s.name}
                  </p>
                  <p className="text-sm text-gray-500">{s.role}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {s.introduction}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
