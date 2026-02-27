import { getPostsByTag } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagDetailPageProps {
  params: Promise<{ tagId: string }>;
}

export async function generateStaticParams() {
  const tags = [
    { id: "金毛犬" },
    { id: "宠物故事" },
    { id: "日常" },
    { id: "训练技巧" },
    { id: "行为矫正" },
    { id: "新手必读" },
    { id: "营养搭配" },
    { id: "自制狗粮" },
    { id: "健康管理" },
    { id: "旅行攻略" },
    { id: "户外活动" },
    { id: "经验分享" },
  ];

  return tags.map((tag) => ({
    tagId: tag.id.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function TagDetailPage({ params }: TagDetailPageProps) {
  const resolvedParams = await params;

  // 参数验证
  if (!resolvedParams?.tagId) {
    notFound();
  }

  // 将URL参数转换回中文标签名
  let tagName: string;
  try {
    tagName = decodeURIComponent(resolvedParams.tagId)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  } catch (error) {
    console.error("Failed to decode tag name:", error);
    notFound();
  }

  const posts = getPostsByTag(tagName);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 面包屑导航 */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              首页
            </Link>
            <span>/</span>
            <Link
              href="/tags"
              className="hover:text-orange-600 transition-colors"
            >
              标签
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">#{tagName}</span>
          </nav>
        </div>

        {/* 标签头部 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            标签浏览
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">#{tagName}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {tagName === "金毛犬" && "关于金毛犬的养护、训练和生活分享"}
            {tagName === "宠物故事" && "温馨感人的宠物故事和经历分享"}
            {tagName === "日常" && "狗狗日常生活中的点点滴滴"}
            {tagName === "训练技巧" && "实用的狗狗训练方法和技巧"}
            {tagName === "行为矫正" && "狗狗行为问题的分析和解决方案"}
            {tagName === "新手必读" && "新手养狗必备的知识和注意事项"}
            {tagName === "营养搭配" && "科学的狗狗营养配比和饮食建议"}
            {tagName === "自制狗粮" && "健康美味的自制狗粮食谱分享"}
            {tagName === "健康管理" && "狗狗健康监测和疾病预防知识"}
            {tagName === "旅行攻略" && "带狗狗出行的实用攻略和经验"}
            {tagName === "户外活动" && "狗狗户外运动和娱乐活动推荐"}
            {tagName === "经验分享" && "资深狗主人的宝贵经验和心得"}
            {![
              "金毛犬",
              "宠物故事",
              "日常",
              "训练技巧",
              "行为矫正",
              "新手必读",
              "营养搭配",
              "自制狗粮",
              "健康管理",
              "旅行攻略",
              "户外活动",
              "经验分享",
            ].includes(tagName) && "相关文章和经验分享"}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                还想了解更多？
              </h3>
              <p className="text-gray-600 mb-4">
                浏览其他标签或返回首页查看更多精彩内容
              </p>
              <div className="flex space-x-4 justify-center">
                <Link
                  href="/tags"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  查看所有标签
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
