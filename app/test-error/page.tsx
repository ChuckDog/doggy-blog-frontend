'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestErrorPage() {
  const [shouldError, setShouldError] = useState(false);

  const triggerError = () => {
    setShouldError(true);
  };

  // 故意触发错误
  if (shouldError) {
    throw new Error('这是一个人工触发的测试错误！');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">错误处理测试页面</h1>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ 测试说明</h2>
            <p className="text-yellow-700">
              点击下面的按钮会故意触发一个JavaScript错误，用来测试我们的自定义错误页面是否正常工作。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={triggerError}
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            >
              🔥 触发错误测试
            </button>
            
            <Link
              href="/"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              🏠 返回首页
            </Link>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">📋 错误处理流程</h3>
            <ul className="text-blue-700 space-y-1">
              <li>• 点击按钮 → 触发JavaScript错误</li>
              <li>• Next.js捕获错误 → 显示自定义error.tsx页面</li>
              <li>• 用户可以选择重试或返回首页</li>
              <li>• 开发环境下会显示详细的错误信息</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}