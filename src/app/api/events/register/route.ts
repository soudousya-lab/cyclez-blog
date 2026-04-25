import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getPostBySlug } from '@/lib/posts';

type BikeType = 'crossbike' | 'roadbike';
type BrakeType = 'rim' | 'disc';
type PaymentMethod = 'store_payment' | 'bank_transfer';
type RegistrationType = 'single' | 'pair';

interface RegisterBody {
  name: string;
  phone: string;
  bike_type: BikeType;
  bike_brake_type: BrakeType;
  bike_model: string | null;
  payment_method: PaymentMethod;
  event_slug: string;
  registration_type?: RegistrationType;
  companion_name?: string | null;
  companion_phone?: string | null;
  companion_bike_type?: BikeType | null;
  companion_bike_brake_type?: BrakeType | null;
  companion_bike_model?: string | null;
}

export async function POST(request: Request) {
  try {
    const body: RegisterBody = await request.json();
    const {
      name,
      phone,
      bike_type,
      bike_brake_type,
      bike_model,
      payment_method,
      event_slug,
      registration_type,
      companion_name,
      companion_phone,
      companion_bike_type,
      companion_bike_brake_type,
      companion_bike_model,
    } = body;

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

    const regType: RegistrationType = registration_type === 'pair' ? 'pair' : 'single';

    // イベント記事の存在確認
    const post = getPostBySlug(event_slug);
    if (!post || !post.price || !post.registration_open) {
      return NextResponse.json(
        { error: 'このイベントは現在申込を受け付けていません' },
        { status: 400 },
      );
    }

    // ペア申込の場合の追加バリデーション
    if (regType === 'pair') {
      if (!post.pair_price) {
        return NextResponse.json(
          { error: 'このイベントはペア申込に対応していません' },
          { status: 400 },
        );
      }
      if (!companion_name || !companion_phone || !companion_bike_type || !companion_bike_brake_type) {
        return NextResponse.json(
          { error: 'ペア申込はもう一人の情報も必須です' },
          { status: 400 },
        );
      }
    }

    // 残席チェック（ペア申込は2席分消費）
    const { count } = await getSupabaseAdmin()
      .from('event_registrations')
      .select('seats_used:registration_type', { count: 'exact', head: false })
      .eq('event_slug', event_slug)
      .in('payment_status', ['pending', 'paid']);

    // 簡易残席計算: 行数だけだとペアが2席分カウントされないので別途取得して計算
    if (post.capacity && count !== null) {
      const { data: regs } = await getSupabaseAdmin()
        .from('event_registrations')
        .select('registration_type')
        .eq('event_slug', event_slug)
        .in('payment_status', ['pending', 'paid']);

      const usedSeats = (regs || []).reduce((sum, r) => {
        return sum + (r.registration_type === 'pair' ? 2 : 1);
      }, 0);

      const seatsRequested = regType === 'pair' ? 2 : 1;
      if (usedSeats + seatsRequested > post.capacity) {
        return NextResponse.json(
          { error: '定員に達しました' },
          { status: 400 },
        );
      }
    }

    const amount = regType === 'pair' && post.pair_price ? post.pair_price : post.price;

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
        amount,
        payment_status: 'pending',
        registration_type: regType,
        companion_name: regType === 'pair' ? companion_name : null,
        companion_phone: regType === 'pair' ? companion_phone : null,
        companion_bike_type: regType === 'pair' ? companion_bike_type : null,
        companion_bike_brake_type: regType === 'pair' ? companion_bike_brake_type : null,
        companion_bike_model: regType === 'pair' ? companion_bike_model || null : null,
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
