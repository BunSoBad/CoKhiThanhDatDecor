import Image from "next/image";
import Link from "next/link";
import { getActiveCategories } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import CategoryDropdown from "@/components/CategoryDropdown";
import { MobileMenu } from "@/components/MobileMenu";

export default async function SiteHeader() {
  const categories = await getActiveCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-amber-500">
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
            <div className="leading-tight">
              <div className="text-sm text-slate-500">Cơ Khí</div>
              <Link
                href="/"
                className="block text-base font-semibold text-slate-950 hover:text-slate-700"
              >
                {BRAND.name}
              </Link>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <CategoryDropdown categories={categories} />

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

          <div className="flex items-center gap-2 md:hidden">
            <MobileMenu categories={categories} />
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
