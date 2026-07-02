import { z } from "zod";

export const GCASH_NUMBER = "0956 249 5090";

export const customerDetailsSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .refine(
      (value) => value.trim().split(/\s+/).filter(Boolean).length >= 2,
      "Please enter your full name (first and last)"
    )
    .refine(
      (value) => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim()),
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  gcashNumber: z
    .string()
    .min(1, "GCash number is required")
    .regex(
      /^09\d{9}$/,
      "GCash number must start with 09 and be exactly 11 digits"
    ),
});

export type CustomerDetails = z.infer<typeof customerDetailsSchema>;

export const receiptSchema = z
  .instanceof(File, { message: "Receipt image is required" })
  .refine(
    (file) => file.type.startsWith("image/"),
    "Receipt must be an image file"
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "Receipt image must be 5 MB or smaller"
  );
