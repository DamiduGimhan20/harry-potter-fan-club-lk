import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Character } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';



//Character Images

import harryPotterImg from '../images/characters/harry-potter.jpg';
import hermoine from '../images/characters/hermoine.webp';
import severus from '../images/characters/severus-snape.jpg';
import ron from '../images/characters/ron.jpg';
import draco from '../images/characters/draco.jpg';
import luna from '../images/characters/luna.jpg';
import albus from '../images/characters/albus.webp';

const CHARACTERS: Character[] = [{
  id: 'harry-potter',
  name: 'Harry Potter',
  house: 'Gryffindor',
  role: 'The Boy Who Lived',
  description: 'The only known survivor of the Killing Curse and the defeater of Lord Voldemort.',
  imageUrl: harryPotterImg
}, {
  id: 'hermione-granger',
  name: 'Hermione Granger',
  house: 'Gryffindor',
  role: 'Brightest Witch of Her Age',
  description: 'A Muggle-born witch who became the Minister for Magic.',
  imageUrl: hermoine
}, {
  id: 'ron-weasley',
  name: 'Ron Weasley',
  house: 'Gryffindor',
  role: 'King Weasley',
  description: "Harry's loyal best friend and a strategic wizard chess master.",
  imageUrl: ron
}, {
  id: 'draco-malfoy',
  name: 'Draco Malfoy',
  house: 'Slytherin',
  role: 'Slytherin Prince',
  description: "A pure-blood wizard and Harry's rival at Hogwarts.",
  imageUrl: draco
}, {
  id: 'luna-lovegood',
  name: 'Luna Lovegood',
  house: 'Ravenclaw',
  role: 'Magizoologist',
  description: 'A quirky Ravenclaw student with a unique perspective on the world.',
  imageUrl: luna
}, {
  id: 'severus-snape',
  name: 'Severus Snape',
  house: 'Slytherin',
  role: 'Potions Master',
  description: 'A complex wizard whose true loyalties remained hidden until the end.',
  imageUrl: severus
},{
  id: 'albus-dumbledore',
  name: 'Professor Albus Percival Wulfric Brian Dumbledore',
  house: 'Gryffindor',
  role: 'The Greatest Wizard of His Age',
  description: 'Albus Percival Wulfric Brian Dumbledore was one of the most powerful and respected wizards in history. Known for his wisdom, kindness, and unmatched magical ability, he served as the Headmaster of Hogwarts School of Witchcraft and Wizardry and played a crucial role in the defeat of Lord Voldemort.',
  imageUrl: albus
}];
export function CharactersPage() {
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
            Legendary <span className="text-gold">Characters</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Meet the witches and wizards who shaped our history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CHARACTERS.map((char, index) => <Link key={char.id} to={`/characters/${char.id}`}>
              <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: index * 0.1
          }} className="group relative h-96 rounded-xl overflow-hidden cursor-pointer">
                <img src={char.imageUrl} alt={char.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 ${char.house === 'Gryffindor' ? 'bg-red-900 text-red-100' : char.house === 'Slytherin' ? 'bg-green-900 text-green-100' : char.house === 'Ravenclaw' ? 'bg-blue-900 text-blue-100' : 'bg-yellow-900 text-yellow-100'}`}>
                    {char.house}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-cinzel mb-1">
                    {char.name}
                  </h3>
                  <p className="text-gold text-sm font-medium mb-2">
                    {char.role}
                  </p>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {char.description}
                  </p>
                </div>
              </motion.div>
            </Link>)}
        </div>
      </div>
    </div>;
}