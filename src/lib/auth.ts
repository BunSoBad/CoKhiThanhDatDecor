import { cookies } from "next/headers";

export function getExpectedAdminToken(): string | null {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return null;
  return encodeURIComponent(adminPassword);
}

export function isValidAdminToken(token: string | undefined): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!token || !adminPassword) return false;

  // Accept both legacy raw token and new encoded token.
  if (token === adminPassword) return true;
  if (token === encodeURIComponent(adminPassword)) return true;

  try {
    return decodeURIComponent(token) === adminPassword;
  } catch {
    return false;
  }
}

export async function verifyAdminToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return isValidAdminToken(token);
}
