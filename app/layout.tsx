import type { Metadata } from "next";
import { Roboto_Serif, Inter } from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "My Kid Found my Inner Child — Ebook",
    description:
      "A gentle guide to reconnecting with your inner child and building lasting emotional healing.",
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
    title: "My Kid Found my Inner Child",
    description: "A gentle guide to reconnecting with your inner child and building lasting emotional healing.",
    type: "website",
    url: "https://mkfmic.vercel.app",
    images: [
      {
        url: "https://mkfmic.vercel.app/assets/opengraphimg.png",
        width: 1200,
        height: 630,
        alt: "My Kid Found my Inner Child — Ebook",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
