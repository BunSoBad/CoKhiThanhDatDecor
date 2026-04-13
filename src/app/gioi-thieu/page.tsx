import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Giới thiệu | ${BRAND.name}`,
  description:
    "Cơ Khí Thành Đạt Decor - giải pháp cổng cửa tự động, thông minh và decor với tư vấn theo kích thước thực tế.",
  keywords: [
    "giới thiệu cổng cửa",
    "cơ khí decor",
    "dịch vụ cổng thông minh",
    BRAND.name,
  ],
  openGraph: {
    title: `Giới thiệu | ${BRAND.name}`,
    description:
      "Tìm hiểu năng lực thiết kế, gia công và thi công cổng cửa theo nhu cầu với Cơ Khí Thành Đạt Decor.",
    url: `https://${BRAND.website}/gioi-thieu`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle
        kicker="Về chúng tôi"
        title={BRAND.name}
        description="Chúng tôi cung cấp giải pháp cổng cửa theo nhu cầu, ưu tiên vận hành bền bỉ và hoàn thiện thẩm mỹ."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="text-lg font-semibold text-slate-950">
            Năng lực triển khai
          </div>
          <div className="mt-3 space-y-3">
            {[
              "Tư vấn lựa chọn loại cổng phù hợp theo mặt bằng và nhu cầu.",
              "Gia công/chuẩn bị vật liệu và phụ kiện theo cấu hình.",
              "Thi công và kiểm tra vận hành trước khi bàn giao.",
              "Hướng dẫn sử dụng và hỗ trợ sau lắp đặt.",
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

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="text-lg font-semibold text-slate-950">
            Thông tin liên hệ
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-950">SĐT:</span>{" "}
              {BRAND.phone}
            </div>
            <div>
              <span className="font-semibold text-slate-950">Email:</span>{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-amber-700 underline-offset-2 hover:underline"
              >
                {BRAND.email}
              </a>
            </div>
            <div>
              <span className="font-semibold text-slate-950">Địa chỉ:</span>{" "}
              {BRAND.address}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50"
            >
              Gọi ngay
            </a>
            <Link
              href="/nhan-bao-gia?source=about"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
