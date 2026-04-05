import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お申し込み完了 | cycleZ",
  description: "イベントへのお申し込みが完了しました。",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

// ブレーキ種類の表示名
const BRAKE_LABELS: Record<string, string> = {
  rim: "リムブレーキ",
  disc: "ディスクブレーキ",
};

export default async function EventSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">無効なアクセスです</p>
          <Link
            href="/"
            className="mt-4 inline-block text-[#c41e3a] hover:underline"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    );
  }

  // Stripe Sessionとデータベースから情報を取得
  let registration = null;
  let sessionData = null;

  try {
    sessionData = await getStripe().checkout.sessions.retrieve(session_id);

    const { data } = await getSupabaseAdmin()
      .from("event_registrations")
      .select("*")
      .eq("stripe_checkout_session_id", session_id)
      .single();

    registration = data;
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  const isPaid = sessionData?.payment_status === "paid";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          {/* 完了アイコン */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                isPaid
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              {isPaid ? (
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              {isPaid
                ? "お申し込み完了！"
                : "お支払い処理中..."}
            </h1>
            <p className="text-gray-600 mt-2">
              {isPaid
                ? "イベントへのご参加ありがとうございます。"
                : "決済の確認中です。しばらくお待ちください。"}
            </p>
          </div>

          {/* 申込内容 */}
          {registration && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h2 className="font-bold text-gray-900 text-sm border-b border-gray-200 pb-2">
                お申し込み内容
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">お名前</dt>
                  <dd className="font-medium text-gray-900">
                    {registration.name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">電話番号</dt>
                  <dd className="font-medium text-gray-900">
                    {registration.phone}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">ブレーキ種類</dt>
                  <dd className="font-medium text-gray-900">
                    {BRAKE_LABELS[registration.bike_brake_type] ||
                      registration.bike_brake_type}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <dt className="text-gray-500">お支払い金額</dt>
                  <dd className="text-lg font-bold text-[#c41e3a]">
                    ¥{registration.amount?.toLocaleString("ja-JP")}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {/* 注意事項 */}
          {isPaid && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                📋 イベント当日は集合時間までに集合場所へお越しください。
                ご不明な点がございましたら、店頭またはお電話（
                <a href="tel:086-252-7744" className="underline font-medium">
                  086-252-7744
                </a>
                ）にてお問い合わせください。
              </p>
            </div>
          )}

          {/* トップに戻る */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
