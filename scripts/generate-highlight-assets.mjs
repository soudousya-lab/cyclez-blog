import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public/images/social/highlights");
const logoPath = path.join(root, "public/images/logo/cyclezmainlogo.png");

const items = [
  {
    slug: "events",
    title: "最新イベント",
    subtitle: "試乗会・ライドのお知らせ",
    icon: "calendar",
    accent: "#e53935",
  },
  {
    slug: "beginner",
    title: "初めての方",
    subtitle: "相談・試乗・選び方",
    icon: "spark",
    accent: "#21a67a",
  },
  {
    slug: "test-ride",
    title: "試乗会",
    subtitle: "乗って選べるcycleZ",
    icon: "bike",
    accent: "#1f7ae0",
  },
  {
    slug: "new-bike",
    title: "納車紹介",
    subtitle: "NEW BIKE DAY",
    icon: "flag",
    accent: "#f08a24",
  },
  {
    slug: "ride",
    title: "ライド",
    subtitle: "岡山の自転車時間",
    icon: "route",
    accent: "#7a55d9",
  },
  {
    slug: "maintenance",
    title: "修理/料金",
    subtitle: "メンテナンス相談",
    icon: "tool",
    accent: "#d9367f",
  },
  {
    slug: "access",
    title: "アクセス",
    subtitle: "岡山市北区島田本町",
    icon: "pin",
    accent: "#0a8ea0",
  },
  {
    slug: "sale",
    title: "セール",
    subtitle: "在庫車・キャンペーン",
    icon: "tag",
    accent: "#c9a227",
  },
];

function iconSvg(type, color) {
  const attrs = `fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"`;
  const smallAttrs = `fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"`;
  const common = `<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">`;
  const end = `</svg>`;

  const icons = {
    calendar: `<rect x="44" y="54" width="132" height="124" rx="20" ${attrs}/><path d="M72 34v38M148 34v38M46 92h128" ${attrs}/><path d="M76 126h12M106 126h12M136 126h12M76 154h12M106 154h12" ${attrs}/>`,
    spark: `<path d="M110 30l18 58 58 22-58 22-18 58-18-58-58-22 58-22 18-58z" ${attrs}/><path d="M46 48l12 28 28 12-28 12-12 28-12-28-28-12 28-12 12-28z" ${smallAttrs}/>`,
    bike: `<circle cx="62" cy="148" r="38" ${attrs}/><circle cx="160" cy="148" r="38" ${attrs}/><path d="M62 148l38-58h34l26 58M100 90l-18 58h78M116 90l-12-30M94 60h36" ${attrs}/>`,
    flag: `<path d="M66 184V42" ${attrs}/><path d="M66 46h96l-18 36 18 36H66" ${attrs}/><path d="M48 184h58" ${attrs}/>`,
    route: `<path d="M52 54c46 0 46 54 92 54 18 0 28-8 34-22" ${attrs}/><path d="M42 156c24-42 58-42 90-26 20 10 34 12 50-4" ${attrs}/><circle cx="52" cy="54" r="18" ${attrs}/><circle cx="178" cy="86" r="18" ${attrs}/><circle cx="42" cy="156" r="18" ${attrs}/>`,
    tool: `<path d="M148 40c-20 0-36 16-36 36 0 6 2 12 4 18l-70 70a20 20 0 1028 28l70-70c6 2 12 4 18 4 20 0 36-16 36-36 0-4 0-8-2-12l-28 28-28-28 28-28c-4-2-12-10-20-10z" ${attrs}/>`,
    pin: `<path d="M110 198s62-58 62-112a62 62 0 10-124 0c0 54 62 112 62 112z" ${attrs}/><circle cx="110" cy="86" r="22" ${attrs}/>`,
    tag: `<path d="M46 62v64l70 70 72-72-70-70H54a8 8 0 00-8 8z" ${attrs}/><circle cx="82" cy="90" r="12" ${attrs}/><path d="M112 118l34 34" ${attrs}/>`,
  };

  return `${common}${icons[type]}${end}`;
}

function escapeText(text) {
  return text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;",
  })[char]);
}

function storySvg(item) {
  const title = escapeText(item.title);
  const subtitle = escapeText(item.subtitle);
  const icon = iconSvg(item.icon, item.accent);

  return `
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#111111"/>
      <stop offset="0.58" stop-color="#1d1d1d"/>
      <stop offset="1" stop-color="#070707"/>
    </linearGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0V72" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="2"/>
    </pattern>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <rect width="1080" height="1920" fill="url(#grid)"/>
  <path d="M0 0H1080V28H0z" fill="${item.accent}"/>
  <path d="M0 1892H1080V1920H0z" fill="${item.accent}"/>

  <g opacity="0.12">
    <path d="M-120 1460C120 1320 270 1350 460 1460C650 1570 820 1590 1200 1370" fill="none" stroke="${item.accent}" stroke-width="42"/>
    <path d="M-160 520C120 390 292 430 482 530C675 632 825 628 1210 430" fill="none" stroke="${item.accent}" stroke-width="30"/>
  </g>

  <text x="540" y="188" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, Arial, sans-serif" font-size="48" font-weight="800" fill="#ffffff" letter-spacing="1">cycleZ</text>
  <text x="540" y="245" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, Arial, sans-serif" font-size="25" font-weight="700" fill="#d8d8d8">岡山のスポーツバイクショップ</text>

  <g filter="url(#shadow)">
    <circle cx="540" cy="820" r="365" fill="#f7f7f7"/>
    <circle cx="540" cy="820" r="331" fill="#ffffff" stroke="${item.accent}" stroke-width="18"/>
    <g transform="translate(430 530)">
      ${icon}
    </g>
    <text x="540" y="910" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, Arial, sans-serif" font-size="86" font-weight="900" fill="#111111">${title}</text>
    <text x="540" y="982" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, Arial, sans-serif" font-size="34" font-weight="700" fill="#444444">${subtitle}</text>
  </g>

  <text x="540" y="1348" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, Arial, sans-serif" font-size="38" font-weight="800" fill="#ffffff">岡山で自転車のある暮らしを楽しむ</text>
  <text x="540" y="1408" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, Arial, sans-serif" font-size="28" font-weight="600" fill="#d0d0d0">試乗・相談・メンテナンスはDMでも受付中</text>
  <text x="540" y="1675" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, Arial, sans-serif" font-size="31" font-weight="700" fill="${item.accent}">@cyclez2015</text>
</svg>`;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const logo = await sharp(logoPath)
    .resize({ width: 150, height: 150, fit: "inside" })
    .png()
    .toBuffer();

  for (const item of items) {
    const svg = Buffer.from(storySvg(item));
    const output = path.join(outputDir, `${item.slug}.png`);
    await sharp(svg)
      .composite([{ input: logo, top: 86, left: 86 }])
      .png()
      .toFile(output);
    console.log(output);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
