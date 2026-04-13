"use client";

import { useCallback, useEffect, useState } from "react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ZoomableImage({ src, alt, className = "" }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full border-0 bg-transparent p-0 text-left"
        aria-label={`Phóng to ảnh: ${alt || "xem ảnh"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`cursor-zoom-in transition-opacity hover:opacity-95 ${className}`}
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[210] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={close}
            aria-label="Đóng ảnh phóng to"
          />
          <div className="relative z-10 max-h-[82vh] max-w-[88vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[82vh] max-w-[88vw] object-contain"
            />
            <button
              type="button"
              onClick={close}
              className="mx-auto mt-3 block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-900"
            >
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

