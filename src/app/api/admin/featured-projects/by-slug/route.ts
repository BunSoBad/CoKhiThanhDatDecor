import { NextResponse } from "next/server";
import {
  addFeaturedProjectBySlug,
  removeFeaturedProjectBySlug,
} from "@/lib/data";
import { verifyAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = (await req.json()) as { slug?: string };
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    if (!slug) {
      return NextResponse.json(
        { ok: false, error: "Missing slug" },
        { status: 400 },
      );
    }

    const success = await addFeaturedProjectBySlug(slug);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Failed to add featured project" },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = (await req.json()) as { slug?: string };
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    if (!slug) {
      return NextResponse.json(
        { ok: false, error: "Missing slug" },
        { status: 400 },
      );
    }

    const success = await removeFeaturedProjectBySlug(slug);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Failed to remove featured project" },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
