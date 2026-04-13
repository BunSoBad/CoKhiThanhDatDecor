import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QuoteBodySchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .min(8, "Vui lòng nhập số điện thoại")
    .regex(/^[0-9+\s()-]+$/, "Số điện thoại không hợp lệ"),
  email: z
    .string()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  address: z.string().optional().or(z.literal("")),
  categorySlug: z.string().optional().or(z.literal("")),
  productSlug: z.string().optional().or(z.literal("")),
  sizeNote: z.string().min(10, "Vui lòng mô tả kích thước/nhu cầu (tối thiểu 10 ký tự)"),
  message: z.string().optional().or(z.literal("")),
  leadSource: z.string().optional().default("website"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = QuoteBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    const [category, product] = await Promise.all([
      data.categorySlug
        ? prisma.category.findUnique({ where: { slug: data.categorySlug } })
        : Promise.resolve(null),
      data.productSlug
        ? prisma.product.findUnique({ where: { slug: data.productSlug } })
        : Promise.resolve(null),
    ]);

    const quote = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        address: data.address || null,
        sizeNote: data.sizeNote,
        message: data.message || null,
        leadSource: data.leadSource || "website",
        categoryId: category?.id ?? null,
        productId: product?.id ?? null,
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: quote.id });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

