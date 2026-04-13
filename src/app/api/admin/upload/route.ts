import path from "path";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifyAdminToken } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Thiếu cấu hình BLOB_READ_WRITE_TOKEN trên môi trường deploy",
        },
        { status: 500 },
      );
    }

    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { ok: false, error: "Chưa chọn file" },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Ảnh tối đa 8MB" },
        { status: 400 },
      );
    }

    const mime = file.type || "";
    if (!mime.startsWith("image/")) {
      return NextResponse.json(
        { ok: false, error: "Chỉ chấp nhận file ảnh" },
        { status: 400 },
      );
    }

    const ext =
      path.extname(file.name) ||
      (mime === "image/png"
        ? ".png"
        : mime === "image/webp"
          ? ".webp"
          : ".jpg");
    const name = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    const blob = await put(name, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Upload thất bại",
      },
      { status: 500 },
    );
  }
}
