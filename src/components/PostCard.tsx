import Link from "next/link";
import type { PostLite } from "@/lib/data";

export default function PostCard({ post }: { post: PostLite }) {
  return (
    <div className="card-glow overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.25),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_32%)]" />
        <div className="relative h-full p-6 flex items-end">
          <div className="text-base font-semibold leading-tight">
            {post.titleVi}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-lg font-semibold text-slate-950">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-200 hover:text-amber-500"
          >
            {post.titleVi}
          </Link>
        </div>
        {post.excerptVi ? (
          <div className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
            {post.excerptVi}
          </div>
        ) : null}
        <div className="mt-5">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-amber-500 transition-colors duration-200 hover:text-amber-400"
          >
            Đọc thêm →
          </Link>
        </div>
      </div>
    </div>
  );
}
