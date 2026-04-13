"use client";

import { useState } from "react";

type AdminActionsProps = {
  id: string;
  currentStatus: string;
  onAction?: () => void;
};

export function AdminQuoteActions({
  id,
  currentStatus,
  onAction,
}: AdminActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!confirm("Xác nhận xóa yêu cầu này?")) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Xóa thất bại");
        return;
      }

      // Reload page to refresh data
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Cập nhật thất bại");
        return;
      }

      // Reload page to refresh data
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <div className="text-xs text-red-500">{error}</div>}

      <div className="flex gap-1 flex-wrap">
        {["NEW", "CONTACTED", "WON", "LOST"].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={loading}
            className={`px-2 py-1 text-xs font-medium rounded border transition ${
              currentStatus === status
                ? "bg-amber-500 border-amber-500 text-slate-950"
                : "border-slate-300 bg-white text-slate-700 hover:border-amber-400"
            } disabled:opacity-50`}
          >
            {status === "NEW"
              ? "Mới"
              : status === "CONTACTED"
                ? "Liên hệ"
                : status === "WON"
                  ? "Thành công"
                  : "Thất bại"}
          </button>
        ))}
      </div>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 text-xs font-medium rounded bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:opacity-50"
      >
        Xóa
      </button>
    </div>
  );
}
