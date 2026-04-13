import { cookies } from "next/headers";

export function getExpectedAdminToken(): string | null {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return null;
  return encodeURIComponent(adminPassword);
}

export async function verifyAdminToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const expectedToken = getExpectedAdminToken();

  return token !== undefined && expectedToken !== null && token === expectedToken;
}
