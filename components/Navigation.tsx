'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, PawPrint, Search, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthProvider';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: '首页', href: '/' },
    { name: '分类', href: '/categories' },
    { name: '标签', href: '/tags' },
    { name: '关于', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white"
            >
              <PawPrint size={24} />
            </motion.div>
            <span className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
              狗狗日记
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
              </Link>
            ))}
            
            <div className="border-l border-gray-200 h-6 mx-2" />

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium flex items-center">
                  <User size={18} className="mr-1 text-orange-500" />
                  {user.username}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="退出登录"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-orange-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-3 flex items-center text-gray-600">
                      <User size={18} className="mr-2 text-orange-500" />
                      {user.username}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                    >
                      <LogOut size={18} className="mr-2" />
                      退出登录
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      登录
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      注册账户
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
