import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// FAQ項目の型定義
export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  faq?: FaqItem[];
  content: string;
  // イベント申込・決済用フィールド
  price?: number;
  pair_price?: number;
  capacity?: number;
  registration_open?: boolean;
  event_date?: string;
  payment_due_label?: string;
  // 申込フォームを別記事のイベントに紐付けたい場合に指定（再告知記事など）
  registration_event_slug?: string;
}

export function getAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // 今日の日付（YYYY-MM-DD）。未来日付の記事はスケジュール公開として非表示にする
  const today = new Date().toISOString().split('T')[0];

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        category: data.category || '未分類',
        tags: data.tags || [],
        image: data.image,
        faq: data.faq,
        content,
        price: data.price,
        pair_price: data.pair_price,
        capacity: data.capacity,
        registration_open: data.registration_open,
        event_date: data.event_date,
        payment_due_label: data.payment_due_label,
        registration_event_slug: data.registration_event_slug,
      };
    })
    .filter((post) => post.date <= today);

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostData | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      category: data.category || '未分類',
      tags: data.tags || [],
      image: data.image,
      faq: data.faq,
      content,
      price: data.price,
      pair_price: data.pair_price,
      capacity: data.capacity,
      registration_open: data.registration_open,
      event_date: data.event_date,
      payment_due_label: data.payment_due_label,
      registration_event_slug: data.registration_event_slug,
    };
  } catch {
    return null;
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return categories;
}

export function getPostsByCategory(category: string): PostData[] {
  return getAllPosts().filter((post) => post.category === category);
}

// イベント記事の取得（eventカテゴリ、最新N件）
export function getEventPosts(limit: number): PostData[] {
  return getAllPosts()
    .filter((post) => post.category === "event")
    .slice(0, limit);
}

// イベントレポート記事の取得（event-reportカテゴリ、最新N件）
export function getEventReportPosts(limit: number): PostData[] {
  return getAllPosts()
    .filter((post) => post.category === "event-report")
    .slice(0, limit);
}

// ニュース・イベント記事の取得（news + event、最新N件）
export function getLatestNewsPosts(limit: number): PostData[] {
  return getAllPosts()
    .filter((post) => post.category === "news" || post.category === "event")
    .slice(0, limit);
}

// 全カテゴリの最新記事を取得（トップページお知らせ用）
export function getLatestPosts(limit: number): PostData[] {
  return getAllPosts().slice(0, limit);
}
