"use client";

import Link from "next/link";
import { EBOOK } from "@/lib/content";
import styles from "./Navbar.module.css";
import { User } from "lucide-react";

export default function Navbar() {
  const handleAuthorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we are on the homepage, scroll smoothly to the author section
    if (window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("author");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.title}>
          mkfmic
        </Link>
        <Link
          href="#author"
          className={styles.cta}
          onClick={handleAuthorClick}
        >
          <User/>
        </Link>
      </div>
    </header>
  );
}
