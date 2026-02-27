"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "@/types/blog";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [expanded, setExpanded] = useState(false);
  const displayCategories = expanded ? categories : categories.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">文章分类</h3>
      <div className="space-y-2">
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
              {category.name}
            </span>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {category.count}
            </span>
          </Link>
        ))}
      </div>

      {categories.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full text-orange-600 hover:text-orange-700 font-medium py-2 rounded-lg transition-colors"
        >
          {expanded ? "收起" : `展开全部 (${categories.length})`}
        </button>
      )}
    </div>
  );
}
