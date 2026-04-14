import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Tất Cả Mẫu Cửa Cổng | ${BRAND.name}`,
  description:
    "Xem bộ sưu tập các mẫu cửa cổng đẹp: cổng tự động, cổng thông minh, cấu cửa decor.",
  // Thêm OpenGraph để tối ưu chia sẻ mạng xã hội
  openGraph: {
    title: `Tất Cả Mẫu Cửa Cổng | ${BRAND.name}`,
    description: "Khám phá các mẫu cửa cổng hiện đại nhất.",
    images: ["/img/1_1.jpg"],
  },
};

const doorGalleryImages = [
  "/img/50_1.jpg",
  "/img/50_2.jpg",
  "/img/50_3.jpg",
  "/img/50_4.jpg",
  "/img/50_5.jpg",
  "/img/50_6.jpg",
  "/img/50_7.jpg",
  "/img/50_8.jpg",
  "/img/50_9.jpg",
  "/img/50_10.jpg",
  "/img/50_11.jpg",
  "/img/50_12.jpg",
  "/img/50_13.jpg",
  "/img/50_14.jpg",
  "/img/50_15.jpg",
  "/img/50_16.jpg",
  "/img/50_17.jpg",
  "/img/50_18.jpg",
  "/img/50_19.jpg",
  "/img/50_20.jpg",
  "/img/50_21.jpg",
  "/img/50_22.jpg",
  "/img/50_23.jpg",
  "/img/50_24.jpg",
  "/img/50_25.jpg",
  "/img/50_26.jpg",
  "/img/50_27.jpg",
  "/img/50_28.jpg",
  "/img/50_29.jpg",
  "/img/50_30.jpg",
  "/img/50_31.jpg",
  "/img/50_32.jpg",
  "/img/50_33.jpg",
  "/img/50_34.jpg",
  "/img/50_35.jpg",
  "/img/50_36.jpg",
];

export default function DoorCollectionPage() {
  return (
    <div className="min-h-screen bg-slate-50/80">
      {/* Tăng max-w ở đây để header cân xứng với lưới ảnh to bên dưới */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
              <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                Tất cả mẫu cửa cổng
              </p>
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Bộ sưu tập các mẫu cửa đẹp
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            ← Quay lại
          </Link>
        </div>
      </section>
      {/* 1. Thay max-w-7xl bằng max-w-[1440px] (hoặc max-w-[1600px] nếu muốn to hơn nữa)
          2. Sửa grid-cols: bỏ 2xl:grid-cols-5, giữ tối đa là 4 cột
      */}
      <section className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doorGalleryImages.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={src}
                  alt={`Mẫu cửa ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
              <div className="p-5">
                {" "}
                {/* Tăng padding cho card to nhìn sang hơn */}
                <p className="text-base font-bold text-slate-800">
                  Mã cửa: {idx + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-amber-200 bg-white/90 p-8 text-center shadow-xl shadow-amber-500/5 backdrop-blur-md sm:p-16">
            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
              Bạn tìm thấy mẫu ưng ý chưa?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Đừng ngần ngại liên hệ để nhận tư vấn kỹ thuật và báo giá ưu đãi
              nhất.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/nhan-bao-gia"
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-8 py-4 text-base font-bold text-white transition hover:bg-amber-700 hover:scale-105 active:scale-95"
              >
                Nhận báo giá ngay
              </Link>
              <Link
                href="https://zalo.me/0967105883"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-amber-600 px-8 py-4 text-base font-bold text-amber-700 transition hover:bg-amber-50"
              >
                Tư vấn qua Zalo
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
