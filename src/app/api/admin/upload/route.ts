import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  try {
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

    const buf = Buffer.from(await file.arrayBuffer());
    const ext =
      path.extname(file.name) ||
      (mime === "image/png"
        ? ".png"
        : mime === "image/webp"
          ? ".webp"
          : ".jpg");
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    const dir = path.join(process.cwd(), "public", "img", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), buf);

    return NextResponse.json({ ok: true, url: `/img/uploads/${name}` });
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
