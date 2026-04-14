import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Tất Cả Mẫu Cửa Cổng | ${BRAND.name}`,
  description:
    "Xem bộ sưu tập 30 mẫu cửa cổng đẹp: cổng tự động, cổng thông minh, cấu cửa decor.",
};

const doorGalleryImages = [
  "/img/1_1.jpg",
  "/img/1_2.jpg",
  "/img/1_3.jpg",
  "/img/1_4.jpg",
  "/img/2_1.jpg",
  "/img/2_2.jpg",
  "/img/2_3.jpg",
  "/img/2_4.jpg",
  "/img/2_5.jpg",
  "/img/3_1.jpg",
  "/img/3_2.jpg",
  "/img/3_3.jpg",
  "/img/3_4.jpg",
  "/img/4_1.jpg",
  "/img/4_2.jpg",
  "/img/4_3.jpg",
  "/img/4_4.jpg",
  "/img/5_1.jpg",
  "/img/5_2.jpg",
  "/img/5_3.jpg",
  "/img/5_4.jpg",
  "/img/6_1.jpg",
  "/img/6_2.jpg",
  "/img/6_3.jpg",
  "/img/6_4.jpg",
  "/img/101.jpg",
  "/img/102.jpg",
  "/img/103.jpg",
  "/img/103_1.jpg",
  "/img/103_4.jpg",
];

export default function DoorCollectionPage() {
  return (
    <div className="min-h-screen bg-slate-50/80">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
              <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                Tất cả mẫu cửa cổng
              </p>
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Bộ sưu tập 30 mẫu cửa đẹp
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Khám phá toàn bộ bộ sưu tập mẫu cửa cổng: từ cổng tự động hiện
              đại, cổng thông minh công nghệ cao, đến cổng decor phong cách sang
              trọng.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            ← Quay lại
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {doorGalleryImages.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={src}
                  alt={`Mẫu cửa ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-800">
                  Mẫu thứ {idx + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-amber-200 bg-white/80 p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
              Bạn thích mẫu nào?
            </h2>
            <p className="mt-3 text-slate-600">
              Hãy liên hệ với chúng tôi để nhận tư vấn chi tiết và báo giá cụ
              thể.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/nhan-bao-gia"
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                Nhận báo giá
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
