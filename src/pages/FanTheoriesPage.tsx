import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { TheoryCard } from '../components/TheoryCard';
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
export function FanTheoriesPage() {
  // Initialize with empty array, then merge with defaults only if empty
  const [theories, setTheories] = useLocalStorage<Theory[]>('hp_theories', []);
  const [searchTerm, setSearchTerm] = useState('');
  // Merge admin theories with defaults (admin theories take precedence)
  const allTheories = theories.length > 0 ? theories : DEFAULT_THEORIES;
  const filteredTheories = allTheories.filter(theory => theory.title.toLowerCase().includes(searchTerm.toLowerCase()) || theory.content.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <MagicalParticles />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-4xl md:text-6xl font-bold text-white mb-4 font-cinzel text-glow">
            Magical <span className="text-gold">Theories</span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore the deepest mysteries of the wizarding world. From Horcruxes
            to Hallows, discover what the community has uncovered.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
            <input type="text" placeholder="Search theories..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all" />
          </div>

          <div className="text-slate-400 text-sm">
            Showing {filteredTheories.length} theories
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTheories.map((theory, index) => <TheoryCard key={theory.id} theory={theory} index={index} />)}
        </div>

        {filteredTheories.length === 0 && <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              No theories found matching your search.
            </p>
          </div>}
      </div>
    </div>;
}