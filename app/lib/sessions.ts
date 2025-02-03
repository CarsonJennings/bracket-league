import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from '@/app/lib/definitions';


const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createSession(user: User) {
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ user, expires });
    const cookieStore = await cookies();

    cookieStore.set("session", session, { expires, httpOnly: true });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  parsed.expires = expires;
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: expires,
  });
  return res;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}