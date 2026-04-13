import Link from "next/link";
import type { ProductLite } from "@/lib/data";

type CardVariant = "tall" | "wide";

function ProductImage({
  heroImageUrl,
  name,
  variant,
}: {
  heroImageUrl?: string | null;
  name: string;
  variant: CardVariant;
}) {
  const frameClass =
    variant === "wide"
      ? "aspect-[16/10] w-full"
      : "h-80 w-full md:h-96";

  if (heroImageUrl) {
    // In real deployment, heroImageUrl should be a direct image URL.
    return (
      <div className={`overflow-hidden rounded-2xl ${frameClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-end overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-4 text-white ${frameClass}`}
    >
      <div className="text-sm font-semibold leading-snug">{name}</div>
    </div>
  );
}

export default function ProductCard({
  product,
  variant = "tall",
}: {
  product: ProductLite;
  variant?: CardVariant;
}) {
  const titleClass =
    variant === "wide"
      ? "text-lg font-semibold text-slate-950 transition-colors duration-200 hover:text-amber-500 sm:text-xl"
      : "text-base font-semibold text-slate-950 transition-colors duration-200 hover:text-amber-500 sm:text-lg";

  const cardMinHeight = variant === "wide" ? "min-h-[28rem]" : "min-h-[36rem]";
  const paddingClass = variant === "wide" ? "p-4 sm:p-5" : "p-3 sm:p-4";

  return (
    <div className={`card-glow group flex h-full ${cardMinHeight} flex-col overflow-hidden`}>
      <ProductImage
        heroImageUrl={product.heroImageUrl}
        name={product.nameVi}
        variant={variant}
      />
      <div className={`flex min-h-0 flex-1 flex-col ${paddingClass}`}>
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/san-pham/${product.slug}`}
            className={titleClass}
          >
            {product.nameVi}
          </Link>
          {product.isFeatured ? (
            <div className="shrink-0 rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold text-slate-950">
              Mẫu nổi bật
            </div>
          ) : null}
        </div>

        {product.summary ? (
          <div className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {product.summary}
          </div>
        ) : null}

        <div className="mt-auto grid gap-2 sm:grid-cols-2 sm:items-stretch">
          <Link
            href={`/san-pham/${product.slug}`}
            className="btn-secondary w-full px-4 py-3 text-sm font-semibold text-slate-950"
          >
            Xem chi tiết
          </Link>
          <Link
            href={`/nhan-bao-gia?productSlug=${encodeURIComponent(product.slug)}`}
            className="btn-primary w-full px-4 py-3 text-sm font-semibold"
          >
            Nhận báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}
