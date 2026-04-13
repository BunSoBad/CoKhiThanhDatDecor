import Link from "next/link";
import { BRAND } from "@/lib/brand";
import {
  getQuoteRequests,
  listProductsForAdmin,
  listProjectsForAdmin,
  QuoteRequestLite,
} from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import { AdminQuoteActions } from "./AdminQuoteActions";
import { AdminProductsPanel } from "./AdminProductsPanel";
import { AdminProjectsPanel } from "./AdminProjectsPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: `Admin | ${BRAND.name}`,
  description:
    "Quản trị yêu cầu báo giá, sản phẩm và dự án hiển thị trên trang chủ.",
};

function AdminRow({ request }: { request: QuoteRequestLite }) {
  return (
    <tr className="border-t border-slate-200">
      <td className="px-4 py-4 text-sm text-slate-700">{request.name}</td>
      <td className="px-4 py-4 text-sm text-slate-700">{request.phone}</td>
      <td className="px-4 py-4 text-sm text-slate-700">
        {request.email ? (
          <a
            href={`mailto:${request.email}`}
            className="text-sky-700 underline-offset-2 hover:underline"
          >
            {request.email}
          </a>
        ) : (
          "-"
        )}
      </td>
      <td className="px-4 py-4 text-sm text-slate-700">
        {request.category?.nameVi ?? request.product?.nameVi ?? "-"}
      </td>
      <td
        className="px-4 py-4 text-sm text-slate-700 max-w-xs truncate"
        title={request.sizeNote}
      >
        {request.sizeNote}
      </td>
      <td className="px-4 py-4 text-sm text-slate-700">
        {new Date(request.createdAt).toLocaleString("vi-VN")}
      </td>
      <td className="px-4 py-4 text-sm text-slate-700">
        <AdminQuoteActions
          id={request.id ?? ""}
          currentStatus={request.status}
        />
      </td>
    </tr>
  );
}

export default async function AdminPage() {
  const [quoteRequests, dbProducts, dbProjects] = await Promise.all([
    getQuoteRequests(),
    listProductsForAdmin(),
    listProjectsForAdmin(),
  ]);

  return (
    <div className="admin-shell mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
        <SectionTitle
          kicker="Quản trị"
          title="Trang quản trị"
          description="Theo dõi yêu cầu báo giá và nhập sản phẩm / dự án (ảnh + nội dung) để hiển thị trên trang chủ khi bật chế độ nổi bật."
        />
        <Link
          href="/api/admin/logout"
          className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white"
        >
          Đăng xuất
        </Link>
      </div>

      <div className="admin-card mt-6 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-950">
            Yêu cầu nhận báo giá
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Danh sách khách gửi form báo giá từ website.
          </p>
        </div>
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Điện thoại</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Sản phẩm / danh mục</th>
              <th className="px-4 py-3">Kích thước / nhu cầu</th>
              <th className="px-4 py-3">Ngày gửi</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {quoteRequests.length > 0 ? (
              quoteRequests.map((request) => (
                <AdminRow
                  key={request.id ?? `${request.phone}-${request.createdAt}`}
                  request={request}
                />
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-sm text-slate-500" colSpan={7}>
                  Chưa có yêu cầu báo giá nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <AdminProductsPanel initialProducts={dbProducts} />
        <AdminProjectsPanel initialProjects={dbProjects} />
      </div>
    </div>
  );
}
