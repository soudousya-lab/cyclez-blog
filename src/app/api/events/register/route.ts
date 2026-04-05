import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getPostBySlug } from '@/lib/posts';

interface RegisterBody {
  name: string;
  phone: string;
  bike_type: 'crossbike' | 'roadbike';
  bike_brake_type: 'rim' | 'disc';
  bike_model: string | null;
  payment_method: 'store_payment' | 'bank_transfer';
  event_slug: string;
}

export async function POST(request: Request) {
  try {
    const body: RegisterBody = await request.json();
    const { name, phone, bike_type, bike_brake_type, bike_model, payment_method, event_slug } = body;

    // バリデーション
    if (!name || !phone || !bike_type || !payment_method || !event_slug) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 },
      );
    }

    if (!['crossbike', 'roadbike'].includes(bike_type)) {
      return NextResponse.json(
        { error: '自転車の種類が不正です' },
        { status: 400 },
      );
    }

    if (!['store_payment', 'bank_transfer'].includes(payment_method)) {
      return NextResponse.json(
        { error: 'お支払い方法が不正です' },
        { status: 400 },
      );
    }

    // イベント記事の存在確認
    const post = getPostBySlug(event_slug);
    if (!post || !post.price || !post.registration_open) {
      return NextResponse.json(
        { error: 'このイベントは現在申込を受け付けていません' },
        { status: 400 },
      );
    }

    // 残席チェック
    const { count } = await getSupabaseAdmin()
      .from('event_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('event_slug', event_slug)
      .in('payment_status', ['pending', 'paid']);

    if (post.capacity && count !== null && count >= post.capacity) {
      return NextResponse.json(
        { error: '定員に達しました' },
        { status: 400 },
      );
    }

    // 申込レコード挿入
    const { error: dbError } = await getSupabaseAdmin()
      .from('event_registrations')
      .insert({
        event_slug,
        name,
        phone,
        bike_type,
        bike_brake_type,
        bike_model: bike_model || null,
        payment_method,
        amount: post.price,
        payment_status: 'pending',
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { error: '申込の保存に失敗しました。もう一度お試しください' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 },
    );
  }
}
