import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404图形 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-orange-500 mb-4">404</div>
          <div className="text-6xl mb-6">🐶</div>
        </div>

        {/* 错误信息 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          哎呀，页面找不到了！
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          也许是这只调皮的狗狗把页面叼走了...
        </p>

        {/* 可能的原因 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-left inline-block">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">可能的原因：</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>页面已被删除或移动</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>网址输入有误</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>链接已过期</span>
            </li>
          </ul>
        </div>

        {/* 导航按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            🏠 返回首页
          </Link>
          <Link
            href="/categories"
            className="px-6 py-3 bg-white text-orange-500 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-lg border border-orange-200"
          >
            📚 浏览分类
          </Link>
        </div>

        {/* 趣味提示 */}
        <div className="mt-12 text-gray-500">
          <p className="text-sm">
            别担心，我们的狗狗正在努力寻找这个页面...
          </p>
          <div className="mt-2 text-2xl">🐕‍🦺🐾🐕</div>
        </div>
      </div>
    </div>
  );
}