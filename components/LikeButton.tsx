'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { likePost, unlikePost, getLikesCount, getIsLiked } from '@/lib/api';
import { motion } from 'framer-motion';

export default function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getLikesCount(postId).then(data => setCount(data.count)).catch(console.error);
    if (user) {
      getIsLiked(postId).then(data => setLiked(data.liked)).catch(console.error);
    }
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) {
      alert('请先登录后点赞');
      return;
    }
    if (loading) return;
    
    setLoading(true);
    // Optimistic update
    const prevLiked = liked;
    const prevCount = count;
    
    setLiked(!prevLiked);
    setCount(prevLiked ? count - 1 : count + 1);

    try {
      if (prevLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (e) {
      console.error(e);
      // Revert on error
      setLiked(prevLiked);
      setCount(prevCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
        liked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        animate={liked ? { scale: [1, 1.2, 1] } : {}}
      >
        <Heart className={liked ? 'fill-current' : ''} size={20} />
      </motion.div>
      <span className="font-medium">{count}</span>
    </button>
  );
}
