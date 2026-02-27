import { getTags } from '@/lib/data';
import Link from 'next/link';

export default function TagsPage() {
  const tags = getTags();

  // 按文章数量排序
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">标签云</h1>
          <p className="text-xl text-gray-600">
            探索狗狗世界的各个话题标签
          </p>
        </div>

        {/* 标签云 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {sortedTags.map((tag, index) => {
              // 根据排名确定大小和颜色
              let sizeClass = '';
              let colorClass = '';
              
              if (index < 3) {
                // 前3名 - 大号粗体
                sizeClass = 'text-2xl font-bold';
                colorClass = 'text-orange-700 bg-orange-100 hover:bg-orange-200';
              } else if (index < 8) {
                // 4-8名 - 中号
                sizeClass = 'text-lg font-semibold';
                colorClass = 'text-orange-600 bg-orange-50 hover:bg-orange-100';
              } else {
                // 其他 - 小号
                sizeClass = 'text-base';
                colorClass = 'text-orange-500 bg-orange-50 hover:bg-orange-100';
              }

              return (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.id}`}
                  className={`inline-flex items-center px-4 py-2 rounded-full transition-all hover:scale-105 ${sizeClass} ${colorClass}`}
                >
                  #{tag.name}
                  <span className="ml-2 text-xs opacity-75">({tag.count})</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 按字母顺序排列的详细列表 */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">按字母顺序</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...tags]
              .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
              .map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.id}`}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                    #{tag.name}
                  </span>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {tag.count}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">{tags.length}</div>
            <div className="text-gray-600">总标签数</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {Math.max(...tags.map(t => t.count))}
            </div>
            <div className="text-gray-600">最多文章数</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {(tags.reduce((sum, tag) => sum + tag.count, 0) / tags.length).toFixed(1)}
            </div>
            <div className="text-gray-600">平均文章数</div>
          </div>
        </div>
      </div>
    </div>
  );
}