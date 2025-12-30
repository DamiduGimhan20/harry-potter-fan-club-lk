import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, Calendar, ArrowRight } from 'lucide-react';
import { Theory } from '../types';
interface TheoryCardProps {
  theory: Theory;
  index: number;
}
export function TheoryCard({
  theory,
  index
}: TheoryCardProps) {
  return <Link to={`/theories/${theory.id}`}>
      <motion.article initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: index * 0.1
    }} className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] cursor-pointer h-full flex flex-col">
        {theory.imageUrl && <div className="h-48 overflow-hidden">
            <img src={theory.imageUrl} alt={theory.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
          </div>}

        <div className="p-6 relative flex-1 flex flex-col">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-gold" />
              <span>{theory.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3" />
              <span>{theory.date}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 font-cinzel group-hover:text-gold transition-colors">
            {theory.title}
          </h3>

          <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed flex-1">
            {theory.content}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Heart className="h-4 w-4" />
              <span className="text-xs font-medium">{theory.likes}</span>
            </div>

            <div className="flex items-center space-x-1 text-gold text-sm font-medium group-hover:text-white transition-colors">
              <span>Read Theory</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>;
}