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

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [receiptLoadingId, setReceiptLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function updateStatus(orderId: string, status: "approved" | "rejected") {
    setLoadingId(orderId);
    setActionError(null);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

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

      if (!response.ok) {
        throw new Error("Failed to load receipt");
      }

      const { url } = (await response.json()) as { url: string };
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setActionError("Failed to open receipt. Please try again.");
    } finally {
      setReceiptLoadingId(null);
    }
  }

  if (orders.length === 0) {
    return <p className={styles.emptyState}>No orders yet.</p>;
  }

  return (
    <>
      {actionError && <p className={styles.errorMessage}>{actionError}</p>}

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
              <th>Actions</th>
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
                    onClick={() => openReceipt(order.id)}
                    disabled={receiptLoadingId === order.id}
                  >
                    {receiptLoadingId === order.id ? "Opening…" : "View Receipt"}
                  </button>
                </td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>
                  <div className={styles.actions}>
                    {order.status === "pending" && (
                      <>
                        <button
                          type="button"
                          className={styles.btnApprove}
                          onClick={() => updateStatus(order.id, "approved")}
                          disabled={loadingId === order.id}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className={styles.btnReject}
                          onClick={() => updateStatus(order.id, "rejected")}
                          disabled={loadingId === order.id}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
