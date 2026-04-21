import Link from "next/link";
import { BRAND } from "@/lib/brand";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: `Video Thực Tế | ${BRAND.name}`,
  description:
    "Xem các video thực tế về cổng cửa tự động, thông minh và decor.",
  keywords: [
    "video cổng cửa",
    "video thực tế",
    "video cổng tự động",
    "video cổng decor",
    BRAND.name,
  ],
  openGraph: {
    title: `Video Thực Tế | ${BRAND.name}`,
    description:
      "Khám phá các video thực tế về cổng cửa tự động, thông minh và decor.",
    url: `https://${BRAND.website}/video`,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
  },
};

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Bộ cổng thép sơn tĩnh điện phân khúc ngon bổ rẻ",
    description: "",
    youtubeId: "FPqrZsphh40",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 2,
    title:
      "Bộ cổng tự động cho villa–vừa đẹp vừa tiện👉Thiết kế & lắp đặt tại xưởng",
    description: "",
    youtubeId: "mkpZcmoTqmY",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 3,
    title:
      "Bộ cửa nhà phố bằng thép sơn tĩnh điện, ốp gỗ lam sóng composite lắp khoá thông minh cảm ứng",
    description: "",
    youtubeId: "hTgXpFhSyEE",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 4,
    title:
      "Cổng thép thiết kế hiện đại-Khung thép sơn tĩnh điện chống gỉ-Khóa từ thông minh, an toàn tuyệt đối",
    description: "",
    youtubeId: "eP2meJu8cec",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 5,
    title: "Nhà biệt thự, nhà thông minh là phải có cửa tự động",
    description: "",
    youtubeId: "KPZJblsowEU",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 6,
    title:
      "Nắng không ngại - Mưa không lo - Quan trọng là làm đúng ngay từ đầu",
    description: "",
    youtubeId: "NLURmNhet84",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 7,
    title:
      "Cổng lùa tự động khung thép ốp gỗ nhựa – Xu hướng 2026 Tiện – Đẹp – Sang - Cực kỳ hiện đại",
    description: "",
    youtubeId: "GYtuL9bCWvM",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 8,
    title:
      "Bộ cửa sơn tĩnh điện ốp gỗ nhựa composite tích hợp khoá thông minh - lên hình là lung linh ✨",
    description: "",
    youtubeId: "nEopkcKkDcY",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 9,
    title: "Bộ cửa thép ốp gỗ nhựa lam sóng cực kỳ bắt mắt ",
    description: "",
    youtubeId: "91skdX6vrvw",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 10,
    title: "Cửa tự động cho nhà biệt thự đây các bác ",
    description: "",
    youtubeId: "u_llYBDagmY",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 11,
    title: "Bộ cửa cổng tự động đỡ tốn cơm đây ",
    description: "",
    youtubeId: "J-9hslpv9To",
    thumbnail: "/img/1_1.jpg",
  },
  {
    id: 12,
    title: "Cửa không chỉ để đóng/mở – mà để thể hiện chất riêng",
    description: "",
    youtubeId: "ZM-LovFtZCk",
    thumbnail: "/img/1_1.jpg",
  },
];

export default async function VideoPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="flex-1">
            <SectionTitle
              kicker="Video Thực Tế"
              title="Khám phá Cổng Cửa qua Video"
              description="Xem các video hướng dẫn và giới thiệu chi tiết về các sản phẩm cổng cửa tự động, thông minh và decor."
            />
          </div>
          <Link
            href="https://www.youtube.com/@Th%C3%A0nh%C4%90%E1%BA%A1tDecor"
            target="black"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-600 whitespace-nowrap md:mt-0"
          >
            ► Xem Video Thực Tế
          </Link>
        </div>

        {/* Video Grid - Chỉnh thành 2 cột trên mobile và 4 cột trên desktop */}
        <div className="mt-12 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group overflow-hidden rounded-xl border border-slate-200/50 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Video Thumbnail - Chuyển sang tỉ lệ 9:16 */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-100">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info - Thu nhỏ padding và text cho khớp khung dọc */}
              <div className="space-y-2 p-3 sm:p-4">
                <h3 className="text-base font-bold leading-snug text-slate-950 transition-colors group-hover:text-amber-600 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-slate-950 sm:text-2xl">
              Bạn quan tâm đến sản phẩm nào?
            </h3>
            <p className="mt-2 text-slate-600">
              Liên hệ ngay với chúng tôi để nhận tư vấn miễn phí và báo giá cụ
              thể cho nhu cầu của bạn.
            </p>
            <Link
              href="/lien-he"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
