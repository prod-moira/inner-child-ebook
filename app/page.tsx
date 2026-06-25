import Link from "next/link";
import { Suspense } from "react";
import styles from "./home.module.css";
import FaqAccordion from "@/components/FaqAccordion";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import Image from "next/image";
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
          <Image
            src="/assets/bookcover.jpg"
            alt={EBOOK.title}
            width={280}
            height={400}
            className={styles.heroCover}
            priority
          />
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroHighlight}>{EBOOK.title}</span>
            </h1>
            <p className={styles.heroSubtitle}>{EBOOK.valueProposition}</p>
            <Link href="/order" className={styles.btnPrimary}>
              Buy Now
            </Link>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>What&apos;s Inside</p>
          <h2 className={styles.sectionTitle}>
            Everything you need to begin healing
          </h2>
          <div className={styles.cardsGrid}>
            {WHATS_INSIDE.map((item) => (
              <article key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className={styles.sectionMuted}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>About the Author</p>
          <div className={styles.authorLayout}>
            <div className={styles.avatar} aria-hidden="true">
              {AUTHOR.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className={styles.authorName}>{AUTHOR.name}</h2>
              <p className={styles.authorBio}>{AUTHOR.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Testimonials</p>
          <h2 className={styles.sectionTitle}>What readers are saying</h2>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className={styles.testimonialCard}
              >
                <p className={styles.testimonialQuote}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className={styles.testimonialName}>
                  — {testimonial.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.sectionMuted}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Pricing</p>
          <h2 className={styles.sectionTitle}>Start your healing journey</h2>
          <div className={styles.pricingCard}>
            <p className={styles.priceAmount}>
              {EBOOK.currency}
              {EBOOK.price}
            </p>
            <p className={styles.priceLabel}>One-time purchase</p>
            <ul className={styles.includesList}>
              {PRICING_INCLUDES.map((item) => (
                <li key={item} className={styles.includesItem}>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/order" className={styles.btnPrimary}>
              Buy Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>FAQ</p>
          <h2 className={styles.sectionTitle}>Common questions</h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerTitle}>{EBOOK.title}</p>
        <p className={styles.footerTagline}>{EBOOK.tagline}</p>
        <p className={styles.footerCopyright}>{EBOOK.copyright}</p>
      </footer>

      <Suspense fallback={null}>
        <OrderSuccessModal />
      </Suspense>
    </div>
  );
}
