export type Staff = {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  image: string;
  introduction: string;
  profile: string[];
  specialties: string[];
  certifications?: string[];
  message: string;
};

export const staffMembers: Staff[] = [
  {
    slug: "okada",
    name: "岡田 宗明",
    nameEn: "Shumei Okada",
    role: "代表 / オーナー",
    image: "/images/staff/staff-main.jpg",
    introduction:
      "cycleZ代表。「入りやすくて何でも聞けるサイクルショップ」をコンセプトに、初心者からベテランまで幅広いお客様をサポートしています。",
    profile: [
      "岡山生まれ岡山育ち。学生時代からスポーツバイクに魅了され、自転車業界へ。長年の経験を経て、2015年にcycleZをオープンしました。",
      "「敷居が高い」と思われがちなスポーツバイクショップのイメージを変えたい。そんな想いから、初心者の方でも気軽に立ち寄れるお店づくりを心がけています。",
      "お客様一人ひとりのライフスタイルに合った1台を一緒に見つけることが、何よりの喜びです。試乗車も多数ご用意していますので、ぜひ気軽に遊びに来てください。",
    ],
    specialties: [
      "バイク選び・提案",
      "フィッティング",
      "ライフスタイル提案",
      "初心者サポート",
    ],
    message:
      "自転車は人生を豊かにしてくれる最高の相棒です。「何から始めればいいかわからない」という方こそ、ぜひcycleZにお越しください。一緒にぴったりの1台を見つけましょう。",
  },
  {
    slug: "senda",
    name: "仙田 佑樹",
    nameEn: "Yuki Senda",
    role: "スタッフ",
    image: "/images/staff/staff-main.jpg",
    introduction:
      "お客様に寄り添った接客を大切に。ウェアやアクセサリーのコーディネートもお任せください。",
    profile: [
      "サイクリングの楽しさをより多くの方に伝えたいという想いでcycleZに加わりました。",
      "バイク本体だけでなく、ウェアやアクセサリーなどトータルでサイクルライフをサポート。お客様のスタイルに合ったコーディネートをご提案します。",
      "休日は岡山周辺のサイクリングコースを走っています。おすすめのルートやカフェ情報もお気軽にお尋ねください。",
    ],
    specialties: [
      "アパレル・ウェア",
      "アクセサリー提案",
      "サイクリングコース",
      "イベント企画",
    ],
    message:
      "自転車は乗れば乗るほど愛着が湧くもの。定期的なメンテナンスで、いつでも快適なライディングを楽しんでいただけるようサポートします。",
  },
  {
    slug: "nishii",
    name: "西井 翔太郎",
    nameEn: "Shotaro Nishii",
    role: "スタッフ",
    image: "/images/staff/staff-main.jpg",
    introduction:
      "確かな技術力でお客様の愛車をベストコンディションに。メンテナンスのことなら何でもご相談ください。",
    profile: [
      "自転車の整備・メンテナンスを得意とし、お客様の大切な愛車を最高の状態に保つことに情熱を注いでいます。",
      "「安心して乗れる」ことが一番大事。定期的なメンテナンスの重要性をお伝えしながら、一台一台丁寧に作業しています。",
      "初心者の方には自分でできる簡単なメンテナンス方法もお教えしますので、お気軽にお声がけください。",
    ],
    specialties: [
      "メンテナンス・修理",
      "パーツ交換",
      "ホイール組み",
      "初心者講習",
    ],
    message:
      "自転車は乗れば乗るほど愛着が湧くもの。定期的なメンテナンスで、いつでも快適なライディングを楽しんでいただけるようサポートします。",
  },
];

export function getStaffBySlug(slug: string): Staff | undefined {
  return staffMembers.find((s) => s.slug === slug);
}

export function getOtherStaff(slug: string): Staff[] {
  return staffMembers.filter((s) => s.slug !== slug);
}
