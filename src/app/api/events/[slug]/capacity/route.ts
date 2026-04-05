import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getPostBySlug } from '@/lib/posts';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.capacity) {
    return NextResponse.json({ remaining: 0, total: 0 });
  }

  const { count } = await getSupabaseAdmin()
    .from('event_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_slug', slug)
    .in('payment_status', ['pending', 'paid']);

  const remaining = Math.max(0, post.capacity - (count || 0));

  return NextResponse.json({
    remaining,
    total: post.capacity,
  });
}
