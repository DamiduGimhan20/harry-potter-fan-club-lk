// src/components/SpellCard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Heart } from 'lucide-react';
import { Spell } from '../types';
import { db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

interface SpellCardProps {
  spell: Spell;
  index: number;
}

export function SpellCard({ spell, index }: SpellCardProps) {
  const [likes, setLikes] = useState(spell.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) return;

    setIsLiked(true);
    setIsAnimating(true);
    const newLikes = likes + 1;
    setLikes(newLikes);

    try {
      const spellRef = doc(db, 'spells', spell.id);
      await updateDoc(spellRef, { likes: increment(1) });
    } catch (error) {
      console.error('Error liking spell:', error);
      setLikes(likes);
      setIsLiked(false);
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] h-full flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white font-cinzel group-hover:text-gold transition-colors">
            {spell.name}
          </h3>
          <Wand2 className="h-6 w-6 text-gold" />
        </div>

        {spell.incantation && (
          <p className="text-gold italic mb-2 text-lg">
            "{spell.incantation}"
          </p>
        )}

        <p className="text-sm text-slate-400 mb-2">
          <span className="font-medium text-gold">Type:</span> {spell.type}
        </p>

        <p className="text-slate-300 flex-1">
          {spell.effect}
        </p>

        {spell.notes && (
          <p className="text-sm text-slate-400 mt-4 italic border-t border-slate-700 pt-4">
            {spell.notes}
          </p>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
          <button
            onClick={handleLike}
            disabled={isLiked}
            className="flex items-center space-x-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
          >
            <motion.div animate={isAnimating ? { scale: [1, 1.4, 1] } : {}}>
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </motion.div>
            <span className="text-sm">{likes}</span>
          </button>

          <span className="text-xs text-gold uppercase tracking-wider">
            Magical Spell
          </span>
        </div>
      </div>
    </motion.div>
  );
}