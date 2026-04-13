"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      type LoginResponse = { ok: boolean; error?: string };
      const data = (await res.json()) as Partial<LoginResponse>;

      if (!res.ok || data.ok !== true) {
        setError(data.error || "Mật khẩu không chính xác");
        return;
      }

      // Redirect to admin page after successful login
      router.push("/admin");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-950">Quản trị</div>
          <div className="mt-1 text-sm text-slate-500">
            Nhập mật khẩu để truy cập
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3">
            <div className="text-sm font-medium text-rose-700">{error}</div>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-950">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu admin"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 placeholder-slate-400 outline-none focus:border-amber-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-slate-950 hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-4 text-center">
          <Link href="/" className="text-sm text-amber-500 hover:underline">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
