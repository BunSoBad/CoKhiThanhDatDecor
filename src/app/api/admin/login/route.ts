import { NextResponse } from "next/server";
import { getExpectedAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { password?: string };
    const password = body.password ?? "";
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json(
        { ok: false, error: "Mật khẩu không chính xác" },
        { status: 401 },
      );
    }

    const expectedToken = getExpectedAdminToken();
    if (!expectedToken) {
      return NextResponse.json(
        { ok: false, error: "Thiếu cấu hình ADMIN_PASSWORD" },
        { status: 500 },
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: "admin_token",
      value: expectedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
