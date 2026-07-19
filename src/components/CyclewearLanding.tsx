"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./CyclewearLanding.module.css";

const reasons = [
  {
    number: "01",
    label: "EVERYDAY",
    title: "街へ、そのまま。",
    text: "いかにも自転車用に見えない服を、素材とシルエットから。",
  },
  {
    number: "02",
    label: "PERFORMANCE",
    title: "走る日は、もっと快適に。",
    text: "身体に沿う一着を、前傾姿勢での着心地まで確かめて。",
  },
  {
    number: "03",
    label: "FIT & HELMET",
    title: "合うものを、きちんと。",
    text: "袖丈から頭の形まで、サイズ表だけでは決められないところを。",
  },
] as const;

const everydayBrands = [
  { name: "STEM DESIGN", note: "自転車と日常をつなぐ服" },
  { name: "rin project", note: "自然体で乗れる日本のウェア" },
  { name: "CLUB RIDE", note: "遊びのあるライドシャツ / 期間限定" },
  { name: "831ソーイング", note: "cycleZオリジナルのデニム" },
] as const;

const performanceBrands = [
  { name: "ASSOS", note: "走りに集中するためのフィット" },
  { name: "Isadore", note: "素材と色を楽しむ一着" },
  { name: "PEdALED", note: "冒険へ向かうためのウェア" },
  { name: "GIRO", note: "頭の形まで確かめるヘルメット" },
] as const;

const fittingPoints = [
  { title: "着る", text: "袖丈、肩まわり、前傾姿勢まで。" },
  { title: "触れる", text: "生地の伸び、厚み、画面と違う色まで。" },
  { title: "合わせる", text: "バイクや普段の服とのつながりまで。" },
] as const;

export function CyclewearLanding() {
  const pageRef = useScrollReveal<HTMLDivElement>(
    "[data-wear-reveal]",
    styles.motionReady,
    styles.visible,
  );

  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="cyclewear-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <p className={styles.heroWord} aria-hidden="true">WEAR</p>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>CYCLING APPAREL</p>
            <h1 id="cyclewear-title" className={styles.heroTitle}>
              <span>着るものを、</span>
              <span className={styles.heroAccent}>自分らしく選ぶ。</span>
            </h1>
            <p className={styles.heroLead}>
              街に馴染む服から、走りを支える一着、ヘルメットまで。
              <br className="hidden sm:block" />
              画面では分からない質感を、cycleZで。
            </p>

            <div className={styles.badges} aria-label="店頭で選べるもの">
              <span>CASUAL</span>
              <span>PERFORMANCE</span>
              <span>HELMET</span>
            </div>

            <a href="#selection" className={styles.jumpLink}>
              セレクトを見る
              <span aria-hidden="true">↓</span>
            </a>
            <Link href="/select" className={styles.gatewayLink}>
              車体・ウェアの入口へ
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroPhoto}>
              <Image
                src="/images/cyclewear/cyclewear-hero.jpg"
                alt="cycleZ店内に並ぶサイクルウェア"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 56vw"
                className={styles.coverImage}
              />
            </div>
            <div className={styles.heroFrame} aria-hidden="true" />
            <p className={styles.heroCaption}>RIDE / WEAR / LIVE</p>
          </div>
        </div>
      </section>

      <section id="selection" className={styles.reasonSection} aria-labelledby="selection-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-wear-reveal>
            <p>THREE WAYS TO WEAR</p>
            <h2 id="selection-title">ここで選べること。</h2>
          </div>

          <div className={styles.reasonGrid}>
            {reasons.map((reason) => (
              <article key={reason.number} className={styles.reasonCard} data-wear-reveal>
                <div className={styles.reasonMeta}>
                  <span>{reason.number}</span>
                  <span>{reason.label}</span>
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.everydaySection} aria-labelledby="everyday-title">
        <div className={styles.splitLayout}>
          <div className={styles.photoPanel} data-wear-reveal>
            <Image
              src="/images/blog/surly-clubride-report-2026-06/clubride-choosing.jpg"
              alt="cycleZ店内でカジュアルなサイクルウェアを選ぶ様子"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.coverImage}
            />
            <div className={styles.photoWipe} aria-hidden="true" />
          </div>

          <div className={styles.splitCopy}>
            <div className={styles.sectionHeading} data-wear-reveal>
              <p>EVERYDAY</p>
              <h2 id="everyday-title">自転車を降りても、<br />そのままでいい。</h2>
              <span>街、カフェ、通勤。乗る時間だけの服にしないセレクトです。</span>
            </div>

            <div className={styles.brandList}>
              {everydayBrands.map((brand) => (
                <div key={brand.name} className={styles.brandItem} data-wear-reveal>
                  <h3>{brand.name}</h3>
                  <p>{brand.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.denimSection} aria-labelledby="denim-title">
        <p className={styles.denimWord} aria-hidden="true">831</p>
        <div className={styles.denimInner} data-wear-reveal>
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

      <section className={styles.performanceSection} aria-labelledby="performance-title">
        <div className={`${styles.splitLayout} ${styles.performanceLayout}`}>
          <div className={styles.splitCopy}>
            <div className={styles.sectionHeading} data-wear-reveal>
              <p>PERFORMANCE</p>
              <h2 id="performance-title">長く走る日を、<br />もっと心地よく。</h2>
              <span>機能は、着たときに初めて自分のものになります。</span>
            </div>

            <div className={styles.brandList}>
              {performanceBrands.map((brand) => (
                <div key={brand.name} className={styles.brandItem} data-wear-reveal>
                  <h3>{brand.name}</h3>
                  <p>{brand.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.photoPanel} data-wear-reveal>
            <Image
              src="/images/wp/2025-06-assos.jpg"
              alt="cycleZ店内のASSOSサイクルウェア展示"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.coverImage}
            />
            <div className={styles.photoWipe} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className={styles.fittingSection} aria-labelledby="fitting-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-wear-reveal>
            <p>TRY BEFORE YOU CHOOSE</p>
            <h2 id="fitting-title">実物でしか、<br />決められないことがある。</h2>
          </div>
          <div className={styles.fittingGrid}>
            {fittingPoints.map((point) => (
              <div key={point.title} data-wear-reveal>
                <strong>{point.title}</strong>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="visit-title">
        <div className={styles.visitCard} data-wear-reveal>
          <div className={styles.visitTitle}>
            <p>VISIT CYCLEZ</p>
            <h2 id="visit-title">画面を閉じて、<br />実物を見に行く。</h2>
            <span>ブランドやサイズが決まっていなくても大丈夫です。</span>
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
            <a href="tel:086-252-7744" className={styles.primaryAction}>
              在庫を電話で確認
              <span aria-hidden="true">↗</span>
            </a>
            <Link href="/access" className={styles.secondaryAction}>
              アクセス・駐車場
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
