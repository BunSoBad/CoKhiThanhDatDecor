import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 text-center">
      <div className="inline-flex rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950">
        404
      </div>
      <SectionTitle
        title="Không tìm thấy trang"
        description="Trang bạn đang cố truy cập không tồn tại hoặc đã bị di chuyển. Hãy trở về trang chủ hoặc xem các dịch vụ của chúng tôi."
      />
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
        >
          Về trang chủ
        </Link>
        <Link
          href="/san-pham"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-800"
        >
          Xem sản phẩm
        </Link>
      </div>
    </div>
  );
}
