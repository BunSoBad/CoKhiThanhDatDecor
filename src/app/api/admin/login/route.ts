import { NextResponse } from "next/server";

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

    const response = NextResponse.json({ ok: true });
    const encoded = encodeURIComponent(password);
    response.cookies.set({
      name: "admin_token",
      value: encoded,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
