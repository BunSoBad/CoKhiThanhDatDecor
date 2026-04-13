"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CategoryLite } from "@/lib/data";
import { BRAND } from "@/lib/brand";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/du-an", label: "Dự án" },
  { href: "/blog", label: "Góc tư vấn" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/danh-muc", label: "Tất cả danh mục" },
] as const;

export function MobileMenu({ categories }: { categories: CategoryLite[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label="Mở menu điều hướng"
        className="relative z-[70] inline-flex h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-slate-800 shadow-sm transition hover:border-amber-400 active:scale-[0.98] md:hidden"
      >
        <span className="sr-only">Menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[120] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu-panel"
            className="mobile-menu-panel absolute right-0 top-0 flex h-full w-[min(100vw-1.5rem,20rem)] flex-col border-l border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <div className="text-sm font-semibold text-slate-950">Menu</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Đóng"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
              <div className="rounded-2xl bg-slate-50 px-3 py-3 text-xs text-slate-600">
                <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`} className="block font-medium text-slate-900">
                  {BRAND.phone}
                </a>
                <a href={`mailto:${BRAND.email}`} className="mt-1 block text-amber-800">
                  {BRAND.email}
                </a>
                <p className="mt-2 leading-relaxed text-slate-500">{BRAND.address}</p>
              </div>

              <nav className="mt-4 flex flex-col gap-1" aria-label="Điều hướng chính">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-50 active:bg-amber-100/80"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {categories.length > 0 ? (
                <div className="mt-6">
                  <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Danh mục sản phẩm
                  </div>
                  <ul className="mt-2 space-y-1">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/danh-muc/${c.slug}`}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-3 py-2.5 text-sm text-slate-800 transition hover:bg-slate-100"
                        >
                          {c.nameVi}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Link
                href="/nhan-bao-gia"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 flex w-full justify-center py-3 text-sm font-semibold"
              >
                Nhận báo giá
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
