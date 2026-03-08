'use client';

import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  category,
  tags,
  imageUrl,
  readTime,
}: BlogPost) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50 group flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-orange-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-300">
            <span className="text-6xl opacity-50">🐾</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1 text-orange-400" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-orange-400" />
            {readTime} 分钟阅读
          </div>
        </div>

        {/* Title */}
        <Link href={`/posts/${id}`} className="block mb-3">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-orange-50 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <User size={14} className="mr-1 text-orange-400" />
            {author}
          </div>
          <Link
            href={`/posts/${id}`}
            className="flex items-center text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors group-hover:translate-x-1 duration-300"
          >
            阅读更多 <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
