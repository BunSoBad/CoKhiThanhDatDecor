"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CategoryLite } from "@/lib/data";

export default function CategoryDropdown({
  categories,
}: {
  categories: CategoryLite[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:border-amber-400 hover:text-slate-700"
      >
        Danh mục
        <span
          className={`transition-transform duration-200 ${open ? "-rotate-180" : "rotate-0"}`}
        >
          ▾
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-3 w-[360px] opacity-100 scale-100 transition duration-200 ease-out">
          <div className="soft-panel p-5">
            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                Danh mục sản phẩm
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-950">
                Chọn nhóm phù hợp với nhu cầu của bạn.
              </div>
              <div className="mt-1 text-sm leading-relaxed text-slate-500">
                Xem các loại cổng tự động, cổng thông minh và cổng decor nhanh
                chóng.
              </div>
            </div>

            <div className="grid gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/danh-muc/${c.slug}`}
                  className="rounded-3xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-950 transition hover:border-amber-400 hover:bg-amber-50"
                  onClick={() => setOpen(false)}
                >
                  <div>{c.nameVi}</div>
                  {c.description ? (
                    <div className="mt-1 text-xs leading-relaxed text-slate-500">
                      {c.description}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <Link
                href="/nhan-bao-gia"
                className="inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:opacity-90"
                onClick={() => setOpen(false)}
              >
                Báo giá nhanh
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
