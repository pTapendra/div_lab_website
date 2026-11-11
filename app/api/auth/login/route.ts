import { NextResponse } from "next/server";
import {
  createSessionToken,
  labAuthCookie,
  validateCredentials,
} from "@/lib/lab-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    if (!body.username || !body.password || !validateCredentials(body.username, body.password)) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(labAuthCookie.name, createSessionToken(body.username), {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: labAuthCookie.maxAge,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to sign in." },
      { status: 500 }
    );
  }
}
