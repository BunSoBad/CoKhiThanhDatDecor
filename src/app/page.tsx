import Link from "next/link";
import { BRAND } from "@/lib/brand";
import {
  getFeaturedPosts,
  getFeaturedProducts,
  getFeaturedProjects,
} from "@/lib/data";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import ProjectCard from "@/components/ProjectCard";
import { HeroCarousel } from "@/components/HeroCarousel";

export const metadata = {
  title: `${BRAND.name} | Cổng cửa tự động, thông minh, decor`,
  description:
    "Thiết kế, gia công và thi công cổng cửa tự động, thông minh và decor theo kích thước thực tế.",
  keywords: [
    "cổng cửa",
    "cổng tự động",
    "cổng thông minh",
    "cổng decor",
    "báo giá cổng cửa",
    BRAND.name,
  ],
  openGraph: {
    title: `${BRAND.name} | Cổng cửa theo nhu cầu`,
    description:
      "Cổng cửa tự động, thông minh và decor tại Hà Nội. Nhận tư vấn và báo giá nhanh.",
    url: `https://${BRAND.website}`,
    siteName: BRAND.name,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

export default async function Home() {
  const [products, projects, posts] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedProjects(),
    getFeaturedPosts(),
  ]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50/30 to-white py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100 to-orange-100/20 opacity-30 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-orange-50 to-amber-50 opacity-40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="max-w-lg space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span className="text-sm font-semibold text-amber-700">
                  Giải pháp cổng cửa sáng tạo
                </span>
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Cổng cửa theo nhu cầu thực tế
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-4xl font-bold sm:text-5xl">
                  <span className="text-amber-600">tự động</span>
                  <span className="text-amber-600">—</span>
                  <span className="text-amber-600">thông minh</span>
                  <span className="text-amber-600">—</span>
                  <span className="text-amber-600">decor</span>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-slate-600">
                {BRAND.name} thiết kế, thi công và lắp đặt cổng cửa thông minh
                với phong cách decor đồng bộ, phù hợp thực tế và dễ sử dụng.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/nhan-bao-gia?source=home"
                  className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700"
                >
                  Nhận báo giá nhanh
                </Link>
                <Link
                  href="/du-an"
                  className="inline-flex items-center justify-center rounded-full border-2 border-amber-600 bg-white px-6 py-3 text-sm font-semibold text-amber-600 transition hover:bg-amber-50"
                >
                  Xem dự án tiêu biểu
                </Link>
                <Link
                  href="/tai-nguyen"
                  className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Xem 30 mẫu cửa
                </Link>
              </div>

              <div className="md:hidden">
                <Link
                  href="/admin"
                  className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Trang quản trị
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-[32px] border-2 border-amber-200 bg-white p-1 shadow-2xl">
                <HeroCarousel
                  images={[
                    {
                      url: products[0]?.heroImageUrl ?? "/img/logo.jpg",
                      alt: products[0]?.nameVi ?? "Hình ảnh sản phẩm",
                    },
                    {
                      url: products[1]?.heroImageUrl ?? "/img/logo.jpg",
                      alt: products[1]?.nameVi ?? "Hình ảnh sản phẩm",
                    },
                    {
                      url: projects[0]?.coverImageUrl ?? "/img/logo.jpg",
                      alt: projects[0]?.nameVi ?? "Hình ảnh dự án",
                    },
                  ].filter((img) => img.url !== "/img/logo.jpg")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                value: "100+",
                label: "Mẫu thiết kế",
                detail: "Độ bền cao, bảo trì dễ dàng",
              },
              {
                value: "100+",
                label: "Dự án hoàn thiện",
                detail: "Phong cách decor đồng bộ",
              },
              {
                value: "24h",
                label: "Phản hồi nhanh",
                detail: "Tư vấn và báo giá trong 24h",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-slate-950">
                  {item.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
                  {item.label}
                </div>
                <div className="mt-3 text-sm text-slate-600">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <div className="showcase-strip">
          <img
            src="/img/background.jpg"
            alt="Hình ảnh không gian và cổng cửa"
          />
        </div>
      </section>

      <section className="section-lux mx-auto max-w-[min(96rem,calc(100%-2rem))] px-4 py-14 mt-6 md:mt-8 animate-slide-up">
        <SectionTitle
          kicker="Sản phẩm nổi bật"
          title="Mẫu cổng cửa được quan tâm"
          description="Chọn nhanh mẫu phù hợp, hoặc gửi yêu cầu để nhận báo giá theo kích thước thực tế."
        />

        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-5 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_32px_42px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 md:grid-cols-4">
            <div className="relative flex min-h-[220px] items-center justify-center bg-slate-100 p-3 sm:min-h-[260px] md:col-span-3 md:min-h-[360px]">
              <img
                src="/img/banner.png"
                alt="Motor SUB 220 Quiko Made in Italy"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-1 md:p-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-500 sm:text-xs sm:tracking-[0.22em]">
                Motor sử dụng
              </div>
              <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-slate-950 md:text-2xl">
                SUB 220 - Quiko - Made in Italy
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                Hệ mô tơ chúng tôi sử dụng cho nhiều công trình là SUB 220 của
                Quiko (Italy), nổi bật với độ ổn định cao, vận hành êm và độ bền
                phù hợp điều kiện sử dụng thực tế tại Việt Nam.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Giải pháp này giúp cổng hoạt động chắc chắn, đồng đều và tối ưu
                trải nghiệm đóng/mở hằng ngày cho gia đình và công trình dân
                dụng.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <SectionTitle
            variant="onDark"
            kicker="Dự án tiêu biểu"
            title="Thực tế thi công — đúng chuẩn vận hành"
            description="Xem case theo từng nhóm để tham khảo kiểu dáng và giải pháp thi công."
          />

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((pr) => (
              <ProjectCard key={pr.slug} project={pr} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle
          kicker="Vì sao chọn chúng tôi"
          title="Tư vấn rõ ràng - báo giá minh bạch"
          description="Chúng tôi tối ưu giải pháp theo kích thước và yêu cầu sử dụng để đảm bảo thẩm mỹ lẫn độ bền vận hành."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Tư vấn theo nhu cầu",
              d: "Chọn cấu hình phù hợp, tránh phát sinh không cần thiết.",
            },
            {
              t: "Thi công đồng bộ",
              d: "Hoàn thiện thẩm mỹ, đúng quy trình kiểm tra.",
            },
            {
              t: "Chú trọng an toàn",
              d: "Thiết bị và phụ kiện được chọn để đảm bảo vận hành.",
            },
            {
              t: "Hỗ trợ sau lắp đặt",
              d: "Hướng dẫn sử dụng và lịch kiểm tra định kỳ.",
            },
          ].map((it) => (
            <div
              key={it.t}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="text-sm font-semibold text-slate-950">{it.t}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-600">
                {it.d}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionTitle
            kicker="Góc tư vấn"
            title="Chia sẻ để bạn chọn đúng"
            description="Những bài viết ngắn giúp khách hàng hiểu rõ hơn về chọn vật liệu, quy trình và bảo trì."
          />

          <div className="mt-10 max-w-3xl space-y-10 md:space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="relative border-l-[3px] border-amber-400/90 pl-6 md:pl-8"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-amber-600 md:text-2xl">
                    {post.titleVi}
                  </h3>
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

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center btn-primary text-sm font-semibold"
            >
              Xem tất cả bài viết
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
