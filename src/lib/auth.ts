import { cookies } from "next/headers";

export async function verifyAdminToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  return (
    token !== undefined &&
    adminPassword !== undefined &&
    token === adminPassword
  );
}
