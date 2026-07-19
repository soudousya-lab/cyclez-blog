"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./DerosaEventLanding.module.css";

const eventPoints = [
  {
    number: "01",
    title: "De Rosa IDOLを試す",
    text: "弓なりのラインが印象的な、De Rosaを象徴するカーボンロード。見た目だけでなく、乗り味まで確かめられます。",
  },
  {
    number: "02",
    title: "自分の車体でホイールを試す",
    text: "DT Swiss・T-Formula・bidealを持ち込み車体に装着。いつものバイクだから、違いが分かります。",
  },
  {
    number: "03",
    title: "気になる車体を乗り比べる",
    text: "ORBEA・SCOTT・GIOSの試乗車も用意。同じ日に、走りの違いを比べられます。",
  },
] as const;

const wheels = [
  {
    name: "DT Swiss",
    model: "ARC 1100 DICUT 65",
    note: "最新のエアロホイールを実走で。",
  },
  {
    name: "T-Formula",
    model: "HAND BUILT WHEEL",
    note: "使い方に合わせる手組みホイール。代表に直接相談できる予定です。",
  },
  {
    name: "bideal",
    model: "CARBON WHEEL",
    note: "GIOSの代理店が扱うオリジナルホイール。",
  },
] as const;

const testBikes = [
  "ORBEA ORCA M30",
  "SCOTT Addict 40",
  "SCOTT Addict RC 20",
  "GIOS AERO LITE GEN5",
  "GIOS AIRONE DISC",
] as const;

export function DerosaEventLanding() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const targets = page.querySelectorAll<HTMLElement>("[data-event-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add(styles.visible));
      return;
    }

    page.classList.add(styles.motionReady);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="derosa-event-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <p className={styles.heroWord} aria-hidden="true">IDOL</p>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>DE ROSA × WHEEL TEST RIDE</p>
            <h1 id="derosa-event-title" className={styles.heroTitle}>
              <span>De Rosa IDOLに、</span>
              <span>岡山で乗る。</span>
            </h1>
            <p className={styles.heroLead}>
              De Rosaの試乗会は、そう何度もありません。
              <br className="hidden sm:block" />
              見て、またがって、走って確かめる3日間です。
            </p>

            <div className={styles.dateBlock}>
              <p className={styles.date}>7.18 <span>SAT</span> — 7.20 <span>MON</span></p>
              <p className={styles.time}>2026 / 11:00—19:00</p>
            </div>

            <div className={styles.badges} aria-label="イベント条件">
              <span>参加無料</span>
              <span>予約不要</span>
              <span>cycleZ 店頭</span>
            </div>

            <a href="#event-points" className={styles.jumpLink}>
              できることを30秒で見る
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.bikeStage} aria-label="De Rosa IDOL">
            <div className={styles.bikeHalo} aria-hidden="true" />
            <Image
              src="/images/posts/derosa-wheel-2026-07/idol-white.jpg"
              alt="De Rosa IDOL ホワイト"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
              className={styles.bikeImage}
            />
            <p className={styles.bikeCaption}>DE ROSA / NEW IDOL</p>
          </div>
        </div>
      </section>

      <section id="event-points" className={styles.pointsSection} aria-labelledby="event-points-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-event-reveal>
            <p>WHAT YOU CAN TRY</p>
            <h2 id="event-points-title">試せることは、3つ。</h2>
          </div>

          <div className={styles.pointGrid}>
            {eventPoints.map((point) => (
              <article key={point.number} className={styles.pointCard} data-event-reveal>
                <p className={styles.pointNumber}>{point.number}</p>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.voiceSection} aria-labelledby="first-day-voice">
        <div className={styles.voiceInner} data-event-reveal>
          <div className={styles.voiceLabel}>
            <span>DAY 1</span>
            <span>FROM KAGAWA</span>
          </div>
          <div>
            <h2 id="first-day-voice">「触れる機会がない」から、香川から。</h2>
            <p>
              初日は、De Rosaを目当てに香川から30代の方が来店。
              弓形のデザインに惹かれていたIDOLを実際に試し、価格の近いORBEAと比べても
              「それでもIDOLが気になる」と話されていました。
            </p>
          </div>
        </div>
      </section>

      <section className={styles.wheelSection} aria-labelledby="wheel-title">
        <div className={styles.wheelLayout}>
          <div className={styles.wheelPhoto} data-event-reveal>
            <Image
              src="/images/wp/2026-03-wheeltestrideevent.jpg"
              alt="cycleZ店頭に並ぶ試乗用ホイール"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className="object-cover"
            />
            <div className={styles.photoWipe} aria-hidden="true" />
          </div>

          <div className={styles.wheelCopy}>
            <div className={styles.sectionHeading} data-event-reveal>
              <p>WHEEL TEST</p>
              <h2 id="wheel-title">ホイールは、あなたの車体で。</h2>
              <span>
                いつものバイクに取り付けて走るから、加速・巡航・乗り心地の違いを確かめやすくなります。
              </span>
            </div>

            <div className={styles.wheelList}>
              {wheels.map((wheel) => (
                <article key={wheel.name} className={styles.wheelItem} data-event-reveal>
                  <div>
                    <h3>{wheel.name}</h3>
                    <p className={styles.wheelModel}>{wheel.model}</p>
                  </div>
                  <p>{wheel.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bikesSection} aria-labelledby="other-bikes-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-event-reveal>
            <p>MORE TEST BIKES</p>
            <h2 id="other-bikes-title">ほかの試乗車も、一度に。</h2>
          </div>
          <div className={styles.bikeList} data-event-reveal>
            {testBikes.map((bike) => (
              <span key={bike}>{bike}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.prepareSection} aria-labelledby="prepare-title">
        <div className={styles.prepareLayout}>
          <div className={styles.sectionHeading} data-event-reveal>
            <p>BEFORE YOU COME</p>
            <h2 id="prepare-title">持ってくるもの。</h2>
          </div>
          <div className={styles.prepareList}>
            <div data-event-reveal>
              <span>ホイールを試すなら</span>
              <strong>ご自分の自転車</strong>
              <p>店頭で試乗ホイールを取り付けます。</p>
            </div>
            <div data-event-reveal>
              <span>車体を試すなら</span>
              <strong>ヘルメット・ペダル・グローブ</strong>
              <p>なくてもフラットペダルで試乗できます。</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.detailsSection} aria-labelledby="event-details-title">
        <div className={styles.detailsCard} data-event-reveal>
          <div className={styles.detailsTitle}>
            <p>EVENT INFO</p>
            <h2 id="event-details-title">De Rosa ＆ ホイールブランド大試乗会</h2>
          </div>

          <dl className={styles.detailsList}>
            <div>
              <dt>DATE</dt>
              <dd>7月18日（土）・19日（日）・20日（月・祝）</dd>
            </div>
            <div>
              <dt>TIME</dt>
              <dd>11:00〜19:00</dd>
            </div>
            <div>
              <dt>PLACE</dt>
              <dd>cycleZ / 岡山市北区島田本町1-1-47</dd>
            </div>
            <div>
              <dt>ENTRY</dt>
              <dd>無料・予約不要</dd>
            </div>
          </dl>

          <div className={styles.extendedNote}>
            <span>AFTER THE EVENT</span>
            <p>De Rosa IDOLのみ、7月31日まで試乗できます。</p>
          </div>

          <Link href="/access" className={styles.accessLink}>
            アクセス・駐車場を確認する
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
