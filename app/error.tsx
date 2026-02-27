'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 错误图标 */}
        <div className="mb-8">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-9xl font-bold text-red-500 mb-4">500</div>
        </div>

        {/* 错误信息 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          糟糕！出现了一些问题
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          别担心，这可能是临时的技术故障
        </p>
        
        {/* 开发环境下显示错误详情 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-red-800 mb-2">错误详情:</h3>
            <p className="text-red-700 text-sm font-mono break-words">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-red-800 font-medium">查看堆栈跟踪</summary>
                <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors shadow-lg"
          >
            🔄 重试
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white text-red-500 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-lg border border-red-200"
          >
            🏠 返回首页
          </Link>
        </div>

        {/* 趣味提示 */}
        <div className="text-gray-500">
          <p className="text-sm">
            我们的程序员正在紧急修复这个问题...
          </p>
          <div className="mt-2 text-2xl">👨‍💻⚡🐕</div>
        </div>
      </div>
    </div>
  );
}