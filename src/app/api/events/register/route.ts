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
  bike_type?: BikeType;
  bike_brake_type?: BrakeType;
  bike_model?: string | null;
  payment_method?: PaymentMethod;
  event_slug: string;
  registration_type?: RegistrationType;
  companion_name?: string | null;
  companion_phone?: string | null;
  companion_bike_type?: BikeType | null;
  companion_bike_brake_type?: BrakeType | null;
  companion_bike_model?: string | null;
}

// クライアントから来る文字列は全部「嘘の可能性がある」前提で長さを刈る。
// 上限なしで insert すると1件で数MBの行を作られる（フォームを通さず直接POSTできる）。
const MAX_NAME = 60;
const MAX_PHONE = 20;
const MAX_MODEL = 80;

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

// 国内の固定/携帯（0始まり10〜11桁）だけ通す。ハイフン・全角数字・空白は正規化する。
function normalizePhone(raw: string): string | null {
  const half = raw.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
  const digits = half.replace(/[^0-9]/g, '');
  if (!/^0\d{9,10}$/.test(digits)) return null;
  return digits;
}

export async function POST(request: Request) {
  try {
    const body: RegisterBody = await request.json();
    const {
      bike_type,
      bike_brake_type,
      payment_method,
      event_slug,
      registration_type,
      companion_bike_type,
      companion_bike_brake_type,
    } = body;

    const name = clean(body.name, MAX_NAME);
    const phoneInput = clean(body.phone, MAX_PHONE);
    const bike_model = clean(body.bike_model, MAX_MODEL);
    const companion_name = clean(body.companion_name, MAX_NAME);
    const companion_phone_input = clean(body.companion_phone, MAX_PHONE);
    const companion_bike_model = clean(body.companion_bike_model, MAX_MODEL);

    if (!name || !phoneInput || !event_slug || typeof event_slug !== 'string') {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 },
      );
    }

    const phone = normalizePhone(phoneInput);
    if (!phone) {
      return NextResponse.json(
        { error: '電話番号は0から始まる10〜11桁でご入力ください' },
        { status: 400 },
      );
    }

    // イベント記事の存在確認
    const post = getPostBySlug(event_slug);
    if (!post || !post.registration_open) {
      return NextResponse.json(
        { error: 'このイベントは現在申込を受け付けていません' },
        { status: 400 },
      );
    }

    // 簡易申込（氏名+電話のみ・参加費無料）。price を持たないイベントはこちらでしか受けない
    const isSimple = post.registration_mode === 'simple';

    if (!isSimple && !post.price) {
      return NextResponse.json(
        { error: 'このイベントは現在申込を受け付けていません' },
        { status: 400 },
      );
    }

    const regType: RegistrationType = !isSimple && registration_type === 'pair' ? 'pair' : 'single';

    if (!isSimple) {
      if (!bike_type || !payment_method) {
        return NextResponse.json(
          { error: '必須項目が入力されていません' },
          { status: 400 },
        );
      }
      if (!['crossbike', 'roadbike'].includes(bike_type)) {
        return NextResponse.json({ error: '自転車の種類が不正です' }, { status: 400 });
      }
      if (!['store_payment', 'bank_transfer'].includes(payment_method)) {
        return NextResponse.json({ error: 'お支払い方法が不正です' }, { status: 400 });
      }
      const brakeOk = (v: unknown) => v === undefined || v === null || v === 'rim' || v === 'disc';
      const bikeOk = (v: unknown) =>
        v === undefined || v === null || v === 'crossbike' || v === 'roadbike';
      if (!brakeOk(bike_brake_type) || !brakeOk(companion_bike_brake_type) || !bikeOk(companion_bike_type)) {
        return NextResponse.json({ error: '自転車の情報が不正です' }, { status: 400 });
      }
      if (regType === 'pair') {
        if (!post.pair_price) {
          return NextResponse.json(
            { error: 'このイベントはペア申込に対応していません' },
            { status: 400 },
          );
        }
        if (!companion_name || !companion_phone_input || !companion_bike_type || !companion_bike_brake_type) {
          return NextResponse.json(
            { error: 'ペア申込はもう一人の情報も必須です' },
            { status: 400 },
          );
        }
      }
    }

    const companionPhone =
      regType === 'pair' ? normalizePhone(companion_phone_input) : null;
    if (regType === 'pair' && !companionPhone) {
      return NextResponse.json(
        { error: 'お連れさまの電話番号は0から始まる10〜11桁でご入力ください' },
        { status: 400 },
      );
    }

    // 連投・二重送信よけ。同じ氏名＋電話の組み合わせが既に生きていれば弾く。
    // （家族で電話番号を共有するケースがあるので、電話番号だけでは弾かない）
    const { data: dup } = await getSupabaseAdmin()
      .from('event_registrations')
      .select('id')
      .eq('event_slug', event_slug)
      .eq('name', name)
      .eq('phone', phone)
      .in('payment_status', ['pending', 'paid'])
      .limit(1);

    if (dup && dup.length > 0) {
      return NextResponse.json(
        { error: 'このお名前と電話番号ではすでにお申し込みを受け付けています' },
        { status: 400 },
      );
    }

    // 残席チェック（ペア申込は2席分消費）
    if (post.capacity) {
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
        return NextResponse.json({ error: '定員に達しました' }, { status: 400 });
      }
    }

    const amount = isSimple
      ? 0
      : regType === 'pair' && post.pair_price
        ? post.pair_price
        : post.price;

    // 簡易申込では自転車情報を集めない。bike_type は NOT NULL 制約があるので
    // 'unspecified' を入れる（CRM側は未知の値を「-」表示にフォールバックする）。
    const { error: dbError } = await getSupabaseAdmin()
      .from('event_registrations')
      .insert({
        event_slug,
        name,
        phone,
        bike_type: isSimple ? 'unspecified' : bike_type,
        bike_brake_type: isSimple ? null : bike_brake_type,
        bike_model: isSimple ? null : bike_model || null,
        payment_method: isSimple ? 'free' : payment_method,
        amount,
        payment_status: 'pending',
        registration_type: regType,
        companion_name: regType === 'pair' ? companion_name : null,
        companion_phone: regType === 'pair' ? companionPhone : null,
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
