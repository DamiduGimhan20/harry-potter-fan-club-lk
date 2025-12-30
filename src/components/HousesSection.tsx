import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
const houses = [{
  name: 'Gryffindor',
  colors: 'from-red-900 to-red-600',
  traits: ['Bravery', 'Daring', 'Chivalry'],
  mascot: 'Lion',
  description: 'Where dwell the brave at heart.',
  accent: 'border-red-500/30'
}, {
  name: 'Slytherin',
  colors: 'from-green-900 to-green-600',
  traits: ['Ambition', 'Cunning', 'Resourcefulness'],
  mascot: 'Serpent',
  description: 'Those of great ambition.',
  accent: 'border-green-500/30'
}, {
  name: 'Ravenclaw',
  colors: 'from-blue-900 to-blue-600',
  traits: ['Intelligence', 'Wit', 'Wisdom'],
  mascot: 'Eagle',
  description: "Wit beyond measure is man's greatest treasure.",
  accent: 'border-blue-500/30'
}, {
  name: 'Hufflepuff',
  colors: 'from-yellow-600 to-yellow-400',
  traits: ['Loyalty', 'Patience', 'Hard Work'],
  mascot: 'Badger',
  description: 'Just and loyal, true and unafraid of toil.',
  accent: 'border-yellow-500/30'
}];
export function HousesSection() {
  return <section className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Four Houses
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {houses.map((house, index) => <motion.div key={house.name} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -10
        }} className={`relative group overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-sm border ${house.accent} p-6 transition-all duration-500 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-purple-500/10`}>
              {/* Gradient Header */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${house.colors}`} />

              <div className="mb-6 flex justify-center">
                <div className={`p-4 rounded-full bg-gradient-to-br ${house.colors} bg-opacity-20 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-white mb-2">
                {house.name}
              </h3>
              <p className="text-center text-white/60 text-sm italic mb-6 font-serif">
                "{house.description}"
              </p>

              <div className="space-y-2">
                {house.traits.map(trait => <div key={trait} className="text-center text-sm text-white/80 py-1 border-b border-white/5 last:border-0">
                    {trait}
                  </div>)}
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}