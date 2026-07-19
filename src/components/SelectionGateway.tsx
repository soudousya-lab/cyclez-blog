"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./CyclewearLanding.module.css";

const choices = [
  {
    href: "/bikes",
    label: "BIKES",
    title: "乗りたい一台を探す。",
    text: "ロード、グラベル、e-BIKE。ブランドの背景も、実物の佇まいも見比べる。",
    brands: "MATE.BIKE / De Rosa / BISYA / ORBEA / SURLY",
    image: "/images/posts/derosa-wheel-2026-07/idol-white.jpg",
    alt: "De Rosa IDOLのロードバイク",
    imageMode: "contain",
  },
  {
    href: "/cyclewear",
    label: "APPAREL",
    title: "着たい一着を探す。",
    text: "街に馴染む服から、長く走る日のウェア、ヘルメットまで着比べる。",
    brands: "STEM DESIGN / rin project / ASSOS / Isadore / PEdALED / GIRO",
    image: "/images/cyclewear/cyclewear-hero.jpg",
    alt: "cycleZ店内に並ぶサイクルウェア",
    imageMode: "cover",
  },
] as const;

const visitReasons = [
  { title: "触れる", text: "画面では分からない素材、色、造形を。" },
  { title: "比べる", text: "ブランドをまたいで、自分に合うものを。" },
  { title: "話す", text: "使い方や好みから、まだ知らない選択肢を。" },
] as const;

export function SelectionGateway() {
  const pageRef = useScrollReveal<HTMLDivElement>(
    "[data-select-reveal]",
    styles.motionReady,
    styles.visible,
  );

  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="selection-gateway-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <p className={styles.heroWord} aria-hidden="true">CHOOSE</p>

        <div className={`${styles.heroInner} ${styles.gatewayHeroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>BIKES × APPAREL</p>
            <h1 id="selection-gateway-title" className={styles.heroTitle}>
              <span>乗りたい。</span>
              <span>着てみたい。</span>
              <span className={styles.heroAccent}>その気持ちから選ぶ。</span>
            </h1>
            <p className={styles.heroLead}>
              車体も、ウェアも、画面の中だけで決めない。
              <br className="hidden sm:block" />
              気になる方から、cycleZのセレクトへ。
            </p>

            <div className={styles.badges} aria-label="選べる入口">
              <span>BIKES</span>
              <span>APPAREL</span>
            </div>

            <a href="#choose-your-side" className={styles.jumpLink}>
              入口を選ぶ
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.gatewayStage} aria-label="車体とサイクルウェア">
            <div className={styles.gatewayBikePhoto}>
              <Image
                src="/images/posts/derosa-wheel-2026-07/idol-white.jpg"
                alt="De Rosa IDOLのロードバイク"
                fill
                priority
                sizes="(max-width: 900px) 88vw, 46vw"
                className={styles.gatewayBikeImage}
              />
            </div>
            <div className={styles.gatewayWearPhoto}>
              <Image
                src="/images/cyclewear/cyclewear-hero.jpg"
                alt="cycleZ店内のサイクルウェア"
                fill
                priority
                sizes="(max-width: 900px) 55vw, 25vw"
                className={styles.coverImage}
              />
            </div>
            <p className={styles.gatewayCaption}>RIDE / WEAR / LIVE</p>
          </div>
        </div>
      </section>

      <section id="choose-your-side" className={styles.gatewayChoiceSection} aria-labelledby="choose-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-select-reveal>
            <p>CHOOSE YOUR SIDE</p>
            <h2 id="choose-title">今日は、どちらを見る？</h2>
          </div>

          <div className={styles.choiceGrid}>
            {choices.map((choice) => (
              <Link key={choice.href} href={choice.href} className={styles.choiceCard} data-select-reveal>
                <div className={`${styles.choicePhoto} ${choice.imageMode === "contain" ? styles.choicePhotoContain : ""}`}>
                  <Image
                    src={choice.image}
                    alt={choice.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className={choice.imageMode === "contain" ? styles.containImage : styles.coverImage}
                  />
                  <span>{choice.label}</span>
                </div>
                <div className={styles.choiceContent}>
                  <p>{choice.label}</p>
                  <h3>{choice.title}</h3>
                  <span>{choice.text}</span>
                  <small>{choice.brands}</small>
                  <strong>
                    このセレクトを見る
                    <span aria-hidden="true">↗</span>
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gatewayStatement} aria-labelledby="gateway-statement-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-select-reveal>
            <p>WHY THE STORE</p>
            <h2 id="gateway-statement-title">来る理由は、<br />実物の中にある。</h2>
          </div>
          <div className={styles.gatewayReasonGrid}>
            {visitReasons.map((reason) => (
              <div key={reason.title} data-select-reveal>
                <strong>{reason.title}</strong>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="gateway-visit-title">
        <div className={styles.visitCard} data-select-reveal>
          <div className={styles.visitTitle}>
            <p>VISIT CYCLEZ</p>
            <h2 id="gateway-visit-title">まだ決まっていなくても、<br />見に来ていい。</h2>
            <span>車体とウェアを、一つの店で相談できます。</span>
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
