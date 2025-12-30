import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, User, Calendar, Tag, Share2 } from 'lucide-react';
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
}, {
  id: '3',
  title: 'The History of Quidditch in Sri Lanka',
  author: 'Quidditch Weekly',
  date: '2024-01-20',
  category: 'News',
  content: 'While not as famous as the European leagues, Sri Lanka boasts a rich history of broomstick sports. Discover the local teams and the unique "Taprobane Twist" maneuver invented here.',
  views: 2301,
  imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=800'
}];
export function BlogDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [posts] = useLocalStorage<BlogPost[]>('hp_blog_posts', []);
  // Merge with defaults
  const allPosts = posts.length > 0 ? posts : DEFAULT_POSTS;
  const post = allPosts.find(p => p.id === id);
  useEffect(() => {
    // Increment view count (in a real app, this would be done server-side)
    window.scrollTo(0, 0);
  }, [id]);
  if (!post) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Article not found</h1>
          <button onClick={() => navigate('/blog')} className="text-gold hover:text-white transition-colors">
            Go back to blog
          </button>
        </div>
      </div>;
  }
  return <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <MagicalParticles />

      <div className="max-w-4xl mx-auto relative z-10">
        <button onClick={() => navigate('/blog')} className="flex items-center space-x-2 text-slate-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </button>

        <motion.article initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
          {post.imageUrl && <div className="relative h-96 overflow-hidden">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 text-sm font-bold text-slate-900 bg-gold rounded-full shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>}

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-6 flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gold" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gold" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-cinzel leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-gold" />
                <span className="text-slate-400">{post.category}</span>
              </div>

              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </motion.article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 font-cinzel">
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2).map(relatedPost => <button key={relatedPost.id} onClick={() => navigate(`/blog/${relatedPost.id}`)} className="bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700 hover:border-gold/50 transition-all text-left group">
                  {relatedPost.imageUrl && <div className="h-40 overflow-hidden">
                      <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>}
                  <div className="p-4">
                    <span className="text-xs text-gold font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-gold transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">
                      {relatedPost.content}
                    </p>
                  </div>
                </button>)}
          </div>
        </div>
      </div>
    </div>;
}