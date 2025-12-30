import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
export function Hero() {
  return <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Floating Snitch Animation */}
      <motion.div className="relative w-24 h-24 mb-12" animate={{
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }}>
        {/* Snitch Body */}
        <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_20px_rgba(255,215,0,0.6)] z-10" />

        {/* Wings */}
        <motion.div className="absolute top-1/2 left-8 w-12 h-4 bg-white/80 rounded-full origin-left blur-[1px]" animate={{
        rotateY: [0, 60, 0]
      }} transition={{
        duration: 0.1,
        repeat: Infinity
      }} />
        <motion.div className="absolute top-1/2 right-8 w-12 h-4 bg-white/80 rounded-full origin-right blur-[1px]" animate={{
        rotateY: [0, 60, 0]
      }} transition={{
        duration: 0.1,
        repeat: Infinity
      }} />
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.2
    }} className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4 text-yellow-400/80">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm tracking-[0.2em] uppercase font-medium">
            Welcome Home
          </span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 mb-6 drop-shadow-lg">
          The Wizarding World Awaits
        </h1>

        <p className="text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto leading-relaxed font-light">
          Discover the magic within. Explore the houses, uncover ancient
          theories, and relive the legends that shaped our world.
        </p>

        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} className="mt-10 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white font-cinzel tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          Begin Your Journey
        </motion.button>
      </motion.div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1a1a2e] to-transparent z-10" />
    </section>;
}