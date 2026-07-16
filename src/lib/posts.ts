import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// WP移行時の記事31本はファイル名がURLエンコード済み（例: %e3%80%903%e6%9c%88… = 【3月の…】）。
// これをそのままslugにするとURL上の % が二重解釈され、どの形式でも404になる。
// slugは復号形（日本語）を正とし、ファイル解決だけを別に持つ。
// ASCIIのみのファイル名はdecodeしても変わらないため、既存記事のURLには影響しない。
function fileNameToSlug(fileName: string): string {
  const base = fileName.replace(/\.md$/, '');
  try {
    return decodeURIComponent(base);
  } catch {
    // 不正なパーセントシーケンスはそのまま使う
    return base;
  }
}

// slug（復号形）から実ファイルパスを引く。直接一致を先に試し、無ければ復号名で走査する。
function resolvePostPath(slug: string): string | null {
  const direct = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(direct)) return direct;

  if (!fs.existsSync(postsDirectory)) return null;
  const hit = fs
    .readdirSync(postsDirectory)
    .find((f) => f.endsWith('.md') && fileNameToSlug(f) === slug);
  return hit ? path.join(postsDirectory, hit) : null;
}

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
  // 著者（staff.tsのslugを指定。未指定時はcycleZ公式扱い）
  author?: string;
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
      const slug = fileNameToSlug(fileName);
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
        author: data.author,
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
    const fullPath = resolvePostPath(slug);
    if (!fullPath) return null;
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
      author: data.author,
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

// ホームの「イベント開催情報」枠用：告知(event)＋開催レポート(event-report)を合算（最新N件・日付降順）
export function getEventSectionPosts(limit: number): PostData[] {
  return getAllPosts()
    .filter((post) => post.category === "event" || post.category === "event-report")
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
