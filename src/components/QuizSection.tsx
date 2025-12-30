import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, ArrowRight } from 'lucide-react';
export function QuizSection() {
  const [hovered, setHovered] = useState(false);
  return <section className="py-24 px-4 relative z-10 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#16213e] border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543091776-94676348821d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />

          <div className="relative p-12 md:p-20 text-center">
            <motion.div initial={{
            scale: 0.9,
            opacity: 0
          }} whileInView={{
            scale: 1,
            opacity: 1
          }} viewport={{
            once: true
          }} className="max-w-2xl mx-auto">
              <Wand2 className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Where Do You Belong?
              </h2>
              <p className="text-lg text-blue-100/80 mb-10 leading-relaxed">
                The Sorting Hat is ready to make its choice. Are you brave like
                Gryffindor, loyal like Hufflepuff, wise like Ravenclaw, or
                cunning like Slytherin?
              </p>

              <motion.button onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1a1a2e] rounded-full font-cinzel font-bold text-lg tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <span className="relative z-10">
                  Start The Sorting Ceremony
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200" initial={{
                x: '100%'
              }} animate={{
                x: hovered ? '0%' : '100%'
              }} transition={{
                duration: 0.3
              }} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
}