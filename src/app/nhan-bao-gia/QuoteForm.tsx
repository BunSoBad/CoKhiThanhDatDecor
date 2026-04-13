"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const QuoteSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  categorySlug: z.string().optional().or(z.literal("")),
  productSlug: z.string().optional().or(z.literal("")),
  sizeNote: z.string().min(10, "Vui lòng mô tả kích thước/nhu cầu"),
  message: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof QuoteSchema>;

export default function QuoteForm({
  presetCategorySlug,
  presetProductSlug,
  source,
}: {
  presetCategorySlug?: string | null;
  presetProductSlug?: string | null;
  source?: string | null;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    id?: string;
    error?: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      categorySlug: presetCategorySlug ?? "",
      productSlug: presetProductSlug ?? "",
      sizeNote: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          leadSource: source || "website",
        }),
      });

      type QuoteApiResponse = { ok: boolean; id?: string; error?: string };
      const data = (await res.json()) as Partial<QuoteApiResponse>;

      if (!res.ok || data.ok !== true) {
        setResult({
          ok: false,
          error: data.error || "Gửi yêu cầu thất bại. Vui lòng thử lại.",
        });
        return;
      }

      setResult({
        ok: true,
        id: typeof data.id === "string" ? data.id : undefined,
      });
      form.reset({
        name: "",
        phone: "",
        email: "",
        address: "",
        categorySlug: presetCategorySlug ?? "",
        productSlug: presetProductSlug ?? "",
        sizeNote: "",
        message: "",
      });
    } catch (e) {
      setResult({
        ok: false,
        error: e instanceof Error ? e.message : "Lỗi không xác định",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold tracking-wide text-amber-400">
            NHẬN BÁO GIÁ
          </div>
          <div className="text-2xl font-bold text-slate-950">
            Gửi yêu cầu - chúng tôi sẽ phản hồi nhanh
          </div>
          <div className="text-sm text-slate-500 leading-relaxed">
            Điền thông tin theo mẫu dưới đây. Nếu bạn có kích thước thực tế, hãy
            mô tả càng chi tiết càng tốt để nhận báo giá chính xác.
          </div>
        </div>

        {result ? (
          <div
            className="mt-5 rounded-2xl border border-slate-300 bg-slate-50 p-4"
            data-ok={result.ok ? "true" : "false"}
          >
            {result.ok ? (
              <div className="text-sm font-semibold text-emerald-400">
                Đã gửi yêu cầu thành công. Cảm ơn bạn!
              </div>
            ) : (
              <div className="text-sm font-semibold text-red-400">
                {result.error || "Có lỗi xảy ra"}
              </div>
            )}
            {result.ok && result.id ? (
              <div className="mt-1 text-xs text-slate-500">
                Mã yêu cầu: {result.id}
              </div>
            ) : null}
          </div>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-950">
                Họ tên *
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-950 outline-none focus:border-amber-400"
                placeholder="VD: Nguyễn Văn A"
                {...register("name")}
              />
              {errors.name ? (
                <div className="mt-1 text-xs text-red-400">
                  {errors.name.message}
                </div>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-950">
                Số điện thoại *
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-950 outline-none focus:border-amber-400"
                placeholder="VD: 0967 10 58 83"
                {...register("phone")}
              />
              {errors.phone ? (
                <div className="mt-1 text-xs text-red-400">
                  {errors.phone.message}
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-950">
                Email
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-950 outline-none focus:border-amber-400"
                placeholder="VD: email@domain.com"
                {...register("email")}
              />
              {errors.email ? (
                <div className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </div>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-950">
                Địa chỉ
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-950 outline-none focus:border-amber-400"
                placeholder="VD: Quận/Huyện, Đường..."
                {...register("address")}
              />
              {errors.address ? (
                <div className="mt-1 text-xs text-red-400">
                  {errors.address.message}
                </div>
              ) : null}
            </div>
          </div>

          {/* Hidden fields to link the request to chosen category/product. */}
          <input type="hidden" {...register("categorySlug")} />
          <input type="hidden" {...register("productSlug")} />

          <div>
            <label className="text-sm font-semibold text-slate-950">
              Kích thước/nhu cầu *
            </label>
            <textarea
              rows={5}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-950 outline-none focus:border-amber-400"
              placeholder="VD: Rộng 4m, cao 2.2m, muốn cổng tự động + màu đen, lắp tại mặt tiền..."
              {...register("sizeNote")}
            />
            {errors.sizeNote ? (
              <div className="mt-1 text-xs text-red-400">
                {errors.sizeNote.message}
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-950">
              Ghi chú thêm
            </label>
            <textarea
              rows={3}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-950 outline-none focus:border-amber-400"
              placeholder="VD: thời gian lắp dự kiến, yêu cầu phụ kiện..."
              {...register("message")}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-amber-500 px-6 text-sm font-semibold text-slate-950 hover:opacity-90 disabled:opacity-70"
          >
            {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </form>
      </div>
    </div>
  );
}
