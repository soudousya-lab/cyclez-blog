"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./CyclewearLanding.module.css";

// いま棚に並んでいるもの（承認ブランドのみ・全部は見せず末尾を未完で締める）
// CLUB RIDE は期間限定・委託販売（2026年8月末まで）＝ラベルに期間を明記。9/1以降は要見直し。
const rackItems = [
  { label: "WEAR", name: "ASSOS" },
  { label: "WEAR", name: "Isadore" },
  { label: "WEAR", name: "PEdALED" },
  { label: "EVERYDAY", name: "STEM DESIGN" },
  { label: "EVERYDAY", name: "rin project" },
  { label: "DENIM", name: "831ソーイング" },
  { label: "HELMET", name: "GIRO" },
  { label: "EYEWEAR", name: "ALBA OPTICS" },
  { label: "BAG", name: "beruf baggage" },
  { label: "委託 〜2026/8末", name: "CLUB RIDE" },
  { label: "AND MORE", name: "…ほか、店内に。" },
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

// 車体は最下部に控えめ（主役化しない・詳細は /bikes へ）
const bikeBrands = [
  { name: "De Rosa", origin: "ITALY" },
  { name: "macchi cycles", origin: "SHIGA / JAPAN" },
  { name: "ORBEA", origin: "BASQUE COUNTRY" },
  { name: "SURLY", origin: "U.S.A." },
  { name: "GIOS", origin: "ITALY" },
  { name: "BASSO", origin: "ITALY" },
  { name: "SCOTT", origin: "SWITZERLAND" },
  { name: "Wilier", origin: "ITALY" },
  { name: "MATE.BIKE", origin: "COPENHAGEN" },
] as const;

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

          <div className={styles.allBikeBrandsGrid}>
            {rackItems.map((item) => (
              <article key={item.name} className={styles.allBikeBrand} data-select-reveal>
                <span>{item.label}</span>
                <h3>{item.name}</h3>
              </article>
            ))}
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
      <section className={styles.denimSection} aria-labelledby="denim-title">
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

          <div className={styles.allBikeBrandsGrid}>
            {bikeBrands.map((brand) => (
              <article key={brand.name} className={styles.allBikeBrand} data-select-reveal>
                <span>{brand.origin}</span>
                <h3>{brand.name}</h3>
              </article>
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
