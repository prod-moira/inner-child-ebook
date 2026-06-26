import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Order } from "@/lib/types/order";
import styles from "../admin.module.css";
import OrdersTable from "./OrdersTable";
import LogoutButton from "./LogoutButton";

export default async function AdminOrdersPage() {
  const supabase = createSupabaseServerClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.errorMessage}>
            Failed to load orders. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Orders</h1>
            <p className={styles.subtitle}>
              Review and manage ebook purchase requests.
            </p>
          </div>
          <LogoutButton />
        </header>

        <OrdersTable initialOrders={(orders ?? []) as Order[]} />
      </div>
    </div>
  );
}
