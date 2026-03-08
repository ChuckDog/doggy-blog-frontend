'use client';

import { useEffect, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import CategoryList from '@/components/CategoryList';
import TagCloud from '@/components/TagCloud';
import { getBlogPosts, getCategories, getTags } from '@/lib/api';
import { BlogPost } from '@/types/blog';
import { motion } from 'framer-motion';
import { PawPrint, Sparkles } from 'lucide-react';

export default function Home() {
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; count: number }[]
  >([]);
  const [tags, setTags] = useState<
    { id: string; name: string; count: number }[]
  >([]);

  const handleSearch = (results: BlogPost[]) => {
    setSearchResults(results);
    setShowSearchResults(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const [p, c, t] = await Promise.all([
          getBlogPosts(),
          getCategories(),
          getTags(),
        ]);
        setPosts(p);
        setCategories(c);
        setTags(t);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const displayPosts = showSearchResults ? searchResults : posts;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 -z-10" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-30" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
              <Sparkles size={16} className="mr-2" />
              分享养狗的快乐时光
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              欢迎来到
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mx-2">
                狗狗日记
              </span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="inline-block"
              >
                🐾
              </motion.span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              在这里分享养狗的点点滴滴，记录每一个温馨时刻，
              与同样爱狗的朋友们一起交流经验。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-orange-100">
              <SearchBar onSearch={handleSearch} />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center space-x-12 mt-12"
          >
            {[
              { label: '篇文章', value: posts.length },
              { label: '个分类', value: categories.length },
              { label: '个标签', value: tags.length },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          {showSearchResults && (
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                搜索结果
                <span className="ml-3 text-lg font-normal text-gray-500">
                  ({searchResults.length})
                </span>
              </h2>
              <button
                onClick={() => {
                  setShowSearchResults(false);
                  setSearchResults([]);
                }}
                className="text-orange-500 hover:text-orange-600 font-medium px-4 py-2 hover:bg-orange-50 rounded-lg transition-colors"
              >
                清除搜索
              </button>
            </div>
          )}

          {!showSearchResults && (
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                最新文章
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Posts Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard {...post} />
                  </motion.div>
                ))}
              </div>

              {displayPosts.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                  <div className="text-6xl mb-6">🐶</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {showSearchResults ? '没有找到相关文章' : '暂无文章'}
                  </h3>
                  <p className="text-gray-500">
                    {showSearchResults
                      ? '试试其他关键词吧'
                      : '敬请期待更多精彩内容！'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* About Widget */}
              <div className="bg-white rounded-2xl shadow-sm border border-orange-50 p-8 sticky top-24">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <PawPrint size={32} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      关于博主
                    </h3>
                    <p className="text-sm text-gray-500">资深铲屎官</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  专注分享养狗经验，致力于让更多人了解和爱护狗狗。
                  这里有最实用的养护知识和最温暖的宠物故事。
                </p>
                <button className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
                  关注我们
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <CategoryList categories={categories} />
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <TagCloud tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
