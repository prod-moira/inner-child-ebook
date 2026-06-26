import type { Metadata } from "next";
import { Roboto_Serif, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { headers } from "next/headers";

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
    icon: "/favicon.png"
  }
};

export default async function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${robotoSerif.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {!isAdmin && <Navbar />}
        {children}
      </body>
    </html>
  );
}