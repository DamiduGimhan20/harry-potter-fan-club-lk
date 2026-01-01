import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Heart } from 'lucide-react';
import { Spell } from '../types';
import { db } from '../firebase';
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';

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
      const docSnap = await getDoc(spellRef);

      if (docSnap.exists()) {
        // Document exists → just increment likes
        await updateDoc(spellRef, { likes: increment(1) });
      } else {
        // Document doesn't exist → create it with likes = 1
        await setDoc(spellRef, {
          name: spell.name,
          incantation: spell.incantation,
          type: spell.type,
          effect: spell.effect,
          notes: spell.notes,
          likes: 1
        });
      }
    } catch (error) {
      console.error('Error liking spell:', error);
      // Revert on error
      setLikes(likes);
      setIsLiked(false);
      alert('Could not like spell – try again later.');
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
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-cinzel group-hover:text-gold transition-colors line-clamp-2">
            {spell.name}
          </h3>
          <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 text-gold flex-shrink-0" />
        </div>

        {spell.incantation && (
          <p className="text-gold italic mb-2 text-sm sm:text-base md:text-lg line-clamp-1">
            "{spell.incantation}"
          </p>
        )}

        <p className="text-xs sm:text-sm text-slate-400 mb-2">
          <span className="font-medium text-gold">Type:</span> {spell.type}
        </p>

        <p className="text-slate-300 text-sm sm:text-base flex-1 line-clamp-4 sm:line-clamp-5">
          {spell.effect}
        </p>

        {spell.notes && (
          <p className="text-xs sm:text-sm text-slate-400 mt-3 sm:mt-4 italic border-t border-slate-700 pt-3 sm:pt-4 line-clamp-3">
            {spell.notes}
          </p>
        )}

        {/* Like Button – Fixed nesting (no button inside button) */}
        <div className="flex items-center justify-between mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-700/50">
          <div 
            onClick={handleLike}
            className="flex items-center space-x-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
            role="button"
            aria-label="Like this spell"
          >
            <motion.div animate={isAnimating ? { scale: [1, 1.4, 1] } : {}}>
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </motion.div>
            <span className="text-xs sm:text-sm">{likes}</span>
          </div>

          <span className="text-xs text-gold uppercase tracking-wider">
            Magical Spell
          </span>
        </div>
      </div>
    </motion.div>
  );
}