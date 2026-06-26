"use client";

import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import styles from "../admin.module.css";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" className={styles.btnSecondary} onClick={handleLogout}>
      Log out
    </button>
  );
}
