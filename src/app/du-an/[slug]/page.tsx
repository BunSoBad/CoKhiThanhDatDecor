import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import { ZoomableImage } from "@/components/ZoomableImage";
import { BRAND } from "@/lib/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: BRAND.name,
      description:
        "Dự án cổng cửa tự động, thông minh và decor. Nhận tư vấn và báo giá chính xác.",
    };
  }

  const title = `${project.nameVi} | ${BRAND.name}`;
  const description =
    project.summary ||
    project.description ||
    `Xem case dự án ${project.nameVi} và nhận tư vấn thi công.`;

  return {
    title,
    description,
    keywords: [
      project.nameVi,
      "dự án cổng cửa",
      "case cổng tự động",
      BRAND.name,
    ],
    openGraph: {
      title,
      description,
      url: `https://${BRAND.website}/du-an/${project.slug}`,
      images: [
        {
          url: project.coverImageUrl ?? "/img/logo.jpg",
          alt: project.nameVi,
        },
      ],
    },
  };
}

function ProjectGallery({
  images,
  name,
}: {
  images?: string[] | null;
  name: string;
}) {
  if (images && images.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((url, idx) => (
          <ZoomableImage
            key={`${url}-${idx}`}
            src={url}
            alt={name}
            className="h-72 w-full rounded-3xl border border-slate-200 object-cover md:h-80"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-72 w-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-700 p-6 text-white flex items-end">
      <div className="text-sm font-semibold leading-snug">
        Chưa có ảnh case. Vui lòng cập nhật ảnh thực tế.
      </div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <ProjectGallery
            images={project.galleryImageUrls}
            name={project.nameVi}
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="text-xs font-semibold tracking-wide text-amber-400">
            DỰ ÁN
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-950">
            {project.nameVi}
          </div>
          {project.summary ? (
            <div className="mt-3 text-sm text-slate-600 leading-relaxed">
              {project.summary}
            </div>
          ) : null}

          {project.description ? (
            <div className="mt-5 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
              {project.description}
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/nhan-bao-gia?source=project"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
            >
              Nhận báo giá dự án
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-white"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
