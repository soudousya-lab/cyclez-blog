"use client";

import { useState } from "react";
import { FaTicketAlt, FaBicycle, FaCheckCircle } from "react-icons/fa";

interface Props {
  eventSlug: string;
  eventTitle: string;
  price: number;
  capacity: number;
  eventDate: string;
}

type BikeType = "crossbike" | "roadbike";
type BrakeType = "rim" | "disc";
type PaymentMethod = "store_payment" | "bank_transfer";

export default function EventRegistrationForm({
  eventSlug,
  eventTitle,
  price,
  capacity,
  eventDate,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bikeType, setBikeType] = useState<BikeType | "">("");
  const [brakeType, setBrakeType] = useState<BrakeType | "">("");
  const [bikeModel, setBikeModel] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // イベント終了判定
  const isEventPassed = eventDate
    ? new Date(eventDate) < new Date(new Date().toDateString())
    : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !bikeType || !brakeType || !paymentMethod) {
      setError("必須項目をすべて入力してください");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          bike_type: bikeType,
          bike_brake_type: brakeType,
          bike_model: bikeModel.trim() || null,
          payment_method: paymentMethod,
          event_slug: eventSlug,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "エラーが発生しました");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("通信エラーが発生しました。もう一度お試しください");
      setSubmitting(false);
    }
  };

  // イベント終了
  if (isEventPassed) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 md:p-8 text-center">
        <FaBicycle className="text-gray-400 mx-auto mb-3" size={40} />
        <p className="text-lg font-bold text-gray-700">
          このイベントは終了しました
        </p>
        <p className="text-sm text-gray-500 mt-2">
          次回のイベント情報をお楽しみに！
        </p>
      </div>
    );
  }

  // 申込完了
  if (submitted) {
    return (
      <div className="bg-green-50 rounded-xl border-2 border-green-500 p-6 md:p-8 text-center">
        <FaCheckCircle className="text-green-500 mx-auto mb-3" size={40} />
        <p className="text-xl font-bold text-green-800 mb-2">
          お申し込みが完了しました
        </p>
        <p className="text-sm text-green-700 mb-4">
          ありがとうございます！当日のご参加をお待ちしております。
        </p>
        {paymentMethod === "bank_transfer" && (
          <div className="bg-white rounded-lg p-4 text-left border border-green-200">
            <p className="text-sm font-bold text-gray-800 mb-2">
              お振込先（7日以内にお振込みください）
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>中国銀行 本店営業部</p>
              <p>普通 3366396</p>
              <p>サイクルゼット オカダシュウメイ</p>
            </div>
          </div>
        )}
        {paymentMethod === "store_payment" && (
          <div className="bg-white rounded-lg p-4 text-left border border-green-200">
            <p className="text-sm text-gray-700">
              前日（5月16日）までにcycleZ店頭にてお支払いください。
            </p>
          </div>
        )}
      </div>
    );
  }

  const formattedPrice = price.toLocaleString("ja-JP");

  return (
    <div className="bg-white rounded-xl border-2 border-[#c41e3a] p-6 md:p-8">
      {/* ヘッダー */}
      <div className="text-center mb-6">
        <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900 mb-2">
          <FaTicketAlt className="text-[#c41e3a]" size={22} />
          イベント参加申込
        </h3>
        <p className="text-sm text-gray-600">{eventTitle}</p>
      </div>

      {/* サマリーカード */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-500">参加費</p>
          <p className="text-xl font-bold text-[#c41e3a]">
            ¥{formattedPrice}
          </p>
        </div>
        <div className="w-px h-10 bg-gray-300" />
        <div>
          <p className="text-xs text-gray-500">開催日</p>
          <p className="font-medium text-gray-900">{eventDate}</p>
        </div>
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* お名前 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            お名前
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 山田 太郎"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
          />
        </div>

        {/* 電話番号 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            電話番号
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="例: 09012345678"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
          />
        </div>

        {/* 自転車の種類 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            持ち込み自転車の種類
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "crossbike" as BikeType, label: "クロスバイク" },
              { value: "roadbike" as BikeType, label: "ロードバイク" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setBikeType(option.value)}
                className={`
                  border-2 rounded-lg px-4 py-3 text-sm font-medium transition-all
                  ${
                    bikeType === option.value
                      ? "border-[#c41e3a] bg-[#c41e3a] text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* ブレーキ種類 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            ブレーキ種類
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "rim" as BrakeType, label: "リムブレーキ" },
              { value: "disc" as BrakeType, label: "ディスクブレーキ" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setBrakeType(option.value)}
                className={`
                  border-2 rounded-lg px-4 py-3 text-sm font-medium transition-all
                  ${
                    brakeType === option.value
                      ? "border-[#c41e3a] bg-[#c41e3a] text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            ※バスへの積載方法が異なるため、正確にお選びください
          </p>
        </div>

        {/* 車種名（任意） */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            車種名
            <span className="text-gray-400 text-xs ml-1">（任意）</span>
          </label>
          <input
            type="text"
            value={bikeModel}
            onChange={(e) => setBikeModel(e.target.value)}
            placeholder="例: SCOTT Addict"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
          />
        </div>

        {/* お支払い方法 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            お支払い方法
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: "store_payment" as PaymentMethod, label: "店頭支払い（前日までにcycleZ店頭にて）" },
              { value: "bank_transfer" as PaymentMethod, label: "口座振込" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPaymentMethod(option.value)}
                className={`
                  border-2 rounded-lg px-4 py-3 text-sm font-medium transition-all text-left
                  ${
                    paymentMethod === option.value
                      ? "border-[#c41e3a] bg-[#c41e3a] text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* 口座振込の振込先表示 */}
          {paymentMethod === "bank_transfer" && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-bold text-blue-800 mb-2">振込先</p>
              <div className="text-sm text-blue-900 space-y-1">
                <p>中国銀行 本店営業部</p>
                <p>普通 3366396</p>
                <p>サイクルゼット オカダシュウメイ</p>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                ※お申し込み後7日以内にお振込みください
              </p>
            </div>
          )}
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={submitting}
          className={`
            w-full rounded-lg px-8 py-4 text-base font-bold transition-all
            ${
              submitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-[#c41e3a] text-white hover:bg-[#a31830] active:scale-[0.98]"
            }
          `}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              処理中...
            </span>
          ) : (
            "申し込む"
          )}
        </button>
      </form>
    </div>
  );
}
