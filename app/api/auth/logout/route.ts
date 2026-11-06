import { NextResponse } from "next/server";
import { labAuthCookie } from "@/lib/lab-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(labAuthCookie.name, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
