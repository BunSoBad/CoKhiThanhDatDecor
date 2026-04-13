import { Prisma } from "@/generated/prisma/client";
import { prisma } from "./prisma";
import { BRAND } from "./brand";
import { slugifyVi } from "./slug";

export type CategoryLite = {
  id?: string;
  nameVi: string;
  slug: string;
  description?: string | null;
};

export type ProductLite = {
  id?: string;
  nameVi: string;
  slug: string;
  categoryId?: string | null;
  summary?: string | null;
  description?: string | null;
  heroImageUrl?: string | null;
  galleryImageUrls?: string[] | null;
  attributes?: Record<string, unknown> | null;
  isFeatured?: boolean;
};

export type ProjectLite = {
  id?: string;
  nameVi: string;
  slug: string;
  coverImageUrl?: string | null;
  summary?: string | null;
  description?: string | null;
  galleryImageUrls?: string[] | null;
  isFeatured?: boolean;
};

export type PostLite = {
  id?: string;
  titleVi: string;
  slug: string;
  excerptVi?: string | null;
  contentVi?: string;
  coverImageUrl?: string | null;
  isFeatured?: boolean;
};

export type QuoteRequestLite = {
  id?: string;
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  sizeNote: string;
  message?: string | null;
  leadSource: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  product?: { nameVi: string; slug: string } | null;
  category?: { nameVi: string; slug: string } | null;
};

export async function getQuoteRequests(): Promise<QuoteRequestLite[]> {
  try {
    const rows = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        address: true,
        sizeNote: true,
        message: true,
        leadSource: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        product: { select: { nameVi: true, slug: true } },
        category: { select: { nameVi: true, slug: true } },
      },
    });

    return rows.map((row) => ({
      ...row,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("[data] getQuoteRequests failed:", error);
    return [];
  }
}

export async function deleteQuoteRequest(id: string): Promise<boolean> {
  try {
    await prisma.quoteRequest.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("[data] deleteQuoteRequest failed:", error);
    return false;
  }
}

export async function updateQuoteRequestStatus(
  id: string,
  status: "NEW" | "CONTACTED" | "WON" | "LOST",
): Promise<boolean> {
  try {
    await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });
    return true;
  } catch (error) {
    console.error("[data] updateQuoteRequestStatus failed:", error);
    return false;
  }
}

export async function removeFeaturedProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.update({
      where: { id },
      data: { isFeatured: false },
    });
    return true;
  } catch (error) {
    console.error("[data] removeFeaturedProduct failed:", error);
    return false;
  }
}

export async function removeFeaturedProject(id: string): Promise<boolean> {
  try {
    await prisma.projectCase.update({
      where: { id },
      data: { isFeatured: false },
    });
    return true;
  } catch (error) {
    console.error("[data] removeFeaturedProject failed:", error);
    return false;
  }
}

export async function addFeaturedProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.update({
      where: { id },
      data: { isFeatured: true },
    });
    return true;
  } catch (error) {
    console.error("[data] addFeaturedProduct failed:", error);
    return false;
  }
}

export async function addFeaturedProject(id: string): Promise<boolean> {
  try {
    await prisma.projectCase.update({
      where: { id },
      data: { isFeatured: true },
    });
    return true;
  } catch (error) {
    console.error("[data] addFeaturedProject failed:", error);
    return false;
  }
}

export async function addFeaturedProductBySlug(slug: string): Promise<boolean> {
  try {
    await prisma.product.update({
      where: { slug },
      data: { isFeatured: true },
    });
    return true;
  } catch (error) {
    console.error("[data] addFeaturedProductBySlug failed:", error);
    return false;
  }
}

export async function removeFeaturedProductBySlug(
  slug: string,
): Promise<boolean> {
  try {
    await prisma.product.update({
      where: { slug },
      data: { isFeatured: false },
    });
    return true;
  } catch (error) {
    console.error("[data] removeFeaturedProductBySlug failed:", error);
    return false;
  }
}

export async function addFeaturedProjectBySlug(slug: string): Promise<boolean> {
  try {
    await prisma.projectCase.update({
      where: { slug },
      data: { isFeatured: true },
    });
    return true;
  } catch (error) {
    console.error("[data] addFeaturedProjectBySlug failed:", error);
    return false;
  }
}

export async function removeFeaturedProjectBySlug(
  slug: string,
): Promise<boolean> {
  try {
    await prisma.projectCase.update({
      where: { slug },
      data: { isFeatured: false },
    });
    return true;
  } catch (error) {
    console.error("[data] removeFeaturedProjectBySlug failed:", error);
    return false;
  }
}

export type ProductAdminRow = ProductLite & { id: string };
export type ProjectAdminRow = ProjectLite & { id: string };

export type ProductAdminWrite = {
  nameVi: string;
  slug?: string | null;
  summary?: string | null;
  description?: string | null;
  heroImageUrl?: string | null;
  galleryImageUrls?: string[] | null;
  isFeatured: boolean;
};

export type ProjectAdminWrite = {
  nameVi: string;
  slug?: string | null;
  summary?: string | null;
  description?: string | null;
  coverImageUrl?: string | null;
  galleryImageUrls?: string[] | null;
  isFeatured: boolean;
};

async function uniqueProductSlug(
  base: string,
  excludeId?: string,
): Promise<string> {
  let slug = slugifyVi(base);
  if (!slug) slug = "san-pham";
  let n = 0;
  for (;;) {
    const candidate = n === 0 ? slug : `${slug}-${n}`;
    const row = await prisma.product.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!row || row.id === excludeId) return candidate;
    n += 1;
  }
}

async function uniqueProjectSlug(
  base: string,
  excludeId?: string,
): Promise<string> {
  let slug = slugifyVi(base);
  if (!slug) slug = "du-an";
  let n = 0;
  for (;;) {
    const candidate = n === 0 ? slug : `${slug}-${n}`;
    const row = await prisma.projectCase.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!row || row.id === excludeId) return candidate;
    n += 1;
  }
}

export async function listProductsForAdmin(): Promise<ProductAdminRow[]> {
  try {
    const rows = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        nameVi: true,
        slug: true,
        categoryId: true,
        summary: true,
        description: true,
        heroImageUrl: true,
        galleryImageUrls: true,
        attributes: true,
        isFeatured: true,
      },
    });
    return rows.map((p) => ({
      ...p,
      galleryImageUrls:
        (p.galleryImageUrls as unknown as string[] | null) ?? null,
      attributes:
        (p.attributes as unknown as Record<string, unknown> | null) ?? null,
    }));
  } catch (e) {
    console.error("[data] listProductsForAdmin failed:", e);
    return [];
  }
}

export async function listProjectsForAdmin(): Promise<ProjectAdminRow[]> {
  try {
    const rows = await prisma.projectCase.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        nameVi: true,
        slug: true,
        coverImageUrl: true,
        summary: true,
        description: true,
        galleryImageUrls: true,
        isFeatured: true,
      },
    });
    return rows.map((p) => ({
      ...p,
      galleryImageUrls:
        (p.galleryImageUrls as unknown as string[] | null) ?? null,
    }));
  } catch (e) {
    console.error("[data] listProjectsForAdmin failed:", e);
    return [];
  }
}

export async function createProductFromAdmin(
  input: ProductAdminWrite,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    const raw = (input.slug && input.slug.trim()) || input.nameVi;
    const slug = await uniqueProductSlug(raw);
    const gallery = input.galleryImageUrls?.filter(Boolean) ?? [];
    const row = await prisma.product.create({
      data: {
        nameVi: input.nameVi.trim(),
        slug,
        summary: input.summary?.trim() || null,
        description: input.description?.trim() || null,
        heroImageUrl: input.heroImageUrl?.trim() || null,
        galleryImageUrls: gallery.length > 0 ? gallery : undefined,
        isFeatured: input.isFeatured,
        priceModel: "quote",
        sortOrder: 0,
      },
    });
    return { ok: true, id: row.id };
  } catch (e) {
    console.error("[data] createProductFromAdmin failed:", e);
    return { ok: false, error: "Không thể tạo sản phẩm" };
  }
}

export async function updateProductFromAdmin(
  id: string,
  input: ProductAdminWrite,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const raw = (input.slug && input.slug.trim()) || input.nameVi;
    const slug = await uniqueProductSlug(raw, id);
    const gallery = input.galleryImageUrls?.filter(Boolean) ?? [];
    await prisma.product.update({
      where: { id },
      data: {
        nameVi: input.nameVi.trim(),
        slug,
        summary: input.summary?.trim() || null,
        description: input.description?.trim() || null,
        heroImageUrl: input.heroImageUrl?.trim() || null,
        galleryImageUrls: gallery.length > 0 ? gallery : Prisma.JsonNull,
        isFeatured: input.isFeatured,
      },
    });
    return { ok: true };
  } catch (e) {
    console.error("[data] updateProductFromAdmin failed:", e);
    return { ok: false, error: "Không thể cập nhật sản phẩm" };
  }
}

export async function deleteProductFromAdmin(id: string): Promise<boolean> {
  try {
    await prisma.quoteRequest.updateMany({
      where: { productId: id },
      data: { productId: null },
    });
    await prisma.product.delete({ where: { id } });
    return true;
  } catch (e) {
    console.error("[data] deleteProductFromAdmin failed:", e);
    return false;
  }
}

export async function createProjectFromAdmin(
  input: ProjectAdminWrite,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    const raw = (input.slug && input.slug.trim()) || input.nameVi;
    const slug = await uniqueProjectSlug(raw);
    const gallery = input.galleryImageUrls?.filter(Boolean) ?? [];
    const row = await prisma.projectCase.create({
      data: {
        nameVi: input.nameVi.trim(),
        slug,
        summary: input.summary?.trim() || null,
        description: input.description?.trim() || null,
        coverImageUrl: input.coverImageUrl?.trim() || null,
        galleryImageUrls: gallery.length > 0 ? gallery : undefined,
        isFeatured: input.isFeatured,
        sortOrder: 0,
      },
    });
    return { ok: true, id: row.id };
  } catch (e) {
    console.error("[data] createProjectFromAdmin failed:", e);
    return { ok: false, error: "Không thể tạo dự án" };
  }
}

export async function updateProjectFromAdmin(
  id: string,
  input: ProjectAdminWrite,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const raw = (input.slug && input.slug.trim()) || input.nameVi;
    const slug = await uniqueProjectSlug(raw, id);
    const gallery = input.galleryImageUrls?.filter(Boolean) ?? [];
    await prisma.projectCase.update({
      where: { id },
      data: {
        nameVi: input.nameVi.trim(),
        slug,
        summary: input.summary?.trim() || null,
        description: input.description?.trim() || null,
        coverImageUrl: input.coverImageUrl?.trim() || null,
        galleryImageUrls: gallery.length > 0 ? gallery : Prisma.JsonNull,
        isFeatured: input.isFeatured,
      },
    });
    return { ok: true };
  } catch (e) {
    console.error("[data] updateProjectFromAdmin failed:", e);
    return { ok: false, error: "Không thể cập nhật dự án" };
  }
}

export async function deleteProjectFromAdmin(id: string): Promise<boolean> {
  try {
    await prisma.projectCase.delete({ where: { id } });
    return true;
  } catch (e) {
    console.error("[data] deleteProjectFromAdmin failed:", e);
    return false;
  }
}

export async function getAllProducts(): Promise<ProductLite[]> {
  try {
    const rows = (await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }],
      select: {
        id: true,
        nameVi: true,
        slug: true,
        categoryId: true,
        summary: true,
        description: true,
        heroImageUrl: true,
        galleryImageUrls: true,
        attributes: true,
        isFeatured: true,
      },
    })) as Array<{
      id: string;
      nameVi: string;
      slug: string;
      categoryId: string | null;
      summary: string | null;
      description: string | null;
      heroImageUrl: string | null;
      galleryImageUrls: unknown;
      attributes: unknown;
      isFeatured: boolean;
    }>;

    if (rows.length > 0) {
      return rows.map((product) => ({
        ...product,
        galleryImageUrls:
          (product.galleryImageUrls as unknown as string[] | null) ?? null,
        attributes:
          (product.attributes as unknown as Record<string, unknown> | null) ??
          null,
      }));
    }
  } catch (error) {
    console.error("[data] getAllProducts failed:", error);
  }

  return FALLBACK_PRODUCTS;
}

export async function getAllProjects(): Promise<ProjectLite[]> {
  try {
    const rows = (await prisma.projectCase.findMany({
      orderBy: [{ sortOrder: "asc" }],
      select: {
        id: true,
        nameVi: true,
        slug: true,
        coverImageUrl: true,
        summary: true,
        description: true,
        galleryImageUrls: true,
        isFeatured: true,
      },
    })) as Array<{
      id: string;
      nameVi: string;
      slug: string;
      coverImageUrl: string | null;
      summary: string | null;
      description: string | null;
      galleryImageUrls: unknown;
      isFeatured: boolean;
    }>;

    if (rows.length > 0) {
      return rows.map((project) => ({
        ...project,
        galleryImageUrls:
          (project.galleryImageUrls as unknown as string[] | null) ?? null,
      }));
    }
  } catch (error) {
    console.error("[data] getAllProjects failed:", error);
  }

  return FALLBACK_PROJECTS;
}

const FALLBACK_CATEGORIES: CategoryLite[] = [
  {
    nameVi: "Cửa cổng tự động",
    slug: "cong-tu-dong",
    description:
      "Tự động hóa cổng ra vào với độ bền cao, vận hành êm và an toàn.",
  },
  {
    nameVi: "Cửa cổng thông minh",
    slug: "cong-thong-minh",
    description:
      "Điều khiển linh hoạt, tích hợp nhiều tùy chọn theo nhu cầu sử dụng.",
  },
  {
    nameVi: "Cửa cổng decor",
    slug: "cong-decor",
    description:
      "Thiết kế theo phong cách thẩm mỹ, tạo điểm nhấn sang trọng cho mặt tiền.",
  },
];

const FALLBACK_PRODUCTS: ProductLite[] = [
  {
    nameVi: "Cổng mở cánh tự động",
    slug: "cong-mo-canh-tu-dong",
    categoryId: null,
    summary: "Phù hợp nhiều mặt bằng, đóng mở mượt và an toàn.",
    description:
      "Cổng mở cánh tự động với hệ truyền động và cảm biến an toàn. Tùy theo bề rộng và vật liệu cổng, chúng tôi sẽ đề xuất cấu hình phù hợp để đảm bảo hiệu suất.",
    heroImageUrl: "/img/101.jpg",
    galleryImageUrls: [
      "/img/1_1.jpg",
      "/img/1_2.jpg",
      "/img/1_3.jpg",
      "/img/1_4.jpg",
    ],
    attributes: {
      "Ứng dụng": "Nhà ở / xưởng",
      "Gợi ý vật liệu": "Sắt hộp / thép / inox",
      "Điểm nhấn":
        "Đóng mở ổn định, kết hợp điều khiển từ xa, app và khóa điện tử",
    },
    isFeatured: true,
  },
  {
    nameVi: "Cổng trượt tự động",
    slug: "cong-truot-tu-dong",
    categoryId: null,
    summary: "Lắp đặt cho biệt thự/nhà phố, vận hành mượt, chịu lực tốt.",
    description:
      "Giải pháp cổng trượt tự động cho mặt tiền nhà ở: thiết kế gọn gàng, vận hành ổn định theo thời gian. Quý khách vui lòng cung cấp kích thước để chúng tôi tư vấn cấu hình phù hợp.",
    heroImageUrl: "/img/102.jpg",
    galleryImageUrls: ["/img/102_1.jpg"],
    attributes: {
      "Ứng dụng": "Biệt thự / nhà phố",
      "Gợi ý vật liệu": "Inox / thép sơn tĩnh điện",
      "Điểm nhấn":
        "Vận hành êm, an toàn, kết hợp điều khiển từ xa, app và khóa điện tử",
    },
    isFeatured: true,
  },

  {
    nameVi: "Cổng decor phong cách hiện đại",
    slug: "cong-decor-hien-dai",
    categoryId: null,
    summary: "Thẩm mỹ cao, đồng bộ tổng thể kiến trúc mặt tiền.",
    description:
      "Thiết kế cổng theo phong cách decor nhằm tạo điểm nhấn cho mặt tiền. Chúng tôi sẽ tư vấn kiểu dáng, màu sắc và chất liệu theo yêu cầu.",
    heroImageUrl: "/img/103.jpg",
    galleryImageUrls: [
      "/img/103_1.jpg",
      "/img/103_2.jpg",
      "/img/103_3.jpg",
      "/img/103_4.jpg",
      "/img/103_5.jpg",
      "/img/103_6.jpg",
      "/img/103_7.jpg",
      "/img/103_8.jpg",
      "/img/103_9.jpg",
      "/img/103_10.jpg",
      "/img/103_11.jpg",
      "/img/103_12.jpg",
    ],
    attributes: {
      "Phong cách": "Hiện đại",
      "Gợi ý chất liệu": "Gỗ nhựa composite / inox",
      "Điểm nhấn": "Tạo điểm nhấn sang trọng",
    },
    isFeatured: true,
  },
];

const FALLBACK_PROJECTS: ProjectLite[] = [
  {
    nameVi: "Dự án cổng trượt tự động",
    slug: "du-an-cong-truot",
    summary: "Vận hành mượt, thiết kế gọn gàng, phù hợp mặt tiền hiện đại.",
    description:
      "Case triển khai cổng trượt tự động. Nội dung mô tả ngắn gọn: tư vấn theo kích thước, chọn cấu hình truyền động phù hợp và hoàn thiện thẩm mỹ.",
    coverImageUrl: "/img/2_1.jpg",
    galleryImageUrls: [
      "/img/2_2.jpg",
      "/img/2_3.jpg",
      "/img/2_4.jpg",
      "/img/2_5.jpg",
    ],
    isFeatured: true,
  },
  {
    nameVi: "Dự án cổng mở cánh tự động",
    slug: "du-an-cong-mo-canh-tu-dong",
    summary: "Giải pháp điều khiển linh hoạt, tối ưu trải nghiệm sử dụng.",
    description:
      "Case triển khai cổng mở cánh tự động. Tối ưu cấu hình theo nhu cầu: tốc độ, an toàn, và khả năng quản lý ra vào.",
    coverImageUrl: "/img/1_1.jpg",
    galleryImageUrls: [
      "/img/1_1.jpg",
      "/img/1_2.jpg",
      "/img/1_3.jpg",
      "/img/1_4.jpg",
    ],
    isFeatured: true,
  },
  {
    nameVi: "Dự án cổng decor theo kiến trúc",
    slug: "du-an-cong-decor",
    summary: "Đồng bộ màu sắc, tạo điểm nhấn mặt tiền.",
    description:
      "Case triển khai cổng decor: lựa chọn phong cách và hoàn thiện đồng bộ với tổng thể kiến trúc.",
    coverImageUrl: "/img/3_1.jpg",
    galleryImageUrls: [
      "/img/3_1.jpg",
      "/img/3_2.jpg",
      "/img/3_3.jpg",
      "/img/3_4.jpg",
    ],
    isFeatured: true,
  },

  {
    nameVi: "Dự án cổng decor theo kiến trúc",
    slug: "du-an-cong-decor1",
    summary: "Đồng bộ màu sắc, tạo điểm nhấn mặt tiền.",
    description:
      "Case triển khai cổng decor: lựa chọn phong cách và hoàn thiện đồng bộ với tổng thể kiến trúc.",
    coverImageUrl: "/img/4_1.jpg",
    galleryImageUrls: [
      "/img/4_1.jpg",
      "/img/4_2.jpg",
      "/img/4_3.jpg",
      "/img/4_4.jpg",
    ],
    isFeatured: true,
  },

  {
    nameVi: "Dự án cổng decor theo kiến trúc",
    slug: "du-an-cong-decor2",
    summary: "Đồng bộ màu sắc, tạo điểm nhấn mặt tiền.",
    description:
      "Case triển khai cổng decor: lựa chọn phong cách và hoàn thiện đồng bộ với tổng thể kiến trúc.",
    coverImageUrl: "/img/5_1.jpg",
    galleryImageUrls: [
      "/img/5_1.jpg",
      "/img/5_2.jpg",
      "/img/5_3.jpg",
      "/img/5_4.jpg",
    ],
    isFeatured: true,
  },

  {
    nameVi: "Dự án cổng decor theo kiến trúc",
    slug: "du-an-cong-decor3",
    summary: "Đồng bộ màu sắc, tạo điểm nhấn mặt tiền.",
    description:
      "Case triển khai cổng decor: lựa chọn phong cách và hoàn thiện đồng bộ với tổng thể kiến trúc.",
    coverImageUrl: "/img/6_1.jpg",
    galleryImageUrls: [
      "/img/6_1.jpg",
      "/img/6_2.jpg",
      "/img/6_3.jpg",
      "/img/6_4.jpg",
    ],
    isFeatured: true,
  },
];

const FALLBACK_POSTS: PostLite[] = [
  {
    titleVi: "Chọn loại cổng phù hợp theo mặt tiền",
    slug: "chon-loai-cong-phu-hop",
    excerptVi: "Những gợi ý nhanh để chọn đúng loại cổng cho biệt thự/nhà phố.",
    contentVi:
      "## Vì sao cần chọn đúng loại cổng?\n- Tối ưu công năng\n- Đảm bảo thẩm mỹ\n- Tính toán phù hợp theo bề rộng\n\n## Gợi ý nhanh\nHãy gửi **kích thước thực tế** để chúng tôi tư vấn cấu hình phù hợp nhất.",
    coverImageUrl: null,
    isFeatured: true,
  },
  {
    titleVi: "Vật liệu & độ bền: nên ưu tiên gì?",
    slug: "vat-lieu-do-ben",
    excerptVi: "Chọn vật liệu sao cho bền đẹp và dễ bảo trì theo thời gian.",
    contentVi:
      "## Nguyên tắc chọn vật liệu\n- Chống ăn mòn\n- Chịu thời tiết\n- Dễ vệ sinh, bảo trì\n\nGửi cho chúng tôi yêu cầu để nhận tư vấn chi tiết.",
    coverImageUrl: null,
    isFeatured: true,
  },
  {
    titleVi: "Bảo trì cổng thông minh để dùng lâu dài",
    slug: "bao-tri-cong-thong-minh",
    excerptVi: "Lịch kiểm tra định kỳ giúp giảm rủi ro và nâng tuổi thọ.",
    contentVi:
      "## Nên kiểm tra định kỳ\n- Bộ truyền động\n- Cảm biến an toàn\n- Nguồn cấp\n\n## Khi nào nên gọi kỹ thuật?\nNếu cổng chạy không đều hoặc có tiếng lạ, hãy liên hệ đội kỹ thuật.",
    coverImageUrl: null,
    isFeatured: true,
  },
];

export async function getActiveCategories(): Promise<CategoryLite[]> {
  try {
    const rows = (await prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }],
      select: { id: true, nameVi: true, slug: true, description: true },
    })) as Array<{
      id: string;
      nameVi: string;
      slug: string;
      description: string | null;
    }>;

    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        nameVi: r.nameVi,
        slug: r.slug,
        description: r.description,
      }));
    }
  } catch (error) {
    console.error("[data] getActiveCategories failed:", error);
  }

  return FALLBACK_CATEGORIES;
}

export async function getFeaturedProducts(): Promise<ProductLite[]> {
  try {
    const rows = (await prisma.product.findMany({
      where: { isFeatured: true, priceModel: "quote" },
      orderBy: [{ sortOrder: "asc" }],
      select: {
        id: true,
        nameVi: true,
        slug: true,
        categoryId: true,
        summary: true,
        description: true,
        heroImageUrl: true,
        galleryImageUrls: true,
        attributes: true,
        isFeatured: true,
      },
    })) as Array<{
      id: string;
      nameVi: string;
      slug: string;
      categoryId: string | null;
      summary: string | null;
      description: string | null;
      heroImageUrl: string | null;
      galleryImageUrls: unknown;
      attributes: unknown;
      isFeatured: boolean;
    }>;

    if (rows.length > 0) {
      return rows.map((p) => ({
        ...p,
        galleryImageUrls:
          (p.galleryImageUrls as unknown as string[] | null) ?? null,
        attributes:
          (p.attributes as unknown as Record<string, unknown> | null) ?? null,
      }));
    }
  } catch (error) {
    console.error("[data] getFeaturedProducts failed:", error);
  }

  return FALLBACK_PRODUCTS;
}

function findFallbackProductBySlug(slug: string): ProductLite | null {
  return FALLBACK_PRODUCTS.find((product) => product.slug === slug) ?? null;
}

function findFallbackCategoryBySlug(slug: string): CategoryLite | null {
  return FALLBACK_CATEGORIES.find((category) => category.slug === slug) ?? null;
}

function findFallbackProjectBySlug(slug: string): ProjectLite | null {
  return FALLBACK_PROJECTS.find((project) => project.slug === slug) ?? null;
}

function findFallbackPostBySlug(slug: string): PostLite | null {
  return FALLBACK_POSTS.find((post) => post.slug === slug) ?? null;
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductLite | null> {
  try {
    const row = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        nameVi: true,
        slug: true,
        categoryId: true,
        summary: true,
        description: true,
        heroImageUrl: true,
        galleryImageUrls: true,
        attributes: true,
      },
    });
    if (!row) return findFallbackProductBySlug(slug);

    return {
      ...row,
      galleryImageUrls:
        (row.galleryImageUrls as unknown as string[] | null) ?? null,
      attributes:
        (row.attributes as unknown as Record<string, unknown> | null) ?? null,
    };
  } catch (error) {
    console.error("[data] getProductBySlug failed:", error);
    return findFallbackProductBySlug(slug);
  }
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryLite | null> {
  try {
    const row = await prisma.category.findUnique({
      where: { slug },
      select: { id: true, nameVi: true, slug: true, description: true },
    });
    if (row && row.id) {
      return {
        id: row.id,
        nameVi: row.nameVi,
        slug: row.slug,
        description: row.description,
      };
    }
  } catch (error) {
    console.error("[data] getCategoryBySlug failed:", error);
  }
  return findFallbackCategoryBySlug(slug);
}

export async function getProductsByCategorySlug(
  slug: string,
): Promise<ProductLite[]> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!category) {
      return FALLBACK_PRODUCTS;
    }

    const rows = (await prisma.product.findMany({
      where: { categoryId: category.id, priceModel: "quote" },
      orderBy: [{ sortOrder: "asc" }],
      select: {
        id: true,
        nameVi: true,
        slug: true,
        categoryId: true,
        summary: true,
        description: true,
        heroImageUrl: true,
        galleryImageUrls: true,
        attributes: true,
        isFeatured: true,
      },
    })) as Array<{
      id: string;
      nameVi: string;
      slug: string;
      categoryId: string | null;
      summary: string | null;
      description: string | null;
      heroImageUrl: string | null;
      galleryImageUrls: unknown;
      attributes: unknown;
      isFeatured: boolean;
    }>;

    if (rows.length > 0) {
      return rows.map((p) => ({
        ...p,
        galleryImageUrls:
          (p.galleryImageUrls as unknown as string[] | null) ?? null,
        attributes:
          (p.attributes as unknown as Record<string, unknown> | null) ?? null,
      }));
    }
  } catch (error) {
    console.error("[data] getProductsByCategorySlug failed:", error);
  }

  return FALLBACK_PRODUCTS;
}

export async function getFeaturedProjects(): Promise<ProjectLite[]> {
  try {
    const rows = (await prisma.projectCase.findMany({
      where: { isFeatured: true },
      orderBy: [{ sortOrder: "asc" }],
      select: {
        id: true,
        nameVi: true,
        slug: true,
        coverImageUrl: true,
        summary: true,
        description: true,
        galleryImageUrls: true,
        isFeatured: true,
      },
    })) as Array<{
      id: string;
      nameVi: string;
      slug: string;
      coverImageUrl: string | null;
      summary: string | null;
      description: string | null;
      galleryImageUrls: unknown;
      isFeatured: boolean;
    }>;
    if (rows.length > 0) {
      return rows.map((p) => ({
        ...p,
        galleryImageUrls:
          (p.galleryImageUrls as unknown as string[] | null) ?? null,
      }));
    }
  } catch (error) {
    console.error("[data] getFeaturedProjects failed:", error);
  }
  return FALLBACK_PROJECTS;
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectLite | null> {
  try {
    const row = await prisma.projectCase.findUnique({
      where: { slug },
      select: {
        id: true,
        nameVi: true,
        slug: true,
        coverImageUrl: true,
        summary: true,
        description: true,
        galleryImageUrls: true,
      },
    });
    if (!row) return findFallbackProjectBySlug(slug);
    return {
      ...row,
      galleryImageUrls:
        (row.galleryImageUrls as unknown as string[] | null) ?? null,
    };
  } catch (error) {
    console.error("[data] getProjectBySlug failed:", error);
    return findFallbackProjectBySlug(slug);
  }
}

export async function getFeaturedPosts(): Promise<PostLite[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { isFeatured: true },
      orderBy: [{ sortOrder: "asc" }],
      select: {
        id: true,
        titleVi: true,
        slug: true,
        excerptVi: true,
        contentVi: true,
        coverImageUrl: true,
        isFeatured: true,
      },
    });
    if (rows.length > 0) return rows;
  } catch (error) {
    console.error("[data] getFeaturedPosts failed:", error);
  }
  return FALLBACK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<PostLite | null> {
  try {
    const row = await prisma.post.findUnique({
      where: { slug },
      select: {
        id: true,
        titleVi: true,
        slug: true,
        excerptVi: true,
        contentVi: true,
        coverImageUrl: true,
      },
    });
    if (!row) return findFallbackPostBySlug(slug);
    return row;
  } catch (error) {
    console.error("[data] getPostBySlug failed:", error);
    return findFallbackPostBySlug(slug);
  }
}

export function getBrandCTAUrl() {
  return `/nhan-bao-gia?source=home&brand=${encodeURIComponent(BRAND.name)}`;
}
