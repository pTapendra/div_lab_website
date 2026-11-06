import { NextResponse } from "next/server";
import { createReferencePaper, getReferencePapers } from "@/lib/reference-library";
import { getLabSession } from "@/lib/lab-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getReferencePapers());
}

export async function POST(request: Request) {
  if (!(await getLabSession())) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  try {
    return NextResponse.json(await createReferencePaper(await request.json()), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to add paper." },
      { status: 400 }
    );
  }
}
