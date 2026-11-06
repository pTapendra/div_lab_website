import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "div_lab_member";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type SessionPayload = { username: string; expiresAt: number };

function getConfig() {
  const username = process.env.LAB_ADMIN_USERNAME;
  const password = process.env.LAB_ADMIN_PASSWORD;
  const secret = process.env.LAB_SESSION_SECRET;
  if (!username || !password || !secret || secret.length < 32) {
    throw new Error(
      "LAB_ADMIN_USERNAME, LAB_ADMIN_PASSWORD, and a LAB_SESSION_SECRET of at least 32 characters are required."
    );
  }
  return { username, password, secret };
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function validateCredentials(username: string, password: string) {
  const config = getConfig();
  return safeEqual(username, config.username) && safeEqual(password, config.password);
}

export function createSessionToken(username: string) {
  const { secret } = getConfig();
  const payload: SessionPayload = {
    username,
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded, secret)}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) return null;
  try {
    const { secret } = getConfig();
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature || !safeEqual(signature, sign(encoded, secret))) return null;
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as SessionPayload;
    if (!payload.username || payload.expiresAt <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getLabSession() {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export const labAuthCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_DURATION_SECONDS,
};
