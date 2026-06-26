export type OrderStatus = "pending" | "approved" | "rejected";

export type Order = {
  id: string;
  name: string;
  email: string;
  gcash_number: string;
  receipt_url: string;
  status: OrderStatus;
  created_at: string;
};
