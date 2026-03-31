export type Bike = {
  name: string;
  image?: string; // 愛車写真パス
};

export type Staff = {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  catchphrase: string;
  image: string; // ポートレート写真
  actionImage?: string; // 作業中やライド中の写真
  introduction: string;
  profile: string[];
  specialties: string[];
  bikes: Bike[];
  certifications: string[];
  hobbies: string[];
  message: string;
};

export const staffMembers: Staff[] = [
  {
    slug: "okada",
    name: "岡田 宗明",
    nameEn: "Muneaki Okada",
    role: "代表 / オーナー",
    catchphrase: '初心者の"困った"を解決したくて開業しました',
    image: "/images/staff/okada.jpg",
    actionImage: "/images/staff/okada-action.jpg",
    introduction:
      "40代でロードバイクをはじめ、初心者が安心して相談できるお店が少ないと感じて開業。元アパレルショップ勤務の経験を活かし、ウェアやアパレル選びにも力を入れています。輪行での自転車旅が大好きで、自転車のある暮らし全体を提案します。",
    profile: [
      "40代で友人の勧めでロードバイクをはじめたのですが、乗り方やどこを走れば良いか、またいいホイールの選び方などわからないことばかりでした。特に初心者が安心して相談できるお店が少ないと感じました。",
      "私と同じ困っている初心者の方をターゲットにお店をオープンしました。また、ピタピタのジャージ以外の町でも着れるおしゃれなウェアも広めたいと思い、ウェアにも力を入れています。",
      "ちなみにcycleZの「Z」はマジンガーZから頂きました。",
    ],
    specialties: [
      "初心者の最初の一台選び",
      "ウェア・アパレル提案",
      "自転車旅・輪行",
      "ライフスタイル提案",
    ],
    bikes: [
      { name: "macchi cycles クロモリオーダーフレーム", image: "/images/staff/okada-bike-macchi.jpg" },
      { name: "BASSO DIAMANTE（リム）", image: "/images/staff/okada-bike-basso.jpg" },
    ],
    certifications: ["自転車技士"],
    hobbies: [
      "スポーツ観戦（特にバスケットボール）",
      "コーヒー焙煎",
    ],
    message:
      "「何から始めればいいかわからない」「お店に入りにくい」という方こそ、ぜひcycleZにお越しください。同じ初心者だった私が、一緒にぴったりの一台とスタイルを見つけます。",
  },
  {
    slug: "nishii",
    name: "西井 翔太郎",
    nameEn: "Shotaro Nishii",
    role: "スタッフ",
    catchphrase: "朝から日没までストイックに走り続ける男",
    image: "/images/staff/nishii.jpg",
    actionImage: "/images/staff/nishii-action.jpg",
    introduction:
      "2017年末にロードバイクに出会い人生が一変。レース経験豊富で、当店No.1のメカニック技術を持つストイックなサイクリスト。整備の腕は店内随一で、パーツ交換やメンテナンスの相談はお任せください。",
    profile: [
      "2017年末頃にロードバイクに出会い人生を変えられました。ロングライドをメインにひたすら走り、自転車だけでどこまで行けるのかひたすら走り続けていました。2019年までに3台のスポーツバイクを購入するほど自転車にハマりました。",
      "2019年の夏に勤めていたハウスメーカーを退職し自転車業界へ。アルバイトとして「サイクルベースあさひ」と「cycleZ」を掛け持ちで働きながら、レースイベント等に積極的に参加するようになりました。仕事が始まる前にトレーニングをし、仕事が終わってからもひたすら自転車を走らせていました。",
      "2021年12月に正式にcycleZスタッフとして働き始め、2022年からは岡山県代表として中国地区ロードに参戦したり、実業団レースなどに参加しています。現在に至るまでロングライドや自転車旅などの経験をお客様に伝えています。",
    ],
    specialties: [
      "メンテナンス・整備（当店No.1）",
      "レース経験・トレーニング",
      "ロングライド・自転車旅",
      "パーツ選び・交換",
    ],
    bikes: [
      { name: "SCOTT ADDICT RC 10", image: "/images/staff/nishii-bike-scott.jpg" },
      { name: "LAPIERRE XELIUS SL ULTIMATE", image: "/images/staff/nishii-bike-lapierre.jpg" },
      { name: "macchi オーダーバイク", image: "/images/staff/nishii-bike-macchi.jpg" },
    ],
    certifications: ["自転車技士", "自転車安全運転整備士"],
    hobbies: [
      "自転車でロングライド（朝から日没まで走り続けます）",
      "カラオケ",
      "たまにミニ四駆",
    ],
    message:
      "こんなに面白いことはもっとみんなに知ってほしい！という思いでこの業界に入りました。レースのこと、ロングライドのルート、メンテナンスの疑問、何でも聞いてください。自転車で人生をより豊かに！",
  },
  {
    slug: "senda",
    name: "仙田 佑樹",
    nameEn: "Yuki Senda",
    role: "スタッフ",
    catchphrase: "カスタム沼の住人",
    image: "/images/staff/senda.jpg",
    actionImage: "/images/staff/senda-action.jpg",
    introduction:
      "自転車の造形や機能美に惚れてカスタムに没頭。ウェアやアイテムのコーディネートセンスに定評があり、バイクもファッションもトータルで提案します。穏やかな接客でお客様から信頼を得ています。",
    profile: [
      "2017年、社会人になってから趣味という趣味がなく何かを始めたくてブラブラとしていた時に、友人が夜に散歩中「路地裏になんか謎の店がある」ということで一緒に来店。そこが最初スポーツ自転車店ということすら知らずに…店長にその魅力を説かれ、あれよあれよという間にロードバイクを購入しドップリと自転車にハマりました。",
      "特に自分は自転車をカスタムする楽しさにハマり、購入から2年経過時には最初に買ったロードバイクのフレーム以外は全てパーツ入れ替えが済むぐらいカスタムされた状態に！",
      "2019年に「そんなに自転車ハマってるならうちに就職すれば！？」と勧誘を受け自転車業界に足を踏み入れることに。自転車歴がそんなに長くあった訳でもなく、ただ自転車の造形や機能美に惚れて好きなことをしていたら仕事になっていたラッキーマンです。",
      "のんびりグルメライド（特にラーメン）や輪行での自転車旅も積極的にし、その楽しさを皆に知ってほしくて布教活動しています。",
    ],
    specialties: [
      "カスタム・パーツコーディネート",
      "ウェアのコーディネート",
      "グルメライド・自転車旅",
      "穏やかな接客・相談",
    ],
    bikes: [
      { name: "macchi オーダーバイク", image: "/images/staff/senda-bike-macchi.jpg" },
      { name: "Wilier Verticale SLR", image: "/images/staff/senda-bike-wilier.jpg" },
    ],
    certifications: ["自転車技士"],
    hobbies: [
      "仕事終わりにレイトショーを観に行く",
      "ラーメンライド",
      "ゲーム（昔やり込んでいたので今でも情報だけは詳しいです）",
    ],
    message:
      "「パーツを変えてみたいけど何を選べばいいかわからない」「おしゃれに乗りたい」という方はぜひ声かけてください。バイクもウェアも、あなたのスタイルに合ったコーディネートを一緒に考えます。",
  },
];

export function getStaffBySlug(slug: string): Staff | undefined {
  return staffMembers.find((s) => s.slug === slug);
}

export function getOtherStaff(slug: string): Staff[] {
  return staffMembers.filter((s) => s.slug !== slug);
}
