import { getEventPosts, getLatestNewsPosts } from "@/lib/posts";
import HeroSlider from "@/components/HeroSlider";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const latestNews = getLatestNewsPosts(1);
  const eventPosts = getEventPosts(6);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* メインコンテンツ（クライアントコンポーネント） */}
      <HomeContent latestNews={latestNews} eventPosts={eventPosts} />
    </div>
  );
}
