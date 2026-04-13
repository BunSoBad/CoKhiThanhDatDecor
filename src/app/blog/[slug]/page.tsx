import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { getPostBySlug } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: BRAND.name,
      description:
        "Bài viết tư vấn chọn cổng cửa tự động, thông minh và decor.",
    };
  }

  const title = `${post.titleVi} | ${BRAND.name}`;
  const description =
    post.excerptVi ||
    (post.contentVi
      ? post.contentVi.slice(0, 150).replace(/[#\n]/g, " ")
      : `Bài viết tư vấn ${post.titleVi}`);

  return {
    title,
    description,
    keywords: [
      post.titleVi,
      "tư vấn cổng cửa",
      "cổng cửa thông minh",
      BRAND.name,
    ],
    openGraph: {
      title,
      description,
      url: `https://${BRAND.website}/blog/${post.slug}`,
      images: [
        {
          url: post.coverImageUrl ?? "/img/logo.jpg",
          alt: post.titleVi,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionTitle
          kicker="Góc tư vấn"
          title={post.titleVi}
          description={post.excerptVi || undefined}
        />

        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5">
          <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
            {post.contentVi || ""}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/nhan-bao-gia?source=blog-post"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
          >
            Nhận báo giá
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50"
          >
            Quay lại bài viết
          </Link>
        </div>
      </div>
    </div>
  );
}
