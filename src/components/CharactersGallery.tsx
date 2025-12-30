import React from 'react';
import { motion } from 'framer-motion';
const characters = [{
  name: 'Harry Potter',
  role: 'The Boy Who Lived',
  color: 'from-red-500/20 to-red-900/20'
}, {
  name: 'Hermione Granger',
  role: 'Brightest Witch',
  color: 'from-red-500/20 to-red-900/20'
}, {
  name: 'Ron Weasley',
  role: 'King Weasley',
  color: 'from-red-500/20 to-red-900/20'
}, {
  name: 'Draco Malfoy',
  role: 'The Slytherin Prince',
  color: 'from-green-500/20 to-green-900/20'
}, {
  name: 'Luna Lovegood',
  role: 'Ravenclaw Dreamer',
  color: 'from-blue-500/20 to-blue-900/20'
}, {
  name: 'Severus Snape',
  role: 'Half-Blood Prince',
  color: 'from-green-500/20 to-green-900/20'
}];
export function CharactersGallery() {
  return <section className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Witches & Wizards
          </h2>
          <p className="text-blue-200/60 max-w-2xl mx-auto">
            Meet the legends who shaped the history of magic.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {characters.map((char, index) => <motion.div key={char.name} initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.05
        }} whileHover={{
          y: -5
        }} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border border-white/10">
              {/* Placeholder Gradient Background since we don't have images */}
              <div className={`absolute inset-0 bg-gradient-to-br ${char.color} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 mb-4 flex items-center justify-center text-2xl font-cinzel text-white/80 border border-white/20">
                  {char.name.charAt(0)}
                </div>
                <h3 className="text-sm font-bold text-white mb-1 leading-tight">
                  {char.name}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-white/50">
                  {char.role}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>)}
        </div>
      </div>
    </section>;
}