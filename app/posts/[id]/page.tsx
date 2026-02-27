import { notFound } from 'next/navigation';
import { getPostById, blogPosts, getRelatedPosts } from '@/lib/data';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostById(resolvedParams.id);
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} - 狗狗日记`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostById(resolvedParams.id);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id, 3);

  // 将Markdown格式的内容转换为HTML
  const formatContent = (content: string) => {
    return content
      .replace(/## (.*?)(?=\n|$)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
      .replace(/### (.*?)(?=\n|$)/g, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
      .replace(/#### (.*?)(?=\n|$)/g, '<h4 class="text-lg font-medium text-gray-700 mt-4 mb-2">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^\n/, '<p class="mb-4">')
      .replace(/\n$/, '</p>');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* 文章头部 */}
          <header className="p-8 border-b border-gray-200">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-orange-700 bg-orange-100 rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime}分钟阅读</span>
              </div>
            </div>
          </header>

          {/* 文章内容 */}
          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </div>

          {/* 文章标签 */}
          <footer className="px-8 pb-8">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm text-orange-700 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </footer>
        </article>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/posts/${relatedPost.id}`}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 上下篇文章导航 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.findIndex(p => p.id === post.id) > 0 && (
            <Link 
              href={`/posts/${blogPosts[blogPosts.findIndex(p => p.id === post.id) - 1].id}`}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-sm text-gray-500 mb-2">上一篇</div>
              <div className="font-semibold text-gray-900 line-clamp-2">
                {blogPosts[blogPosts.findIndex(p => p.id === post.id) - 1].title}
              </div>
            </Link>
          )}
          
          {blogPosts.findIndex(p => p.id === post.id) < blogPosts.length - 1 && (
            <Link 
              href={`/posts/${blogPosts[blogPosts.findIndex(p => p.id === post.id) + 1].id}`}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow md:ml-auto"
            >
              <div className="text-sm text-gray-500 mb-2 text-right">下一篇</div>
              <div className="font-semibold text-gray-900 line-clamp-2 text-right">
                {blogPosts[blogPosts.findIndex(p => p.id === post.id) + 1].title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}