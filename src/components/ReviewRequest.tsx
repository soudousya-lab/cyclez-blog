"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { event } from "./Analytics";
import { GOOGLE_REVIEW_URL, GOOGLE_REVIEW_QR_PNG } from "@/lib/reviewLink";

/**
 * Googleクチコミの下書き補助 + 投稿ページへの送り出し。
 *
 * ■ このページのルール（2026-08-30 岡田判断で確定・勝手に広げない）
 * プルダウンから入るのは「単語」だけ。文・言い回し・語尾・定型文は一切用意しない。
 * 単語も、事実（車種・したこと・きっかけ）と話題の名詞（接客・価格など）に限る。
 *
 * ⚠️ 評価語（丁寧・親切・安心・おすすめ 等）はリストに入れない。
 *    店が評価語を用意すると、多数の投稿が同じ語彙から組まれて重複の痕跡になる。
 *    実際に2026-08-29時点のGBP84件のうち8件が、旧文面生成ツール由来の同一文を共有していた。
 *    Googleのクチコミポリシー（Rating Manipulation）が禁じる「特定のコンテンツを
 *    含めるよう依頼すること」にも近づく。評価は投稿者本人が自分の言葉で書く。
 *
 * ★の初期選択、投稿先の出し分け、通信環境の案内なども置かない（旧 /review の撤去理由）。
 */

type JourneyStep = {
  id: string;
  /** ステップの見出し。来店前→店内→選んだもの→その後、の順に並べる */
  label: string;
  /** その時点を思い出すための問いかけ。答えの内容は指定しない */
  question: string;
  /** プルダウンの初期表示。選ぶと本文のカーソル位置に単語が入る */
  placeholder: string;
  words: readonly string[];
};

// 来店前 → 店内 → 選んだもの → その後、というお客様の実際の道のり順に並べる。
// 上から順に埋めると、その人の体験がそのまま時系列の文章になる。
// 事実と話題の名詞のみ。形容詞・評価語は入れない。
// ブランドはプロジェクトCLAUDE.mdの承認済みリストに揃える（LAPIERREは取扱終了なので入れない）。
const JOURNEY_STEPS: readonly JourneyStep[] = [
  {
    id: "reason",
    label: "お店に来る前",
    question: "どんなことで困っていて、お店に来ましたか",
    placeholder: "きっかけを選ぶ",
    words: [
      "初めての一台",
      "買い替え",
      "パンク修理",
      "ブレーキの不調",
      "定期メンテナンス",
      "サイズ相談",
      "ウェア・小物",
      "イベント参加",
      "旅行の途中",
      "家族の自転車",
    ],
  },
  {
    id: "action",
    label: "お店で",
    question: "お店では何をしましたか",
    placeholder: "したことを選ぶ",
    words: [
      "試乗",
      "フィッティング",
      "サイズ合わせ",
      "修理",
      "部品交換",
      "タイヤ交換",
      "チェーン交換",
      "組み立て",
      "納車",
      "相談",
    ],
  },
  {
    id: "bike",
    label: "選んだもの",
    question: "どの車種にまたがりましたか。決め手は何でしたか",
    placeholder: "車種を選ぶ",
    words: [
      "ロードバイク",
      "クロスバイク",
      "グラベルバイク",
      "ミニベロ",
      "e-bike",
      "GIOS",
      "BASSO",
      "SCOTT",
      "BOMA",
      "BISYA",
      "De Rosa",
      "ORBEA",
      "FELT",
      "CERVELO",
      "CINELLI",
      "Wilier",
      "CYCLEHEART",
      "SURLY",
      "JAMIS",
      "Tyrell",
      "macchi cycles",
      "MATE.BIKE",
    ],
  },
  {
    id: "topic",
    label: "そのあと",
    question: "乗り始めてから、変わったことはありますか。書いておきたいことは",
    placeholder: "話題を選ぶ",
    // 「良かった点」ではなく話題の名詞。評価の向きは書き手が決める。
    words: ["接客", "品揃え", "価格", "納期", "アフターサービス", "店の雰囲気", "説明", "場所"],
  },
];

export default function ReviewRequest() {
  const pathname = usePathname();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  // 単語を差し込んだ直後に置きたいカーソル位置。
  // state ではなく ref で持つ（effect内でsetStateすると余計な再描画が走る）。
  const pendingCaretRef = useRef<number | null>(null);

  // requestAnimationFrame だと React の反映前に走ることがあり、カーソルが末尾へ飛ぶ。
  // 本文がDOMに反映されたあと同期で走る useLayoutEffect で位置を確定させる。
  useLayoutEffect(() => {
    const caret = pendingCaretRef.current;
    if (caret === null) return;
    pendingCaretRef.current = null;
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(caret, caret);
  }, [draft]);

  // 来店リードではないので cta_click には混ぜない（電話・問い合わせの定義を汚さないため）。
  const track = useCallback(
    (action: string, label?: string) => {
      event({ action, category: "engagement", label: label ? `${label}_${pathname}` : pathname });
    },
    [pathname],
  );

  /** カーソル位置に単語を差し込む。選択範囲があれば置き換える。 */
  const insertWord = (groupId: string, word: string) => {
    track("review_word_insert", groupId);
    setCopied(false);

    const el = textareaRef.current;

    // 第一手は execCommand("insertText")。挿入位置もカーソル移動も取り消し履歴も
    // ブラウザ任せになるので、Reactの再描画とカーソル復元が競合しない。
    // （自前で value を組み立てて setSelectionRange すると、反映のタイミング差で
    //   カーソルが末尾へ飛び、続きを打つと文字が離れた場所に入る）
    // input イベントが飛ぶので draft は onChange 経由で更新される。
    if (el) {
      el.focus();
      try {
        if (document.execCommand("insertText", false, word)) return;
      } catch {
        // フォールバックへ
      }
    }

    // フォールバック: 自前で組み立て、カーソルはDOM反映後に置き直す
    const start = el?.selectionStart ?? draft.length;
    const end = el?.selectionEnd ?? draft.length;
    setDraft(draft.slice(0, start) + word + draft.slice(end));
    pendingCaretRef.current = start + word.length;
  };

  const handleCopy = async () => {
    if (!draft.trim()) return;

    const succeeded = () => {
      setCopied(true);
      setCopyFailed(false);
      track("review_draft_copy");
      window.setTimeout(() => setCopied(false), 4000);
    };

    // navigator.clipboard は権限・非フォーカス・古いiOS Safariで落ちる。
    // 落ちたら本文を全選択して execCommand、それも駄目なら選択したまま手動コピーを案内する。
    try {
      await navigator.clipboard.writeText(draft);
      succeeded();
      return;
    } catch {
      // 次のフォールバックへ
    }

    const el = textareaRef.current;
    if (el) {
      el.focus();
      el.setSelectionRange(0, el.value.length);
      try {
        if (document.execCommand("copy")) {
          succeeded();
          return;
        }
      } catch {
        // 次のフォールバックへ
      }
    }
    setCopyFailed(true);
  };

  const handleClear = () => {
    setDraft("");
    setCopied(false);
    setCopyFailed(false);
    textareaRef.current?.focus();
  };

  const charCount = [...draft].length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 pb-28 md:pb-10">
      {/* お願い */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-6">
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
          <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
          クチコミのお願い
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          cycleZをご利用いただき、ありがとうございます。
          もしよかったら、Googleのクチコミに感想を残していただけると嬉しいです。
        </p>
        <p className="text-gray-700 leading-relaxed">
          書いていただいた言葉は、これから自転車を探す方がお店を選ぶときの手がかりになります。
          良かったことも、気になったことも、感じたままで大丈夫です。
        </p>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("review_link_click", "direct")}
          className="inline-block mt-6 text-[#c41e3a] font-bold hover:underline"
        >
          そのまま書ける方はこちらから（Googleが開きます）
        </a>
      </section>

      {/* 下書きツール */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-6">
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
          <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
          言葉をえらんで下書き
        </h2>

        <p className="text-gray-700 leading-relaxed mb-2">
          お店に来る前から今までを、順番に思い出してみてください。
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          プルダウンで選べるのは<strong className="font-bold text-gray-900">単語だけ</strong>です。
          つなぎの言葉や語尾はご自身で打ってください。文章はあなたのものです。
        </p>

        {/* お客様の道のり順に並べたステップ。上から埋めると体験が時系列になる */}
        <ol className="relative ml-4 pl-8 space-y-8 mb-2">
          {JOURNEY_STEPS.map((step, i) => (
            <li key={step.id} className="relative">
              <span
                className="absolute -left-8 top-8 -bottom-8 w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <span
                className="absolute -left-12 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#c41e3a] text-white text-sm font-bold"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="font-bold text-gray-900 leading-tight">{step.label}</p>
              <label htmlFor={`word-${step.id}`} className="block text-sm text-gray-600 mt-1 mb-2">
                {step.question}
              </label>
              <select
                id={`word-${step.id}`}
                value=""
                onChange={(e) => {
                  if (e.target.value) insertWord(step.id, e.target.value);
                  e.target.value = "";
                }}
                className="w-full sm:max-w-xs py-2.5 px-3 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]"
              >
                <option value="">{step.placeholder}</option>
                {step.words.map((word) => (
                  <option key={word} value={word}>
                    {word}
                  </option>
                ))}
              </select>
            </li>
          ))}

          {/* 5: ここまでで思い出したことを、自分の言葉で文章にする */}
          <li className="relative">
            <span className="absolute -left-8 top-8 -bottom-8 w-0.5 bg-gray-200" aria-hidden="true" />
            <span
              className="absolute -left-12 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#c41e3a] text-white text-sm font-bold"
              aria-hidden="true"
            >
              5
            </span>
            <p className="font-bold text-gray-900 leading-tight">文章にする</p>
            <label htmlFor="review-draft" className="block text-sm text-gray-600 mt-1 mb-2">
              えらんだ言葉をつないで、ご自身の言葉で書いてください
            </label>
            <textarea
              id="review-draft"
              ref={textareaRef}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setCopied(false);
              }}
              rows={7}
              placeholder="ここに入力してください。上のプルダウンから、カーソルの位置に単語を入れられます。"
              className="w-full p-4 rounded-xl border border-gray-300 text-gray-800 leading-relaxed resize-y focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{charCount}文字</span>
              {draft.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-gray-500 underline hover:text-gray-700"
                >
                  消して最初から
                </button>
              )}
            </div>
          </li>

          {/* 6: コピーしてGoogleへ。ここだけが外部への遷移 */}
          <li className="relative">
            <span
              className="absolute -left-12 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#c41e3a] text-white text-sm font-bold"
              aria-hidden="true"
            >
              6
            </span>
            <p className="font-bold text-gray-900 leading-tight">コピーして投稿する</p>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              コピーしてからGoogleを開き、入力欄に貼り付けてください
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!draft.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-5 rounded-xl border-2 border-[#c41e3a] text-[#c41e3a] font-bold transition-colors enabled:hover:bg-[#c41e3a]/5 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                {copied ? "コピーしました" : "この文章をコピー"}
              </button>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("review_link_click", "after_draft")}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-[#c41e3a] text-white font-bold shadow-sm transition-colors hover:bg-[#a01830] active:bg-[#a01830]"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
                </svg>
                Googleを開いて貼り付ける
              </a>
            </div>
          </li>
        </ol>

        {copyFailed && (
          <p className="mt-3 text-sm text-[#c41e3a]">
            自動コピーができませんでした。本文を選択した状態にしたので、長押しまたは Ctrl+C
            でコピーしてください。
          </p>
        )}
        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          投稿にはGoogleアカウントでのログインが必要です。
        </p>
      </section>

      {/* QR: 店頭の画面から自分のスマホへ渡すため */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-6">
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
          <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
          別のスマホで開く
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          店頭の画面をご覧いただいている場合は、こちらを読み取るとご自身のスマホで開けます。
        </p>
        <div className="flex flex-col items-center">
          <div className="bg-white p-3 rounded-xl border border-gray-200">
            <Image
              src={GOOGLE_REVIEW_QR_PNG}
              alt="Googleクチコミ投稿ページのQRコード"
              width={220}
              height={220}
              className="w-[220px] h-[220px]"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* 店舗情報 */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#c41e3a]">
          <span className="w-1.5 h-8 bg-[#c41e3a] rounded-full flex-shrink-0" />
          cycleZ（サイクルゼット）
        </h2>
        <dl className="space-y-3 text-gray-700">
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <dt className="font-bold text-gray-900 sm:w-24 flex-shrink-0">住所</dt>
            <dd>岡山県岡山市北区島田本町1-1-47</dd>
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <dt className="font-bold text-gray-900 sm:w-24 flex-shrink-0">電話番号</dt>
            <dd>
              <a href="tel:086-252-7744" className="text-[#c41e3a] font-bold hover:underline">
                086-252-7744
              </a>
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <dt className="font-bold text-gray-900 sm:w-24 flex-shrink-0">営業時間</dt>
            <dd>11:00〜19:00（水曜定休）</dd>
          </div>
        </dl>
        <p className="mt-8 text-gray-700 leading-relaxed">
          またお店で会えるのを楽しみにしとるゼーーーット！！
        </p>
      </section>
    </div>
  );
}
