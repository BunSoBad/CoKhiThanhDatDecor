"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { useState } from "react";

const doorGalleryImages = [
  "/img/50_1.jpg",
  "/img/50_2.jpg",
  "/img/50_3.jpg",
  "/img/50_4.jpg",
  "/img/50_5.jpg",
  "/img/50_6.jpg",
  "/img/50_7.jpg",
  "/img/50_8.jpg",
  "/img/50_9.jpg",
  "/img/50_10.jpg",
  "/img/50_11.jpg",
  "/img/50_12.jpg",
  "/img/50_13.jpg",
  "/img/50_14.jpg",
  "/img/50_15.jpg",
  "/img/50_16.jpg",
  "/img/50_17.jpg",
  "/img/50_18.jpg",
  "/img/50_19.jpg",
  "/img/50_20.jpg",
  "/img/50_21.jpg",
  "/img/50_22.jpg",
  "/img/50_23.jpg",
  "/img/50_24.jpg",
  "/img/50_25.jpg",
  "/img/50_26.jpg",
  "/img/50_27.jpg",
  "/img/50_28.jpg",
  "/img/50_29.jpg",
  "/img/50_30.jpg",
  "/img/50_31.jpg",
  "/img/50_32.jpg",
  "/img/50_33.jpg",
  "/img/50_34.jpg",
  "/img/50_35.jpg",
  "/img/50_36.jpg",
];

// Thông số kỹ thuật các mẫu cửa
const doorSpecifications = [
  {
    model: 1,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, thép CNC 3li, ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 2,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, thép đan ô 3li, ốp gỗ composite 2 mặt ngoài trời",
    price: "3.500.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 3,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, thép CNC 3li, ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 4,
    description:
      "Khung 50x50x1.4 kết hợp 13x26x1.4 ốp thép CNC 3li sơn tĩnh điện, ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay, chốt cửa, tay nắm cửa.",
  },
  {
    model: 5,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, thép CNC 3li, ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay, chốt cửa, tay nắm cửa.",
  },
  {
    model: 6,
    description:
      "Khung sử dụng thép 40x80x1.4 kết hợp đan 20x40x1.4, ốp thép CNC dày 2li sơn tĩnh điện và ốp gỗ nhựa composite 1 mặt ngoài trời.",
    price: "2.300.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "Màu Teak",
    accessories: "Bản lề cối xoay, chốt cửa, tay nắm cửa.",
  },
  {
    model: 7,
    description:
      "Khung 40x80x1.4 đan 13x26x1.4 ốp thép sơn tĩnh điện, núm sắt sơn nhũ vàng, ốp gỗ nhựa composite 1 mặt ngoài trời.",
    price: "2.200.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Teak",
    accessories: "Bản lề cối xoay, chốt cửa, tay nắm cửa.",
  },
  {
    model: 8,
    description: "Khung 40x40x1.4 đan 40x40x1.4 ốp thép tấm 2li sơn tĩnh điện.",
    price: "2.400.000/m2",
    material: "Thép sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Xám Ghi",
    accessories: "Bản lề cối xoay, chốt cửa, tay nắm cửa.",
  },
  {
    model: 9,
    description:
      "Khung 40x80x1.4 đan 13x26x1.4 ốp thép sơn tĩnh điện, núm sắt sơn nhũ vàng, ốp gỗ nhựa composite 1 mặt ngoài trời",
    price: "2.100.000/m2",
    material: "Thép sơn tĩnh điện, Nhôm basi, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Teak",
    accessories: "Bản lề cối xoay, chốt cửa, tay nắm cửa.",
  },
  {
    model: 10,
    description:
      "Khung 50x50x1.4 đan kết hợp 50x100x1.4 25x50x1.4 ốp thép tấm 2li sơn tĩnh điện",
    price: "2.600.000/m2",
    material: "Thép sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "Anthracite Grey",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 11,
    description:
      "Khung 50x100x1.4 đan 25x50x1.4 ốp thép CNC 2li sơn tĩnh điện, núm sắt sơn nhũ vàng, ốp gỗ nhựa composite 1 mặt ngoài Trời",
    price: "2.300.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Teak",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 12,
    description:
      "Khung 40x80x1.4 đan 20x40x1.4 ốp thép CNC 2li sơn tĩnh điện, ốp gỗ nhựa composite 1 mặt ngoài Trời",
    price: "2.100.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 13,
    description:
      "Khung 50x50x1.4 đan kết hợp 50x100x1.4 25x50x1.4 ốp thép tấm 2li sơn tĩnh điện",
    price: "2.600.000/m2",
    material: "Thép sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "Anthracite Grey",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 14,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5 li sơn tĩnh điện, thép CNC 3li ốp gỗ nhựa composite 2 mặt ngoài Trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 15,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, thép CNC 3li, ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 16,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Depwood",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 17,
    description:
      "Khung thép 50x50x1.4 đan thép 25x50x1.4, ốp thép tấm CNC 2li sơn tĩnh điện",
    price: "2.500.000/m2",
    material: "Thép sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Xám Ghi",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 18,
    description:
      "Khung thép 50x50x1.4 kết hợp 50x100x1.4 đan thép 25x50x1.4, ốp thép tấm CNC 2li sơn tĩnh điện",
    price: "2.500.000/m2",
    material: "Thép sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "Anthracite Grey",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 19,
    description:
      "Khung thép 50x50x1.4 kết hợp 50x100x1.4 đan thép 25x50x1.4, ốp thép tấm CNC 2li sơn tĩnh điện",
    price: "2.500.000/m2",
    material: "Thép sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Xám Ghi",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 20,
    description:
      "Khung 50x50x1,4 kết hợp 13x26x1,4 ốp thép CNC 3li sơn tĩnh điện, ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 21,
    description:
      "Khung thép 50x50x1.4 đan thép 25x50x1.4 ốp thép tấm CNC 2li sơn tĩnh điện",
    price: "2.500.000/m2",
    material: "Thép sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "Anthracite Grey",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 22,
    description:
      "Khung 40x80x1.4 đan 13x26x1.4 ốp thép sơn tĩnh điện, núm sắt sơn nhũ vàng ốp gỗ nhựa composite 1 mặt ngoài trời",
    price: "2.300.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Teak",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 23,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, thép CNC 2li ốp gỗ nhựa composite 2 mặt ngoài trời",
    price: "3.200.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Depwood",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 24,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 ốp thép CNC 5li sơn tĩnh điện, thép đan ô 3li, ốp gỗ composite 2 mặt phủi ASA ngoài trời",
    price: "3.500.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite phủ ASA",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 25,
    description:
      "Khung 40x80x1.4 kết hợp 20x40 đan thép CNC 3li, ốp gỗ lam sóng 1 mặt",
    price: "2.200.000/m2",
    material: "Thép sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Teak",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 26,
    description:
      "Cổng sắt ốp gỗ nhựa (Khung thép sơn tĩnh điện kết hợp nan gỗ nhựa composite)",
    price: "2.200.000/m2",
    material: "Sắt sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 27,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 viền thép 5li sơn tĩnh điện, ốp gỗ nhựa composite ngoài trời lam sóng phủ ASA 2 mặt",
    price: "3.500.000/m2",
    material: "Sắt sơn tĩnh điện, Gỗ nhựa composite phủ ASA",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 28,
    description:
      "Khung hộp 50x100x1.4 đan 25x50x1.5 ốp gỗ nhựa composite phủ ASA ngoài trời nhập khẩu",
    price: "2.400.000/m2",
    material: "Sắt sơn tĩnh điện, Gỗ nhựa composite nhập khẩu",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 29,
    description:
      "Khung 30x60x1.4 đan 25x50x1.4 viền thép 5li, ốp thép tấm 2li sơn tĩnh điện, ốp gỗ nhựa composite ngoài trời phủ ASA 2 mặt",
    price: "3.200.000/m2",
    material: "Sắt sơn tĩnh điện, Gỗ nhựa composite phủ ASA",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 30,
    description: "Khung 40x40x1.4 đan 40x40x1.4 ốp thép tấm 2li sơn tĩnh điện",
    price: "2.400.000/m2",
    material: "Sắt sơn tĩnh điện",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Xám Ghi",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 31,
    description: "Khung 40x80x1.4 đan 14x14x1.2 ốp thép CNC 3li sơn tĩnh điện",
    price: "2.100.000/m2",
    material: "Sắt sơn tĩnh điện, Thép CNC",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Xám Ghi",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 32,
    description:
      "Khung 40x80x1.4 đan 13x26x1.4 ốp thép sơn tĩnh điện, núm sắt sơn nhũ vàng ốp gỗ nhựa composite 1 mặt ngoài trời",
    price: "2.300.000/m2",
    material: "Sắt sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Teak",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 33,
    description: "Khung 40x80x1.4 đan 14x14x1.2 ốp thép CNC 3li sơn tĩnh điện",
    price: "2.300.000/m2",
    material: "Sắt sơn tĩnh điện, Thép CNC",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Xám Ghi",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 34,
    description:
      "Khung 40x80x1.4 đan 13x26x1.4 ốp thép sơn tĩnh điện, núm sắt sơn nhũ vàng ốp gỗ nhựa composite 1 mặt ngoài trời",
    price: "2.200.000/m2",
    material: "Sắt sơn tĩnh điện, Gỗ nhựa composite",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Teak",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 35,
    description: "Khung 40x80x1.4 đan 20x40x1.2 ốp thép CNC 3li sơn tĩnh điện",
    price: "2.300.000/m2",
    material: "Sắt sơn tĩnh điện, Thép CNC",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Xám Ghi",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
  {
    model: 36,
    description:
      "Khung 6x60x1.4 cánh 30x60x1.4 đan 25x50x1.1 ốp thép đan ô 3li, ốp gỗ composite 2 mặt phủ ASA ngoài trời",
    price: "3.500.000/m2",
    material: "Sắt sơn tĩnh điện, Gỗ nhựa composite phủ ASA",
    motor: "Tùy chọn (Âm sàn/Cánh tay đòn)",
    color: "màu Walnut",
    accessories: "Bản lề cối xoay inox304, chốt cửa, tay nắm cửa.",
  },
];

interface SelectedDoor {
  index: number;
  src: string;
}

export default function DoorCollectionPage() {
  const [selectedDoor, setSelectedDoor] = useState<SelectedDoor | null>(null);
  const spec = selectedDoor ? doorSpecifications[selectedDoor.index] : null;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 transition-colors duration-100">
      {/* 1. Header - Tinh chỉnh lại cho thanh thoát và vào form */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-end justify-between">
          <div className="space-y-1">
            {/* Giảm xuống font-bold hoặc font-extrabold, dùng text-slate-800 cho dịu mắt */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-none">
              Bộ sưu tập mẫu cửa
            </h1>
            {/* Dòng text phụ làm mỏng và nhẹ nhàng hơn */}
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.25em]">
              Thiết kế hiện đại • Thành Đạt Decor
            </p>
          </div>

          <Link
            href="/"
            className="mt-4 md:mt-0 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-amber-600 transition-colors uppercase tracking-widest"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Trang chủ
          </Link>
        </div>
      </header>

      {/* 2. Grid Card */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doorGalleryImages.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDoor({ index: idx, src })}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-100 hover:shadow-xl hover:-translate-y-1"
            >
              <div
                className="relative overflow-hidden bg-slate-50"
                style={{ aspectRatio: "4 / 5" }}
              >
                <img
                  src={src}
                  alt={`Mẫu cửa ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-100 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-slate-800 text-sm">
                  Mẫu cửa hiện đại #{idx + 1}
                </h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                  Premium Collection
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3. Modal tối ưu cho Mobile */}
      {selectedDoor && spec && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setSelectedDoor(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] sm:h-auto overflow-y-auto sm:overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng cố định trên mobile */}
            <button
              onClick={() => setSelectedDoor(null)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md sm:bg-slate-100 sm:text-slate-600"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* PHẦN ĐIỀU CHỈNH: Ép tỉ lệ 4:5 cho ảnh trên Mobile */}
              <div className="md:col-span-5 bg-slate-50">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <img
                    src={selectedDoor.src}
                    alt={spec.model.toString()}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Nội dung: Giữ nguyên bố cục của bạn */}
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Mẫu Cửa #{spec.model}
                  </h2>
                  <div className="h-1 w-10 bg-[#f59e0b] mt-2 rounded-full"></div>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-slate-50 text-[13px] sm:text-sm leading-relaxed text-slate-600 border border-slate-100">
                  {spec.description}
                </div>

                {/* Grid thông số: Giữ nguyên 2 cột */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-8">
                  {[
                    { label: "Báo giá", value: spec.price },
                    { label: "Vật liệu", value: spec.material },
                    { label: "Motor", value: spec.motor },
                    { label: "Màu sắc", value: spec.color },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-100 bg-white"
                    >
                      <p className="text-[9px] font-bold uppercase text-slate-400 mb-1 tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-[12px] sm:text-sm font-bold text-slate-800 leading-tight">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Nút bấm */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-auto">
                  <Link
                    href="/nhan-bao-gia"
                    className="flex items-center justify-center rounded-xl bg-[#f59e0b] px-6 py-4 text-sm font-bold text-white transition-transform active:scale-95"
                  >
                    Nhận báo giá ngay
                  </Link>

                  <Link
                    href={`https://zalo.me/0967105883`}
                    target="_blank"
                    className="flex items-center justify-center rounded-xl border-2 border-[#f59e0b] px-6 py-4 text-sm font-bold text-[#f59e0b] transition-transform active:scale-95"
                  >
                    Tư vấn qua Zalo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
