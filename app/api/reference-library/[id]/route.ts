import { NextResponse } from "next/server";
import { deleteReferencePaper, updateReferencePaper } from "@/lib/reference-library";
import { getLabSession } from "@/lib/lab-auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getLabSession())) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const paper = await updateReferencePaper(id, await request.json());
    if (!paper) return NextResponse.json({ error: "Paper not found." }, { status: 404 });
    return NextResponse.json(paper);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update paper." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getLabSession())) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  const { id } = await params;
  const deleted = await deleteReferencePaper(id);
  return deleted
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Paper not found." }, { status: 404 });
}
