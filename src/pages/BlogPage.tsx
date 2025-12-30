import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '../components/BlogCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BlogPost } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';
const DEFAULT_POSTS: BlogPost[] = [{
  id: '1',
  title: 'Top 10 Spells Every Wizard Should Know',
  author: 'Prof. Flitwick',
  date: '2024-02-10',
  category: 'Magic',
  content: 'From Wingardium Leviosa to Expelliarmus, mastering these essential charms is crucial for any aspiring witch or wizard. We break down the wand movements and incantations required for perfect casting.',
  views: 1542,
  imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800'
}, {
  id: '2',
  title: 'Upcoming Fan Meetup in Colombo',
  author: 'HP Fan Club LK',
  date: '2024-03-01',
  category: 'Events',
  content: 'Join us at the Independence Square for a magical evening of trivia, cosplay, and butterbeer! Prizes for the best costume include official merchandise and house points.',
  views: 856,
  imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800'
},];
export function BlogPage() {
  // Initialize with empty array, then merge with defaults only if empty
  const [posts] = useLocalStorage<BlogPost[]>('hp_blog_posts', []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Merge admin posts with defaults (admin posts take precedence)
  const allPosts = posts.length > 0 ? posts : DEFAULT_POSTS;
  const categories = ['All', 'News', 'Events', 'Magic', 'Creatures', 'General'];
  const filteredPosts = selectedCategory === 'All' ? allPosts : allPosts.filter(post => post.category === selectedCategory);
  return <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <MagicalParticles />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-4xl md:text-6xl font-bold text-white mb-4 font-cinzel text-glow">
            The Daily <span className="text-gold">Prophet</span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="text-slate-400 max-w-2xl mx-auto text-lg">
            News, events, and magical happenings from the Sri Lankan wizarding
            community.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category ? 'bg-gold text-slate-900 shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
              {category}
            </button>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)}
        </div>

        {filteredPosts.length === 0 && <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              No articles found in this category.
            </p>
          </div>}
      </div>
    </div>;
}