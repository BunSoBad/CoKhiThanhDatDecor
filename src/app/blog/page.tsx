import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { getFeaturedPosts } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Góc tư vấn | ${BRAND.name}`,
  description:
    "Những bài viết ngắn về chọn cổng, vật liệu, bảo trì và giải pháp thi công cổng cửa.",
  keywords: [
    "tư vấn cổng cửa",
    "bài viết cổng decor",
    "bài viết cổng tự động",
    "kiến thức cổng thông minh",
    BRAND.name,
  ],
  openGraph: {
    title: `Góc tư vấn | ${BRAND.name}`,
    description:
      "Chia sẻ kiến thức chọn cổng cửa tự động, thông minh và decor để bạn có quyết định đúng.",
    url: `https://${BRAND.website}/blog`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default async function BlogPage() {
  const posts = await getFeaturedPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle
        kicker="Góc tư vấn"
        title="Kiến thức chọn đúng - bền đẹp"
        description="Những bài viết ngắn giúp bạn hiểu rõ hơn về vật liệu, quy trình và bảo trì."
      />

      <div className="mt-10 mx-auto max-w-3xl space-y-10 md:space-y-12">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="relative border-l-[3px] border-amber-400/90 pl-6 md:pl-8"
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="text-xl font-bold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-amber-600 md:text-2xl">
                {post.titleVi}
              </h2>
            </Link>
            {post.excerptVi ? (
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-[1.05rem]">
                {post.excerptVi}
              </p>
            ) : null}
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 transition hover:text-amber-500"
              >
                Đọc tiếp
                <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="text-lg font-semibold text-slate-950">
          Bạn cần tư vấn nhanh?
        </div>
        <div className="mt-2 text-sm text-slate-600 leading-relaxed">
          Gửi thông tin kích thước/nhu cầu để nhận báo giá và tư vấn cấu hình
          phù hợp.
        </div>
        <div className="mt-4">
          <Link
            href="/nhan-bao-gia?source=blog"
            className="inline-flex items-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
          >
            Nhận báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}
