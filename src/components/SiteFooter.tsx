import Link from "next/link";
import { getActiveCategories } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export default async function SiteFooter() {
  const categories = await getActiveCategories();

  return (
    <footer className="border-t border-slate-900/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="text-base font-semibold text-white">
              {BRAND.name}
            </div>
            <div className="mt-4 text-sm text-slate-300 leading-relaxed">
              Thiết kế, gia công và thi công cổng cửa theo nhu cầu thực tế. Nhận
              tư vấn và báo giá nhanh.
            </div>
            <Link
              href="/nhan-bao-gia"
              className="mt-5 inline-flex items-center btn-primary px-3 py-2.5 text-sm font-semibold"
            >
              Nhận báo giá
            </Link>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-100">Danh mục</div>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/danh-muc/${c.slug}`}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {c.nameVi}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-100">
              Thông tin
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/du-an"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Dự án tiêu biểu
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Góc tư vấn
                </Link>
              </li>
              <li>
                <Link
                  href="/gioi-thieu"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-100">Liên hệ</div>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <div>
                <span className="font-medium text-slate-100">SĐT:</span>{" "}
                <a
                  href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                  className="text-amber-200/95 underline-offset-2 transition-colors hover:text-amber-100 hover:underline"
                >
                  {BRAND.phone}
                </a>
              </div>
              <div>
                <span className="font-medium text-slate-100">Email:</span>{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-amber-200/95 underline-offset-2 transition-colors hover:text-amber-100 hover:underline"
                >
                  {BRAND.email}
                </a>
              </div>
              <div>
                <span className="font-medium text-slate-100">Địa chỉ:</span>{" "}
                {BRAND.address}
              </div>
              {BRAND.facebookUrl ? (
                <div>
                  <span className="font-medium text-slate-100">Facebook:</span>{" "}
                  <a
                    href={BRAND.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-200/95 underline-offset-2 transition-colors hover:text-amber-100 hover:underline"
                  >
                    Fanpage
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-600/50 pt-6 text-xs text-slate-300 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link
              href="/gioi-thieu"
              className="text-slate-300 transition-colors duration-200 hover:text-white"
            >
              Điều khoản
            </Link>
            <Link
              href="/lien-he"
              className="text-slate-300 transition-colors duration-200 hover:text-white"
            >
              Chính sách
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
