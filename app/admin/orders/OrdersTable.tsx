"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/lib/types/order";
import styles from "../admin.module.css";

type OrdersTableProps = {
  initialOrders: Order[];
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const className =
    status === "pending"
      ? styles.badgePending
      : status === "approved"
        ? styles.badgeApproved
        : styles.badgeRejected;

  return <span className={className}>{status}</span>;
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

function OrderTable({
  orders,
  showActions,
  loadingId,
  receiptLoadingId,
  onUpdateStatus,
  onOpenReceipt,
}: {
  orders: Order[];
  showActions: boolean;
  loadingId: string | null;
  receiptLoadingId: string | null;
  onUpdateStatus: (id: string, status: "approved" | "rejected") => void;
  onOpenReceipt: (id: string) => void;
}) {
  if (orders.length === 0) {
    return <p className={styles.emptyState}>No orders here.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>GCash Number</th>
            <th>Date</th>
            <th>Receipt</th>
            <th>Status</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.gcash_number}</td>
              <td className={styles.dateCell}>{formatDate(order.created_at)}</td>
              <td>
                <button
                  type="button"
                  className={styles.receiptLink}
                  onClick={() => onOpenReceipt(order.id)}
                  disabled={receiptLoadingId === order.id}
                >
                  {receiptLoadingId === order.id ? "Opening…" : "View Receipt"}
                </button>
              </td>
              <td>
                <StatusBadge status={order.status} />
              </td>
              {showActions && (
                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.btnApprove}
                      onClick={() => onUpdateStatus(order.id, "approved")}
                      disabled={loadingId === order.id}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className={styles.btnReject}
                      onClick={() => onUpdateStatus(order.id, "rejected")}
                      disabled={loadingId === order.id}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [receiptLoadingId, setReceiptLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const pending = orders.filter((o) => o.status === "pending");
  const approved = orders.filter((o) => o.status === "approved");
  const rejected = orders.filter((o) => o.status === "rejected");

  async function updateStatus(orderId: string, status: "approved" | "rejected") {
    setLoadingId(orderId);
    setActionError(null);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update order");
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch {
      setActionError("Failed to update order. Please try again.");
    } finally {
      setLoadingId(null);
    }
  }

  async function openReceipt(orderId: string) {
    setReceiptLoadingId(orderId);
    setActionError(null);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/receipt`);
      if (!response.ok) throw new Error("Failed to load receipt");
      const { url } = (await response.json()) as { url: string };
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setActionError("Failed to open receipt. Please try again.");
    } finally {
      setReceiptLoadingId(null);
    }
  }

  return (
    <>
      {actionError && <p className={styles.errorMessage}>{actionError}</p>}

      <section className={styles.tableSection}>
        <h2 className={styles.tableSectionTitle}>
          Pending <span className={styles.tableCount}>{pending.length}</span>
        </h2>
        <OrderTable
          orders={pending}
          showActions={true}
          loadingId={loadingId}
          receiptLoadingId={receiptLoadingId}
          onUpdateStatus={updateStatus}
          onOpenReceipt={openReceipt}
        />
      </section>

      <section className={styles.tableSection}>
        <h2 className={styles.tableSectionTitle}>
          Approved <span className={styles.tableCount}>{approved.length}</span>
        </h2>
        <OrderTable
          orders={approved}
          showActions={false}
          loadingId={loadingId}
          receiptLoadingId={receiptLoadingId}
          onUpdateStatus={updateStatus}
          onOpenReceipt={openReceipt}
        />
      </section>

      <section className={styles.tableSection}>
        <h2 className={styles.tableSectionTitle}>
          Rejected <span className={styles.tableCount}>{rejected.length}</span>
        </h2>
        <OrderTable
          orders={rejected}
          showActions={false}
          loadingId={loadingId}
          receiptLoadingId={receiptLoadingId}
          onUpdateStatus={updateStatus}
          onOpenReceipt={openReceipt}
        />
      </section>
    </>
  );
}