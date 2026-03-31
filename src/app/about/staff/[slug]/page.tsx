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
    title: `${staff.name}（${staff.role}） | スタッフ紹介`,
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
              <p className="text-gray-500 text-sm mb-3">{staff.nameEn}</p>
              <p className="text-[#c41e3a] font-bold text-lg mb-6">
                {staff.catchphrase}
              </p>

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

        {/* 愛車 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            愛車
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staff.bikes.map((bike, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* 愛車写真スロット */}
                <div className="aspect-[4/3] bg-gray-100 relative">
                  {bike.image ? (
                    <Image
                      src={bike.image}
                      alt={bike.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-gray-900">{bike.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 経歴 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
            <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
            経歴
          </h2>
          <div className="space-y-4">
            {staff.profile.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 資格・趣味 */}
        {(staff.certifications.length > 0 || staff.hobbies.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* 資格 */}
            {staff.certifications.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#c41e3a]">
                  <span className="w-1.5 h-6 bg-[#c41e3a] rounded-full flex-shrink-0" />
                  資格
                </h2>
                <ul className="space-y-2">
                  {staff.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-[#c41e3a] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 趣味 */}
            {staff.hobbies.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#c41e3a]">
                  <span className="w-1.5 h-6 bg-[#c41e3a] rounded-full flex-shrink-0" />
                  趣味
                </h2>
                <ul className="space-y-2">
                  {staff.hobbies.map((hobby) => (
                    <li
                      key={hobby}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-[#c41e3a] flex-shrink-0 mt-0.5">
                        &bull;
                      </span>
                      {hobby}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 作業中・ライド中の写真 */}
        {staff.actionImage && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <div className="aspect-[16/9] relative">
              <Image
                src={staff.actionImage}
                alt={`${staff.name}の活動風景`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

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
            &mdash; {staff.name}
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
                  <p className="text-sm text-[#c41e3a] font-medium mt-1">
                    {s.catchphrase}
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
