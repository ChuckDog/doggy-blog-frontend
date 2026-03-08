'use client';

import Link from 'next/link';
import { PawPrint, Heart, Mail, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-orange-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                <PawPrint size={18} />
              </div>
              <span className="text-xl font-bold text-gray-800">狗狗日记</span>
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-md">
              在这里分享养狗的点点滴滴，记录每一个温馨时刻。
              无论是新手铲屎官还是资深爱狗人士，都能在这里找到共鸣。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6">快速链接</h3>
            <ul className="space-y-4">
              {[
                { name: '关于我们', href: '/about' },
                { name: '联系方式', href: '/contact' },
                { name: '隐私政策', href: '/privacy' },
                { name: '使用条款', href: '/terms' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6">关注我们</h3>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Mail, href: 'mailto:hello@doggyblog.com' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-orange-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} 狗狗日记. All rights reserved.
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <Heart size={16} className="mx-1 text-red-500 fill-current" />
            <span>by Dog Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
