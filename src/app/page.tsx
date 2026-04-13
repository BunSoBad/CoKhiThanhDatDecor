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
    <div className="home-page bg-slate-50/80">
      <section className="home-hero shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_36%)]" />
        <div className="hero-spot one animate-float" />
        <div className="hero-spot two animate-float animation-delay-2000" />
        <div className="hero-spot three animate-float animation-delay-4000" />

        <div className="home-hero-grid mx-auto max-w-6.5xl px-38 py-5 md:py-1 animate-slide-up">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <div className="highlight-pill">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Giải pháp cổng cửa sáng tạo
              </div>

              <h1 className="max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl md:text-[2.75rem]">
                Cổng cửa theo nhu cầu thực tế:{" "}
                <span className="hero-highlight">tự động</span> —{" "}
                <span className="hero-highlight">thông minh</span> —{" "}
                <span className="hero-highlight">decor</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-[1.05rem]">
                {BRAND.name} thiết kế, thi công và lắp đặt cổng cửa thông minh
                với phong cách decor đồng bộ, phù hợp thực tế và dễ sử dụng.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/nhan-bao-gia?source=home"
                  className="btn-primary text-sm font-semibold"
                >
                  Nhận báo giá nhanh
                </Link>
                <Link
                  href="/du-an"
                  className="btn-secondary text-sm font-semibold"
                >
                  Xem dự án tiêu biểu
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { value: "100+", label: "Mẫu thiết kế" },
                  { value: "100+", label: "Dự án hoàn thiện" },
                  { value: "24h", label: "Phản hồi nhanh" },
                ].map((item) => (
                  <div key={item.label} className="stat-pill px-5 py-4">
                    <div className="text-2xl font-semibold tabular-nums text-slate-950">
                      {item.value}
                    </div>
                    <div className="stat-pill-label mt-2">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Vận hành êm ái", v: "Độ bền cao, bảo trì dễ dàng" },
                  { k: "Hoàn thiện mặt tiền", v: "Phong cách decor đồng bộ" },
                  { k: "Giải pháp nhanh", v: "Tư vấn và báo giá trong 24h" },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-500">
                      {item.k}
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-panel rounded-[32px] border border-slate-200/70 p-5">
              <div className="grid gap-3">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <img
                    src={products[0]?.heroImageUrl ?? "/img/logo.jpg"}
                    alt={products[0]?.nameVi ?? "Hình ảnh sản phẩm"}
                    className="h-70 w-full object-cover"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <img
                      src={products[1]?.heroImageUrl ?? "/img/logo.jpg"}
                      alt={products[1]?.nameVi ?? "Hình ảnh sản phẩm"}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <img
                      src={projects[0]?.coverImageUrl ?? "/img/logo.jpg"}
                      alt={projects[0]?.nameVi ?? "Hình ảnh dự án"}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-orange-50/80 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
                    Ảnh thực tế
                  </div>
                  <div className="mt-2 text-sm text-slate-700">
                    Bộ sưu tập ảnh thực tế từ sản phẩm và dự án giúp khách hàng
                    hiểu rõ hơn về chất lượng và phong cách hoàn thiện.
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="text-xs font-semibold text-amber-500">
                    Liên hệ
                  </div>
                  <div className="mt-2 text-sm text-slate-700">
                    {BRAND.phone}
                  </div>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-sm text-slate-700 underline-offset-2 transition-colors hover:text-amber-700 hover:underline"
                  >
                    {BRAND.email}
                  </a>
                </div>
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="text-xs font-semibold text-amber-500">
                    Địa chỉ
                  </div>
                  <div className="mt-2 text-sm text-slate-700">
                    {BRAND.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7.5xl px-8 py-7 md:py-8">
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

        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-10xl px-0.1 py-12 md:py-5">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_32px_42px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 md:grid-cols-4">
            <div className="relative flex min-h-[260px] items-center justify-center bg-slate-100 p-3 md:col-span-3 md:min-h-[360px]">
              <img
                src="/img/banner.png"
                alt="Motor SUB 220 Quiko Made in Italy"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-1 md:p-7">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">
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

          <div className="mt-10 grid gap-7 md:grid-cols-2">
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
