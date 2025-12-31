// src/pages/HousesPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { MagicalParticles } from '../components/MagicalParticles';

const houses = [
  {
    id: 'gryffindor',
    name: 'Gryffindor',
    crest: '../images/houses/g.jpg',
    colors: 'from-red-800 to-yellow-600',
    traits: ['Bravery', 'Daring', 'Nerve', 'Chivalry'],
    founder: 'Godric Gryffindor',
    mascot: 'Lion',
    description: 'Where dwell the brave at heart.',
  },
  {
    id: 'slytherin',
    name: 'Slytherin',
    crest: '../images/houses/s.jpg',
    colors: 'from-green-800 to-emerald-600',
    traits: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness'],
    founder: 'Salazar Slytherin',
    mascot: 'Serpent',
    description: 'Those cunning folk use any means to achieve their ends.',
  },
  {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    crest: '../images/houses/r.jpg',
    colors: 'from-blue-800 to-blue-500',
    traits: ['Intelligence', 'Wit', 'Wisdom', 'Creativity'],
    founder: 'Rowena Ravenclaw',
    mascot: 'Eagle',
    description: 'Wit beyond measure is man\'s greatest treasure.',
  },
  {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    crest: '../images/houses/h.jpg',
    colors: 'from-yellow-600 to-amber-400',
    traits: ['Loyalty', 'Patience', 'Fair Play', 'Hard Work'],
    founder: 'Helga Hufflepuff',
    mascot: 'Badger',
    description: 'You might belong in Hufflepuff, where they are just and loyal.',
  },
];

export function HousesPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative">
      <MagicalParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-cinzel">Hogwarts Houses</h1>
          <p className="text-slate-400 text-xl">Choose your destiny</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {houses.map((house, index) => (
            <Link key={house.id} to={`/houses/${house.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-slate-800/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700 hover:border-gold/50 transition-all duration-500 shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${house.colors} opacity-20 group-hover:opacity-40 transition-opacity`} />
                
                <div className="p-8 text-center relative z-10">
                  <img 
                    src={house.crest} 
                    alt={`${house.name} Crest`} 
                    className="w-48 h-48 mx-auto mb-6 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <h3 className="text-3xl font-bold text-white mb-3 font-cinzel group-hover:text-gold transition-colors">
                    {house.name}
                  </h3>
                  
                  <p className="text-slate-300 italic mb-4">"{house.description}"</p>
                  
                  <div className="flex justify-center mb-4">
                    <Shield className="h-10 w-10 text-gold" />
                  </div>
                  
                  <p className="text-sm text-slate-400 uppercase tracking-wider">Founder</p>
                  <p className="text-white font-medium mb-2">{house.founder}</p>
                  
                  <p className="text-sm text-slate-400 uppercase tracking-wider">Mascot</p>
                  <p className="text-white font-medium">{house.mascot}</p>
                </div>
                
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}