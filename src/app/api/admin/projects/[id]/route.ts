import { NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { verifyAdminToken } from "@/lib/auth";
import { deleteProjectFromAdmin, updateProjectFromAdmin } from "@/lib/data";

const BodySchema = z.object({
  nameVi: z.string().min(2, "Tên quá ngắn"),
  slug: z.string().optional().or(z.literal("")),
  summary: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  coverImageUrl: z.string().optional().or(z.literal("")),
  galleryImageUrls: z.array(z.string()).optional(),
  isFeatured: z.boolean(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const d = parsed.data;
    const result = await updateProjectFromAdmin(id, {
      nameVi: d.nameVi,
      slug: d.slug || null,
      summary: d.summary || null,
      description: d.description || null,
      coverImageUrl: d.coverImageUrl || null,
      galleryImageUrls: d.galleryImageUrls ?? [],
      isFeatured: d.isFeatured,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 },
      );
    }

    revalidatePath("/", "layout");
    revalidatePath("/du-an", "layout");
    revalidatePath(`/du-an/${d.slug}`, "page");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Lỗi server" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const ok = await deleteProjectFromAdmin(id);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Không xóa được" },
        { status: 400 },
      );
    }

    revalidatePath("/", "layout");
    revalidatePath("/du-an", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Lỗi server" },
      { status: 500 },
    );
  }
}
