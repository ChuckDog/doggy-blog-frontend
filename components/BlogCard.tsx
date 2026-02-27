import Image from "next/image";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  imageUrl?: string;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  category,
  tags,
  readTime,
  imageUrl,
}: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* 封面图片 */}
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        {/* 分类标签 */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
            {category}
          </span>
        </div>

        {/* 标题 */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
          <a href={`/posts/${id}`}>{title}</a>
        </h2>

        {/* 摘要 */}
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        {/* 底部信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <span>👤 {author}</span>
            <span>⏰ {readTime}分钟阅读</span>
          </div>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
