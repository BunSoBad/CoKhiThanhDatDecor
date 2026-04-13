export function AdminLogoutButton() {
  return (
    <a
      href="/api/admin/logout"
      className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white"
    >
      Đăng xuất
    </a>
  );
}
