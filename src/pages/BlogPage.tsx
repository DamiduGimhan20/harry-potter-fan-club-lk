// src/pages/BlogPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '../components/BlogCard';
import { useFirestore } from '../hooks/useFirestore';
import { BlogPost } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';

export function BlogPage() {
  const { items: posts } = useFirestore<BlogPost>('blogs');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'News', 'Events', 'Magic', 'Creatures'];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <MagicalParticles />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-bold text-white mb-4 font-cinzel text-glow"
          >
            The Daily <span className="text-gold">Prophet</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            News, events, and magical happenings from the Sri Lankan wizarding community.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gold text-slate-900 shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              No articles found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}