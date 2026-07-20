"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./CyclewearLanding.module.css";

const bikeBrands = [
  {
    name: "macchi cycles",
    origin: "SHIGA / JAPAN",
    title: "乗る人から、一本のかたちが生まれる。",
    text: "体の寸法、走りたい道、好きな色。信楽の工房で、対話から仕立てるオーダークロモリです。",
    image: "/images/staff/nishii-bike-macchi.jpg",
    alt: "cycleZスタッフが乗るmacchi cyclesのオーダーフレーム",
    featured: true,
  },
  {
    name: "BISYA",
    origin: "JAPAN",
    title: "憧れを、走り出せる景色へ。",
    text: "カーボンロードを、まだ遠い存在のままにしない。乗り手の最初の一歩にまっすぐなブランドです。",
    image: "/images/brands/bisya-spirit.jpg",
    alt: "BISYAの名が刻まれたカーボンフレーム",
    featured: false,
  },
  {
    name: "ORBEA",
    origin: "BASQUE COUNTRY",
    title: "走り方まで、自分で選ぶ。",
    text: "速さだけで終わらない。色も、用途も、自分の感性へ引き寄せていく一台を。",
    image: "/images/posts/orbea-brand/hero.jpg",
    alt: "展示されたORBEAのロードバイク",
    featured: false,
  },
  {
    name: "SURLY",
    origin: "U.S.A.",
    title: "道を決めずに、走り出す。",
    text: "街から旅へ、舗装路からその先へ。使い込むほど、自分の暮らしに馴染んでいきます。",
    image: "/images/blog/surly-clubride-2026-06/loaded-touring.jpg",
    alt: "旅仕様に組まれたSURLYの自転車",
    featured: false,
  },
] as const;

const otherBikeBrands = [
  { name: "GIOS", origin: "ITALY" },
  { name: "BASSO", origin: "ITALY" },
  { name: "SCOTT", origin: "SWITZERLAND" },
  { name: "BOMA", origin: "JAPAN" },
  { name: "FELT", origin: "U.S.A." },
  { name: "CERVELO", origin: "CANADA" },
  { name: "CINELLI", origin: "ITALY" },
  { name: "Wilier", origin: "ITALY" },
  { name: "CYCLEHEART", origin: "JAPAN" },
  { name: "JAMIS", origin: "U.S.A." },
  { name: "Tyrell", origin: "JAPAN" },
] as const;

const experiencePoints = [
  { number: "01", title: "見る", text: "写真では伝わらない造形と色を、近くで。" },
  { number: "02", title: "またがる", text: "サイズ感や姿勢を、自分の身体で。" },
  { number: "03", title: "相談する", text: "在庫、試乗、取り寄せ、組み方まで。" },
] as const;

export function BikeSelectionLanding() {
  const pageRef = useScrollReveal<HTMLDivElement>(
    "[data-bike-reveal]",
    styles.motionReady,
    styles.visible,
  );

  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="bike-selection-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <p className={styles.heroWord} aria-hidden="true">RIDE</p>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>ROAD / GRAVEL / e-BIKE</p>
            <h1 id="bike-selection-title" className={styles.heroTitle}>
              <span>気になる一台を、</span>
              <span className={styles.heroAccent}>画面の外で。</span>
            </h1>
            <p className={styles.heroLead}>
              De Rosa、macchi cycles、BISYA、ORBEA、SURLY、MATE.BIKE。
              <br className="hidden sm:block" />
              名前ではなく、これからの走りから選ぶ。
            </p>

            <div className={styles.badges} aria-label="車体カテゴリー">
              <span>ROAD</span>
              <span>GRAVEL</span>
              <span>e-BIKE</span>
            </div>

            <a href="#bike-brands" className={styles.jumpLink}>
              6つの個性を見る
              <span aria-hidden="true">↓</span>
            </a>
            <Link href="/select" className={styles.gatewayLink}>
              車体・ウェアの入口へ
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.bikeHeroStage} aria-label="De Rosa IDOL">
            <div className={styles.bikeHeroHalo} aria-hidden="true" />
            <Image
              src="/images/posts/derosa-wheel-2026-07/idol-white.jpg"
              alt="De Rosa IDOLのロードバイク"
              fill
              priority
              loading="eager"
              sizes="(max-width: 900px) 100vw, 58vw"
              className={styles.bikeHeroImage}
            />
            <p className={styles.heroCaption}>FIND YOUR RIDE</p>
          </div>
        </div>
      </section>

      <section id="bike-brands" className={styles.brandFeatureSection} aria-labelledby="derosa-feature-title">
        <div className={styles.brandFeatureLayout}>
          <div className={styles.brandFeaturePhoto} data-bike-reveal>
            <Image
              src="/images/posts/derosa-wheel-2026-07/idol-white.jpg"
              alt="白と黒のDe Rosa IDOL"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
              className={styles.containImage}
            />
            <div className={styles.photoWipe} aria-hidden="true" />
          </div>
          <div className={styles.brandFeatureCopy} data-bike-reveal>
            <p>DE ROSA / ITALY</p>
            <h2 id="derosa-feature-title">美しさに惹かれ、<br />走りで好きになる。</h2>
            <span>
              ハートのマークと、フレームに残るイタリアの情熱。
              憧れを眺めるだけで終わらせず、自分の感覚で確かめる。
            </span>
          </div>
        </div>
      </section>

      <section className={styles.bikeBrandSection} aria-labelledby="bike-brand-grid-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-bike-reveal>
            <p>FIVE MORE WAYS TO RIDE</p>
            <h2 id="bike-brand-grid-title">同じ自転車でも、<br />見たい景色は違う。</h2>
          </div>

          <div className={styles.bikeBrandGrid}>
            {bikeBrands.map((brand) => (
              <article
                key={brand.name}
                className={`${styles.bikeBrandCard} ${brand.featured ? styles.macchiBrandCard : ""}`}
                data-bike-reveal
              >
                <div className={styles.bikeBrandPhoto}>
                  <Image
                    src={brand.image}
                    alt={brand.alt}
                    fill
                    sizes={brand.featured ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 760px) 100vw, 50vw"}
                    className={styles.coverImage}
                  />
                </div>
                <div className={styles.bikeBrandCopy}>
                  <p>{brand.origin}</p>
                  <h3>{brand.name}</h3>
                  <strong>{brand.title}</strong>
                  <span>{brand.text}</span>
                </div>
              </article>
            ))}

            <article className={`${styles.bikeBrandCard} ${styles.mateBrandCard}`} data-bike-reveal>
              <p className={styles.mateCardWord} aria-hidden="true">MATE</p>
              <div className={styles.mateCardMark} aria-hidden="true">M</div>
              <div className={styles.bikeBrandCopy}>
                <p>COPENHAGEN</p>
                <h3>MATE.BIKE</h3>
                <strong>街の移動を、スタイルに変える。</strong>
                <span>毎日の距離も、街での佇まいも。e-BIKEを道具だけで終わらせない選択です。</span>
                <small>展示・在庫状況は来店前にご確認ください。</small>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.bikeExperienceSection} aria-labelledby="bike-experience-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading} data-bike-reveal>
            <p>AT THE STORE</p>
            <h2 id="bike-experience-title">一台を知る順番。</h2>
          </div>
          <div className={styles.reasonGrid}>
            {experiencePoints.map((point) => (
              <article key={point.number} className={styles.reasonCard} data-bike-reveal>
                <div className={styles.reasonMeta}>
                  <span>{point.number}</span>
                  <span>{point.title}</span>
                </div>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.allBikeBrandsSection} aria-labelledby="all-bike-brands-title">
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeading} ${styles.allBikeBrandsHeading}`} data-bike-reveal>
            <p>OTHER BRANDS</p>
            <h2 id="all-bike-brands-title">ほかの選択肢も、<br />ここから探せる。</h2>
            <span>上で紹介した6ブランド以外にも、幅広い車体・フレームをご相談いただけます。</span>
          </div>

          <div className={styles.allBikeBrandsGrid}>
            {otherBikeBrands.map((brand) => (
              <article key={brand.name} className={styles.allBikeBrand} data-bike-reveal>
                <span>{brand.origin}</span>
                <h3>{brand.name}</h3>
              </article>
            ))}
          </div>

          <p className={styles.allBikeBrandsNote} data-bike-reveal>
            車種・サイズ・展示状況は時期により変わります。気になるブランドは来店前にご確認ください。
          </p>
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="bike-visit-title">
        <div className={styles.visitCard} data-bike-reveal>
          <div className={styles.visitTitle}>
            <p>VISIT CYCLEZ</p>
            <h2 id="bike-visit-title">気になる名前があれば、<br />実物の話をしよう。</h2>
            <span>展示、在庫、試乗できる車体は時期により変わります。</span>
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
              車体・試乗を電話で確認
              <span aria-hidden="true">↗</span>
            </a>
            <Link href="/select" className={styles.secondaryAction}>
              ウェア・小物を見る
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
