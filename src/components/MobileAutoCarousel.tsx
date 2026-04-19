"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselImage {
  url: string;
  alt: string;
}

export function MobileAutoCarousel({ images }: { images: CarouselImage[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // Chuyển ảnh mỗi 3 giây

    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full h-56 bg-slate-200 rounded-xl flex items-center justify-center">
        <span className="text-slate-500">Không có ảnh</span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      {/* Carousel Container */}
      <div className="relative h-56 w-full sm:h-80 bg-slate-100">
        {/* Images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Indicators - chỉ hiển thị khi có nhiều hơn 1 ảnh */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === current
                  ? "w-6 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/40 text-white px-2 py-1 rounded text-xs font-medium z-10">
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
