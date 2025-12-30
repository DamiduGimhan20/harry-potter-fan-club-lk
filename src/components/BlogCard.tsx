import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, User, Calendar, ArrowRight, Tag } from 'lucide-react';
import { BlogPost } from '../types';
interface BlogCardProps {
  post: BlogPost;
  index: number;
}
export function BlogCard({
  post,
  index
}: BlogCardProps) {
  return <Link to={`/blog/${post.id}`}>
      <motion.article initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: index * 0.1
    }} className="flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 cursor-pointer">
        <div className="relative h-56 overflow-hidden">
          {post.imageUrl ? <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <Tag className="h-12 w-12 text-slate-700" />
            </div>}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-bold text-slate-900 bg-gold rounded-full shadow-lg">
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-center space-x-4 text-xs text-slate-400 mb-3">
            <span className="flex items-center">
              <User className="h-3 w-3 mr-1 text-gold" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-gold" />
              {post.date}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 font-cinzel leading-tight hover:text-gold transition-colors">
            {post.title}
          </h3>

          <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
            {post.content}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="flex items-center text-xs text-slate-500">
              <Eye className="h-3 w-3 mr-1" />
              {post.views} reads
            </span>
            <div className="text-sm font-medium text-gold hover:text-white transition-colors flex items-center group">
              Read Article
              <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>;
}