import Link from "next/link";
import { EBOOK } from "@/lib/content";
import styles from "./Navbar.module.css";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.title}>
          mkfmic
        </Link>
        <Link href="#author" className={styles.cta}>
          <User/>
        </Link>
      </div>
    </header>
  );
}
