import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Dự án tiêu biểu | ${BRAND.name}`,
  description:
    "Xem các case thi công cổng cửa tự động, thông minh và decor để tham khảo giải pháp và thẩm mỹ.",
  keywords: [
    "dự án cổng cửa",
    "case cổng tự động",
    "case cổng thông minh",
    "case cổng decor",
    BRAND.name,
  ],
  openGraph: {
    title: `Dự án tiêu biểu | ${BRAND.name}`,
    description:
      "Danh sách dự án thực tế của Cơ Khí Thành Đạt Decor, gồm cổng trượt, cổng tự động và cổng decor.",
    url: `https://${BRAND.website}/du-an`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default async function ProjectsPage() {
  const projects = await getFeaturedProjects();

  return (
    <div className="mx-auto max-w-[min(96rem,calc(100%-2rem))] px-4 py-10">
      <SectionTitle
        kicker="Dự án"
        title="Thực tế thi công"
        description="Tham khảo các case triển khai để có cái nhìn rõ về giải pháp và thẩm mỹ."
      />

      <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((pr) => (
          <ProjectCard key={pr.slug} project={pr} variant="wide" />
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="text-lg font-semibold text-slate-950">
          Bạn muốn làm dự án tương tự?
        </div>
        <div className="mt-2 text-sm text-slate-500 leading-relaxed">
          Gửi kích thước và yêu cầu, chúng tôi sẽ tư vấn cấu hình và báo giá phù
          hợp.
        </div>
        <div className="mt-4">
          <Link
            href="/nhan-bao-gia?source=projects"
            className="inline-flex items-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
          >
            Nhận báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}
