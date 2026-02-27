"use client";

import Link from "next/link";
import { Tag } from "@/types/blog";

interface TagCloudProps {
  tags: Tag[];
}

export default function TagCloud({ tags }: TagCloudProps) {
  // 根据标签数量确定大小级别
  const getSizeClass = (count: number) => {
    if (count >= 5) return "text-lg font-bold";
    if (count >= 3) return "text-base font-medium";
    return "text-sm";
  };

  // 根据标签数量确定颜色深浅
  const getColorClass = (count: number) => {
    if (count >= 5) return "text-orange-700 bg-orange-100 hover:bg-orange-200";
    if (count >= 3) return "text-orange-600 bg-orange-50 hover:bg-orange-100";
    return "text-orange-500 bg-orange-50 hover:bg-orange-100";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">热门标签</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags/${tag.id}`}
            className={`inline-flex items-center px-3 py-1.5 rounded-full transition-all hover:scale-105 ${getSizeClass(tag.count)} ${getColorClass(tag.count)}`}
          >
            #{tag.name}
            <span className="ml-1 text-xs opacity-75">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
