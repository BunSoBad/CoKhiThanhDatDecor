import { NextResponse } from "next/server";
import { deleteQuoteRequest, updateQuoteRequestStatus } from "@/lib/data";
import { verifyAdminToken } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Only allow delete from admin logged-in users
    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const success = await deleteQuoteRequest(id);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Failed to delete quote request" },
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Only allow status update from admin logged-in users
    const isAdmin = await verifyAdminToken();
    if (!isAdmin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const body = (await req.json()) as { status?: string };
    const status = body.status as
      | "NEW"
      | "CONTACTED"
      | "WON"
      | "LOST"
      | undefined;

    if (!status || !["NEW", "CONTACTED", "WON", "LOST"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Invalid status" },
        { status: 400 },
      );
    }

    const success = await updateQuoteRequestStatus(id, status);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Failed to update quote request" },
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
