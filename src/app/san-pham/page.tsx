import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { getActiveCategories, getFeaturedProducts } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Sản phẩm | ${BRAND.name}`,
  description:
    "Xem các mẫu cổng cửa tự động, thông minh và decor. Nhận tư vấn nhanh và báo giá theo sản phẩm.",
  keywords: ["mẫu cổng cửa", "cổng tự động", "cổng thông minh", BRAND.name],
  openGraph: {
    title: `Sản phẩm | ${BRAND.name}`,
    description:
      "Danh sách mẫu sản phẩm cổng cửa của Cơ Khí Thành Đạt Decor. Chọn mẫu và nhận báo giá nhanh.",
    url: `https://${BRAND.website}/san-pham`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getActiveCategories(),
  ]);

  return (
    <div className="mx-auto max-w-[min(96rem,calc(100%-2rem))] px-4 py-10">
      <SectionTitle
        kicker="Sản phẩm"
        title="Các mẫu cổng cửa nổi bật"
        description="Chọn mẫu và tham khảo thiết kế, vật liệu, cấu hình phù hợp với nhu cầu của bạn."
      />

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/danh-muc/${category.slug}`}
            className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-950 transition hover:border-amber-400 hover:text-slate-950"
          >
            {category.nameVi}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} variant="wide" />
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="text-lg font-semibold text-slate-950">
          Cần tư vấn mẫu sản phẩm?
        </div>
        <div className="mt-3 text-sm text-slate-500 leading-relaxed">
          Nếu bạn cần mẫu phù hợp với mặt bằng và yêu cầu thẩm mỹ, chúng tôi sẵn
          sàng hỗ trợ.
        </div>
        <div className="mt-5">
          <Link
            href="/nhan-bao-gia?source=products"
            className="inline-flex items-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
          >
            Nhận báo giá mẫu
          </Link>
        </div>
      </div>
    </div>
  );
}
