import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex items-center justify-between py-2.5 sm:py-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-amber-500 sm:h-10 sm:w-10">
              {BRAND.logoUrl ? (
                <Image
                  src={BRAND.logoUrl}
                  alt={BRAND.logoAlt ?? BRAND.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-950 font-semibold">
                  {BRAND.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
            </div>
            <div className="min-w-0 leading-tight">
              <div className="hidden text-sm text-slate-500 sm:block">
                Cơ Khí
              </div>
              <Link
                href="/"
                className="block truncate text-[1.05rem] font-semibold text-slate-950 hover:text-slate-700 sm:text-base"
              >
                {BRAND.name}
              </Link>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/du-an"
              className="text-sm font-medium text-slate-950 hover:text-slate-700"
            >
              Dự án
            </Link>
            <Link
              href="/san-pham"
              className="text-sm font-medium text-slate-950 hover:text-slate-700"
            >
              Sản phẩm
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-950 hover:text-slate-700"
            >
              Góc tư vấn
            </Link>
            <Link
              href="/gioi-thieu"
              className="text-sm font-medium text-slate-950 hover:text-slate-700"
            >
              Giới thiệu
            </Link>
            <Link
              href="/lien-he"
              className="text-sm font-medium text-slate-950 hover:text-slate-700"
            >
              Liên hệ
            </Link>
          </nav>

          <div className="ml-3 flex shrink-0 items-center gap-2 md:hidden">
            <Link
              href="/nhan-bao-gia"
              className="btn-primary whitespace-nowrap px-3 py-2.5 text-xs font-semibold"
            >
              Báo giá
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
