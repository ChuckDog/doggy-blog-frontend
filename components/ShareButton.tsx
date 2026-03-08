'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareButton({ title, text }: { title: string; text: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copy link
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setShowTooltip(true);
        setTimeout(() => {
          setCopied(false);
          setShowTooltip(false);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="inline-flex items-center px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
      >
        {copied ? <Check size={18} className="mr-2" /> : <Share2 size={18} className="mr-2" />}
        {copied ? '已复制链接' : '分享'}
      </button>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap"
          >
            链接已复制到剪贴板
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
