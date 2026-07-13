import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/posts';

const BASE_URL = 'https://cycle-z.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const updatedAt = new Date('2026-06-30');

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // カテゴリページ
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/category/${encodeURIComponent(cat)}`,
    lastModified: updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 固定ページ
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/about`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/about/greeting`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/first`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/first/beginner`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/maintenance`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/fitting`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/access`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/lineup`, lastModified: updatedAt, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/lineup/cinelli`, lastModified: new Date('2026-07-13'), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/lineup/bisya`, lastModified: new Date('2026-07-13'), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: updatedAt, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return [
    {
      url: BASE_URL,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...staticPages,
    ...categoryEntries,
    ...postEntries,
  ];
}
