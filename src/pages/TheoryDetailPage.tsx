import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, User, Calendar, Share2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Theory } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';
const DEFAULT_THEORIES: Theory[] = [{
  id: '1',
  title: 'Dumbledore is a Time-Traveling Ron Weasley',
  author: 'ChessMaster_99',
  date: '2023-11-15',
  content: 'The theory suggests that Ron Weasley lived out his life, then traveled back in time to become Albus Dumbledore to guide Harry. Evidence includes their physical resemblance described in books (tall, thin, long nose), love for sweets, and the chess game connection.',
  likes: 1240,
  imageUrl: 'https://images.unsplash.com/photo-1544098485-2a2a4c02e631?auto=format&fit=crop&q=80&w=800'
}, {
  id: '2',
  title: 'Crookshanks belonged to the Potters',
  author: 'CatLady_Hermione',
  date: '2023-12-02',
  content: 'When Hermione buys Crookshanks, the shop owner says he has been there for "quite some time". The cat immediately recognizes Scabbers (Pettigrew) and Sirius (in dog form). This suggests Crookshanks was the Potter family cat mentioned in Lily\'s letter.',
  likes: 892,
  imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800'
}, {
  id: '3',
  title: 'The Dursleys were under the Horcrux effect',
  author: 'HarryFan_LK',
  date: '2024-01-10',
  content: "Living with a Horcrux (Harry) for years made the Dursleys bitter and cruel, similar to how the locket affected Ron. While they weren't nice people to begin with, the constant exposure to the soul fragment amplified their worst traits.",
  likes: 2150,
  imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800'
}];
export function TheoryDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [theories] = useLocalStorage<Theory[]>('hp_theories', []);
  const [liked, setLiked] = useState(false);
  // Merge with defaults
  const allTheories = theories.length > 0 ? theories : DEFAULT_THEORIES;
  const theory = allTheories.find(t => t.id === id);
  if (!theory) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Theory not found</h1>
          <button onClick={() => navigate('/theories')} className="text-gold hover:text-white transition-colors">
            Go back to theories
          </button>
        </div>
      </div>;
  }
  return <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <MagicalParticles />

      <div className="max-w-4xl mx-auto relative z-10">
        <button onClick={() => navigate('/theories')} className="flex items-center space-x-2 text-slate-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Theories</span>
        </button>

        <motion.article initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700">
          {theory.imageUrl && <div className="relative h-96 overflow-hidden">
              <img src={theory.imageUrl} alt={theory.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>}

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gold" />
                  <span>{theory.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span>{theory.date}</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-cinzel leading-tight">
              {theory.title}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {theory.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-700">
              <button onClick={() => setLiked(!liked)} className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${liked ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span className="font-medium">
                  {theory.likes + (liked ? 1 : 0)}
                </span>
              </button>

              <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </motion.article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 font-cinzel">
            Related Theories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allTheories.filter(t => t.id !== theory.id).slice(0, 2).map(relatedTheory => <button key={relatedTheory.id} onClick={() => navigate(`/theories/${relatedTheory.id}`)} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700 hover:border-gold/50 transition-all text-left group">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    {relatedTheory.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {relatedTheory.content}
                  </p>
                </button>)}
          </div>
        </div>
      </div>
    </div>;
}