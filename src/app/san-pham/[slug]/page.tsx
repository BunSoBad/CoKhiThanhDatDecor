import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import { ZoomableImage } from "@/components/ZoomableImage";
import { BRAND } from "@/lib/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: BRAND.name,
      description:
        "Sản phẩm cổng cửa tự động, thông minh và decor. Nhận báo giá theo kích thước thực tế.",
    };
  }

  const title = `${product.nameVi} | ${BRAND.name}`;
  const description =
    product.summary ||
    product.description ||
    `Xem chi tiết sản phẩm ${product.nameVi} và nhận báo giá theo kích thước.`;

  return {
    title,
    description,
    keywords: [product.nameVi, "cổng cửa", "cổng mẫu", "báo giá cổng cửa"],
    openGraph: {
      title,
      description,
      url: `https://${BRAND.website}/san-pham/${product.slug}`,
      images: [
        {
          url: product.heroImageUrl ?? "/img/logo.jpg",
          alt: product.nameVi,
        },
      ],
    },
  };
}

function Gallery({ images, name }: { images?: string[] | null; name: string }) {
  if (images && images.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((url, idx) => (
          <ZoomableImage
            key={`${url}-${idx}`}
            src={url}
            alt={name}
            className="h-72 w-full rounded-3xl border border-slate-200 object-cover md:h-80"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-72 w-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-700 p-6 text-white flex items-end">
      <div className="text-sm font-semibold leading-snug">
        Chưa có ảnh mẫu. Vui lòng cập nhật ảnh sản phẩm sau.
      </div>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const attrs = product.attributes ?? {};

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Gallery images={product.galleryImageUrls} name={product.nameVi} />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <SectionTitle
            kicker="Sản phẩm"
            title={product.nameVi}
            description={
              product.summary ||
              "Gửi yêu cầu để nhận báo giá theo kích thước thực tế."
            }
          />

          {product.description ? (
            <div className="mt-5 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
              {product.description}
            </div>
          ) : null}

          {Object.keys(attrs).length > 0 ? (
            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-950">
                Thông tin tham khảo
              </div>
              <div className="mt-3 grid gap-3">
                {Object.entries(attrs).map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="text-xs font-semibold text-slate-500">
                      {k}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-950">
                      {typeof v === "string" ? v : JSON.stringify(v)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/nhan-bao-gia?productSlug=${encodeURIComponent(product.slug)}&source=product`}
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
            >
              Nhận báo giá cho mẫu này
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-white"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
