import Link from "next/link";
import { EBOOK } from "@/lib/content";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.title}>
          {EBOOK.title}
        </Link>
        <Link href="/order" className={styles.cta}>
          About the Author
        </Link>
      </div>
    </header>
  );
}
