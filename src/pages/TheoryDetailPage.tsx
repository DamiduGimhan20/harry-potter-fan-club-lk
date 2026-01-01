
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, User, Calendar, Share2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { Theory } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';
import { CommentSection } from '../components/CommentSection';
import { ShareButtons } from '../components/ShareButtons';

export function TheoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSingle, items: allTheories } = useFirestore<Theory>('theories');
  const [theory, setTheory] = useState<Theory | null>(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchTheory = async () => {
      if (id) {
        const data = await getSingle(id);
        setTheory(data);
        if (data) setLikes(data.likes || 0);
      }
    };
    fetchTheory();
  }, [id, getSingle]);

  if (!theory) return <div className="text-center py-20 text-white">Loading...</div>;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative bg-slate-900">
      <MagicalParticles />
      <div className="max-w-4xl mx-auto relative z-10">
        <button onClick={() => navigate('/theories')} className="flex items-center text-gold hover:text-white transition-colors mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Theories
        </button>

        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800 p-8 rounded-xl border border-slate-700">
          {theory.imageUrl && <img src={theory.imageUrl} alt={theory.title} className="w-full h-64 object-cover rounded-lg mb-6" />}
          <h1 className="text-4xl font-bold text-white font-cinzel mb-4">{theory.title}</h1>
          <div className="flex items-center space-x-4 text-slate-400 mb-6">
            <span className="flex items-center"><User className="h-4 w-4 mr-1" /> {theory.author}</span>
            <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {theory.date}</span>
            <span className="flex items-center"><Heart className="h-4 w-4 mr-1" /> {likes}</span>
          </div>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{theory.content}</p>
          <div className="mt-8 flex justify-end">
            <button className="flex items-center text-gold hover:text-white"><Share2 className="h-5 w-5 mr-2" /> Share</button>
          </div>
          <ShareButtons 
            url={window.location.href} 
            title={theory.title + ' - HP Fan Club LK'} 
          />
        </motion.article>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-cinzel">Related Theories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allTheories.filter(t => t.id !== theory.id).slice(0, 2).map(related => (
            <button key={related.id} onClick={() => navigate(`/theories/${related.id}`)} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-gold transition-all text-left">
              <h3 className="text-lg font-bold text-white mb-2 hover:text-gold">{related.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">{related.content}</p>
            </button>
          ))}
        </div>
      </div>
      <CommentSection parentId={theory.id} parentType="theory" />
    </div>
  );
}