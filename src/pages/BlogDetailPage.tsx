// src/pages/BlogDetailPage.tsx  (UPDATED WITH AUTO VIEW INCREMENT)

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, User, Calendar, Tag, Share2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { BlogPost } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';
import { db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSingle, items: allPosts } = useFirestore<BlogPost>('blogs');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [viewsIncremented, setViewsIncremented] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const data = await getSingle(id);
        setPost(data);
      }
    };
    fetchPost();
  }, [id, getSingle]);

  // Auto-increment views when page loads (only once per visit)
  useEffect(() => {
    if (post && !viewsIncremented) {
      const incrementView = async () => {
        try {
          const postRef = doc(db, 'blogs', post.id);
          await updateDoc(postRef, {
            views: increment(1)
          });
          // Update local state to show +1 view immediately
          setPost(prev => prev ? { ...prev, views: (prev.views || 0) + 1 } : null);
        } catch (error) {
          console.error('Error incrementing view:', error);
        }
        setViewsIncremented(true);
      };

      incrementView();
    }
  }, [post, viewsIncremented]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading article...</p>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative bg-slate-900">
      <MagicalParticles />
      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/blog')} 
          className="flex items-center text-gold hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </button>

        <motion.article 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700"
        >
          {post.imageUrl && (
            <div className="h-96 overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1 text-gold" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {post.views || 0} reads
              </span>
              <span className="flex items-center">
                <Tag className="h-4 w-4 mr-1 text-gold" />
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-cinzel leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-700 flex justify-between items-center">
              <div className="text-sm text-slate-500">
                Published on {post.date}
              </div>
              <button className="flex items-center space-x-2 text-gold hover:text-white transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </motion.article>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 font-cinzel">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(related => (
                <button 
                  key={related.id} 
                  onClick={() => navigate(`/blog/${related.id}`)} 
                  className="group bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700 hover:border-gold/50 transition-all text-left"
                >
                  {related.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={related.imageUrl} 
                        alt={related.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs text-gold font-medium uppercase tracking-wider">
                      {related.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-gold transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3">
                      {related.content}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}