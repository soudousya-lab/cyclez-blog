// ─── 口コミ生成テンプレート ──────────────────────────────────

export type PurposeKey = "purchase" | "maintenance" | "consultation" | "testride" | "parts" | "apparel";
export type ImpressionKey = "service" | "knowledge" | "skill" | "selection" | "atmosphere" | "price" | "speed";
export type ExperienceKey = "beginner" | "returning" | "experienced" | "skip";

export type DetailOption = {
  key: string;
  label: string;
};

export type ReviewSelections = {
  purpose: PurposeKey;
  detail: string;
  impression: ImpressionKey;
  experience: ExperienceKey;
  freetext: string;
};

// ─── Step1: 来店目的 ────────────────────────────────────────

export const purposeOptions: { key: PurposeKey; label: string }[] = [
  { key: "purchase", label: "自転車の購入" },
  { key: "maintenance", label: "メンテナンス・修理" },
  { key: "consultation", label: "相談・下見" },
  { key: "testride", label: "試乗" },
  { key: "parts", label: "パーツ・アクセサリー" },
  { key: "apparel", label: "ウェア・アパレル" },
];

// ─── Step2: 具体的な内容（Step1に連動） ──────────────────────

export const detailOptions: Record<PurposeKey, DetailOption[]> = {
  purchase: [
    { key: "road", label: "ロードバイク" },
    { key: "cross", label: "クロスバイク" },
    { key: "gravel", label: "グラベルバイク" },
    { key: "minivelo", label: "ミニベロ" },
    { key: "ebike", label: "e-bike" },
  ],
  maintenance: [
    { key: "tire", label: "タイヤ・チューブ交換" },
    { key: "chain", label: "チェーン洗浄・注油" },
    { key: "brake", label: "ブレーキ調整" },
    { key: "shift", label: "変速調整" },
    { key: "overhaul", label: "オーバーホール" },
    { key: "puncture", label: "パンク修理" },
    { key: "inspection", label: "点検・調整" },
  ],
  consultation: [
    { key: "first-bike", label: "初めての自転車選び" },
    { key: "upgrade", label: "買い替え・アップグレード" },
    { key: "fitting", label: "フィッティング" },
    { key: "course", label: "コース・走り方相談" },
  ],
  testride: [
    { key: "road-test", label: "ロードバイク" },
    { key: "cross-test", label: "クロスバイク" },
    { key: "gravel-test", label: "グラベルバイク" },
  ],
  parts: [
    { key: "wheel", label: "ホイール" },
    { key: "saddle", label: "サドル" },
    { key: "light", label: "ライト・ベル" },
    { key: "bag", label: "バッグ・サドルバッグ" },
    { key: "other-parts", label: "その他パーツ" },
  ],
  apparel: [
    { key: "jersey", label: "ジャージ・ウェア" },
    { key: "gloves", label: "グローブ" },
    { key: "helmet", label: "ヘルメット" },
    { key: "sunglasses", label: "サングラス" },
  ],
};

// ─── Step3: 一番良かった点 ──────────────────────────────────

export const impressionOptions: { key: ImpressionKey; label: string }[] = [
  { key: "service", label: "接客・対応" },
  { key: "knowledge", label: "説明のわかりやすさ" },
  { key: "skill", label: "技術力・仕上がり" },
  { key: "selection", label: "品揃え" },
  { key: "atmosphere", label: "店の雰囲気" },
  { key: "price", label: "価格・コスパ" },
  { key: "speed", label: "作業の早さ" },
];

// ─── Step4: 経験レベル ──────────────────────────────────────

export const experienceOptions: { key: ExperienceKey; label: string }[] = [
  { key: "beginner", label: "初心者" },
  { key: "returning", label: "久しぶりの復帰" },
  { key: "experienced", label: "経験者" },
];

// ─── テンプレートデータ ─────────────────────────────────────

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// 来店目的別の導入文
const openings: Record<PurposeKey, string[]> = {
  purchase: [
    "自転車の購入でお世話になりました。",
    "新しい自転車を探していて、cycleZさんに伺いました。",
    "自転車を買いにcycleZさんへ。",
  ],
  maintenance: [
    "メンテナンスでお世話になりました。",
    "愛車のメンテナンスをお願いしました。",
    "自転車の調子が悪くなり、cycleZさんに持ち込みました。",
  ],
  consultation: [
    "自転車の相談で伺いました。",
    "まだ購入は決めていない段階でしたが、相談に乗っていただきました。",
    "自転車選びの相談で訪問しました。",
  ],
  testride: [
    "試乗させていただきました。",
    "気になっていた自転車の試乗で伺いました。",
    "購入前に試乗したくて、cycleZさんへ。",
  ],
  parts: [
    "パーツの購入でお世話になりました。",
    "パーツ選びの相談で伺いました。",
    "アクセサリーを探しにcycleZさんへ。",
  ],
  apparel: [
    "サイクルウェアを買いに伺いました。",
    "ウェア選びでお世話になりました。",
    "サイクルアパレルを探しにcycleZさんへ。",
  ],
};

// 具体的な内容に応じた補足文
const detailSentences: Record<string, string[]> = {
  // 購入系
  road: [
    "色々と試乗させてもらって、じっくり選ぶことができました。",
    "予算や用途を聞いた上で、いくつか候補を出してくれました。",
    "自分に合うサイズをしっかり見てもらえました。",
  ],
  cross: [
    "用途に合わせて何台か提案してもらい、納得して選べました。",
    "試乗して乗り心地を確かめてから決められたのが良かったです。",
    "通学用に探していましたが、丁寧に対応してもらえました。",
  ],
  gravel: [
    "グラベルバイクについて詳しく教えてもらえました。",
    "用途に合った一台を提案してもらえました。",
  ],
  minivelo: [
    "コンパクトで扱いやすいモデルを提案してもらえました。",
    "街乗りにぴったりの一台を見つけられました。",
  ],
  ebike: [
    "e-bikeの仕組みや選び方を丁寧に説明してもらえました。",
    "試乗してアシストの感覚を体験できました。",
  ],
  // メンテナンス系
  tire: [
    "タイヤの状態を見て的確にアドバイスしてもらえました。",
    "交換後の走り心地が全然違って驚きました。",
  ],
  chain: [
    "チェーンがピカピカになって、変速もスムーズになりました。",
    "チェーンの状態を丁寧に説明してくれて、安心してお任せできました。",
  ],
  brake: [
    "ブレーキの効きが見違えるように良くなりました。",
    "安全に関わる部分なので、しっかり調整してもらえて安心です。",
  ],
  shift: [
    "変速がスパスパ決まるようになって快適です。",
    "ギアチェンジの異音がなくなり、気持ちよく走れるようになりました。",
  ],
  overhaul: [
    "隅々まで丁寧に整備してもらい、新車のような乗り心地に戻りました。",
    "各パーツの状態を一つずつ説明してくれて、信頼できました。",
  ],
  puncture: [
    "すぐに対応してもらえて助かりました。",
    "原因も丁寧に説明してくれて、今後の対策もわかりました。",
  ],
  inspection: [
    "全体を見てもらって、安心して乗り続けられます。",
    "気づいていなかった不具合も見つけてもらえました。",
  ],
  // 相談系
  "first-bike": [
    "初めてのスポーツバイク選びでしたが、丁寧に相談に乗ってもらえました。",
    "何を基準に選べばいいかわからない状態でしたが、わかりやすく教えてもらえました。",
  ],
  upgrade: [
    "今の自転車との違いを具体的に説明してもらえて、参考になりました。",
    "予算に合わせた提案をしてもらえました。",
  ],
  fitting: [
    "体に合ったポジションを出してもらえて、乗り心地が変わりました。",
    "フィッティングの重要性を実感しました。",
  ],
  course: [
    "岡山周辺のおすすめコースを教えてもらえました。",
    "走力に合ったコースを提案してもらえて助かりました。",
  ],
  // 試乗系
  "road-test": [
    "実際に乗って違いを体感できたのが良かったです。",
    "複数台試乗させてもらい、自分に合う一台がわかりました。",
  ],
  "cross-test": [
    "乗り比べることで、自分に合うモデルがわかりました。",
    "試乗だけでも快く対応してもらえました。",
  ],
  "gravel-test": [
    "グラベルバイクの走りを実際に体験できました。",
    "試乗して想像以上の乗り心地に驚きました。",
  ],
  // パーツ系
  wheel: [
    "ホイールの違いを丁寧に説明してもらえました。",
    "予算に合ったホイールを提案してもらえました。",
  ],
  saddle: [
    "自分に合うサドルを一緒に選んでもらえました。",
    "お尻の痛みの相談にも親身に対応してもらえました。",
  ],
  light: [
    "用途に合った明るさのライトを選んでもらえました。",
    "取り付けまでやってもらえて助かりました。",
  ],
  bag: [
    "サイズや容量の相談にも丁寧に答えてもらえました。",
    "実際に自転車に合わせて確認してもらえました。",
  ],
  "other-parts": [
    "探していたパーツについて的確にアドバイスしてもらえました。",
    "取り付けまで対応してもらえて助かりました。",
  ],
  // アパレル系
  jersey: [
    "サイズ感やデザインの相談にも乗ってもらえました。",
    "おしゃれなウェアが揃っていて、選ぶのが楽しかったです。",
  ],
  gloves: [
    "フィット感を確かめてから選べました。",
    "用途に合ったグローブを提案してもらえました。",
  ],
  helmet: [
    "頭の形に合うヘルメットを一緒に選んでもらえました。",
    "安全性とデザイン、両方満足のいくものが見つかりました。",
  ],
  sunglasses: [
    "度付きレンズの対応も相談できました。",
    "デザインと機能性を両立したモデルを提案してもらえました。",
  ],
};

// 良かった点に応じた文
const impressionSentences: Record<ImpressionKey, string[]> = {
  service: [
    "スタッフの方がとても丁寧で、気持ちのいい対応でした。",
    "押し売り感がまったくなく、リラックスして選べました。",
    "親切に対応していただき、初めてでも安心でした。",
    "質問にも嫌な顔ひとつせず答えてくれました。",
  ],
  knowledge: [
    "知識が豊富で、素人の質問にもわかりやすく答えてくれました。",
    "専門的な内容も噛み砕いて説明してくれて、勉強になりました。",
    "メリットだけでなくデメリットも正直に教えてくれました。",
    "こちらの疑問に対して、一つずつ丁寧に説明してくれました。",
  ],
  skill: [
    "作業の仕上がりがとても丁寧で、さすがプロだなと思いました。",
    "整備後の走りが全然違います。技術力の高さを実感しました。",
    "細かいところまで気を配って作業してくれました。",
  ],
  selection: [
    "他では見かけないブランドも置いてあって、見ているだけで楽しかったです。",
    "品揃えが良く、実際に見て比較できるのが嬉しかったです。",
    "おしゃれなウェアやアクセサリーも充実していました。",
  ],
  atmosphere: [
    "店内が明るくて清潔で、入りやすい雰囲気でした。",
    "おしゃれな店内で、自転車屋のイメージが変わりました。",
    "居心地がよくて、つい長居してしまいました。",
  ],
  price: [
    "価格も良心的で、コスパの良い提案をしてもらえました。",
    "予算を伝えたら、その範囲内でベストな提案をしてくれました。",
    "無理に高いものを勧めず、予算に合ったものを提案してくれました。",
  ],
  speed: [
    "作業が早くて、待ち時間も短く済みました。",
    "すぐに対応してもらえて、仕事帰りでも助かりました。",
    "手際よく作業してもらえて、予想より早く仕上がりました。",
  ],
};

// 経験レベルに応じた修飾フレーズ（文頭に追加）
const experienceModifiers: Record<Exclude<ExperienceKey, "skip">, string[]> = {
  beginner: [
    "スポーツバイクは初めてでしたが、",
    "自転車は初心者ですが、",
    "初めてのスポーツ自転車購入でしたが、",
  ],
  returning: [
    "久しぶりにスポーツバイクに復帰しましたが、",
    "しばらく自転車から離れていましたが、",
    "何年かぶりの自転車購入でしたが、",
  ],
  experienced: [
    "長年自転車に乗っていますが、",
    "他店も利用したことがありますが、",
    "経験者ですが、",
  ],
};

// 締めの文
const closings: string[] = [
  "また利用させていただきます。",
  "おすすめのお店です。",
  "友人にも紹介したいと思います。",
  "次もお世話になります。",
  "ありがとうございました！",
  "これからもお世話になります。",
  "自転車のことならここで間違いないです。",
];

// ─── 生成関数 ────────────────────────────────────────────

export function generateReview(selections: ReviewSelections): string {
  const parts: string[] = [];

  // 1. 経験レベルの修飾（文頭）
  if (selections.experience !== "skip") {
    if (Math.random() > 0.3) {
      parts.push(pick(experienceModifiers[selections.experience]));
    }
  }

  // 2. 導入文
  parts.push(pick(openings[selections.purpose]));

  // 3. 具体的な内容
  const detailTexts = detailSentences[selections.detail];
  if (detailTexts) {
    parts.push(pick(detailTexts));
  }

  // 4. 良かった点
  parts.push(pick(impressionSentences[selections.impression]));

  // 5. 自由記入
  if (selections.freetext.trim()) {
    let ft = selections.freetext.trim();
    if (!ft.endsWith("。") && !ft.endsWith("！") && !ft.endsWith("!")) {
      ft += "。";
    }
    parts.push(ft);
  }

  // 6. 締め
  parts.push(pick(closings));

  return parts.join("");
}
