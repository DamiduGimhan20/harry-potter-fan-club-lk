import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star } from 'lucide-react';
const theories = [{
  title: 'The Tale of Three Brothers',
  excerpt: 'Is Dumbledore actually Death? A deep dive into the symbolism behind the Hallows and how the Headmaster fits into the ancient legend.',
  likes: 1240,
  readTime: '5 min read'
}, {
  title: "Neville's True Destiny",
  excerpt: "Why the prophecy could have applied to Neville Longbottom just as easily, and how his arc mirrors the Chosen One's journey.",
  likes: 892,
  readTime: '4 min read'
}, {
  title: 'The Department of Mysteries',
  excerpt: 'Uncovering the secrets behind the locked door in the Department of Mysteries. What truly lies within the Love Room?',
  likes: 1567,
  readTime: '7 min read'
}];
export function FanTheories() {
  return <section className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Quibbler's Corner
            </h2>
            <p className="text-blue-200/60">
              Fan theories, deep dives, and magical mysteries.
            </p>
          </div>
          <button className="text-purple-300 hover:text-white transition-colors font-cinzel text-sm tracking-wider border-b border-purple-300/30 hover:border-white pb-1">
            View All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {theories.map((theory, index) => <motion.article key={theory.title} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="group bg-white/[0.02] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] transition-all duration-300 hover:border-purple-500/30">
              <div className="flex items-center gap-2 text-purple-400 mb-4 text-xs tracking-wider uppercase font-medium">
                <BookOpen className="w-4 h-4" />
                <span>Theory</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {theory.title}
              </h3>

              <p className="text-blue-100/60 text-sm leading-relaxed mb-6">
                {theory.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4">
                <span>{theory.readTime}</span>
                <div className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                  <Star className="w-3 h-3" />
                  <span>{theory.likes}</span>
                </div>
              </div>
            </motion.article>)}
        </div>
      </div>
    </section>;
}