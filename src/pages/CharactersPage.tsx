import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { Character } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';

/* ================= HARDCODED CHARACTERS ================= */
const HARDCODED_CHARACTERS: Character[] = [
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    house: 'Gryffindor',
    role: 'The Boy Who Lived',
    imageUrl: '/images/characters/harry-potter.jpg',
    description:
      'Harry James Potter is the only known survivor of the Killing Curse and the defeater of Lord Voldemort.',
    patronus: 'Stag',
    wand: '11" Holly, Phoenix Feather',
    bloodStatus: 'Half-blood',
    backstory:
      'Harry grew up with his aunt and uncle, the Dursleys, who treated him poorly.',
    achievements: [
      'Youngest Seeker in a century',
      'Defeated Lord Voldemort',
      'Master of the Deathly Hallows'
    ],
    quotes: ['"I solemnly swear that I am up to no good."']
  },
  {
    id: 'hermione-granger',
    name: 'Hermione Granger',
    house: 'Gryffindor',
    role: 'Brightest Witch of Her Age',
    imageUrl: '/images/characters/hermoine.webp',
    description:
      'Hermione Jean Granger is a Muggle-born witch and one of the most brilliant students of her generation.',
    patronus: 'Otter',
    wand: '10¾" Vine, Dragon Heartstring',
    bloodStatus: 'Muggle-born',
    backstory:
      'Raised by Muggle parents who are dentists, Hermione excelled at Hogwarts.',
    achievements: ['Top of her year', 'Helped defeat Voldemort'],
    quotes: ['"Books! And cleverness!"']
  },
  {
    id: 'ron-weasley',
    name: 'Ron Weasley',
    house: 'Gryffindor',
    role: 'Loyal Best Friend',
    imageUrl: '/images/characters/ron.jpg',
    description:
      "Ronald Bilius Weasley is Harry Potter's loyal best friend.",
    patronus: 'Jack Russell Terrier',
    wand: '14" Willow, Unicorn Hair',
    bloodStatus: 'Pure-blood',
    backstory:
      'Growing up in a big wizarding family, Ron often felt overshadowed.',
    achievements: ['Gryffindor Quidditch Keeper'],
    quotes: ['"Why spiders?"']
  },
  {
    id: 'draco-malfoy',
    name: 'Draco Malfoy',
    house: 'Slytherin',
    role: 'Slytherin Prince',
    imageUrl: '/images/characters/draco.jpg',
    description:
      "Draco Lucius Malfoy is Harry's rival throughout Hogwarts.",
    patronus: 'Unknown',
    wand: '10" Hawthorn, Unicorn Hair',
    bloodStatus: 'Pure-blood',
    backstory:
      'Raised in a wealthy, prejudiced wizarding family.',
    achievements: ['Slytherin Seeker'],
    quotes: ['"My father will hear about this!"']
  },
  {
    id: 'luna-lovegood',
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
    role: 'Dreamer & Truth-Teller',
    imageUrl: '/images/characters/luna.jpg',
    description:
      'Luna Lovegood is an eccentric Ravenclaw with a unique perspective.',
    patronus: 'Hare',
    wand: 'Unknown',
    bloodStatus: 'Pure-blood',
    backstory:
      'Often bullied, Luna stayed true to herself.',
    achievements: ['Member of Dumbledore’s Army'],
    quotes: ['"You’re just as sane as I am."']
  },
  {
    id: 'albus-dumbledore',
    name: 'Albus Dumbledore',
    house: 'Gryffindor',
    role: 'Headmaster of Hogwarts',
    imageUrl: '/images/characters/albus.webp',
    description:
      'Albus Dumbledore is regarded as the greatest wizard of modern times.',
    patronus: 'Phoenix',
    wand: 'Elder Wand',
    bloodStatus: 'Half-blood',
    backstory:
      'A powerful wizard with a complex past.',
    achievements: ['Defeated Grindelwald'],
    quotes: ['"Happiness can be found even in the darkest of times."']
  }
];

/* ================= PAGE ================= */
export function CharactersPage() {
  const { items: firebaseCharacters } =
    useFirestore<Character>('characters');

  const allCharacters = [
    ...HARDCODED_CHARACTERS,
    ...firebaseCharacters
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 px-3 sm:px-4 relative">
      <MagicalParticles />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 font-cinzel">
            Witches & Wizards
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg">
            Meet the legends who shaped the history of magic.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {allCharacters.map((char, index) => (
            <Link key={char.id} to={`/characters/${char.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group relative aspect-[3/4] sm:aspect-square
                  rounded-2xl overflow-hidden
                  bg-slate-800/50 border border-slate-700
                  hover:border-gold/50 transition-all
                "
              >
                {char.imageUrl ? (
                  <img
                    src={char.imageUrl}
                    alt={char.name}
                    className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gold">
                      {char.name.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-cinzel">
                    {char.name}
                  </h3>
                  <p className="text-gold text-xs sm:text-sm">
                    {char.role}
                  </p>
                  <p className="text-slate-300 text-[10px] sm:text-xs mt-1">
                    {char.house}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {allCharacters.length === 0 && (
          <p className="text-center text-slate-500 mt-20 text-lg">
            No characters yet.
          </p>
        )}
      </div>
    </div>
  );
}
