"use client";

import { useEffect, useState } from "react";
import { FaTicketAlt, FaBicycle, FaCheckCircle, FaUserFriends, FaUser, FaPhoneAlt, FaBus, FaUsers } from "react-icons/fa";

interface Props {
  eventSlug: string;
  eventTitle: string;
  price: number;
  pairPrice?: number;
  capacity: number;
  eventDate: string;
  paymentDueLabel?: string;
}

function formatDiff(targetMs: number, nowMs: number): { days: number; hours: number; passed: boolean } {
  const diff = targetMs - nowMs;
  if (diff <= 0) return { days: 0, hours: 0, passed: true };
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  return { days, hours, passed: false };
}

type BikeType = "crossbike" | "roadbike";
type BrakeType = "rim" | "disc";
type PaymentMethod = "store_payment" | "bank_transfer";
type RegistrationType = "single" | "pair";

export default function EventRegistrationForm({
  eventSlug,
  eventTitle,
  price,
  pairPrice,
  capacity,
  eventDate,
  paymentDueLabel,
}: Props) {
  const pairEnabled = !!pairPrice && pairPrice > 0;

  const [capacityInfo, setCapacityInfo] = useState<{ remaining: number; total: number } | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch(`/api/events/${eventSlug}/capacity`, { cache: "no-store" })
        .then((r) => r.json())
        .then((data) => {
          if (!cancelled && typeof data?.remaining === "number") {
            setCapacityInfo({ remaining: data.remaining, total: data.total ?? capacity });
          }
        })
        .catch(() => {});
    };
    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [eventSlug, capacity]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  // 締切計算: 開催7日前 23:59:59（JST）まで全額返金キャンセル可
  const eventTimeMs = eventDate ? new Date(`${eventDate}T08:00:00+09:00`).getTime() : 0;
  const cancelDeadlineMs = eventDate
    ? new Date(`${eventDate}T23:59:59+09:00`).getTime() - 7 * 86_400_000
    : 0;
  const eventCountdown = eventTimeMs ? formatDiff(eventTimeMs, now) : null;
  const cancelCountdown = cancelDeadlineMs ? formatDiff(cancelDeadlineMs, now) : null;

  const [registrationType, setRegistrationType] = useState<RegistrationType>("single");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bikeType, setBikeType] = useState<BikeType | "">("");
  const [brakeType, setBrakeType] = useState<BrakeType | "">("");
  const [bikeModel, setBikeModel] = useState("");

  const [companionName, setCompanionName] = useState("");
  const [companionPhone, setCompanionPhone] = useState("");
  const [companionBikeType, setCompanionBikeType] = useState<BikeType | "">("");
  const [companionBrakeType, setCompanionBrakeType] = useState<BrakeType | "">("");
  const [companionBikeModel, setCompanionBikeModel] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // イベント終了判定
  const isEventPassed = eventDate
    ? new Date(eventDate) < new Date(new Date().toDateString())
    : false;

  const currentPrice = registrationType === "pair" && pairPrice ? pairPrice : price;
  const formattedPrice = currentPrice.toLocaleString("ja-JP");
  const singlePriceLabel = price.toLocaleString("ja-JP");
  const pairPriceLabel = pairPrice ? pairPrice.toLocaleString("ja-JP") : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !bikeType || !brakeType || !paymentMethod) {
      setError("必須項目をすべて入力してください");
      return;
    }

    if (registrationType === "pair") {
      if (!companionName.trim() || !companionPhone.trim() || !companionBikeType || !companionBrakeType) {
        setError("ペア申込はもう一人の情報もすべて入力してください");
        return;
      }
    }

    if (!agreed) {
      setError("免責事項に同意のうえ、チェックを入れてください");
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
          registration_type: registrationType,
          companion_name: registrationType === "pair" ? companionName.trim() : null,
          companion_phone: registrationType === "pair" ? companionPhone.trim() : null,
          companion_bike_type: registrationType === "pair" ? companionBikeType : null,
          companion_bike_brake_type: registrationType === "pair" ? companionBrakeType : null,
          companion_bike_model:
            registrationType === "pair" ? companionBikeModel.trim() || null : null,
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
              {paymentDueLabel || "前日までにcycleZ店頭にてお支払いください。"}
            </p>
          </div>
        )}
      </div>
    );
  }

  const remainingSeats = capacityInfo?.remaining ?? null;
  const isLowSeats = remainingSeats !== null && remainingSeats <= 10 && remainingSeats > 0;
  const isSoldOut = remainingSeats === 0;

  return (
    <div className="bg-white rounded-xl border-2 border-[#c41e3a] p-6 md:p-8">
      {/* 残席・カウントダウンバナー */}
      {(remainingSeats !== null || cancelCountdown || eventCountdown) && (
        <div className="-mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 rounded-t-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#c41e3a] to-[#a01830] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-bold">
              {remainingSeats !== null ? (
                <>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                    <FaTicketAlt size={14} />
                  </span>
                  {isSoldOut ? (
                    <span>満席になりました</span>
                  ) : (
                    <span>
                      残り <span className="text-2xl mx-1">{remainingSeats}</span> 席 / 全{capacityInfo?.total ?? capacity}席
                    </span>
                  )}
                </>
              ) : (
                <span>申込状況を確認中…</span>
              )}
            </div>
            {isLowSeats && (
              <span className="text-xs font-bold bg-amber-300 text-amber-900 px-2 py-1 rounded-full animate-pulse">
                まもなく締切
              </span>
            )}
          </div>
          {(cancelCountdown && !cancelCountdown.passed) || (eventCountdown && !eventCountdown.passed) ? (
            <div className="bg-amber-50 border-t border-amber-200 px-5 py-2.5 text-xs text-amber-900 flex flex-wrap gap-x-4 gap-y-1">
              {cancelCountdown && !cancelCountdown.passed && (
                <span>
                  ⏱ <strong>全額返金キャンセル期限</strong> まであと{" "}
                  <strong className="text-[#c41e3a]">
                    {cancelCountdown.days}日{cancelCountdown.hours}時間
                  </strong>
                </span>
              )}
              {eventCountdown && !eventCountdown.passed && (
                <span className="inline-flex items-center gap-1.5">
                  <FaBus className="text-[#c41e3a]" size={14} />
                  <strong>開催</strong> まであと{" "}
                  <strong className="text-[#c41e3a]">
                    {eventCountdown.days}日{eventCountdown.hours}時間
                  </strong>
                </span>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ヘッダー */}
      <div className="text-center mb-6">
        <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900 mb-2">
          <FaTicketAlt className="text-[#c41e3a]" size={22} />
          イベント参加申込
        </h3>
        <p className="text-sm text-gray-600">{eventTitle}</p>
      </div>

      {/* 申込タイプ切替（ペア対応イベントのみ） */}
      {pairEnabled && (
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            お申し込みタイプ
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRegistrationType("single")}
              className={`
                border-2 rounded-lg px-4 py-4 text-sm font-medium transition-all flex flex-col items-center gap-1
                ${
                  registrationType === "single"
                    ? "border-[#c41e3a] bg-[#c41e3a] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }
              `}
            >
              <FaUser size={20} />
              <span className="font-bold">個人申込</span>
              <span className="text-xs">¥{singlePriceLabel} / 1名</span>
            </button>
            <button
              type="button"
              onClick={() => setRegistrationType("pair")}
              className={`
                border-2 rounded-lg px-4 py-4 text-sm font-medium transition-all flex flex-col items-center gap-1 relative
                ${
                  registrationType === "pair"
                    ? "border-[#c41e3a] bg-[#c41e3a] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }
              `}
            >
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                お得
              </span>
              <FaUserFriends size={20} />
              <span className="font-bold">ペア申込</span>
              <span className="text-xs">¥{pairPriceLabel} / 2名</span>
            </button>
          </div>
          {registrationType === "pair" && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mt-2">
              ペア申込で
              <span className="font-bold">
                {" "}
                ¥{(price * 2 - (pairPrice || 0)).toLocaleString("ja-JP")}{" "}
              </span>
              お得（通常¥{(price * 2).toLocaleString("ja-JP")}/2名 → ¥{pairPriceLabel}/2名）
            </p>
          )}
        </div>
      )}

      {/* 同伴・問合せ案内 */}
      <div className="mb-5 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-900">
        <p className="font-bold mb-1">ご家族・配偶者で「乗らずに同乗のみ」も可能です</p>
        <p className="text-xs leading-relaxed">
          バス・拝観・昼食つき <strong>¥8,000</strong>（自転車不要）。お席に余裕があるためお電話で承ります。
        </p>
        <a
          href="tel:086-252-7744"
          className="mt-2 inline-flex items-center gap-2 bg-white border border-blue-300 text-blue-800 font-bold text-sm px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
        >
          <FaPhoneAlt size={12} /> 086-252-7744
        </a>
      </div>

      {/* サマリーカード */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-500">参加費</p>
          <p className="text-xl font-bold text-[#c41e3a]">
            ¥{formattedPrice}
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            {registrationType === "pair" ? "2名分" : "1名分"}
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
        {pairEnabled && registrationType === "pair" && (
          <p className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 -mb-2">
            <FaUser className="text-[#c41e3a]" size={14} />
            <span>ご本人さまの情報</span>
          </p>
        )}

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

        {/* ペア申込：お連れさま情報 */}
        {pairEnabled && registrationType === "pair" && (
          <div className="border-t-2 border-dashed border-gray-200 pt-5 space-y-5">
            <p className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700">
              <FaUsers className="text-[#c41e3a]" size={14} />
              <span>お連れさまの情報</span>
            </p>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                お名前
                <span className="text-[#c41e3a] ml-1">*</span>
              </label>
              <input
                type="text"
                value={companionName}
                onChange={(e) => setCompanionName(e.target.value)}
                placeholder="例: 山田 花子"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                電話番号
                <span className="text-[#c41e3a] ml-1">*</span>
              </label>
              <input
                type="tel"
                value={companionPhone}
                onChange={(e) => setCompanionPhone(e.target.value)}
                placeholder="例: 09098765432"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
              />
            </div>

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
                    onClick={() => setCompanionBikeType(option.value)}
                    className={`
                      border-2 rounded-lg px-4 py-3 text-sm font-medium transition-all
                      ${
                        companionBikeType === option.value
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
                    onClick={() => setCompanionBrakeType(option.value)}
                    className={`
                      border-2 rounded-lg px-4 py-3 text-sm font-medium transition-all
                      ${
                        companionBrakeType === option.value
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

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                車種名
                <span className="text-gray-400 text-xs ml-1">（任意）</span>
              </label>
              <input
                type="text"
                value={companionBikeModel}
                onChange={(e) => setCompanionBikeModel(e.target.value)}
                placeholder="例: GIOS AIRONE"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
              />
            </div>
          </div>
        )}

        {/* お支払い方法 */}
        <div className={pairEnabled && registrationType === "pair" ? "border-t-2 border-dashed border-gray-200 pt-5" : ""}>
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

        {/* 免責事項・同意チェックボックス */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm font-bold text-gray-800 mb-2">免責事項</p>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">
            本イベントは参加者ご自身の責任のもとでご参加いただきます。サイクリング中の事故・怪我・盗難・その他のトラブルについて、主催者（cycleZ・稲荷交通）は一切の責任を負いかねます。安全運転と交通法規の遵守をお願いいたします。また、天候やその他やむを得ない事情によるコース変更・中止についても、主催者は責任を負いません。
          </p>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]/30 cursor-pointer flex-shrink-0"
            />
            <span className="text-sm font-medium text-gray-800 group-hover:text-[#c41e3a] transition-colors">
              上記の免責事項に同意します
              <span className="text-[#c41e3a] ml-1">*</span>
            </span>
          </label>
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
