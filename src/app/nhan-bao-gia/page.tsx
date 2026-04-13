import QuoteForm from "./QuoteForm";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Nhận báo giá | ${BRAND.name}`,
  description:
    "Gửi yêu cầu nhận báo giá cổng cửa tự động, thông minh hoặc decor theo kích thước thực tế.",
  keywords: [
    "báo giá cổng cửa",
    "yêu cầu báo giá",
    "tư vấn cổng cửa",
    BRAND.name,
  ],
  openGraph: {
    title: `Nhận báo giá | ${BRAND.name}`,
    description:
      "Điền thông tin nhu cầu để nhận báo giá chính xác cho cổng cửa theo yêu cầu.",
    url: `https://${BRAND.website}/nhan-bao-gia`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default function NhanBaoGiaPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const presetProductSlug =
    typeof searchParams?.productSlug === "string"
      ? searchParams.productSlug
      : null;
  const presetCategorySlug =
    typeof searchParams?.categorySlug === "string"
      ? searchParams.categorySlug
      : null;

  const source =
    typeof searchParams?.source === "string" ? searchParams.source : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <QuoteForm
        presetCategorySlug={presetCategorySlug}
        presetProductSlug={presetProductSlug}
        source={source}
      />
    </div>
  );
}
