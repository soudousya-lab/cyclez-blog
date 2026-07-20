"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./CyclewearLanding.module.css";

// いま棚に並んでいるもの（承認ブランドのみ・ロゴ＋公式リンク付き）。末尾は未完タイルで締める（Zeigarnik）。
// ロゴは公式/正規代理店から取得しローカル保存（public/images/brands/・ホットリンクしない）。
// CLUB RIDE は期間限定・委託販売（2026年8月末まで）＝tagに期間明記。9/1以降は要見直し。
const apparelBrands = [
  { name: "ASSOS", tag: "WEAR", logo: "/images/brands/assos.png", href: "https://www.cog.inc/assos", external: true },
  { name: "Isadore", tag: "WEAR", logo: "/images/brands/isadore.png", href: "https://isadore.com/", external: true },
  { name: "PEdALED", tag: "WEAR", logo: "/images/brands/pedaled.png", href: "https://cogtokyo.com/pages/pedaled", external: true },
  { name: "STEM DESIGN", tag: "EVERYDAY", logo: "/images/brands/stem.png", href: "https://www.stem-design.net/", external: true },
  { name: "rin project", tag: "EVERYDAY", logo: "/images/brands/rin.png", href: "https://www.rinproject.com/", external: true },
  { name: "831ソーイング", tag: "cycleZ ORIGINAL", logo: "/images/logo/logo.png", href: "#denim", external: false },
  { name: "GIRO", tag: "HELMET", logo: "/images/brands/giro.png", href: "https://www.cog.inc/giro/", external: true },
  { name: "ALBA OPTICS", tag: "EYEWEAR", logo: "/images/brands/albaoptics.png", href: "https://www.tokyolife.co.jp/brand/albaoptics/", external: true },
  { name: "beruf baggage", tag: "BAG", logo: "/images/brands/beruf.png", href: "https://berufbaggage.com/", external: true },
  { name: "CLUB RIDE", tag: "委託 〜2026/8末", logo: "/images/brands/clubride.png", href: "https://ride2rock.jp/brands/club-ride/", external: true },
] as const;

// 画面では分からないもの（実物性・自己投影）
const inPersonPoints = [
  { name: "自然光での、色", note: "画面の色と、窓から入る光の下の色。" },
  { name: "生地の重さ、落ち感", note: "手に取ってはじめて分かる質感。" },
  { name: "ヘルメットの、軽さ", note: "持って、かぶって分かる当たり。" },
] as const;

// 行くたびに、少し違う ＋ 近隣希少（誇張・断定なし）
const revisitPoints = [
  { title: "行くたびに、少し違う", text: "商品の入れ替えがあるので、来るたびに新しい出会いがあるかもしれません。" },
  { title: "この近隣で、ここまで", text: "ウェアからヘルメット、アイウェア、バッグ、小物まで。一度に手に取れる場所は、この近隣では多くありません。" },
  { title: "CLUB RIDEは8月末まで", text: "期間限定・委託販売。店頭に並ぶのは2026年8月末までの取り扱いです。" },
] as const;

// 車体は最下部に控えめ（主役化しない・詳細は /bikes へ）。ロゴ＋公式/正規代理店リンク付き。
const bikeBrands = [
  { name: "De Rosa", tag: "ITALY", logo: "/images/brands/derosa.png", href: "https://www.derosa.jp/", external: true },
  { name: "macchi cycles", tag: "SHIGA / JAPAN", logo: "/images/brands/macchi.png", href: "/lineup/macchi", external: false },
  { name: "ORBEA", tag: "BASQUE COUNTRY", logo: "/images/brands/orbea.png", href: "https://www.orbea.com/ja-jp/", external: true },
  { name: "SURLY", tag: "U.S.A.", logo: "/images/brands/surly.png", href: "https://ride2rock.jp/newbrand/surly/", external: true },
  { name: "GIOS", tag: "ITALY", logo: "/images/brands/gios.png", href: "https://www.job-cycles.com/gios/", external: true },
  { name: "BASSO", tag: "ITALY", logo: "/images/brands/basso.png", href: "https://www.job-cycles.com/basso/", external: true },
  { name: "SCOTT", tag: "SWITZERLAND", logo: "/images/brands/scott.png", href: "https://www.scott-japan.com/", external: true },
  { name: "Wilier", tag: "ITALY", logo: "/images/brands/wilier.png", href: "https://wilier-jpn.com/", external: true },
  { name: "MATE.BIKE", tag: "COPENHAGEN", logo: "/images/brands/mate.png", href: "https://mate-bike.jp/", external: true },
] as const;

// ブランドカード（ロゴ＋名前＋公式リンク）。外部は別タブ、内部はNext Link。
function BrandCard({ brand }: { brand: { name: string; tag: string; logo: string; href: string; external: boolean } }) {
  const inner = (
    <>
      <span className={styles.brandLogo}>
        <Image src={brand.logo} alt={brand.name} fill sizes="160px" className={styles.brandLogoImg} />
      </span>
      <span className={styles.brandName}>{brand.name}</span>
      <span className={styles.brandTag}>{brand.tag}</span>
    </>
  );
  return brand.external ? (
    <a href={brand.href} target="_blank" rel="noopener noreferrer" className={styles.brandCard} data-select-reveal>
      {inner}
    </a>
  ) : (
    <Link href={brand.href} className={styles.brandCard} data-select-reveal>
      {inner}
    </Link>
  );
}

export function SelectionGateway() {
  const pageRef = useScrollReveal<HTMLDivElement>(
    "[data-select-reveal]",
    styles.motionReady,
    styles.visible,
  );

  return (
    <div ref={pageRef} className={styles.page}>
      {/* 01 ヒーロー：好奇心ギャップ（並ぶものは書ききれない） */}
      <section className={styles.hero} aria-labelledby="select-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <p className={styles.heroWord} aria-hidden="true">WEAR</p>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>APPAREL · SHOES · HELMET · GOODS</p>
            <h1 id="select-title" className={styles.heroTitle}>
              <span>この店の棚は、</span>
              <span className={styles.heroAccent}>文字にしきれない。</span>
            </h1>
            <p className={styles.heroLead}>
              ASSOS、Isadore、PEdALED、GIRO——名前を並べても、並んでいるものの全部は書ききれません。
              <br className="hidden sm:block" />
              だから、まずは店内を覗きに来てください。
            </p>

            <div className={styles.badges} aria-label="店頭で選べるもの">
              <span>APPAREL</span>
              <span>SHOES</span>
              <span>HELMET</span>
              <span>GOODS</span>
            </div>

            <a href="#selection" className={styles.jumpLink}>
              店内を覗いてみる
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroPhoto}>
              <Image
                src="/images/cyclewear/cyclewear-hero.jpg"
                alt="cycleZ店内に並ぶサイクルウェアとヘルメット"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 56vw"
                className={styles.coverImage}
              />
            </div>
            <div className={styles.heroFrame} aria-hidden="true" />
            <p className={styles.heroCaption}>WEAR / RIDE / LIVE</p>
          </div>
        </div>
      </section>

      {/* 02 いま棚に並んでいるもの：品揃え＝報酬＋末尾を未完で締める（Zeigarnik） */}
      <section id="selection" className={styles.reasonSection} aria-labelledby="selection-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-select-reveal>
            <p>WHAT&apos;S ON THE RACKS</p>
            <h2 id="selection-title">いま、こんなものが<br />並んでいます。</h2>
            <span>ウェア、シューズ、ヘルメット、アイウェア、バッグ、そして831ソーイングのデニムまで。名前を挙げきれない分は、店内に。</span>
          </div>

          <div className={styles.brandGrid}>
            {apparelBrands.map((brand) => (
              <BrandCard key={brand.name} brand={brand} />
            ))}
            <div className={`${styles.brandCard} ${styles.brandMoreCard}`} data-select-reveal>
              <span className={styles.brandName}>…ほか、店内に。</span>
            </div>
          </div>
        </div>
      </section>

      {/* 03 見るだけでも、どうぞ：圧の除去バンド（社会的証明＝姿勢表現） */}
      <section className={styles.gatewayStatement} aria-labelledby="ease-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-select-reveal>
            <p>NO PRESSURE</p>
            <h2 id="ease-title">見るだけでも、<br />どうぞ。</h2>
            <span>買うものが決まっていなくても大丈夫です。初めての方も、見るだけのお客さんも。押し売りはしません。</span>
          </div>
        </div>
      </section>

      {/* 04 画面では分からないもの：実物性＋自己投影 */}
      <section className={styles.everydaySection} aria-labelledby="inperson-title">
        <div className={styles.splitLayout}>
          <div className={styles.photoPanel} data-select-reveal>
            <Image
              src="/images/blog/surly-clubride-report-2026-06/clubride-choosing.jpg"
              alt="cycleZ店内でサイクルウェアを手に取って選ぶ様子"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.coverImage}
            />
            <div className={styles.photoWipe} aria-hidden="true" />
          </div>

          <div className={styles.splitCopy}>
            <div className={styles.sectionHeading} data-select-reveal>
              <p>TRY IN PERSON</p>
              <h2 id="inperson-title">画面では、色も<br />手ざわりも伝わらない。</h2>
              <span>生地も、かぶり心地も、来てから確かめてください。</span>
            </div>

            <div className={styles.brandList}>
              {inPersonPoints.map((point) => (
                <div key={point.name} className={styles.brandItem} data-select-reveal>
                  <h3>{point.name}</h3>
                  <p>{point.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 831デニム：cycleZオリジナル（ここでしか） */}
      <section id="denim" className={styles.denimSection} aria-labelledby="denim-title">
        <p className={styles.denimWord} aria-hidden="true">831</p>
        <div className={styles.denimInner} data-select-reveal>
          <div className={styles.denimLabel}>
            <span>CYCLEZ ORIGINAL</span>
            <span>DENIM CYCLING APPAREL</span>
          </div>
          <div>
            <h2 id="denim-title">デニムを、<br />一着ずつ仕立てる。</h2>
            <p>
              デニム縫製を得意とする831ソーイングが一点ずつ手作りする、
              cycleZオリジナルのデニムサイクルアパレル。
            </p>
          </div>
        </div>
      </section>

      {/* 06 行くたびに違う ＋ 近隣希少：再訪動機＋わざわざ寄る理由 */}
      <section className={styles.fittingSection} aria-labelledby="fresh-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-select-reveal>
            <p>WORTH THE TRIP</p>
            <h2 id="fresh-title">来るたびに、<br />少しずつ違う。</h2>
          </div>
          <div className={styles.fittingGrid}>
            {revisitPoints.map((point) => (
              <div key={point.title} data-select-reveal>
                <strong>{point.title}</strong>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 車体もあります：最下部・控えめ（主役化しない） */}
      <section className={styles.allBikeBrandsSection} aria-labelledby="also-bikes-title">
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeading} ${styles.allBikeBrandsHeading}`} data-select-reveal>
            <p>ALSO AT CYCLEZ</p>
            <h2 id="also-bikes-title">車体も、<br />あります。</h2>
            <span>ロード、グラベル、e-BIKE。ウェアを見に来たついでに、実物の一台も。</span>
          </div>

          <div className={styles.brandGrid}>
            {bikeBrands.map((brand) => (
              <BrandCard key={brand.name} brand={brand} />
            ))}
          </div>

          <p className={styles.allBikeBrandsNote} data-select-reveal>
            ここで挙げた以外にも、幅広い車体・フレームを取り扱っています。
          </p>

          <Link href="/bikes" className={styles.gatewayLink} data-select-reveal>
            車体をじっくり見る
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* 08 摩擦ゼロの来店CTA：地図・時間・電話を一直線に */}
      <section className={styles.visitSection} aria-labelledby="visit-title">
        <div className={styles.visitCard} data-select-reveal>
          <div className={styles.visitTitle}>
            <p>VISIT CYCLEZ</p>
            <h2 id="visit-title">続きは、店で。</h2>
            <span>岡山・島田本町でお待ちしています。決まっていなくても、大丈夫です。</span>
          </div>

          <dl className={styles.visitDetails}>
            <div>
              <dt>PLACE</dt>
              <dd>岡山市北区島田本町1丁目1-47</dd>
            </div>
            <div>
              <dt>OPEN</dt>
              <dd>11:00〜19:00 / 水曜定休</dd>
            </div>
            <div>
              <dt>PHONE</dt>
              <dd><a href="tel:086-252-7744">086-252-7744</a></dd>
            </div>
            <div>
              <dt>STOCK</dt>
              <dd>品揃え・サイズは季節や入荷状況で変わります</dd>
            </div>
          </dl>

          <div className={styles.visitActions}>
            <Link href="/access" className={styles.primaryAction}>
              アクセス・駐車場を見る
              <span aria-hidden="true">→</span>
            </Link>
            <a href="tel:086-252-7744" className={styles.secondaryAction}>
              電話で聞いてみる
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
