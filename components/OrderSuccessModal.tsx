"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/home.module.css";

export default function OrderSuccessModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  const isOpen = searchParams.get("ordered") === "true" && !dismissed;

  function handleClose() {
    setDismissed(true);
    router.replace("/", { scroll: false });
  }

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <h2 id="order-modal-title" className={styles.modalTitle}>
          Order received
        </h2>
        <p className={styles.modalText}>
          Your order is pending approval — we&apos;ll email you once it&apos;s
          confirmed.
        </p>
        <button type="button" className={styles.modalClose} onClick={handleClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
