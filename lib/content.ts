export const EBOOK = {
  title: "My Kid Found my Inner Child",
  tagline: "Heal your past, nurture their future.",
  valueProposition:
    "Learn practical tools to heal old wounds, nurture self-compassion, and build a kinder relationship with yourself.",
  price: 499,
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
  name: "Maria Santos",
  bio: "Maria is a licensed counselor with over a decade of experience helping adults reconnect with their inner child. Her work blends evidence-based therapy with compassionate, accessible guidance for everyday healing.",
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
  "Full ebook (PDF, instant delivery)",
  "Printable journaling worksheets",
  "Guided meditation audio companion",
  "Lifetime access to future updates",
] as const;

export const FAQ_ITEMS = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept GCash payments. After filling out the order form, you'll receive payment instructions and can upload your receipt for verification.",
  },
  {
    question: "How will I receive the ebook?",
    answer:
      "Once your payment is confirmed, we'll email you a download link for the PDF and any bonus materials within 24 hours.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Due to the digital nature of this product, all sales are final. If you experience any issues with your download, contact us and we'll make it right.",
  },
  {
    question: "How long does order approval take?",
    answer:
      "Orders are typically reviewed within 1–2 business days. You'll receive an email once your payment has been verified.",
  },
  {
    question: "Can I read this on my phone or tablet?",
    answer:
      "Yes. The ebook is delivered as a PDF that works on any device — phone, tablet, e-reader, or computer.",
  },
  {
    question: "Is this a substitute for therapy?",
    answer:
      "This ebook is a self-help resource and is not a replacement for professional mental health care. If you're in crisis, please reach out to a qualified provider.",
  },
] as const;
