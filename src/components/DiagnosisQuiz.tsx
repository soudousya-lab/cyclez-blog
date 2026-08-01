"use client";

import { useState, useCallback, useMemo, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDirectionsBike } from "react-icons/md";
import { FaBicycle, FaRoad, FaMountain, FaFlagCheckered, FaCity } from "react-icons/fa";
import { capturePostHogEvent } from "./PostHogProvider";
import { trackCTAClick } from "./Analytics";
import { summerCampaign } from "@/data/summerCampaign";

// ─── 計測ヘルパー（GA4 + PostHog 並行送信。PIIは送らない＝回答カテゴリのみ）──
function trackDiagnosis(event: string, params: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, { event_category: "diagnosis", ...params });
  }
  capturePostHogEvent(event, params);
}

// ─── バイク画像・リンクマッピング ────────────────────────────
const bikeData: Record<string, { image?: string; url: string }> = {
  "GIOS MISTRAL": {
    image: "/images/bikes/gios-mistral.png",
    url: "https://www.job-cycles.com/gios/collection/detail3.php?MISTRAL-SHIMANO-11",
  },
  "GIOS ARISE": {
    image: "/images/bikes/gios-arise.png",
    url: "https://www.job-cycles.com/gios/collection/detail3.php?ARIES-10",
  },
  "GIOS SIERA": {
    image: "/images/bikes/gios-siera.png",
    url: "https://www.job-cycles.com/gios/collection/detail1.php?SIERA-DISC-26",
  },
  "GIOS AEROLITE": {
    image: "/images/bikes/gios-aerolite.png",
    url: "https://www.job-cycles.com/gios/collection/detail1.php?AERO-LITE-GEN5-24",
  },
  "GIOS MITO": {
    image: "/images/bikes/gios-mito.png",
    url: "https://gios.it/products/mito-sand",
  },
  "Wilier GTR": {
    image: "/images/bikes/wilier-gtr.jpg",
    url: "https://www.wilier.com/en/bikes/road/gtr-team",
  },
  "Wilier GARDA": {
    image: "/images/bikes/wilier-garda.jpg",
    url: "https://www.wilier.com/en/bikes/road/garda",
  },
  "SCOTT Speedster": {
    image: "/images/bikes/scott-speedster.png",
    url: "https://www.scott-japan.com/pages/2035/",
  },
  "SCOTT Addict": {
    image: "/images/bikes/scott-addict.png",
    url: "https://www.scott-japan.com/pages/2025/",
  },
  "SCOTT Addict RC": {
    image: "/images/bikes/scott-addict-rc.png",
    url: "https://www.scott-japan.com/pages/2030/",
  },
  "BOMA": {
    image: "/images/bikes/boma.png",
    url: "http://www.boma.jp/products/frame_set/",
  },
  "ORBEA ORCA": {
    image: "/images/bikes/orbea-orca.jpg",
    url: "https://www.orbea.com/ja-jp/m/orca",
  },
  "SURLY Midnight Special": {
    image: "/images/bikes/surly-midnight-special.jpg",
    url: "https://surlybikes.com/collections/midnight-special",
  },
  "Tyrell IVE": {
    image: "/images/bikes/tyrell-ive.jpg",
    url: "https://www.tyrellbike.com/products/ive/",
  },
  "JAMIS RENEGADE": {
    image: "/images/bikes/jamis-renegade.jpg",
    url: "https://www.jamisbikes.com/store/Renegade-S3-p510793714",
  },
  // ─ 取扱ブランドの定番モデル（2026-07追加・実在/価格帯を検証済み。画像=公式/正規代理店。CINELLI/BISYAは自社紹介ページ）─
  "BASSO MONZA": { image: "/images/bikes/basso-monza.jpg", url: "https://www.job-cycles.com/basso/collection/index.php" },
  "BASSO VENTA R": { image: "/images/bikes/basso-venta-r.png", url: "https://www.job-cycles.com/basso/collection/detail1.php?VENTA-R-2" },
  "BASSO PALTA": { image: "/images/bikes/basso-palta.png", url: "https://www.job-cycles.com/basso/collection/detail1.php?PALTA-1" },
  "BASSO DIAMANTE SV": { image: "/images/bikes/basso-diamante-sv.png", url: "https://www.job-cycles.com/basso/collection/detail1.php?SV-6" },
  "De Rosa IDOL": { image: "/images/bikes/derosa-idol.jpg", url: "https://www.derosa.jp/products/new-idol-complete" },
  "De Rosa MERAK": { image: "/images/bikes/derosa-merak.jpg", url: "https://www.derosa.jp/products/merak-2" },
  "De Rosa TITANIO-X": { image: "/images/bikes/derosa-titanio-x.jpg", url: "https://www.derosa.jp/products/new-titanio-x" },
  "De Rosa METAMORPHOSIS": { image: "/images/bikes/derosa-metamorphosis.jpg", url: "https://www.derosa.jp/products/metamorphosis" },
  "De Rosa 838": { image: "/images/bikes/derosa-838.jpg", url: "https://www.derosa.jp/products/new-%E3%80%80838-shimano-105-di2-%E5%AE%8C%E6%88%90%E8%BB%8A" },
  "FELT Verza Speed 50": { image: "/images/bikes/felt-verza-speed-50.jpg", url: "https://www.riteway-jp.com/bicycle/felt/product/verza-speed-50/" },
  "FELT VR 4.0": { image: "/images/bikes/felt-vr-4.jpg", url: "https://www.riteway-jp.com/bicycle/felt/product/vr-4-0-advanced-105/" },
  "FELT FR 4.0": { image: "/images/bikes/felt-fr-4.jpg", url: "https://www.riteway-jp.com/bicycle/felt/product/fr-4-0-advanced-105/" },
  "Cervélo Áspero": { image: "/images/bikes/cervelo-aspero.jpg", url: "https://azuma-1911.jp/cervelo/products/aspero-grx-rx6002024/" },
  "Cervélo Caledonia": { image: "/images/bikes/cervelo-caledonia.jpg", url: "https://azuma-1911.jp/cervelo/products/caledonia-r7120-105-%E5%AE%8C%E6%88%90%E8%BB%8A%EF%BC%882025%EF%BC%89-3%E8%89%B2%E5%B1%95%E9%96%8B/" },
  "Cervélo Soloist": { image: "/images/bikes/cervelo-soloist.jpg", url: "https://azuma-1911.jp/cervelo/products/soloist-force-etap-axs-%E5%AE%8C%E6%88%90%E8%BB%8A%EF%BC%882023%EF%BD%9E2024%EF%BC%89-2%E8%89%B2%E5%B1%95%E9%96%8B/" },
  "Cervélo R5": { image: "/images/bikes/cervelo-r5.jpg", url: "https://azuma-1911.jp/cervelo/products/r5-disc-r8170-ultegra-di2-%E5%AE%8C%E6%88%90%E8%BB%8A%EF%BC%882025%EF%BC%89-2%E8%89%B2%E5%B1%95%E9%96%8B/" },
  "CINELLI Pressure II": { image: "/images/bikes/cinelli-pressure-ii.jpg", url: "/lineup/cinelli" },
  "CINELLI Pressure ADR": { image: "/images/bikes/cinelli-pressure-adr.jpg", url: "/lineup/cinelli" },
  "CINELLI King Zydeco II": { image: "/images/bikes/cinelli-king-zydeco-ii.jpg", url: "/lineup/cinelli" },
  "CINELLI Gazzetta": { image: "/images/bikes/cinelli-gazzetta.jpg", url: "/lineup/cinelli" },
  "BISYA TAMON": { image: "/images/bikes/bisya-tamon.jpg", url: "/lineup/bisya" },
  "BISYA 四号機": { image: "/images/bikes/bisya-bis004.jpg", url: "/lineup/bisya" },
  "BISYA 八号機": { image: "/images/bikes/bisya-bis008.jpg", url: "/lineup/bisya" },
};

// ─── 型定義 ─────────────────────────────────────────────

type ResultType = "city" | "cross" | "entry" | "endurance" | "racing" | "gravel";

type Scores = Record<ResultType, number>;

/** Q1の用途キー */
type UsageKey = "commute" | "casual" | "fitness" | "future-race" | "travel";

/** Q2の距離選択肢（Q1で分岐） */
type DistanceOption = {
  label: string;
  scores: Scores;
};

/** 予算別おすすめ車種 */
type BudgetBikes = {
  under10: string[];
  under25: string[];
  under50: string[];
  over50: string[];
};

/** 結果データ */
type Result = {
  type: ResultType;
  name: string;
  tagline: string;
  description: string;
  budgetBikes: BudgetBikes;
  icon: ReactNode;
};

// ─── 定数データ ─────────────────────────────────────────

/** Q1: 用途の選択肢 */
const usageOptions: { label: string; key: UsageKey }[] = [
  { label: "通勤・通学", key: "commute" },
  { label: "のんびりサイクリング", key: "casual" },
  { label: "エクササイズ・フィットネス", key: "fitness" },
  { label: "後々レースにも挑戦してみたい", key: "future-race" },
  { label: "自転車で知らない土地を旅したい", key: "travel" },
];

/** Q2: 距離（Q1の用途別に分岐） */
const distanceByUsage: Record<UsageKey, DistanceOption[]> = {
  commute: [
    { label: "〜3km", scores: { city: 5, cross: 3, entry: 1, endurance: 0, racing: 0, gravel: 1 } },
    { label: "3〜10km", scores: { city: 5, cross: 3, entry: 2, endurance: 0, racing: 0, gravel: 1 } },
    { label: "10〜20km", scores: { city: 3, cross: 2, entry: 4, endurance: 2, racing: 0, gravel: 1 } },
    { label: "20km以上", scores: { city: 1, cross: 1, entry: 3, endurance: 5, racing: 0, gravel: 1 } },
  ],
  casual: [
    { label: "〜5km", scores: { city: 4, cross: 4, entry: 2, endurance: 0, racing: 0, gravel: 2 } },
    { label: "5〜15km", scores: { city: 2, cross: 3, entry: 4, endurance: 2, racing: 0, gravel: 2 } },
    { label: "15〜30km", scores: { city: 0, cross: 1, entry: 3, endurance: 5, racing: 0, gravel: 3 } },
    { label: "30km以上", scores: { city: 0, cross: 0, entry: 2, endurance: 5, racing: 0, gravel: 3 } },
  ],
  fitness: [
    { label: "〜10km", scores: { city: 2, cross: 4, entry: 3, endurance: 1, racing: 0, gravel: 1 } },
    { label: "10〜30km", scores: { city: 0, cross: 2, entry: 3, endurance: 5, racing: 1, gravel: 1 } },
    { label: "30〜50km", scores: { city: 0, cross: 0, entry: 1, endurance: 5, racing: 3, gravel: 1 } },
    { label: "50km以上", scores: { city: 0, cross: 0, entry: 0, endurance: 4, racing: 4, gravel: 1 } },
  ],
  "future-race": [
    { label: "〜20km", scores: { city: 0, cross: 1, entry: 4, endurance: 3, racing: 2, gravel: 0 } },
    { label: "20〜50km", scores: { city: 0, cross: 0, entry: 2, endurance: 4, racing: 4, gravel: 0 } },
    { label: "50〜100km", scores: { city: 0, cross: 0, entry: 0, endurance: 3, racing: 5, gravel: 0 } },
    { label: "100km以上", scores: { city: 0, cross: 0, entry: 0, endurance: 2, racing: 5, gravel: 0 } },
  ],
  travel: [
    { label: "〜20km", scores: { city: 2, cross: 2, entry: 1, endurance: 1, racing: 0, gravel: 5 } },
    { label: "20〜50km", scores: { city: 0, cross: 1, entry: 1, endurance: 4, racing: 0, gravel: 4 } },
    { label: "50〜100km", scores: { city: 0, cross: 0, entry: 0, endurance: 4, racing: 0, gravel: 4 } },
    { label: "100km以上", scores: { city: 0, cross: 0, entry: 0, endurance: 5, racing: 0, gravel: 4 } },
  ],
};

/** Q3: 予算の補正スコア */
const budgetOptions: { label: string; scores: Scores }[] = [
  { label: "〜10万円", scores: { city: 3, cross: 3, entry: 3, endurance: 0, racing: -2, gravel: 0 } },
  { label: "10〜25万円", scores: { city: 1, cross: 1, entry: 2, endurance: 1, racing: 0, gravel: 2 } },
  { label: "25〜50万円", scores: { city: 1, cross: -1, entry: 0, endurance: 3, racing: 3, gravel: 2 } },
  { label: "50万円以上", scores: { city: -1, cross: -2, entry: -1, endurance: 2, racing: 3, gravel: 1 } },
];

/** Q4: デザインの補正スコア */
const designOptions: { label: string; scores: Scores }[] = [
  { label: "スポーティ", scores: { city: 0, cross: 0, entry: 1, endurance: 1, racing: 3, gravel: 0 } },
  { label: "クラシック", scores: { city: 2, cross: 1, entry: 1, endurance: 2, racing: -1, gravel: 2 } },
  { label: "シンプル", scores: { city: 2, cross: 2, entry: 2, endurance: 1, racing: 0, gravel: 0 } },
  { label: "個性的", scores: { city: 1, cross: 0, entry: 0, endurance: 0, racing: 1, gravel: 3 } },
];

// ─── 結果データ ─────────────────────────────────────────

const results: Record<ResultType, Result> = {
  city: {
    type: "city",
    name: "シティコミューター",
    tagline: "日常を快適にする一台",
    description:
      "通勤・買い物・ちょっとしたお出かけに最適。実用性と耐久性を兼ね備え、毎日の移動が楽しくなります。泥除けやキャリアも装着できるので、天候や荷物を気にせず使えます。",
    budgetBikes: {
      under10: ["GIOS MISTRAL", "FELT Verza Speed 50"],
      under25: ["Tyrell IVE", "CINELLI Gazzetta"],
      under50: ["SURLY Midnight Special"],
      over50: ["De Rosa METAMORPHOSIS"],
    },
    icon: <FaCity className="w-14 h-14 text-white" />,
  },
  cross: {
    type: "cross",
    name: "クロスバイク",
    tagline: "気軽に始めるスポーツバイク",
    description:
      "フラットバーで操作しやすく、初めてのスポーツバイクにぴったり。街中の信号ストップ＆ゴーもストレスなく、週末のサイクリングロードまで幅広く楽しめます。",
    budgetBikes: {
      under10: ["GIOS MISTRAL", "GIOS ARISE"],
      under25: [],
      under50: [],
      over50: [],
    },
    icon: <FaBicycle className="w-14 h-14 text-white" />,
  },
  entry: {
    type: "entry",
    name: "エントリーロード",
    tagline: "初めてのロードバイクに",
    description:
      "ドロップハンドルで風を切る爽快感。安定したジオメトリで、初めてのロードバイクでも安心して乗れます。週末ライドの世界が一気に広がる一台です。",
    budgetBikes: {
      under10: ["GIOS SIERA", "BISYA TAMON"],
      under25: ["Wilier GTR", "SCOTT Speedster", "BASSO MONZA"],
      under50: [],
      over50: [],
    },
    icon: <MdDirectionsBike className="w-14 h-14 text-white" />,
  },
  endurance: {
    type: "endurance",
    name: "エンデュランスロード",
    tagline: "長距離を快適に走りたい方に",
    description:
      "振動吸収性に優れたフレーム設計で、100km超のライドでも身体への負担が少なく、週末のロングライドを存分に楽しめます。しまなみ海道や吉備路など、岡山発のロングライドにも最適です。",
    budgetBikes: {
      under10: [],
      under25: ["SCOTT Speedster", "BISYA 四号機", "BISYA 八号機"],
      under50: ["Wilier GARDA", "SCOTT Addict", "BOMA", "De Rosa 838", "FELT VR 4.0", "Cervélo Caledonia"],
      over50: ["SCOTT Addict", "BASSO VENTA R", "De Rosa IDOL", "CINELLI Pressure ADR"],
    },
    icon: <FaRoad className="w-14 h-14 text-white" />,
  },
  racing: {
    type: "racing",
    name: "レーシングロード",
    tagline: "速さを追求したい方に",
    description:
      "軽量フレームと高い剛性で、ペダリングの力をダイレクトにスピードに変えます。ヒルクライムやレースに挑戦したい方、タイムを削りたい方におすすめのハイパフォーマンスモデルです。",
    budgetBikes: {
      under10: [],
      under25: [],
      under50: ["GIOS AEROLITE", "SCOTT Addict", "BOMA", "FELT FR 4.0"],
      over50: ["SCOTT Addict RC", "ORBEA ORCA", "BASSO DIAMANTE SV", "De Rosa MERAK", "Cervélo Soloist", "Cervélo R5", "CINELLI Pressure II"],
    },
    icon: <FaFlagCheckered className="w-14 h-14 text-white" />,
  },
  gravel: {
    type: "gravel",
    name: "グラベルバイク",
    tagline: "自由に冒険したい方に",
    description:
      "舗装路もダートも、道を選ばずどこまでも。太めのタイヤと安定感のあるフレームで、岡山の里山や河川敷の未舗装路も楽しめます。キャンプツーリングやバイクパッキングにも最適です。",
    budgetBikes: {
      under10: [],
      under25: ["GIOS MITO", "JAMIS RENEGADE"],
      under50: [],
      over50: ["BASSO PALTA", "De Rosa TITANIO-X", "Cervélo Áspero", "CINELLI King Zydeco II"],
    },
    icon: <FaMountain className="w-14 h-14 text-white" />,
  },
};

// ─── スコア算出 ─────────────────────────────────────────

function calculateResult(
  usageKey: UsageKey,
  distanceIndex: number,
  budgetIndex: number,
  designIndex: number
): ResultType {
  const scores: Scores = { city: 0, cross: 0, entry: 0, endurance: 0, racing: 0, gravel: 0 };
  const types: ResultType[] = ["city", "cross", "entry", "endurance", "racing", "gravel"];

  // Q1×Q2 ベーススコア
  const distScores = distanceByUsage[usageKey][distanceIndex].scores;
  types.forEach((t) => { scores[t] += distScores[t]; });

  // Q3 予算補正
  const budScores = budgetOptions[budgetIndex].scores;
  types.forEach((t) => { scores[t] += budScores[t]; });

  // Q4 デザイン補正
  const desScores = designOptions[designIndex].scores;
  types.forEach((t) => { scores[t] += desScores[t]; });

  // 最高スコアのタイプを返す
  return types.reduce((a, b) => (scores[a] >= scores[b] ? a : b));
}

/** 予算インデックスに応じたおすすめ車種を取得 */
function getBikesForBudget(result: Result, budgetIndex: number): string[] {
  const keys: (keyof BudgetBikes)[] = ["under10", "under25", "under50", "over50"];
  const primary = result.budgetBikes[keys[budgetIndex]];
  if (primary.length > 0) return primary;
  // 該当予算帯にない場合、近い帯から探す
  for (let offset = 1; offset <= 3; offset++) {
    for (const d of [budgetIndex + offset, budgetIndex - offset]) {
      if (d >= 0 && d < 4 && result.budgetBikes[keys[d]].length > 0) {
        return result.budgetBikes[keys[d]];
      }
    }
  }
  return [];
}

// ─── サマーキャンペーン特価車の連携（在庫連動） ──────────────
// 各特価車モデルが当てはまる診断タイプ（在庫データはsummerCampaign側で管理）
const campaignTypeMap: Record<string, ResultType[]> = {
  "IMOLA": ["entry"],
  "PANTO 105": ["entry", "city"],
  "NATURE CARBON": ["endurance", "entry"],
  "ALLUMER disc": ["endurance"],
  "D-OLA Ⅱ": ["gravel"],
  "RASOR Ⅱ": ["racing"],
};

/** 特価（税込）から予算帯インデックス(0:〜10 1:〜25 2:〜50 3:50万〜)を返す */
function priceTierIndex(price: number): number {
  if (price < 100000) return 0;
  if (price < 250000) return 1;
  if (price < 500000) return 2;
  return 3;
}

/** 結果タイプ・予算に合う「在庫あり特価車」を返す（売切れ・キャンペーン終了で自動的に空になる） */
function getCampaignDeals(resultType: ResultType, budgetIndex: number) {
  if (!summerCampaign.active) return [];
  return summerCampaign.bikes.filter((b) => {
    if (b.soldOut) return false;
    const types = campaignTypeMap[b.model] ?? [];
    if (!types.includes(resultType)) return false;
    return priceTierIndex(b.salePrice) <= budgetIndex; // 予算内に収まる特価車のみ
  });
}

// ─── コンポーネント ─────────────────────────────────────

type Step = "usage" | "distance" | "budget" | "design" | "result";

export default function DiagnosisQuiz() {
  const [step, setStep] = useState<Step>("usage");
  const [usageKey, setUsageKey] = useState<UsageKey | null>(null);
  const [distanceIndex, setDistanceIndex] = useState<number | null>(null);
  const [budgetIndex, setBudgetIndex] = useState<number | null>(null);
  const [designIndex, setDesignIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const stepNumber = step === "usage" ? 1 : step === "distance" ? 2 : step === "budget" ? 3 : step === "design" ? 4 : 5;
  const totalSteps = 4;

  /** ステップ遷移（フェードアニメーション付き） */
  const goNext = useCallback((nextStep: Step) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, []);

  /** Q1: 用途選択 */
  const handleUsage = useCallback((key: UsageKey) => {
    if (isTransitioning) return;
    setUsageKey(key);
    trackDiagnosis("diagnosis_start", {
      usage_key: key,
      usage_label: usageOptions.find((u) => u.key === key)?.label,
    });
    goNext("distance");
  }, [isTransitioning, goNext]);

  /** Q2: 距離選択 */
  const handleDistance = useCallback((index: number) => {
    if (isTransitioning) return;
    setDistanceIndex(index);
    goNext("budget");
  }, [isTransitioning, goNext]);

  /** Q3: 予算選択 */
  const handleBudget = useCallback((index: number) => {
    if (isTransitioning) return;
    setBudgetIndex(index);
    goNext("design");
  }, [isTransitioning, goNext]);

  /** Q4: デザイン選択 */
  const handleDesign = useCallback((index: number) => {
    if (isTransitioning) return;
    setDesignIndex(index);
    // 全回答が揃う＝診断完了。結果・予算・回答カテゴリを計測
    if (usageKey !== null && distanceIndex !== null && budgetIndex !== null) {
      const rt = calculateResult(usageKey, distanceIndex, budgetIndex, index);
      const res = results[rt];
      trackDiagnosis("diagnosis_complete", {
        result_type: rt,
        result_name: res.name,
        usage_key: usageKey,
        usage_label: usageOptions.find((u) => u.key === usageKey)?.label,
        distance_label: distanceByUsage[usageKey][distanceIndex].label,
        budget_label: budgetOptions[budgetIndex].label,
        design_label: designOptions[index].label,
        recommended_bikes: getBikesForBudget(res, budgetIndex).join(", "),
      });
    }
    goNext("result");
  }, [isTransitioning, goNext, usageKey, distanceIndex, budgetIndex]);

  /** もう一度診断 */
  const handleRestart = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep("usage");
      setUsageKey(null);
      setDistanceIndex(null);
      setBudgetIndex(null);
      setDesignIndex(null);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, []);

  // 結果算出
  const resultType = useMemo(() => {
    if (usageKey === null || distanceIndex === null || budgetIndex === null || designIndex === null) return null;
    return calculateResult(usageKey, distanceIndex, budgetIndex, designIndex);
  }, [usageKey, distanceIndex, budgetIndex, designIndex]);

  // 結果表示
  if (step === "result" && resultType) {
    const result = results[resultType];
    const bikes = getBikesForBudget(result, budgetIndex!);
    const deals = getCampaignDeals(resultType, budgetIndex!);

    return (
      <section className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          {/* 結果ヘッダー */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-300 mb-2">あなたにおすすめのバイクタイプ</p>
            <div className="mb-4 flex justify-center" aria-hidden="true">{result.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{result.name}</h2>
            <p className="text-[#c41e3a] font-medium text-lg">{result.tagline}</p>
          </div>

          {/* 説明 */}
          <p className="text-gray-300 leading-relaxed mb-8 text-center">{result.description}</p>

          {/* 在庫あり特価車（サマーキャンペーン連動・売切れ/終了で自動非表示） */}
          {deals.length > 0 && (
            <div className="bg-white rounded-xl p-5 mb-6 border-2 border-[#c41e3a]/40">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#c41e3a] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c41e3a]" />
                </span>
                <h3 className="text-sm font-bold text-[#c41e3a] tracking-wide">今なら特価・在庫あり</h3>
              </div>
              <p className="text-xs text-gray-400 text-center mb-4">
                あなたのタイプと予算に合う特価車が店頭にあります
              </p>
              <div className="grid gap-3 grid-cols-1">
                {deals.map((bike) => {
                  const off = bike.listPrice - bike.salePrice;
                  const pct = Math.round((off / bike.listPrice) * 100);
                  return (
                    <Link
                      key={bike.model}
                      href={`/blog/${summerCampaign.articleSlug}`}
                      onClick={() =>
                        trackDiagnosis("diagnosis_campaign_click", {
                          bike: `${bike.brand} ${bike.model}`,
                          result_type: resultType,
                          budget_label: budgetOptions[budgetIndex!].label,
                        })
                      }
                      className="group flex items-center gap-3 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-[#c41e3a] hover:shadow-md transition-all overflow-hidden p-2.5"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                        <Image src={bike.image} alt={bike.alt} fill className="object-cover" sizes="96px" />
                        <span className="absolute top-0 left-0 bg-[#c41e3a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg">
                          {pct}%OFF
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-gray-500 font-bold">
                          {bike.brand}・サイズ{bike.size}
                        </div>
                        <div className="font-bold text-gray-900 text-sm truncate">{bike.model}</div>
                        <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-xs text-gray-400 line-through">
                            ¥{bike.listPrice.toLocaleString("ja-JP")}
                          </span>
                          <span className="text-lg font-extrabold text-[#c41e3a]">
                            ¥{bike.salePrice.toLocaleString("ja-JP")}
                          </span>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-[#c41e3a] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">タップで特価車の詳細へ（各1台限り・なくなり次第終了）</p>
            </div>
          )}

          {/* おすすめ車種 */}
          {bikes.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 text-center">
                cycleZおすすめモデル
              </h3>
              <p className="text-xs text-gray-400 text-center mb-4">
                ご予算「{budgetOptions[budgetIndex!].label}」に合わせたおすすめ
              </p>
              <div className="grid gap-4 grid-cols-1">
                {bikes.slice(0, 6).map((bike) => {
                  const data = bikeData[bike];
                  const isInternal = !!data?.url?.startsWith("/");
                  return (
                    <a
                      key={bike}
                      href={data?.url || "/lineup"}
                      target={isInternal ? undefined : "_blank"}
                      rel={isInternal ? undefined : "noopener noreferrer"}
                      onClick={() =>
                        trackDiagnosis("diagnosis_bike_click", {
                          bike,
                          result_type: resultType,
                          result_name: result.name,
                          budget_label: budgetOptions[budgetIndex!].label,
                        })
                      }
                      className="group flex flex-col items-center bg-white rounded-xl border-2 border-gray-200 hover:border-[#c41e3a] hover:shadow-lg transition-all overflow-hidden"
                    >
                      {data?.image && (
                        <div className="w-full bg-white p-4 flex items-center justify-center">
                          <Image
                            src={data.image}
                            alt={bike}
                            width={400}
                            height={200}
                            className="object-contain max-h-[150px] w-auto"
                          />
                        </div>
                      )}
                      <div className="w-full px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <span className="font-bold text-gray-900">{bike}</span>
                        <span className="text-xs text-[#c41e3a] font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          {isInternal ? "詳しく見る" : "メーカーサイトで見る"}
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isInternal ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            )}
                          </svg>
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">
                {bikes.length > 6
                  ? `ほかにも${bikes.length - 6}台のおすすめがあります`
                  : "タップでメーカーサイトへ"}
                <span className="block mt-1">実車は店頭でご覧いただけます</span>
              </p>
              {bikes.length > 6 && (
                <div className="text-center mt-2">
                  <Link href="/lineup" className="text-xs text-[#c41e3a] font-medium hover:underline">
                    取扱ブランド一覧を見る →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 次の一歩＝来店・相談（診断結果を店頭へ持ち込む導線）
              電話/問い合わせは trackCTAClick 経由で cta_click・phone_call も発火させ、
              サイト全体の来店リード計測と同じ土俵に乗せる（診断由来CVを分離できる）。*/}
          <div className="bg-white rounded-xl border-2 border-[#c41e3a] overflow-hidden">
            <div className="bg-[#c41e3a] px-5 py-3">
              <h3 className="text-white font-bold text-base">
                この結果を持って、店頭でご相談ください
              </h3>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                サイズや乗り心地は、実際にまたがってみるのが一番わかります。試乗車をご用意しているので、
                診断結果の画面をそのまま見せていただければ、目的や予算に合わせてご提案します。
                在庫・試乗車の状況はお電話でご確認いただけます。
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href="tel:086-252-7744"
                  data-cta-tracked="1"
                  onClick={() => {
                    trackDiagnosis("diagnosis_cta_click", {
                      cta_type: "phone",
                      result_type: resultType,
                      result_name: result.name,
                      recommended_bikes: bikes.join(", "),
                    });
                    trackCTAClick("phone", "/diagnosis", "diagnosis_result", "電話で相談する");
                  }}
                  className="inline-flex flex-col items-center justify-center gap-0.5 bg-[#c41e3a] text-white font-bold py-4 px-4 rounded-lg hover:bg-[#a31830] transition-colors text-center"
                >
                  <span>電話で相談する</span>
                  <span className="text-xs font-normal opacity-90">086-252-7744</span>
                </a>
                <Link
                  href="/access"
                  onClick={() =>
                    trackDiagnosis("diagnosis_cta_click", {
                      cta_type: "access",
                      result_type: resultType,
                      result_name: result.name,
                      recommended_bikes: bikes.join(", "),
                    })
                  }
                  className="inline-flex flex-col items-center justify-center gap-0.5 bg-white text-gray-800 font-bold py-4 px-4 rounded-lg border-2 border-gray-300 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors text-center"
                >
                  <span>店舗の場所を見る</span>
                  <span className="text-xs font-normal text-gray-500">岡山市北区島田本町</span>
                </Link>
                <Link
                  href="/contact"
                  data-cta-tracked="1"
                  onClick={() => {
                    trackDiagnosis("diagnosis_cta_click", {
                      cta_type: "contact_form",
                      result_type: resultType,
                      result_name: result.name,
                      recommended_bikes: bikes.join(", "),
                    });
                    trackCTAClick("contact_form", "/diagnosis", "diagnosis_result", "メールで相談する");
                  }}
                  className="inline-flex flex-col items-center justify-center gap-0.5 bg-white text-gray-800 font-bold py-4 px-4 rounded-lg border-2 border-gray-300 hover:border-[#c41e3a] hover:text-[#c41e3a] transition-colors text-center"
                >
                  <span>メールで相談する</span>
                  <span className="text-xs font-normal text-gray-500">24時間受付</span>
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">11:00〜19:00 ／ 水曜定休</p>
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              onClick={handleRestart}
              className="text-sm text-gray-300 underline underline-offset-4 hover:text-white transition-colors"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 質問表示
  let questionText = "";
  let options: { label: string; onSelect: () => void }[] = [];

  switch (step) {
    case "usage":
      questionText = "自転車の主な用途は？";
      options = usageOptions.map((o) => ({ label: o.label, onSelect: () => handleUsage(o.key) }));
      break;
    case "distance":
      questionText = "1回のライドで走りたい距離は？";
      if (usageKey) {
        options = distanceByUsage[usageKey].map((o, i) => ({ label: o.label, onSelect: () => handleDistance(i) }));
      }
      break;
    case "budget":
      questionText = "予算は？";
      options = budgetOptions.map((o, i) => ({ label: o.label, onSelect: () => handleBudget(i) }));
      break;
    case "design":
      questionText = "デザインの好みは？";
      options = designOptions.map((o, i) => ({ label: o.label, onSelect: () => handleDesign(i) }));
      break;
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-12 md:py-16">
      {/* プログレスバー */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            質問 {stepNumber} / {totalSteps}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round((stepNumber / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c41e3a] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* 質問と選択肢 */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
          {questionText}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={option.onSelect}
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
