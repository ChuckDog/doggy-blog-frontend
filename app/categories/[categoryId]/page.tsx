import { getPostsByCategory } from '@/lib/data';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryDetailPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateStaticParams() {
  const categories = [
    { id: '生活分享' },
    { id: '训练指南' },
    { id: '健康饮食' },
    { id: '旅行攻略' }
  ];
  
  return categories.map((category) => ({
    categoryId: category.id.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const resolvedParams = await params;
  
  // 参数验证
  if (!resolvedParams?.categoryId) {
    notFound();
  }

  // 将URL参数转换回中文分类名
  let categoryName: string;
  try {
    categoryName = decodeURIComponent(resolvedParams.categoryId)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  } catch (error) {
    console.error('Failed to decode category name:', error);
    notFound();
  }
  
  const posts = getPostsByCategory(categoryName);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 面包屑导航 */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">首页</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-orange-600 transition-colors">分类</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </nav>
        </div>

        {/* 分类头部 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            分类浏览
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryName}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {categoryName === '生活分享' && '记录与狗狗相处的温馨时光和有趣故事'}
            {categoryName === '训练指南' && '专业的狗狗训练方法、行为矫正技巧和经验分享'}
            {categoryName === '健康饮食' && '科学的狗狗营养搭配、自制食谱和健康管理建议'}
            {categoryName === '旅行攻略' && '带狗狗出行的实用指南、注意事项和精彩路线推荐'}
          </p>
          <div className="mt-6">
            <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full font-medium">
              共 {posts.length} 篇文章
            </span>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

        {/* 底部提示 */}
        {posts.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl shadow-md p-6 inline-block">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">还想了解更多？</h3>
              <p className="text-gray-600 mb-4">
                浏览其他分类或返回首页查看更多精彩内容
              </p>
              <div className="flex space-x-4 justify-center">
                <Link 
                  href="/categories"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  查看所有分类
                </Link>
                <Link 
                  href="/"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  返回首页
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}