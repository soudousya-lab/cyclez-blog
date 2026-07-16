import { Metadata } from "next";
import { getEventSectionPosts, getLatestNewsPosts, getLatestPosts } from "@/lib/posts";
import HeroSlider from "@/components/HeroSlider";
import HomeContent from "@/components/HomeContent";

// title/description は layout.tsx の default を継承する。ここは canonical のみ。
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const latestNews = getLatestNewsPosts(1);
  const eventPosts = getEventSectionPosts(6);
  const latestPosts = getLatestPosts(10);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* メインコンテンツ（クライアントコンポーネント） */}
      <HomeContent latestNews={latestNews} eventPosts={eventPosts} latestPosts={latestPosts} />
    </div>
  );
}
