"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./order.module.css";
import {
  customerDetailsSchema,
  receiptSchema,
  GCASH_NUMBER,
  type CustomerDetails,
} from "@/lib/validation";
import { EBOOK } from "@/lib/content";

type FormErrors = Partial<Record<keyof CustomerDetails | "receipt", string>>;

export default function OrderForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: "",
    email: "",
    gcashNumber: "",
  });
  const [receipt, setReceipt] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleDetailsChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleDetailsSubmit(e: FormEvent) {
    e.preventDefault();
    const result = customerDetailsSchema.safeParse(customerDetails);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CustomerDetails;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStep(2);
  }

  function handleReceiptChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setReceipt(file);
    if (errors.receipt) {
      setErrors((prev) => ({ ...prev, receipt: undefined }));
    }
  }

  async function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!receipt) {
      setErrors({ receipt: "Receipt image is required" });
      return;
    }

    const receiptResult = receiptSchema.safeParse(receipt);
    if (!receiptResult.success) {
      setErrors({ receipt: receiptResult.error.issues[0].message });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", customerDetails.fullName);
      formData.append("email", customerDetails.email);
      formData.append("gcashNumber", customerDetails.gcashNumber);
      formData.append("receipt", receipt);

      const response = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      router.push("/?ordered=true");
    } catch {
      setSubmitError(
        "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>For the child within</h1>
          <p className={styles.subtitle}>
            Your copy will be ready to download after checkout.
          </p>
        </header>

        <div className={styles.steps}>
          <div className={step === 1 ? styles.stepActive : styles.step}>
            <span
              className={
                step === 1 ? styles.stepNumberActive : styles.stepNumber
              }
            >
              1
            </span>
            Your details
          </div>
          <div className={styles.stepDivider} />
          <div className={step === 2 ? styles.stepActive : styles.step}>
            <span
              className={
                step === 2 ? styles.stepNumberActive : styles.stepNumber
              }
            >
              2
            </span>
            Payment
          </div>
        </div>

        {step === 1 ? (
          <div className={styles.formCard}>
            <form onSubmit={handleDetailsSubmit} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="fullName" className={styles.label}>
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  className={
                    errors.fullName ? styles.inputError : styles.input
                  }
                  value={customerDetails.fullName}
                  onChange={handleDetailsChange}
                  placeholder="Juan Dela Cruz"
                />
                {errors.fullName && (
                  <p className={styles.errorMessage}>{errors.fullName}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={errors.email ? styles.inputError : styles.input}
                  value={customerDetails.email}
                  onChange={handleDetailsChange}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className={styles.errorMessage}>{errors.email}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="gcashNumber" className={styles.label}>
                  GCash Number
                </label>
                <input
                  id="gcashNumber"
                  name="gcashNumber"
                  type="tel"
                  inputMode="numeric"
                  className={
                    errors.gcashNumber ? styles.inputError : styles.input
                  }
                  value={customerDetails.gcashNumber}
                  onChange={handleDetailsChange}
                  placeholder="09171234567"
                  maxLength={11}
                />
                {errors.gcashNumber && (
                  <p className={styles.errorMessage}>{errors.gcashNumber}</p>
                )}
              </div>

              <button type="submit" className={styles.btnPrimary}>
                Continue to Payment
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.formCard}>
            <form onSubmit={handlePlaceOrder} noValidate>
              <div className={styles.paymentSection}>
                <div className={styles.qrWrapper}>
                  <Image
                    src="/gcash-qr.svg"
                    alt="GCash QR code placeholder"
                    width={192}
                    height={192}
                    className={styles.qrImage}
                  />
                </div>
                <p className={styles.gcashNumber}>{GCASH_NUMBER}</p>
                <p className={styles.gcashLabel}>
                  Send {EBOOK.currency}
                  {EBOOK.price} to this GCash number, then upload your receipt
                  below.
                </p>
              </div>

              <div className={styles.fileInputWrapper}>
                <label htmlFor="receipt" className={styles.label}>
                  Upload Receipt
                </label>
                <input
                  id="receipt"
                  name="receipt"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleReceiptChange}
                />
                {errors.receipt && (
                  <p className={styles.errorMessage}>{errors.receipt}</p>
                )}
              </div>

              {submitError && (
                <p className={styles.submitError}>{submitError}</p>
              )}

              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order…" : "Place Order"}
              </button>

              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Back to Details
              </button>
            </form>
          </div>
        )}

        <Link href="/" className={styles.backLink}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
