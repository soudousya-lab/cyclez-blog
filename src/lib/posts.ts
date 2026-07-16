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

// WP移行記事のうち31本はファイル名がURLエンコード済み（%e3%80%90… = 【…】）。
// slugを復号形にすると /blog/【3月の…】 になるが、Vercelの静的ルーティングが
// マルチバイトのパスを解決できず本番で404になる（ローカルの next start では200になるため
// ローカル検証だけでは検出できない）。
// 中身は2017〜2023年の「臨時休業のお知らせ」「4月の初心者講習会」等の期限切れ告知のみで、
// 今日の読者価値がゼロ。ASCIIへリネームして復活させると薄いコンテンツが31本増え、
// CLAUDE.mdのSEO安全ルール（薄いコンテンツ警告）に反する。
// よって一覧・カテゴリ・sitemapから外す。ファイルは記録として残す（削除しない）。
function isRetiredPost(fileName: string): boolean {
  return fileName.includes('%');
}

// slug（復号形）から実ファイルパスを引く。
// ここで readdirSync を使うと、getPostBySlug を呼ぶAPIルートのファイルトレースが
// cwd全体（public/images 366MB）を取り込み、Vercelの関数サイズ上限250MBを超える。
// 走査せず、ファイル名を決定的に再構成して existsSync だけで解決する。
function resolvePostPath(slug: string): string | null {
  const candidates = [
    slug,
    // WP移行記事31本はファイル名が小文字パーセントエンコード（%e3%80%90…）。
    // encodeURIComponent は大文字（%E3）を返すのでエスケープ部だけ小文字化して元の形に戻す。
    encodeURIComponent(slug).replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase()),
  ];

  for (const name of candidates) {
    if (isRetiredPost(`${name}.md`)) continue;
    const full = path.join(postsDirectory, `${name}.md`);
    // slugはURL由来。postsDirectory の外に出る指定を弾く
    if (!full.startsWith(postsDirectory + path.sep)) continue;
    if (fs.existsSync(full)) return full;
  }
  return null;
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
    .filter((fileName) => !isRetiredPost(fileName))
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
