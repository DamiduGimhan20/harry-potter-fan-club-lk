
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { Character } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';

// Your original hardcoded characters (they will ALWAYS appear)
const HARDCODED_CHARACTERS: Character[] = [
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    house: 'Gryffindor',
    role: 'The Boy Who Lived',
    imageUrl: '/images/characters/harry-potter.jpg',
    description: 'Harry James Potter is the only known survivor of the Killing Curse and the defeater of Lord Voldemort. Born to James and Lily Potter, he became an orphan at the age of one when Voldemort murdered his parents.',
    patronus: 'Stag',
    wand: '11" Holly, Phoenix Feather',
    bloodStatus: 'Half-blood',
    backstory: 'Harry grew up with his aunt and uncle, the Dursleys, who treated him poorly and kept his magical heritage a secret. On his eleventh birthday, he discovered he was a wizard and began attending Hogwarts School of Witchcraft and Wizardry. Throughout his years at Hogwarts, Harry faced numerous challenges, including confronting Voldemort multiple times.',
    achievements: [
      'Youngest Seeker in a century',
      'Defeated Lord Voldemort',
      'Master of the Deathly Hallows',
      "Founded Dumbledore's Army",
      'Triwizard Tournament Champion'
    ],
    quotes: [
      '"I solemnly swear that I am up to no good."',
      '"It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends."',
      '"Working hard is important. But there is something that matters even more: believing in yourself."'
    ]
  },
  {
    id: 'hermione-granger',
    name: 'Hermione Granger',
    house: 'Gryffindor',
    role: 'Brightest Witch of Her Age',
    imageUrl:'/images/characters/hermoine.webp',
    description: 'Hermione Jean Granger is a Muggle-born witch and one of the most brilliant students of her generation.',
    patronus: 'Otter',
    wand: '10¾" Vine, Dragon Heartstring',
    bloodStatus: 'Muggle-born',
    backstory: 'Raised by Muggle parents who are dentists, Hermione discovered her magical abilities and excelled at Hogwarts from day one.',
    achievements: [
      'Top of her year',
      'Key member of Dumbledore\'s Army',
      'Helped defeat Voldemort',
      'Became Minister for Magic'
    ],
    quotes: [
      '"Books! And cleverness! There are more important things — friendship and bravery."',
      '"Fear of a name only increases fear of the thing itself."'
    ]
  },
  {
    id: 'ron-weasley',
    name: 'Ron Weasley',
    house: 'Gryffindor',
    role: 'Loyal Best Friend',
    imageUrl: '/images/characters/ron.jpg',
    description: 'Ronald Bilius Weasley is Harry Potter\'s best friend and the sixth son of the Weasley family.',
    patronus: 'Jack Russell Terrier',
    wand: '14" Willow, Unicorn Hair (second wand)',
    bloodStatus: 'Pure-blood',
    backstory: 'Growing up in a large, loving wizarding family, Ron often felt overshadowed by his siblings.',
    achievements: [
      'Prefect',
      'Gryffindor Quidditch Keeper',
      'Helped destroy Horcruxes'
    ],
    quotes: [
      '"Why spiders? Why couldn\'t it be \'follow the butterflies\'?"',
      '"You\'re gonna suffer, but you\'re gonna be happy about it."'
    ]
  },
  {
    id: 'draco-malfoy',
    name: 'Draco Malfoy',
    house: 'Slytherin',
    role: 'Slytherin Prince',
    imageUrl: '/images/characters/draco.jpg',
    description: 'Draco Lucius Malfoy is a pure-blood wizard and Harry\'s rival throughout his Hogwarts years.',
    patronus: 'Unknown',
    wand: '10" Hawthorn, Unicorn Hair',
    bloodStatus: 'Pure-blood',
    backstory: 'Raised in a wealthy, prejudiced wizarding family, Draco was taught to value blood purity.',
    achievements: [
      'Slytherin Seeker',
      'Prefect',
      'Later redeemed himself'
    ],
    quotes: [
      '"My father will hear about this!"',
      '"You\'ll soon find out that some wizarding families are better than others, Potter."'
    ]
  },
  {
    id: 'luna-lovegood',
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
    role: 'Dreamer & Truth-Teller',
    imageUrl: '/images/characters/luna.jpg',
    description: 'Luna Lovegood is an eccentric Ravenclaw known for her unique perspective and unwavering belief in the unusual.',
    patronus: 'Hare',
    wand: 'Unknown',
    bloodStatus: 'Pure-blood',
    backstory: 'Luna lost her mother at a young age and is often bullied for her quirky beliefs.',
    achievements: [
      'Member of Dumbledore\'s Army',
      'Naturalist & Magizoologist'
    ],
    quotes: [
      '"You\'re not going mad. I see them too. You\'re just as sane as I am."',
      '"Wit beyond measure is man\'s greatest treasure."'
    ]
  },
  {
    id: 'severus-snape',
    name: 'Severus Snape',
    house: 'Slytherin',
    role: 'Potions Master & Double Agent',
    imageUrl: '/images/characters/severus-snape.jpg',
    description: 'Severus Snape was a complex wizard who served as a double agent during both wizarding wars.',
    patronus: 'Doe',
    wand: 'Unknown',
    bloodStatus: 'Half-blood',
    backstory: 'Bullied as a child, Snape fell in love with Lily Potter and spent his life protecting her son.',
    achievements: [
      'Potions Master',
      'Occlumency expert',
      'Bravest man Harry ever knew'
    ],
    quotes: [
      '"Always."',
      '"Turn to page 394."'
    ]
  },
  {
    id: 'albus-dumbledore',
    name: 'Albus Dumbledore',
    house: 'Gryffindor',
    role: 'Headmaster of Hogwarts',
    imageUrl: '/images/characters/albus.webp',
    description: 'Albus Percival Wulfric Brian Dumbledore is widely regarded as the greatest wizard of modern times.',
    patronus: 'Phoenix',
    wand: 'Elder Wand',
    bloodStatus: 'Half-blood',
    backstory: 'A brilliant and powerful wizard with a complex past, Dumbledore guided Harry throughout his journey.',
    achievements: [
      'Defeated Grindelwald',
      'Order of Merlin, First Class',
      'Headmaster of Hogwarts'
    ],
    quotes: [
      '"It does not do to dwell on dreams and forget to live."',
      '"Happiness can be found even in the darkest of times, if one only remembers to turn on the light."'
    ]
  },
  // You can add more characters here anytime – they will always stay!
];

export function CharactersPage() {
  const { items: firebaseCharacters } = useFirestore<Character>('characters');

  // Combine hardcoded + Firebase characters
  const allCharacters = [...HARDCODED_CHARACTERS, ...firebaseCharacters];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative">
      <MagicalParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-cinzel">Witches & Wizards</h1>
          <p className="text-slate-400 text-lg">Meet the legends who shaped the history of magic.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allCharacters.map((char, index) => (
            <Link key={char.id} to={`/characters/${char.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-gold/50 transition-all"
              >
                {char.imageUrl ? (
                  <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="text-4xl font-bold text-gold">{char.name.charAt(0)}</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-xl font-bold text-white font-cinzel mb-1">{char.name}</h3>
                  <p className="text-gold text-sm">{char.role}</p>
                  <p className="text-slate-300 text-xs mt-2">{char.house}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {allCharacters.length === 0 && (
          <p className="text-center text-slate-500 mt-20 text-xl">No characters yet.</p>
        )}
      </div>
    </div>
  );
}