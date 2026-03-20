import { getEventPosts, getLatestNewsPosts, getLatestPosts } from "@/lib/posts";
import HeroSlider from "@/components/HeroSlider";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const latestNews = getLatestNewsPosts(1);
  const eventPosts = getEventPosts(6);
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
