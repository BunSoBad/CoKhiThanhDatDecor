import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/auth";
import { createProductFromAdmin } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  nameVi: z.string().min(2, "Tên quá ngắn"),
  slug: z.string().optional().or(z.literal("")),
  summary: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  heroImageUrl: z.string().optional().or(z.literal("")),
  galleryImageUrls: z.array(z.string()).optional(),
  isFeatured: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Dữ liệu không hợp lệ", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const d = parsed.data;
    const result = await createProductFromAdmin({
      nameVi: d.nameVi,
      slug: d.slug || null,
      summary: d.summary || null,
      description: d.description || null,
      heroImageUrl: d.heroImageUrl || null,
      galleryImageUrls: d.galleryImageUrls ?? [],
      isFeatured: d.isFeatured,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true, id: result.id });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Lỗi server" },
      { status: 500 },
    );
  }
}
