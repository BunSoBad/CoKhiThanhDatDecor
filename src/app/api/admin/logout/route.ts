import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL(
      "/admin/login",
      process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    ),
  );
  response.cookies.delete("admin_token");
  response.cookies.set({
    name: "admin_token",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}
