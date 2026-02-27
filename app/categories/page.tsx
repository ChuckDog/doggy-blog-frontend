import { getCategories } from '@/lib/data';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">文章分类</h1>
          <p className="text-xl text-gray-600">
            浏览不同主题的狗狗相关内容
          </p>
        </div>

        {/* 分类列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                  {category.count} 篇
                </span>
              </div>
              <p className="text-gray-600">
                {category.name === '生活分享' && '记录与狗狗相处的温馨时光'}
                {category.name === '训练指南' && '专业的狗狗训练方法和技巧'}
                {category.name === '健康饮食' && '科学的狗狗营养搭配建议'}
                {category.name === '旅行攻略' && '带狗狗出行的实用指南'}
              </p>
              <div className="mt-4 text-orange-600 font-medium hover:text-orange-700 transition-colors">
                查看文章 →
              </div>
            </Link>
          ))}
        </div>

        {/* 统计信息 */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-md p-6 inline-block">
            <div className="text-2xl font-bold text-orange-500 mb-2">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </div>
            <div className="text-gray-600">总文章数</div>
          </div>
        </div>
      </div>
    </div>
  );
}