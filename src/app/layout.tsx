import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.website}`),
  title: BRAND.name,
  description:
    "Thiết kế, gia công và thi công cổng cửa theo nhu cầu. Nhận tư vấn và báo giá nhanh.",
  keywords: [
    "cổng cửa",
    "cổng tự động",
    "cổng thông minh",
    "cổng decor",
    BRAND.name,
    "báo giá cổng cửa",
  ],
  openGraph: {
    title: BRAND.name,
    description:
      "Thiết kế, gia công và thi công cổng cửa theo nhu cầu. Nhận tư vấn và báo giá nhanh.",
    url: `https://${BRAND.website}`,
    siteName: BRAND.name,
    images: [
      {
        url: "/img/logo.jpg",
        alt: BRAND.logoAlt,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description:
      "Thiết kế, gia công và thi công cổng cửa theo nhu cầu. Nhận tư vấn và báo giá nhanh.",
    images: ["/img/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-slate-50 text-slate-950 pb-[env(safe-area-inset-bottom)]">
        <SiteHeader />
        <main className="flex-1">
          <div className="page-transition">{children}</div>
        </main>
        <SiteFooter />
        <Script id="business-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: BRAND.name,
            description:
              "Thiết kế, gia công và thi công cổng cửa tự động, thông minh và decor theo kích thước thực tế.",
            url: `https://${BRAND.website}`,
            telephone: BRAND.phone,
            email: BRAND.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: BRAND.address,
            },
            image: `https://${BRAND.website}${BRAND.logoUrl}`,
            sameAs: [BRAND.facebookUrl].filter(Boolean),
          })}
        </Script>
      </body>
    </html>
  );
}
