"use client";

import { useState, useCallback } from "react";
import {
  MdDirectionsBike,
  MdBuild,
  MdChat,
  MdRoute,
  MdSettings,
} from "react-icons/md";
import {
  FaTshirt,
  FaSmile,
  FaBook,
  FaStar as FaStarIcon,
  FaStore,
  FaHome,
  FaTag,
  FaBolt,
  FaRegCopy,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import {
  FaSearchLocation,
  FaGlobeAsia,
  FaUserFriends,
  FaHeart,
} from "react-icons/fa";
import {
  triggerOptions,
  purposeOptions,
  detailOptions,
  impressionOptions,
  experienceOptions,
  generateReview,
  type TriggerKey,
  type PurposeKey,
  type ImpressionKey,
  type ExperienceKey,
  type ReviewSelections,
} from "@/lib/reviewTemplates";

// アイコンマッピング
const triggerIcons: Record<Exclude<TriggerKey, "skip">, React.ReactNode> = {
  nearby: <FaSearchLocation className="text-2xl text-[#c41e3a]" />,
  reputation: <FaGlobeAsia className="text-2xl text-[#c41e3a]" />,
  referral: <FaUserFriends className="text-2xl text-[#c41e3a]" />,
  interested: <FaHeart className="text-2xl text-[#c41e3a]" />,
};

const purposeIcons: Record<PurposeKey, React.ReactNode> = {
  purchase: <MdDirectionsBike className="text-2xl text-[#c41e3a]" />,
  maintenance: <MdBuild className="text-2xl text-[#c41e3a]" />,
  consultation: <MdChat className="text-2xl text-[#c41e3a]" />,
  testride: <MdRoute className="text-2xl text-[#c41e3a]" />,
  parts: <MdSettings className="text-2xl text-[#c41e3a]" />,
  apparel: <FaTshirt className="text-2xl text-[#c41e3a]" />,
};

const impressionIcons: Record<ImpressionKey, React.ReactNode> = {
  service: <FaSmile className="text-2xl text-[#c41e3a]" />,
  knowledge: <FaBook className="text-2xl text-[#c41e3a]" />,
  skill: <IoSparkles className="text-2xl text-[#c41e3a]" />,
  selection: <FaStore className="text-2xl text-[#c41e3a]" />,
  atmosphere: <FaHome className="text-2xl text-[#c41e3a]" />,
  price: <FaTag className="text-2xl text-[#c41e3a]" />,
  speed: <FaBolt className="text-2xl text-[#c41e3a]" />,
};

// cycleZ の Google Maps レビュー URL
// Place ID: ChIJ8fx0C61UVDURh4_liz6WpJY
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ8fx0C61UVDURh4_liz6WpJY";

type Step = "trigger" | "purpose" | "detail" | "impression" | "experience" | "freetext" | "preview";

const STEP_ORDER: Step[] = ["trigger", "purpose", "detail", "impression", "experience", "freetext", "preview"];
const TOTAL_STEPS = 6; // プレビューは含まない

const stepTitles: Record<Step, string> = {
  trigger: "ご来店のきっかけは？",
  purpose: "今日はどんなご用件でしたか？",
  detail: "具体的に教えてください",
  impression: "一番良かった点は？",
  experience: "自転車のご経験は？",
  freetext: "何か付け加えたいことはありますか？",
  preview: "レビューが完成しました！",
};

export default function ReviewGenerator() {
  const [step, setStep] = useState<Step>("trigger");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [copied, setCopied] = useState(false);

  // 選択データ
  const [trigger, setTrigger] = useState<TriggerKey>("skip");
  const [purpose, setPurpose] = useState<PurposeKey | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [impression, setImpression] = useState<ImpressionKey | null>(null);
  const [experience, setExperience] = useState<ExperienceKey>("skip");
  const [freetext, setFreetext] = useState("");

  // 生成されたレビュー
  const [reviewText, setReviewText] = useState("");

  const currentStepIndex = STEP_ORDER.indexOf(step);

  const goToStep = useCallback((next: Step) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setIsTransitioning(false);
    }, 200);
  }, []);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) {
      goToStep(STEP_ORDER[idx - 1]);
    }
  }, [step, goToStep]);

  // レビュー生成
  const doGenerate = useCallback(() => {
    if (!purpose || !detail || !impression) return;
    const selections: ReviewSelections = {
      trigger,
      purpose,
      detail,
      impression,
      experience,
      freetext,
    };
    setReviewText(generateReview(selections));
  }, [purpose, detail, impression, experience, freetext]);

  // コピー処理
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reviewText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // フォールバック: テキスト選択を促す
      const textArea = document.querySelector<HTMLTextAreaElement>("#review-text-fallback");
      if (textArea) {
        textArea.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, [reviewText]);

  // 再生成
  const handleRegenerate = useCallback(() => {
    doGenerate();
  }, [doGenerate]);

  // 最初からやり直し
  const handleReset = useCallback(() => {
    setTrigger("skip");
    setPurpose(null);
    setDetail(null);
    setImpression(null);
    setExperience("skip");
    setFreetext("");
    setReviewText("");
    setCopied(false);
    goToStep("trigger");
  }, [goToStep]);

  // プログレスバー
  const progressPercent = step === "preview" ? 100 : (currentStepIndex / TOTAL_STEPS) * 100;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* プログレスバー */}
      {step !== "preview" && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Step {currentStepIndex + 1} / {TOTAL_STEPS}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#c41e3a] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* 戻るボタン */}
      {currentStepIndex > 0 && step !== "preview" && (
        <button
          onClick={goBack}
          className="text-sm text-gray-500 mb-4 flex items-center gap-1 hover:text-gray-700"
        >
          ← 戻る
        </button>
      )}

      {/* ステップタイトル */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">{stepTitles[step]}</h2>

      {/* コンテンツ */}
      <div
        className={`transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        {/* Step 0: 来店のきっかけ */}
        {step === "trigger" && (
          <div className="space-y-3">
            {triggerOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setTrigger(opt.key);
                  goToStep("purpose");
                }}
                className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#c41e3a] hover:bg-red-50 transition-colors active:bg-red-100"
              >
                {triggerIcons[opt.key as keyof typeof triggerIcons]}
                <span className="text-base font-medium text-gray-700">{opt.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setTrigger("skip");
                goToStep("purpose");
              }}
              className="w-full text-center text-sm text-gray-400 py-2 hover:text-gray-600"
            >
              スキップ →
            </button>
          </div>
        )}

        {/* Step 1: 来店目的 */}
        {step === "purpose" && (
          <div className="space-y-3">
            {purposeOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setPurpose(opt.key);
                  setDetail(null);
                  goToStep("detail");
                }}
                className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#c41e3a] hover:bg-red-50 transition-colors active:bg-red-100"
              >
                {purposeIcons[opt.key]}
                <span className="text-base font-medium text-gray-700">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: 具体的な内容 */}
        {step === "detail" && purpose && (
          <div className="space-y-3">
            {detailOptions[purpose].map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setDetail(opt.key);
                  goToStep("impression");
                }}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#c41e3a] hover:bg-red-50 transition-colors active:bg-red-100"
              >
                <span className="text-base font-medium text-gray-700">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: 一番良かった点 */}
        {step === "impression" && (
          <div className="space-y-3">
            {impressionOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setImpression(opt.key);
                  goToStep("experience");
                }}
                className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#c41e3a] hover:bg-red-50 transition-colors active:bg-red-100"
              >
                {impressionIcons[opt.key]}
                <span className="text-base font-medium text-gray-700">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 4: 経験レベル */}
        {step === "experience" && (
          <div className="space-y-3">
            {experienceOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setExperience(opt.key);
                  goToStep("freetext");
                }}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-[#c41e3a] hover:bg-red-50 transition-colors active:bg-red-100"
              >
                <span className="text-base font-medium text-gray-700">{opt.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setExperience("skip");
                goToStep("freetext");
              }}
              className="w-full text-center text-sm text-gray-400 py-2 hover:text-gray-600"
            >
              スキップ →
            </button>
          </div>
        )}

        {/* Step 5: 自由記入 */}
        {step === "freetext" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              一言あると、より個性的なレビューになります（任意）
            </p>
            <textarea
              value={freetext}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setFreetext(e.target.value);
                }
              }}
              placeholder="例: スタッフの方がとても親切でした"
              className="w-full p-4 border border-gray-200 rounded-xl text-base resize-none h-24 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]"
              style={{ fontSize: "16px" }} // iOS ズーム防止
            />
            <p className="text-xs text-gray-400 text-right">{freetext.length} / 50</p>
            <button
              onClick={() => {
                doGenerate();
                goToStep("preview");
              }}
              className="w-full p-4 bg-[#c41e3a] text-white rounded-xl text-base font-bold hover:bg-[#a3182f] transition-colors active:bg-[#8a1428]"
            >
              レビューを作成する
            </button>
            <button
              onClick={() => {
                doGenerate();
                goToStep("preview");
              }}
              className="w-full text-center text-sm text-gray-400 py-1 hover:text-gray-600"
            >
              スキップして作成 →
            </button>
          </div>
        )}

        {/* Step 6: プレビュー */}
        {step === "preview" && reviewText && (
          <div className="space-y-5">
            {/* 星 */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStarIcon key={i} className="text-3xl text-yellow-400" />
              ))}
            </div>

            {/* レビュー文 */}
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-base leading-relaxed text-gray-800">{reviewText}</p>
              {/* フォールバック用の非表示textarea */}
              <textarea
                id="review-text-fallback"
                value={reviewText}
                readOnly
                className="sr-only"
                aria-hidden="true"
              />
            </div>

            {/* 別の文章にする */}
            <button
              onClick={handleRegenerate}
              className="w-full text-center text-sm text-[#c41e3a] py-1 hover:underline"
            >
              別の文章にする
            </button>

            {/* コピーボタン */}
            <button
              onClick={handleCopy}
              className={`w-full p-4 rounded-xl text-base font-bold transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-[#c41e3a] text-[#c41e3a] hover:bg-red-50 active:bg-red-100"
              }`}
            >
              {copied ? (
                <span className="flex items-center justify-center gap-2"><FaCheck /> コピーしました！</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><FaRegCopy /> レビューをコピー</span>
              )}
            </button>

            {/* Googleマップで投稿ボタン */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-[#c41e3a] text-white rounded-xl text-base font-bold text-center hover:bg-[#a3182f] transition-colors active:bg-[#8a1428]"
            >
              <span className="flex items-center justify-center gap-2"><FaMapMarkerAlt /> Googleマップで投稿する</span>
            </a>

            {/* 説明 */}
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              上のボタンでレビューをコピーしてから、
              <br />
              Googleマップのレビュー欄に貼り付けてください
            </p>

            {/* 写真の促し */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800 text-center leading-relaxed">
                愛車やお店の写真を1枚添えていただけると、
                <br />
                他のお客様の参考になります
              </p>
            </div>

            {/* Wi-Fi注意 */}
            <p className="text-xs text-gray-300 text-center">
              ※ 店内Wi-Fiではなくモバイル回線でご投稿ください
            </p>

            {/* やり直し */}
            <button
              onClick={handleReset}
              className="w-full text-center text-sm text-gray-400 py-2 hover:text-gray-600"
            >
              最初からやり直す
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
