import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { MagicalParticles } from '../components/MagicalParticles';
const HOUSES = [{
  id: 'gryffindor',
  name: 'Gryffindor',
  colors: ['from-red-700', 'to-yellow-500'],
  traits: ['Bravery', 'Daring', 'Nerve', 'Chivalry'],
  mascot: 'Lion',
  founder: 'Godric Gryffindor',
  description: 'Gryffindor values courage, bravery, nerve, and chivalry. Its mascot is the lion, and its colours are scarlet and gold.'
}, {
  id: 'slytherin',
  name: 'Slytherin',
  colors: ['from-green-800', 'to-slate-400'],
  traits: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness'],
  mascot: 'Serpent',
  founder: 'Salazar Slytherin',
  description: 'Slytherin produces more than its share of Dark wizards, but also turns out leaders who are proud, ambitious, and cunning.'
}, {
  id: 'ravenclaw',
  name: 'Ravenclaw',
  colors: ['from-blue-800', 'to-blue-400'],
  traits: ['Intelligence', 'Knowledge', 'Curiosity', 'Creativity'],
  mascot: 'Eagle',
  founder: 'Rowena Ravenclaw',
  description: 'Ravenclaw prizes wit, learning, and wisdom. It is an ethos of this house that "wit beyond measure is man\'s greatest treasure".'
}, {
  id: 'hufflepuff',
  name: 'Hufflepuff',
  colors: ['from-yellow-500', 'to-yellow-200'],
  traits: ['Loyalty', 'Patience', 'Hard Work', 'Fair Play'],
  mascot: 'Badger',
  founder: 'Helga Hufflepuff',
  description: 'Hufflepuff is the most inclusive among the four houses; valuing hard work, dedication, patience, loyalty, and fair play.'
}];
export function HousesPage() {
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
            Hogwarts <span className="text-gold">Houses</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Four houses, one school. Where do you belong?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HOUSES.map((house, index) => <Link key={house.id} to={`/houses/${house.id}`}>
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} className="relative overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 group hover:border-white/20 transition-all duration-500 cursor-pointer">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${house.colors[0]} ${house.colors[1]}`} />

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white font-cinzel group-hover:text-gold transition-colors">
                      {house.name}
                    </h2>
                    <Shield className={`h-10 w-10 text-white opacity-50 group-hover:opacity-100 transition-opacity`} />
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {house.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">
                        Founder
                      </span>
                      <p className="text-white font-medium">{house.founder}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">
                        Mascot
                      </span>
                      <p className="text-white font-medium">{house.mascot}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-2">
                      Traits
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {house.traits.map(trait => <span key={trait} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300 border border-slate-600">
                          {trait}
                        </span>)}
                    </div>
                  </div>

                  <div className="mt-6 text-gold text-sm font-medium group-hover:translate-x-2 transition-transform inline-block">
                    Learn more →
                  </div>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${house.colors[0]} ${house.colors[1]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </motion.div>
            </Link>)}
        </div>
      </div>
    </div>;
}