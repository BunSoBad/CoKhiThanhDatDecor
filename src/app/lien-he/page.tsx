import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Liên hệ | ${BRAND.name}`,
  description:
    "Liên hệ hotline và nhận tư vấn nhanh cho cổng cửa tự động, thông minh và decor tại Hà Nội.",
  keywords: [
    "liên hệ cổng cửa",
    "hotline cổng decor",
    "tư vấn cổng tự động",
    BRAND.name,
  ],
  openGraph: {
    title: `Liên hệ | ${BRAND.name}`,
    description:
      "Gửi yêu cầu tư vấn hoặc gọi ngay để nhận báo giá cổng cửa theo kích thước và nhu cầu.",
    url: `https://${BRAND.website}/lien-he`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle
        kicker="Liên hệ"
        title="Nhận tư vấn nhanh"
        description="Gửi thông tin kích thước/nhu cầu để nhận báo giá phù hợp. Hoặc liên hệ trực tiếp qua hotline."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="text-lg font-semibold text-slate-950">
            Thông tin công ty
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-950">SĐT:</span>{" "}
              <a
                className="hover:underline"
                href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
              >
                {BRAND.phone}
              </a>
            </div>
            <div>
              <span className="font-semibold text-slate-950">Email:</span>{" "}
              <a className="hover:underline" href={`mailto:${BRAND.email}`}>
                {BRAND.email}
              </a>
            </div>
            <div>
              <span className="font-semibold text-slate-950">Địa chỉ:</span>{" "}
              {BRAND.address}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/nhan-bao-gia?source=contact"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
            >
              Nhận báo giá
            </Link>
            <a
              href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50"
            >
              Gọi ngay
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="text-lg font-semibold text-slate-950">Gợi ý</div>
          <div className="mt-3 text-sm text-slate-500 leading-relaxed">
            Để chúng tôi tư vấn nhanh hơn, bạn có thể chuẩn bị:
          </div>
          <div className="mt-4 space-y-3">
            {[
              "Kích thước (rộng/dài/cao) dự kiến",
              "Loại cổng mong muốn: tự động/thông minh/decor",
              "Mặt bằng lắp đặt + vị trí cửa",
              "Màu sắc/vật liệu (nếu có)",
            ].map((t) => (
              <div key={t} className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-white" />
                <div className="text-sm leading-relaxed text-slate-600">
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
