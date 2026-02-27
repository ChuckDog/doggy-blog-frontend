"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import TagCloud from "@/components/TagCloud";
import { blogPosts, getCategories, getTags } from "@/lib/data";
import { BlogPost } from "@/types/blog";

export default function Home() {
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (results: BlogPost[]) => {
    setSearchResults(results);
    setShowSearchResults(true);
  };

  const categories = getCategories();
  const tags = getTags();
  const displayPosts = showSearchResults ? searchResults : blogPosts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            欢迎来到
            <span className="text-orange-500"> 狗狗日记 </span>
            🐾
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            在这里分享养狗的点点滴滴，记录每一个温馨时刻，
            与同样爱狗的朋友们一起交流经验。
          </p>

          {/* 搜索框 */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* 统计信息 */}
          <div className="flex justify-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {blogPosts.length}
              </div>
              <div className="text-sm">篇文章</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {categories.length}
              </div>
              <div className="text-sm">个分类</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {tags.length}
              </div>
              <div className="text-sm">个标签</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {showSearchResults && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  搜索结果 ({searchResults.length})
                </h2>
                <button
                  onClick={() => {
                    setShowSearchResults(false);
                    setSearchResults([]);
                  }}
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  清除搜索
                </button>
              </div>
            </div>
          )}

          {!showSearchResults && (
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              最新文章
            </h2>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 左侧内容区 */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayPosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>

              {!showSearchResults && displayPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🐶</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    暂无文章
                  </h3>
                  <p className="text-gray-500">敬请期待更多精彩内容！</p>
                </div>
              )}

              {showSearchResults && searchResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    没有找到相关文章
                  </h3>
                  <p className="text-gray-500">试试其他关键词吧</p>
                </div>
              )}
            </div>

            {/* 右侧侧边栏 */}
            <div className="space-y-6">
              <CategoryList categories={categories} />
              <TagCloud tags={tags} />

              {/* 关于我们小卡片 */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  关于博主
                </h3>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    狗
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">爱狗人士</div>
                    <div className="text-sm text-gray-500">资深铲屎官</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  专注分享养狗经验，致力于让更多人了解和爱护狗狗。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
