import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  content: string;
}

export function getAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

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
        content,
      };
    });

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
      content,
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
