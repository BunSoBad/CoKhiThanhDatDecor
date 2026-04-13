"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductAdminRow } from "@/lib/data";

export function AdminProductsPanel({
  initialProducts,
}: {
  initialProducts: ProductAdminRow[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameVi, setNameVi] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(true);

  function resetForm() {
    setEditingId(null);
    setNameVi("");
    setSlug("");
    setSummary("");
    setDescription("");
    setHeroImageUrl("");
    setGalleryUrls([]);
    setIsFeatured(true);
    setError("");
  }

  function loadProduct(p: ProductAdminRow) {
    setEditingId(p.id);
    setNameVi(p.nameVi);
    setSlug(p.slug);
    setSummary(p.summary ?? "");
    setDescription(p.description ?? "");
    setHeroImageUrl(p.heroImageUrl ?? "");
    setGalleryUrls(p.galleryImageUrls ?? []);
    setIsFeatured(Boolean(p.isFeatured));
    setError("");
  }

  async function uploadOneFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
    });
    const data = (await res.json()) as {
      ok?: boolean;
      url?: string;
      error?: string;
    };
    if (!res.ok || !data.url) {
      throw new Error(data.error ?? "Upload thất bại");
    }
    return data.url;
  }

  async function uploadHero(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const url = await uploadOneFile(file);
      setHeroImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi upload");
    } finally {
      setLoading(false);
    }
  }

  async function uploadGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        uploaded.push(await uploadOneFile(file));
      }
      setGalleryUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi upload gallery");
    } finally {
      setLoading(false);
    }
  }

  function removeGalleryImage(url: string) {
    setGalleryUrls((prev) => prev.filter((u) => u !== url));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const body = {
      nameVi: nameVi.trim(),
      slug: slug.trim() || undefined,
      summary: summary.trim() || undefined,
      description: description.trim() || undefined,
      heroImageUrl: heroImageUrl.trim() || undefined,
      galleryImageUrls: galleryUrls,
      isFeatured,
    };

    try {
      const url = editingId
        ? `/api/admin/products/${editingId}`
        : "/api/admin/products";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Lưu thất bại");
        return;
      }
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi mạng");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Xóa sản phẩm này khỏi hệ thống?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Xóa thất bại");
        return;
      }
      if (editingId === id) resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi mạng");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-card rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-950">
          Quản lý sản phẩm (trang chủ: sản phẩm nổi bật)
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Nhập thông tin và ảnh, bấm thêm hoặc cập nhật — dữ liệu lưu vào cơ sở
          dữ liệu. Bật &quot;Hiển thị nổi bật&quot; để xuất hiện ở khối sản phẩm
          nổi bật trên trang chủ.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="border-b border-slate-100 px-5 py-5 space-y-4"
      >
        {error ? (
          <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800">
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold text-slate-600">
              Tên sản phẩm <span className="text-rose-600">*</span>
            </span>
            <input
              required
              value={nameVi}
              onChange={(e) => setNameVi(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Ví dụ: Cổng trượt tự động"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">
              Slug (URL, để trống tự tạo)
            </span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
              placeholder="cong-truot-tu-dong"
            />
          </label>
          <label className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-sm font-medium text-slate-800">
              Hiển thị ở mục sản phẩm nổi bật (trang chủ)
            </span>
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-slate-600">
            Tóm tắt ngắn
          </span>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-600">
            Mô tả chi tiết
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </label>

        <div>
          <span className="text-xs font-semibold text-slate-600">
            Ảnh đại diện
          </span>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadHero}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={loading}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-50"
            >
              Tải ảnh lên
            </button>
            <input
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              className="min-w-[12rem] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
              placeholder="/img/uploads/... hoặc URL ảnh"
            />
          </div>
          {heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImageUrl}
              alt=""
              className="mt-2 h-24 w-40 rounded-lg border border-slate-200 object-cover"
            />
          ) : null}
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-600">
            Ảnh gallery
          </span>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <input
              ref={galleryFileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={uploadGallery}
            />
            <button
              type="button"
              onClick={() => galleryFileRef.current?.click()}
              disabled={loading}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-50"
            >
              Tải nhiều ảnh gallery
            </button>
            <span className="text-xs text-slate-500">
              Đã có: {galleryUrls.length} ảnh
            </span>
          </div>
          {galleryUrls.length > 0 ? (
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {galleryUrls.map((url) => (
                <div key={url} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="h-16 w-full rounded-md border border-slate-200 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(url)}
                    className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow hover:bg-amber-700 disabled:opacity-50"
          >
            {editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Hủy sửa
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50/90 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Ảnh</th>
              <th className="px-4 py-3 font-semibold">Tên</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Nổi bật</th>
              <th className="px-4 py-3 font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {initialProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-sm text-slate-500">
                  Chưa có sản phẩm trong cơ sở dữ liệu. Thêm mới ở form phía
                  trên.
                </td>
              </tr>
            ) : (
              initialProducts.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-2">
                    {p.heroImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.heroImageUrl}
                        alt=""
                        className="h-12 w-16 rounded object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-800">
                    {p.nameVi}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-500">
                    {p.slug}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {p.isFeatured ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">
                        Có
                      </span>
                    ) : (
                      <span className="text-slate-400">Không</span>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => loadProduct(p)}
                      className="mr-2 text-xs font-semibold text-sky-700 hover:underline"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      disabled={loading}
                      className="text-xs font-semibold text-rose-700 hover:underline disabled:opacity-50"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
