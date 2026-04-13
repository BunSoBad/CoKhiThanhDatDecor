import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { BRAND } from "@/lib/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const title = category ? `${category.nameVi} | ${BRAND.name}` : BRAND.name;
  const description =
    category?.description ||
    `Danh mục sản phẩm cổng cửa của ${BRAND.name}. Nhận tư vấn theo kích thước và nhu cầu.`;

  return {
    title,
    description,
    keywords: [
      category?.nameVi || BRAND.name,
      "danh mục cổng cửa",
      "báo giá cổng cửa",
    ],
    openGraph: {
      title,
      description,
      url: `https://${BRAND.website}/danh-muc/${slug}`,
      images: [
        {
          url: "/img/logo.jpg",
          alt: BRAND.logoAlt,
        },
      ],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategorySlug(slug);

  return (
    <div className="mx-auto max-w-[min(96rem,calc(100%-2rem))] px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionTitle
          kicker="Danh mục"
          title={category.nameVi}
          description={
            category.description ||
            "Chọn mẫu phù hợp và gửi yêu cầu để nhận báo giá theo kích thước thực tế."
          }
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/nhan-bao-gia?categorySlug=${encodeURIComponent(category.slug)}&source=category`}
            className="inline-flex items-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
          >
            Nhận báo giá cho danh mục
          </Link>
          <a
            href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-white"
          >
            Gọi ngay: {BRAND.phone}
          </a>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} variant="wide" />
          ))}
        </div>
      </div>
    </div>
  );
}
