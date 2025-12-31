// src/pages/FanTheoriesPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { TheoryCard } from '../components/TheoryCard';
import { useFirestore } from '../hooks/useFirestore';
import { Theory } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';

export function FanTheoriesPage() {
  const { items: theories } = useFirestore<Theory>('theories');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTheories = theories.filter(theory => 
    theory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theory.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative">
      <MagicalParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-cinzel">Fan Theories</h1>
          <p className="text-slate-400 text-lg">Explore magical theories from the community</p>
        </motion.div>

        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search theories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 px-10 text-white placeholder-slate-400 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTheories.map((theory, index) => (
            <TheoryCard key={theory.id} theory={theory} index={index} />
          ))}
        </div>

        {filteredTheories.length === 0 && (
          <p className="text-center text-slate-500 mt-12 text-lg">No theories found. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}