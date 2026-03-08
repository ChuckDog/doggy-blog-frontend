import { notFound } from "next/navigation";
import { getPostById, getBlogPosts } from "@/lib/api";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import LikeButton from "@/components/LikeButton";
import ShareButton from "@/components/ShareButton";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts: BlogPost[] = await getBlogPosts();
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post: BlogPost = await getPostById(resolvedParams.id);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} - 狗狗日记`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post: BlogPost = await getPostById(resolvedParams.id);

  if (!post) {
    notFound();
  }

  const allPosts: BlogPost[] = await getBlogPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.category === post.category ||
          p.tags.some((tag: string) => post.tags.includes(tag))),
    )
    .slice(0, 3);

  // 将Markdown格式的内容转换为HTML
  const formatContent = (content: string) => {
    return content
      .replace(
        /## (.*?)(?=\n|$)/g,
        '<h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">$1</h2>',
      )
      .replace(
        /### (.*?)(?=\n|$)/g,
        '<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">$1</h3>',
      )
      .replace(
        /#### (.*?)(?=\n|$)/g,
        '<h4 class="text-xl font-medium text-gray-700 mt-6 mb-3">$1</h4>',
      )
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(
        /`(.*?)`/g,
        '<code class="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>',
      )
      .replace(
        /^- (.*)/gm,
        '<li class="flex items-start mb-2"><span class="mr-2 mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span><span>$1</span></li>'
      )
      .replace(/\n\n/g, '</p><p class="mb-6 leading-relaxed text-gray-700 text-lg">')
      .replace(/^\n/, '<p class="mb-6 leading-relaxed text-gray-700 text-lg">')
      .replace(/\n$/, "</p>");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-gray-900">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-500 opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-16 w-full">
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              返回首页
            </Link>
            
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  {new Date(post.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  {post.readTime} 分钟阅读
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        <article className="bg-white rounded-t-3xl shadow-xl overflow-hidden min-h-[500px]">
          {/* 文章内容 */}
          <div className="p-8 md:p-12 lg:p-16">
            <div
              className="prose prose-lg prose-orange max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </div>

          {/* 文章底部 */}
          <div className="px-8 md:px-12 lg:px-16 pb-12">
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <Tag size={14} className="mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <LikeButton postId={post.id} />
                <ShareButton title={post.title} text={post.excerpt || post.title} />
              </div>
            </div>
          </div>
        </article>

        {/* 相关推荐 */}
        {relatedPosts.length > 0 && (
          <div className="py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">猜你喜欢</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/posts/${relatedPost.id}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-orange-600 bg-orange-50 rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
