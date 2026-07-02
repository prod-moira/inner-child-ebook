export const EBOOK = {
  title: "My Kid Found my Inner Child",
  tagline: "Heal your past, nurture their future.",
  valueProposition:
    "Learn practical tools to heal old wounds, nurture self-compassion, and build a kinder relationship with yourself.",
  price: 250,
  currency: "₱",
  copyright: `© ${new Date().getFullYear()} Healing Your Inner Child. All rights reserved.`,
} as const;

export const WHATS_INSIDE = [
  {
    title: "Understanding Your Inner Child",
    description:
      "Discover what inner child work means and why it matters for your emotional well-being today.",
  },
  {
    title: "Identifying Old Wounds",
    description:
      "Learn to recognize patterns rooted in childhood experiences that still shape your reactions.",
  },
  {
    title: "Reparenting Techniques",
    description:
      "Practical exercises to give yourself the care, validation, and safety you may have missed.",
  },
  {
    title: "Setting Healthy Boundaries",
    description:
      "Build boundaries that protect your inner child while honoring your adult responsibilities.",
  },
  {
    title: "Daily Healing Practices",
    description:
      "Simple rituals and journaling prompts you can weave into everyday life.",
  },
  {
    title: "Moving Forward with Compassion",
    description:
      "Integrate your healing journey into relationships, work, and the life you want to build.",
  },
] as const;

export const AUTHOR = {
  name: "Boggs Burbos",
  bio: "Boggs 'Kuya Boggs' Burbos is a prominent Catholic lay preacher, leadership coach, and motivational speaker. He is most widely recognized for his extensive leadership within The Feast, a global prayer community established by the Light of Jesus Family.",
  facebook: "https://facebook.com/boggsburbos",
  instagram: "https://instagram.com/kuyaboggs",
  linkedin: "https://www.linkedin.com/in/boggs-burbos-7bb588213/",
  website: "https://feast.ph/leader/boggs-burbos/?__cf_chl_f_tk=8FEMS7Ak.erIjz9.Ot7F369AlcQp2kpycl_e1BhowmE-1782900058-1.0.1.1-lA3oKLoAaEVEvmtyiBuE19IqyB_f54KfCG3XDpEwoHM"
  
} as const;

export const TESTIMONIALS = [
  {
    name: "Ana R.",
    quote:
      "This ebook gave me language for feelings I'd carried for years. The exercises are gentle but genuinely transformative.",
  },
  {
    name: "James L.",
    quote:
      "I finally understand why I react the way I do. The reparenting section alone was worth every peso.",
  },
  {
    name: "Priya M.",
    quote:
      "Warm, clear, and never preachy. I keep coming back to the daily practices whenever life gets overwhelming.",
  },
] as const;

export const PRICING_INCLUDES = [
  "Full ebook in PDF & EPUB formats",
  "Complete access after purchase",
  "Read on phones, tablets, e-readers, and computers",
] as const;

export const FAQ_ITEMS = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept GCash/Bank Transfer payments. After filling out the order form, you'll receive payment instructions and can upload your receipt for verification.",
  },
  {
    question: "How will I receive the ebook?",
    answer:
      "Once your payment is confirmed, we'll email you a download link for the PDF and EPUB copies within 24 hours.",
  },
  {
    question: "How long does order approval take?",
    answer:
      "Orders are typically reviewed within 12-24 hours. You'll receive an email once your payment has been verified.",
  },
  {
    question: "Can I read this on my phone or tablet?",
    answer:
      "Yes. The ebook is delivered as a PDF/EPUB that works on any device — phone, tablet, e-reader, or computer.",
  },
] as const;
