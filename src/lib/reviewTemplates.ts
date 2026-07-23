// ─── 口コミ生成テンプレート ──────────────────────────────────

export type TriggerKey = "nearby" | "reputation" | "referral" | "interested" | "skip";
export type PurposeKey = "purchase" | "maintenance" | "consultation" | "testride" | "parts" | "apparel";
export type ImpressionKey = "service" | "knowledge" | "skill" | "selection" | "atmosphere" | "price" | "speed";
export type ExperienceKey = "beginner" | "returning" | "experienced" | "skip";

export type DetailOption = {
  key: string;
  label: string;
};

export type ReviewSelections = {
  trigger: TriggerKey;
  purpose: PurposeKey;
  detail: string;
  impression: ImpressionKey;
  experience: ExperienceKey;
  freetext: string;
};

// ─── Step0: 来店のきっかけ ──────────────────────────────────

export const triggerOptions: { key: TriggerKey; label: string }[] = [
  { key: "nearby", label: "近所・通りがかり" },
  { key: "reputation", label: "ネットの評判・口コミを見て" },
  { key: "referral", label: "知人・友人の紹介" },
  { key: "interested", label: "以前から気になっていた" },
];

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

const pickForVariant = <T>(arr: T[], variantIndex: number, offset = 0): T =>
  arr[(variantIndex + offset) % arr.length];

// 来店きっかけ別の導入フレーズ
const triggerPhrases: Record<Exclude<TriggerKey, "skip">, string[]> = {
  nearby: [
    "近所で自転車屋さんを探していたときに、cycleZさんを見つけました。",
    "岡山駅の近くで自転車店を探していて、cycleZさんを知りました。",
  ],
  reputation: [
    "Googleの口コミ評価が高く、気になっていたcycleZさんへ行きました。",
    "ネットで評判が良かったので、cycleZさんを訪ねました。",
  ],
  referral: [
    "友人に紹介してもらい、cycleZさんへ行きました。",
    "知人にすすめてもらったことがきっかけで、cycleZさんを訪ねました。",
  ],
  interested: [
    "以前から気になっていたcycleZさんへ、今回初めて伺いました。",
    "通りかかるたびに気になっていたので、cycleZさんへ行ってみました。",
  ],
};

// 来店目的別の導入文
const openings: Record<PurposeKey, string[]> = {
  purchase: [
    "今回は自転車の購入でお世話になりました。",
    "新しい自転車を探していて、購入の相談をしました。",
    "自転車を買うために伺いました。",
    "欲しかった自転車を探しに伺いました。",
  ],
  maintenance: [
    "今回はメンテナンスでお世話になりました。",
    "愛車のメンテナンスをお願いしました。",
    "自転車の調子が悪くなり、修理をお願いしました。",
    "気になっていた不具合を見てもらいました。",
  ],
  consultation: [
    "今回は自転車選びの相談で伺いました。",
    "まだ購入は決めていない段階でしたが、相談に乗っていただきました。",
    "自転車選びで迷っていたので、相談をお願いしました。",
    "購入前に話を聞いてみたくて伺いました。",
  ],
  testride: [
    "試乗させていただきました。",
    "気になっていた自転車を試乗しに伺いました。",
    "購入前に乗り心地を確かめたくて、試乗をお願いしました。",
    "実際に乗って比較したくて伺いました。",
  ],
  parts: [
    "今回はパーツの購入でお世話になりました。",
    "パーツ選びの相談で伺いました。",
    "自転車に合うアクセサリーを探しに伺いました。",
    "パーツを交換したくて相談しました。",
  ],
  apparel: [
    "サイクルウェアを買いに伺いました。",
    "ウェア選びでお世話になりました。",
    "サイクルアパレルを探しに伺いました。",
    "普段のライドで着るウェアを探しに行きました。",
  ],
};

// 具体的な内容に応じた補足文
const detailSentences: Record<string, string[]> = {
  // 購入系
  road: [
    "色々と試乗させてもらって、じっくり選ぶことができました。",
    "予算や用途を聞いた上で、いくつか候補を出してくれました。",
    "自分に合うサイズをしっかり見てもらえました。",
    "試乗したら想像以上に走りが違って、その場で決めちゃいました。",
  ],
  cross: [
    "用途に合わせて何台か提案してもらい、納得して選べました。",
    "試乗して乗り心地を確かめてから決められたのが良かったです。",
    "通学用に探していましたが、丁寧に対応してもらえました。",
    "見た目も乗り心地もバッチリなクロスバイクに出会えました！",
  ],
  gravel: [
    "グラベルバイクについて詳しく教えてもらえました。",
    "用途に合った一台を提案してもらえました。",
    "グラベル気になってたけど、実物見たら思った以上にカッコよくてテンション上がりました。",
  ],
  minivelo: [
    "コンパクトで扱いやすいモデルを提案してもらえました。",
    "街乗りにぴったりの一台を見つけられました。",
    "小さいのに走りがしっかりしてて、もっと早く買えばよかったです。",
  ],
  ebike: [
    "e-bikeの仕組みや選び方を丁寧に説明してもらえました。",
    "試乗してアシストの感覚を体験できました。",
    "坂道がこんなに楽になるとは…！もう普通の自転車には戻れません。",
  ],
  // メンテナンス系
  tire: [
    "タイヤの状態を見て的確にアドバイスしてもらえました。",
    "交換後の走り心地が全然違って驚きました。",
    "タイヤ変えただけでこんなに変わるんですね！もっと早く替えればよかった。",
  ],
  chain: [
    "チェーンがピカピカになって、変速もスムーズになりました。",
    "チェーンの状態を丁寧に説明してくれて、安心してお任せできました。",
    "帰り道、ペダルの軽さに感動しました。全然違う！",
  ],
  brake: [
    "ブレーキの効きが見違えるように良くなりました。",
    "安全に関わる部分なので、しっかり調整してもらえて安心です。",
    "ブレーキがカチッと効くようになって、下り坂が怖くなくなりました。",
  ],
  shift: [
    "変速がスパスパ決まるようになって快適です。",
    "ギアチェンジの異音がなくなり、気持ちよく走れるようになりました。",
    "あのカチャカチャ音がなくなっただけでストレスが激減しました！",
  ],
  overhaul: [
    "隅々まで丁寧に整備してもらい、新車のような乗り心地に戻りました。",
    "各パーツの状態を一つずつ説明してくれて、信頼できました。",
    "新車の頃の走りが戻ってきて感動です。もっと早くお願いすればよかった…！",
  ],
  puncture: [
    "すぐに対応してもらえて助かりました。",
    "原因も丁寧に説明してくれて、今後の対策もわかりました。",
    "出先でパンクして焦ったけど、すぐ直してもらえて本当に助かりました！",
  ],
  inspection: [
    "全体を見てもらって、安心して乗り続けられます。",
    "気づいていなかった不具合も見つけてもらえました。",
    "自分じゃ気づかない部分まで見てくれて、やっぱりプロに任せるべきだなと思いました。",
  ],
  // 相談系
  "first-bike": [
    "初めてのスポーツバイク選びでしたが、丁寧に相談に乗ってもらえました。",
    "何を基準に選べばいいかわからない状態でしたが、わかりやすく教えてもらえました。",
    "右も左もわからない状態で行ったのに、嫌な顔ひとつせず付き合ってくれました。",
  ],
  upgrade: [
    "今の自転車との違いを具体的に説明してもらえて、参考になりました。",
    "予算に合わせた提案をしてもらえました。",
    "「無理に買い替えなくても大丈夫ですよ」って言ってくれたのが逆に信頼できました。",
  ],
  fitting: [
    "体に合ったポジションを出してもらえて、乗り心地が変わりました。",
    "フィッティングの重要性を実感しました。",
    "ポジション変えただけで嘘みたいに楽になりました。もっと早く見てもらえばよかった！",
  ],
  course: [
    "岡山周辺のおすすめコースを教えてもらえました。",
    "走力に合ったコースを提案してもらえて助かりました。",
    "教えてもらったコース、最高でした！また新しいルート聞きに行きます。",
  ],
  // 試乗系
  "road-test": [
    "実際に乗って違いを体感できたのが良かったです。",
    "複数台試乗させてもらい、自分に合う一台がわかりました。",
    "乗った瞬間「あ、これだ」ってなりました。試乗って大事ですね。",
  ],
  "cross-test": [
    "乗り比べることで、自分に合うモデルがわかりました。",
    "試乗だけでも快く対応してもらえました。",
    "「買わなくてもいいので乗ってみてください」って言ってくれたのが嬉しかったです。",
  ],
  "gravel-test": [
    "グラベルバイクの走りを実際に体験できました。",
    "試乗して想像以上の乗り心地に驚きました。",
    "グラベル、思ってたよりずっと楽しい！試乗して正解でした。",
  ],
  // パーツ系
  wheel: [
    "ホイールの違いを丁寧に説明してもらえました。",
    "予算に合ったホイールを提案してもらえました。",
    "ホイール変えたら別の自転車みたいになりました。こんなに違うんですね！",
  ],
  saddle: [
    "自分に合うサドルを一緒に選んでもらえました。",
    "お尻の痛みの相談にも親身に対応してもらえました。",
    "サドル変えたらロングライドが全然苦じゃなくなりました！もっと早く相談すればよかった。",
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
    "普段着っぽく着れるウェアがあって感動！自転車屋でこんなおしゃれなウェア買えるとは思いませんでした。",
  ],
  gloves: [
    "フィット感を確かめてから選べました。",
    "用途に合ったグローブを提案してもらえました。",
    "手にぴったりフィットするグローブが見つかって満足です。",
  ],
  helmet: [
    "頭の形に合うヘルメットを一緒に選んでもらえました。",
    "安全性とデザイン、両方満足のいくものが見つかりました。",
    "見た目もかっこいいヘルメットが見つかって、被るのが楽しみになりました。",
  ],
  sunglasses: [
    "度付きレンズの対応も相談できました。",
    "デザインと機能性を両立したモデルを提案してもらえました。",
    "かけ心地も視界もバッチリ。走るのがもっと楽しくなりそうです！",
  ],
};

// 良かった点に応じた文
const impressionSentences: Record<ImpressionKey, string[]> = {
  service: [
    "スタッフの方がとても丁寧で、気持ちのいい対応でした。",
    "押し売り感がまったくなく、リラックスして選べました。",
    "親切に対応していただき、初めてでも安心でした。",
    "質問にも嫌な顔ひとつせず答えてくれました。",
    "話しやすくて、気づいたら1時間以上いました。楽しかったです。",
  ],
  knowledge: [
    "知識が豊富で、素人の質問にもわかりやすく答えてくれました。",
    "専門的な内容も噛み砕いて説明してくれて、勉強になりました。",
    "メリットだけでなくデメリットも正直に教えてくれました。",
    "こちらの疑問に対して、一つずつ丁寧に説明してくれました。",
    "「それならこっちの方が合いますよ」と、正直な提案をしてくれて信頼できました。",
  ],
  skill: [
    "作業の仕上がりがとても丁寧で、さすがプロだなと思いました。",
    "整備後の走りが全然違います。技術力の高さを実感しました。",
    "細かいところまで気を配って作業してくれました。",
    "仕上がりを見て「これがプロの仕事か…」と感動しました。",
  ],
  selection: [
    "他では見かけないブランドも置いてあって、見ているだけで楽しかったです。",
    "品揃えが良く、実際に見て比較できるのが嬉しかったです。",
    "おしゃれなウェアやアクセサリーも充実していました。",
    "自転車屋さんなのにアパレルもセンスいい。見てるだけで楽しくなるお店です。",
  ],
  atmosphere: [
    "店内が明るくて清潔で、入りやすい雰囲気でした。",
    "おしゃれな店内で、自転車屋のイメージが変わりました。",
    "居心地がよくて、つい長居してしまいました。",
    "敷居が高いかなと思ってたけど、全然そんなことなかった！入りやすい雰囲気です。",
  ],
  price: [
    "価格も良心的で、コスパの良い提案をしてもらえました。",
    "予算を伝えたら、その範囲内でベストな提案をしてくれました。",
    "無理に高いものを勧めず、予算に合ったものを提案してくれました。",
    "「今は無理に買わなくていいと思います」って正直に言ってくれて、逆に信頼感が増しました。",
  ],
  speed: [
    "作業が早くて、待ち時間も短く済みました。",
    "すぐに対応してもらえて、仕事帰りでも助かりました。",
    "手際よく作業してもらえて、予想より早く仕上がりました。",
    "「ちょっと待っててください」って言って10分で直してくれました。早い！",
  ],
};

// 経験レベルに応じた修飾フレーズ（文頭に追加）
const experienceModifiers: Record<Exclude<ExperienceKey, "skip">, string[]> = {
  beginner: [
    "スポーツバイクは初めてで、わからないことも多い状態でした。",
    "自転車は初心者なので、少し不安もありました。",
    "初めてのスポーツ自転車選びで伺いました。",
    "スポーツバイクの知識がほとんどない状態で相談しました。",
  ],
  returning: [
    "久しぶりにスポーツバイクへ復帰するため、相談しました。",
    "しばらく自転車から離れていたので、少し不安もありました。",
    "何年かぶりの自転車選びで伺いました。",
    "久しぶりにまた自転車へ乗りたくなり、相談しました。",
  ],
  experienced: [
    "長年自転車に乗っていますが、今回初めて相談しました。",
    "これまで他店も利用してきましたが、丁寧な対応が印象的でした。",
    "自転車には長く乗っていますが、新しい発見がありました。",
    "いくつかのショップを利用してきた中でも、相談しやすいお店でした。",
  ],
};

type ReviewVariant = {
  experiencePlacement: "start" | "after-opening";
  openingOffset: number;
  detailOffset: number;
  impressionOffset: number;
  closing: string;
};

// 同じ選択内容から生成する10系統。語調は大きく変えず、構成と各文をずらす。
const reviewVariants: ReviewVariant[] = [
  {
    experiencePlacement: "start",
    openingOffset: 0,
    detailOffset: 0,
    impressionOffset: 0,
    closing: "また利用したいと思います。",
  },
  {
    experiencePlacement: "after-opening",
    openingOffset: 0,
    detailOffset: 0,
    impressionOffset: 0,
    closing: "次回もcycleZさんにお願いしたいです。",
  },
  {
    experiencePlacement: "start",
    openingOffset: 1,
    detailOffset: 0,
    impressionOffset: 0,
    closing: "これからもお世話になりたいお店です。",
  },
  {
    experiencePlacement: "after-opening",
    openingOffset: 1,
    detailOffset: 1,
    impressionOffset: 0,
    closing: "また自転車のことで相談したいと思います。",
  },
  {
    experiencePlacement: "start",
    openingOffset: 2,
    detailOffset: 1,
    impressionOffset: 1,
    closing: "安心してお願いできるお店だと思います。",
  },
  {
    experiencePlacement: "after-opening",
    openingOffset: 2,
    detailOffset: 1,
    impressionOffset: 1,
    closing: "岡山で自転車店を探している方にもおすすめしたいです。",
  },
  {
    experiencePlacement: "start",
    openingOffset: 3,
    detailOffset: 2,
    impressionOffset: 1,
    closing: "今後も何かあれば相談したいです。",
  },
  {
    experiencePlacement: "after-opening",
    openingOffset: 3,
    detailOffset: 2,
    impressionOffset: 2,
    closing: "また伺いたいと思います。",
  },
  {
    experiencePlacement: "start",
    openingOffset: 0,
    detailOffset: 2,
    impressionOffset: 2,
    closing: "これからも長く付き合っていきたいお店です。",
  },
  {
    experiencePlacement: "after-opening",
    openingOffset: 1,
    detailOffset: 3,
    impressionOffset: 2,
    closing: "自転車のことを相談できるお店が見つかって良かったです。",
  },
];

export const REVIEW_VARIANT_COUNT = reviewVariants.length;

// ─── 生成関数 ────────────────────────────────────────────

export function generateReview(
  selections: ReviewSelections,
  variantIndex = Math.floor(Math.random() * REVIEW_VARIANT_COUNT),
): string {
  const normalizedVariantIndex =
    ((variantIndex % REVIEW_VARIANT_COUNT) + REVIEW_VARIANT_COUNT) % REVIEW_VARIANT_COUNT;
  const variant = reviewVariants[normalizedVariantIndex];
  const parts: string[] = [];
  const experienceText =
    selections.experience === "skip"
      ? null
      : pickForVariant(
          experienceModifiers[selections.experience],
          normalizedVariantIndex,
        );

  if (experienceText && variant.experiencePlacement === "start") {
    parts.push(experienceText);
  }

  if (selections.trigger !== "skip") {
    parts.push(
      pickForVariant(
        triggerPhrases[selections.trigger],
        normalizedVariantIndex,
      ),
    );
  }
  parts.push(
    pickForVariant(
      openings[selections.purpose],
      normalizedVariantIndex,
      variant.openingOffset,
    ),
  );

  if (experienceText && variant.experiencePlacement === "after-opening") {
    parts.push(experienceText);
  }

  const detailTexts = detailSentences[selections.detail];
  if (detailTexts) {
    parts.push(
      pickForVariant(
        detailTexts,
        normalizedVariantIndex,
        variant.detailOffset,
      ),
    );
  }

  parts.push(
    pickForVariant(
      impressionSentences[selections.impression],
      normalizedVariantIndex,
      variant.impressionOffset,
    ),
  );

  if (selections.freetext.trim()) {
    let ft = selections.freetext.trim();
    if (
      !ft.endsWith("。") &&
      !ft.endsWith("！") &&
      !ft.endsWith("!") &&
      !ft.endsWith("？") &&
      !ft.endsWith("?")
    ) {
      ft += "。";
    }
    parts.push(ft);
  }

  parts.push(variant.closing);

  return parts.join("");
}
