import Link from "next/link";
import { Suspense } from "react";
import styles from "./home.module.css";
import FaqAccordion from "@/components/FaqAccordion";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";
import {
  EBOOK,
  WHATS_INSIDE,
  AUTHOR,
  TESTIMONIALS,
  PRICING_INCLUDES,
  FAQ_ITEMS,
} from "@/lib/content";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
        <div className={styles.heroCoverWrapper}>
          <div className={styles.heroBlobPink} />
          <div className={styles.heroBlobTeal} />
        <Image
          src="/assets/finalcover.png"
          alt={EBOOK.title}
          width={280}
          height={400}
          className={styles.heroCover}
          priority
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 35vw, 220px"
        />
        </div>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroHighlight}>Heal your <i>past</i>, nurture their <span style={{ borderBottom: "2px solid #1D535F" }}>future</span>.</span>
            </h1>
            <p className={styles.heroSubtitle}>{EBOOK.valueProposition}</p>
            <Link href="/order" className={styles.btnPrimary}>
              Avail Now
            </Link>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn>
            <p className={styles.sectionLabel}>What&apos;s Inside</p>
            <h2 className={styles.sectionTitle}>Everything you need to begin healing</h2>
          </FadeIn>
          <div className={styles.cardsGrid}>
            {WHATS_INSIDE.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 100}>
                <article className={styles.card}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
        <div id="author"></div>
      </section>

      {/* About the Author */}
      <section className={styles.sectionMuted}>
        <div className={styles.container}>
          <div className={styles.authorLayout}>
            <FadeIn direction="left" className={styles.authorTextBlock}>
              <p className={styles.sectionLabel}>author</p>
              <h2 className={styles.authorName}>{AUTHOR.name}</h2>
              <p className={styles.authorBio}>{AUTHOR.bio}</p>
            </FadeIn>

            <FadeIn direction="right" className={styles.authorImageBlock}>
              <div className={styles.authorImageWrapper}>
                <div className={styles.authorBlobGrey1} />
                <div className={styles.authorBlobGrey2} />
                <Image
                  src="/assets/author.png"
                  alt={AUTHOR.name}
                  fill
                  className={styles.authorImage}
                />
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={200} className={styles.authorSocials}>
              <a href={AUTHOR.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.authorSocialLink}>
                <FaFacebook className={styles.authorSocialIcon} />
              </a>
              <a href={AUTHOR.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.authorSocialLink}>
                <FaInstagram className={styles.authorSocialIcon} />
              </a>
              <a href={AUTHOR.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className={styles.authorSocialLink}>
                <FaLink className={styles.authorSocialIcon} />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn>
            <p className={styles.sectionLabel}>Testimonials</p>
            <h2 className={styles.sectionTitle}>What readers are saying</h2>
          </FadeIn>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((testimonial, i) => (
              <FadeIn key={testimonial.name} direction="up" delay={i * 120}>
                <blockquote className={styles.testimonialCard}>
                  <p className={styles.testimonialQuote}>&ldquo;{testimonial.quote}&rdquo;</p>
                  <footer className={styles.testimonialName}>— {testimonial.name}</footer>
                </blockquote>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    {/* Pricing */}
    <section className={styles.sectionMuted}>
      <div className={styles.container}>
        <FadeIn>
          <p className={styles.sectionLabel}>Pricing</p>
          <h2 className={styles.sectionTitle}>Start your healing journey</h2>
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <div className={styles.pricingLayout}>
            <div className={styles.pricingImageWrapper}>
              <Image
                src="/assets/books.png"
                alt="My Kid Found my Inner Child ebook"
                width={400}
                height={400}
                className={styles.pricingImage}
              />
            </div>
            <div className={styles.pricingCard}>
              <p className={styles.priceAmount}>{EBOOK.currency}{EBOOK.price}</p>
              <p className={styles.priceLabel}>One-time purchase</p>
              <ul className={styles.includesList}>
                {PRICING_INCLUDES.map((item) => (
                  <li key={item} className={styles.includesItem}>{item}</li>
                ))}
              </ul>
              <Link href="/order" className={styles.btnPrimary}>Avail Now</Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn>
            <p className={styles.sectionLabel}>FAQ</p>
            <h2 className={styles.sectionTitle}>Common questions</h2>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <FaqAccordion items={FAQ_ITEMS} />
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <FadeIn>
        <footer className={styles.footer}>
          <p className={styles.footerTitle}>{EBOOK.title}</p>
          {/* <p className={styles.footerTagline}>{EBOOK.tagline}</p> */}
          <p className={styles.footerCopyright}>{EBOOK.copyright}</p>
        </footer>
      </FadeIn>

      <Suspense fallback={null}>
        <OrderSuccessModal />
      </Suspense>
    </div>
  );
}
