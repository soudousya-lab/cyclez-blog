"use client";

import { useEffect, useState } from "react";
import { FaTicketAlt, FaCheckCircle, FaBicycle } from "react-icons/fa";
import { trackFormSubmit } from "./Analytics";

/**
 * 氏名と電話番号だけで受け付ける申込フォーム。
 *
 * バス＆サイクリングツアー用の EventRegistrationForm とは別物。あちらは
 * 自転車の種類・ブレーキ形式（バス積載のため）・支払い方法まで必要だが、
 * 自走集合・参加費無料のイベントではその全部が余計な離脱要因になる。
 * 記事側は frontmatter の registration_mode: "simple" でこちらを呼ぶ。
 *
 * 保存先・残席APIは EventRegistrationForm と同一（Supabase event_registrations →
 * cyclez-crm /admin/events）。集計を1本の線に保つため、テーブルは分けない。
 */
interface Props {
  eventSlug: string;
  eventTitle: string;
  capacity: number;
  /** YYYY-MM-DD。終了判定と表示に使う */
  eventDate: string;
  /** 参加費以外に当日かかる実費の案内（例: モーニング代 1人1,100円） */
  onSiteCostNote?: string;
  /** 申込完了後に出す当日の案内。集合時間・場所など */
  completionNote?: string;
  /** 免責事項に出す主催者名。未指定なら cycleZ 単独 */
  organizers?: string;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/** "2026-09-23" → "2026年9月23日(水)"。不正な値はそのまま返す */
function formatEventDate(value: string): string {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value;
  // 曜日は必ずUTC基準で出す。ローカル時刻で出すと Vercel(UTC) のSSGと
  // 日本時間のブラウザで曜日がずれる（前日の曜日になる）
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const day = Number(m[3]);
  const d = new Date(Date.UTC(y, mo - 1, day));
  if (Number.isNaN(d.getTime())) return value;
  return `${y}年${mo}月${day}日(${WEEKDAYS[d.getUTCDay()]})`;
}

export default function SimpleEventRegistrationForm({
  eventSlug,
  eventTitle,
  capacity,
  eventDate,
  onSiteCostNote,
  completionNote,
  organizers,
}: Props) {
  const [capacityInfo, setCapacityInfo] = useState<{ remaining: number; total: number } | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

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

  // 開催日を過ぎたら申込を閉じる（当日中は開けておく）。
  // 現在時刻は state に持つ（EventRegistrationForm と同じ持ち方）
  const eventEndMs = eventDate ? new Date(`${eventDate}T23:59:59+09:00`).getTime() : 0;
  const isEventPassed = eventEndMs > 0 && eventEndMs < now;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("お名前と電話番号をご入力ください");
      return;
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
      trackFormSubmit("event_registration", `/blog/${eventSlug}`, {
        event_slug: eventSlug,
        event_title: eventTitle,
        registration_type: "single",
        price: 0,
      });
    } catch {
      setError("通信エラーが発生しました。もう一度お試しください");
      setSubmitting(false);
    }
  };

  if (isEventPassed) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 md:p-8 text-center">
        <FaBicycle className="text-gray-400 mx-auto mb-3" size={40} />
        <p className="text-lg font-bold text-gray-700">このイベントは終了しました</p>
        <p className="text-sm text-gray-500 mt-2">次回のイベント情報をお楽しみに！</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-green-50 rounded-xl border-2 border-green-500 p-6 md:p-8 text-center">
        <FaCheckCircle className="text-green-500 mx-auto mb-3" size={40} />
        <p className="text-xl font-bold text-green-800 mb-2">お申し込みが完了しました</p>
        <p className="text-sm text-green-700 mb-4">
          ありがとうございます。当日のご参加をお待ちしております。
        </p>
        {completionNote && (
          <div className="bg-white rounded-lg p-4 text-left border border-green-200">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {completionNote}
            </p>
          </div>
        )}
      </div>
    );
  }

  const remainingSeats = capacityInfo?.remaining ?? null;
  const isLowSeats = remainingSeats !== null && remainingSeats <= 5 && remainingSeats > 0;
  const isSoldOut = remainingSeats === 0;

  return (
    <div className="bg-white rounded-xl border-2 border-[#c41e3a] p-6 md:p-8">
      {/* 残席バナー */}
      <div className="-mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 rounded-t-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#c41e3a] to-[#a01830] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
              <FaTicketAlt size={14} />
            </span>
            {remainingSeats === null ? (
              <span>申込状況を確認中…</span>
            ) : isSoldOut ? (
              <span>定員に達しました</span>
            ) : (
              <span>
                残り <span className="text-2xl mx-1">{remainingSeats}</span> 名 / 定員
                {capacityInfo?.total ?? capacity}名
              </span>
            )}
          </div>
          {isLowSeats && (
            <span className="text-xs font-bold bg-amber-300 text-amber-900 px-2 py-1 rounded-full">
              まもなく締切
            </span>
          )}
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900 mb-2">
          <FaTicketAlt className="text-[#c41e3a]" size={22} />
          参加申込
        </h3>
        <p className="text-sm text-gray-600">{eventTitle}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-500">参加費</p>
          <p className="text-xl font-bold text-[#c41e3a]">無料</p>
        </div>
        <div className="w-px h-10 bg-gray-300" />
        <div>
          <p className="text-xs text-gray-500">開催日</p>
          <p className="font-medium text-gray-900">{formatEventDate(eventDate)}</p>
        </div>
      </div>

      {onSiteCostNote && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-sm text-amber-900 leading-relaxed">{onSiteCostNote}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="simple-reg-name" className="block text-sm font-bold text-gray-700 mb-1.5">
            お名前
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <input
            id="simple-reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 山田 太郎"
            autoComplete="name"
            maxLength={60}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="simple-reg-phone" className="block text-sm font-bold text-gray-700 mb-1.5">
            電話番号
            <span className="text-[#c41e3a] ml-1">*</span>
          </label>
          <input
            id="simple-reg-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="例: 09012345678"
            autoComplete="tel"
            maxLength={20}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/30 focus:border-[#c41e3a] transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1.5">
            当日の連絡（中止・集合場所の変更など）に使わせていただきます。
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm font-bold text-gray-800 mb-2">免責事項</p>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">
            本イベントは参加者ご自身の責任のもとでご参加いただきます。サイクリング中の事故・怪我・盗難・その他のトラブルについて、主催者（{organizers || "cycleZ"}）は一切の責任を負いかねます。安全運転と交通法規の遵守をお願いいたします。また、天候やその他やむを得ない事情によるコース変更・中止についても、主催者は責任を負いません。
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

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || isSoldOut}
          className={`w-full rounded-lg px-8 py-4 text-base font-bold transition-all ${
            submitting || isSoldOut
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#c41e3a] text-white hover:bg-[#a31830] active:scale-[0.98]"
          }`}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              処理中...
            </span>
          ) : isSoldOut ? (
            "定員に達しました"
          ) : (
            "申し込む"
          )}
        </button>
      </form>
    </div>
  );
}
