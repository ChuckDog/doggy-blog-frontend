import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "狗狗日记 - 分享养狗的快乐时光",
  description: "一个专注于狗狗生活的博客平台，分享养狗经验、训练技巧、健康饮食等内容",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">🐶 狗狗日记</h3>
                <p className="text-gray-300 mb-4">
                  分享养狗的快乐时光，记录每一个美好瞬间
                </p>
                <div className="flex justify-center space-x-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-white transition-colors">关于我们</a>
                  <a href="#" className="hover:text-white transition-colors">联系我们</a>
                  <a href="#" className="hover:text-white transition-colors">隐私政策</a>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
                  © {new Date().getFullYear()} 狗狗日记. 保留所有权利.
                </div>
              </div>
            </div>
          </footer>
        </div>
        <BackToTop />
      </body>
    </html>
  );
}