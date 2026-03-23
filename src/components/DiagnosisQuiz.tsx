"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

// ─── 型定義 ─────────────────────────────────────────────

/** 選択肢の型 */
type Option = {
  label: string;
  /** 各結果タイプへのスコア加算 */
  scores: Record<ResultType, number>;
};

/** 質問の型 */
type Question = {
  question: string;
  options: Option[];
};

/** 結果タイプ */
type ResultType = "entry" | "endurance" | "racing" | "cross" | "gravel";

/** 結果データの型 */
type Result = {
  type: ResultType;
  name: string;
  tagline: string;
  description: string;
  brands: { name: string; model: string }[];
  icon: string;
};

// ─── 質問データ ─────────────────────────────────────────

const questions: Question[] = [
  {
    question: "自転車の主な用途は？",
    options: [
      {
        label: "通勤・通学",
        scores: { entry: 1, endurance: 0, racing: 0, cross: 3, gravel: 1 },
      },
      {
        label: "週末のサイクリング",
        scores: { entry: 2, endurance: 3, racing: 0, cross: 1, gravel: 1 },
      },
      {
        label: "本格的なレース",
        scores: { entry: 0, endurance: 1, racing: 3, cross: 0, gravel: 0 },
      },
      {
        label: "のんびりポタリング",
        scores: { entry: 1, endurance: 0, racing: 0, cross: 3, gravel: 2 },
      },
    ],
  },
  {
    question: "1回のライドで走りたい距離は？",
    options: [
      {
        label: "10km以内",
        scores: { entry: 1, endurance: 0, racing: 0, cross: 3, gravel: 1 },
      },
      {
        label: "10〜30km",
        scores: { entry: 3, endurance: 1, racing: 0, cross: 1, gravel: 1 },
      },
      {
        label: "30〜80km",
        scores: { entry: 1, endurance: 3, racing: 1, cross: 0, gravel: 2 },
      },
      {
        label: "80km以上",
        scores: { entry: 0, endurance: 2, racing: 3, cross: 0, gravel: 1 },
      },
    ],
  },
  {
    question: "予算は？",
    options: [
      {
        label: "〜10万円",
        scores: { entry: 3, endurance: 0, racing: 0, cross: 3, gravel: 0 },
      },
      {
        label: "10〜25万円",
        scores: { entry: 2, endurance: 2, racing: 0, cross: 2, gravel: 2 },
      },
      {
        label: "25〜50万円",
        scores: { entry: 0, endurance: 3, racing: 2, cross: 0, gravel: 2 },
      },
      {
        label: "50万円以上",
        scores: { entry: 0, endurance: 1, racing: 3, cross: 0, gravel: 1 },
      },
    ],
  },
  {
    question: "デザインの好みは？",
    options: [
      {
        label: "クラシック・レトロ",
        scores: { entry: 2, endurance: 1, racing: 0, cross: 1, gravel: 2 },
      },
      {
        label: "モダン・シンプル",
        scores: { entry: 1, endurance: 3, racing: 1, cross: 1, gravel: 1 },
      },
      {
        label: "レーシー・攻撃的",
        scores: { entry: 0, endurance: 1, racing: 3, cross: 0, gravel: 0 },
      },
      {
        label: "おしゃれ・個性的",
        scores: { entry: 1, endurance: 0, racing: 0, cross: 3, gravel: 2 },
      },
    ],
  },
  {
    question: "体力に自信は？",
    options: [
      {
        label: "あまりない",
        scores: { entry: 2, endurance: 0, racing: 0, cross: 3, gravel: 1 },
      },
      {
        label: "普通くらい",
        scores: { entry: 2, endurance: 2, racing: 0, cross: 1, gravel: 2 },
      },
      {
        label: "けっこうある",
        scores: { entry: 0, endurance: 3, racing: 2, cross: 0, gravel: 2 },
      },
      {
        label: "アスリート級",
        scores: { entry: 0, endurance: 1, racing: 3, cross: 0, gravel: 1 },
      },
    ],
  },
];

// ─── 結果データ ─────────────────────────────────────────

const results: Record<ResultType, Result> = {
  entry: {
    type: "entry",
    name: "エントリーロード",
    tagline: "まずは気軽に始めたい方に",
    description:
      "初めてのスポーツバイクにぴったりの一台。安定感のある乗り心地で、通勤からちょっとしたサイクリングまで幅広く楽しめます。軽さと扱いやすさのバランスが良く、スポーツバイクの楽しさを存分に味わえるカテゴリーです。",
    brands: [
      { name: "GIOS", model: "AIRONE" },
      { name: "BASSO", model: "ASTRA" },
    ],
    icon: "🚲",
  },
  endurance: {
    type: "endurance",
    name: "エンデュランスロード",
    tagline: "長距離を快適に走りたい方に",
    description:
      "ロングライドの快適性を追求したモデル。振動吸収性に優れたフレーム設計で、100km超のライドでも身体への負担が少なく、週末のサイクリングを存分に楽しめます。しまなみ海道や吉備路など、岡山発のロングライドにも最適です。",
    brands: [
      { name: "SCOTT", model: "ADDICT" },
      { name: "BASSO", model: "DIAMANTE" },
    ],
    icon: "🛤️",
  },
  racing: {
    type: "racing",
    name: "レーシングロード",
    tagline: "速さを追求したい方に",
    description:
      "レースやヒルクライムで一歩先を狙うためのハイパフォーマンスモデル。軽量フレームと高い剛性で、ペダリングの力をダイレクトにスピードに変えます。本格的にタイムを削りたい方、レースに挑戦したい方におすすめです。",
    brands: [
      { name: "SCOTT", model: "FOIL" },
      { name: "CERVELO", model: "" },
    ],
    icon: "🏁",
  },
  cross: {
    type: "cross",
    name: "クロスバイク / ミニベロ",
    tagline: "街乗りメインで楽しみたい方に",
    description:
      "通勤・通学からカフェライドまで、日常を快適にする一台。フラットバーで操作しやすく、信号の多い街中でもストレスなく走れます。コンパクトなミニベロなら、輪行や収納にも便利。毎日の移動が楽しくなります。",
    brands: [
      { name: "GIOS", model: "MISTRAL" },
      { name: "Tyrell", model: "" },
    ],
    icon: "🏙️",
  },
  gravel: {
    type: "gravel",
    name: "グラベル / アドベンチャー",
    tagline: "自由に冒険したい方に",
    description:
      "舗装路もダートも、道を選ばずどこまでも。太めのタイヤと安定感のあるフレームで、岡山の里山や河川敷の未舗装路も楽しめます。キャンプツーリングやバイクパッキングなど、自転車の冒険的な楽しみ方を広げてくれる一台です。",
    brands: [
      { name: "JAMIS", model: "" },
      { name: "SURLY", model: "" },
    ],
    icon: "⛰️",
  },
};

// ─── スコア算出 ─────────────────────────────────────────

/** 回答からスコアを集計し、最もスコアの高い結果タイプを返す */
function calculateResult(answers: number[]): ResultType {
  const scores: Record<ResultType, number> = {
    entry: 0,
    endurance: 0,
    racing: 0,
    cross: 0,
    gravel: 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const option = questions[questionIndex].options[answerIndex];
    (Object.keys(option.scores) as ResultType[]).forEach((key) => {
      scores[key] += option.scores[key];
    });
  });

  // 最高スコアのタイプを返す
  return (Object.entries(scores) as [ResultType, number][]).reduce((a, b) =>
    a[1] >= b[1] ? a : b
  )[0];
}

// ─── コンポーネント ─────────────────────────────────────

export default function DiagnosisQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultType, setResultType] = useState<ResultType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /** 選択肢をタップしたとき */
  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (isTransitioning) return;

      const newAnswers = [...answers, optionIndex];
      setIsTransitioning(true);

      // フェードアウト
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          // 次の質問へ
          setAnswers(newAnswers);
          setCurrentQuestion((prev) => prev + 1);
        } else {
          // 結果を算出
          setAnswers(newAnswers);
          const result = calculateResult(newAnswers);
          setResultType(result);
        }
        // フェードイン
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    },
    [answers, currentQuestion, isTransitioning]
  );

  /** もう一度診断する */
  const handleRestart = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers([]);
      setResultType(null);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, []);

  // 結果表示
  if (resultType) {
    const result = results[resultType];
    return (
      <section className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* 結果ヘッダー */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2">診断結果</p>
            <div className="text-6xl mb-4" aria-hidden="true">
              {result.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {result.name}
            </h2>
            <p className="text-[#c41e3a] font-medium text-lg">
              {result.tagline}
            </p>
          </div>

          {/* 説明 */}
          <p className="text-gray-700 leading-relaxed mb-8 text-center">
            {result.description}
          </p>

          {/* おすすめブランド */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
              cycleZおすすめブランド
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.brands.map((brand) => (
                <Link
                  key={brand.name}
                  href="/lineup"
                  className="flex items-center justify-center gap-2 bg-white rounded-lg p-4 border border-gray-200 hover:border-[#c41e3a] hover:shadow-md transition-all"
                >
                  <span className="font-bold text-gray-900">{brand.name}</span>
                  {brand.model && (
                    <span className="text-gray-500">{brand.model}</span>
                  )}
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              タップで取扱ブランド一覧へ
            </p>
          </div>

          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#c41e3a] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#a31830] transition-colors text-center"
            >
              店舗で試乗する
            </Link>
            <button
              onClick={handleRestart}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-bold py-4 px-6 rounded-lg border-2 border-gray-300 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 質問表示
  const q = questions[currentQuestion];

  return (
    <section className="max-w-2xl mx-auto px-4 py-12 md:py-16">
      {/* プログレスバー */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            質問 {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c41e3a] rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 質問と選択肢 */}
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
          {q.question}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={isTransitioning}
              className="w-full text-left p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-[#c41e3a] hover:bg-red-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              <span className="text-base md:text-lg font-medium text-gray-800">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
