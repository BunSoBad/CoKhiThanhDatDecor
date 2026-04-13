import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { getActiveCategories } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Danh mục sản phẩm | ${BRAND.name}`,
  description:
    "Khám phá các nhóm cổng cửa tự động, thông minh và decor phù hợp với nhu cầu của bạn.",
  keywords: [
    "danh mục cổng cửa",
    "cổng cửa tự động",
    "cổng cửa decor",
    BRAND.name,
  ],
  openGraph: {
    title: `Danh mục sản phẩm | ${BRAND.name}`,
    description:
      "Danh sách danh mục sản phẩm cổng cửa của Cơ Khí Thành Đạt Decor. Nhận tư vấn và báo giá theo kích thước thực tế.",
    url: `https://${BRAND.website}/danh-muc`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default async function CategoriesPage() {
  const categories = await getActiveCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle
        kicker="Danh mục sản phẩm"
        title="Chọn loại cổng phù hợp"
        description="Xem các nhóm sản phẩm cổng cửa theo nhu cầu: tự động, thông minh và decor."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/danh-muc/${category.slug}`}
            className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-amber-400 hover:bg-slate-50"
          >
            <div className="text-lg font-semibold text-slate-950">
              {category.nameVi}
            </div>
            {category.description ? (
              <div className="mt-3 text-sm leading-relaxed text-slate-500">
                {category.description}
              </div>
            ) : null}
            <div className="mt-6 inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">
              Xem chi tiết
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="text-lg font-semibold text-slate-950">
          Chưa rõ loại cổng nào phù hợp?
        </div>
        <div className="mt-3 text-sm text-slate-500 leading-relaxed">
          Gửi ngay yêu cầu kích thước và yêu cầu sử dụng, chúng tôi sẽ tư vấn
          phương án phù hợp nhất.
        </div>
        <div className="mt-5">
          <Link
            href="/nhan-bao-gia?source=categories"
            className="inline-flex items-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
          >
            Nhận báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}
