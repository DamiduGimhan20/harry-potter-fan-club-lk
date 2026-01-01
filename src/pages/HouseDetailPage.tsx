// src/pages/HouseDetailPage.tsx  (FIXED – Crest Perfect on Mobile + Desktop)

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Users, Home, Sparkles } from 'lucide-react';
import { MagicalParticles } from '../components/MagicalParticles';

const HOUSES_DATA = {
  gryffindor: {
    name: 'Gryffindor',
    colors: 'from-red-800 to-yellow-600',
    crest: '../images/houses/g.jpg',
    commonRoom: 'https://contentful.harrypotter.com/usf1vwtuqyxm/3jNnOr6Nfyg6SqmS44CcGi/05b5a62eb3a5d4ea8e50de2918f89b4a/GryffindorCommonRoom_WB_F5_CelebrationInCommonRoom_Promo_080615_Land.jpg',
    founder: 'Godric Gryffindor',
    mascot: 'Lion',
    element: 'Fire',
    traits: ['Bravery', 'Daring', 'Nerve', 'Chivalry', 'Courage'],
    description: 'Gryffindor values courage, bravery, nerve, and chivalry. Its emblematic animal is the lion, and its colours are scarlet and gold.',
    commonRoomDesc: 'The Gryffindor common room is located in one of the castle\'s highest towers. It is cozy and warm, filled with squashy armchairs, tables, and a crackling fireplace. The room is decorated in scarlet and gold, with large windows offering views of the grounds.',
    notableMembers: ['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Albus Dumbledore', 'Minerva McGonagall', 'Sirius Black', 'Remus Lupin']
  },
  slytherin: {
    name: 'Slytherin',
    colors: 'from-green-800 to-emerald-600',
    crest: '../images/houses/s.jpg',
    commonRoom: 'https://contentful.harrypotter.com/usf1vwtuqyxm/7xvjjnk3ohlMXpKfQ5XxUs/48b84a7470b321832a4602324d807f8c/the-slytherin-common-room_3_1800x1248.png',
    founder: 'Salazar Slytherin',
    mascot: 'Serpent',
    element: 'Water',
    traits: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness'],
    description: 'Slytherin values ambition, cunning, leadership, and resourcefulness. Its emblematic animal is the serpent, and its colours are green and silver.',
    commonRoomDesc: 'Located in the dungeons beneath the Black Lake, the Slytherin common room has an underwater feel with greenish lamps and large windows showing the lake\'s creatures. The room is long and low, with stone walls and silver lanterns.',
    notableMembers: ['Draco Malfoy', 'Severus Snape', 'Tom Riddle (Voldemort)', 'Bellatrix Lestrange', 'Regulus Black', 'Horace Slughorn']
  },
  ravenclaw: {
    name: 'Ravenclaw',
    colors: 'from-blue-800 to-blue-500',
    crest: '../images/houses/r.jpg',
    commonRoom: 'https://i.pinimg.com/736x/3b/eb/97/3beb970b919514d6f19dfc0e519da695.jpg',
    founder: 'Rowena Ravenclaw',
    mascot: 'Eagle',
    element: 'Air',
    traits: ['Intelligence', 'Wit', 'Wisdom', 'Creativity'],
    description: 'Ravenclaw values intelligence, knowledge, creativity, and wit. Its emblematic animal is the eagle, and its colours are blue and bronze.',
    commonRoomDesc: 'Located in a high tower, the Ravenclaw common room is airy and spacious with arched windows offering panoramic views. It has blue and bronze silk hangings, a domed ceiling painted with stars, and shelves full of books.',
    notableMembers: ['Luna Lovegood', 'Cho Chang', 'Gilderoy Lockhart', 'Filius Flitwick', 'Penelope Clearwater', 'Quirinus Quirrell']
  },
  hufflepuff: {
    name: 'Hufflepuff',
    colors: 'from-yellow-600 to-amber-400',
    crest: '../images/houses/h.jpg',
    commonRoom: 'https://contentful.harrypotter.com/usf1vwtuqyxm/7HAQ0pLKDB531zGERfo1Wg/7b686289fc0a4e4c996948cc95b852fb/Screenshot_2022-11-10_at_17.24.52.png?q=75&fm=jpg&w=2560',
    founder: 'Helga Hufflepuff',
    mascot: 'Badger',
    element: 'Earth',
    traits: ['Loyalty', 'Patience', 'Fair Play', 'Hard Work'],
    description: 'Hufflepuff values hard work, patience, loyalty, and fair play. Its emblematic animal is the badger, and its colours are yellow and black.',
    commonRoomDesc: 'Located near the kitchens, the Hufflepuff common room is earthy and cozy, with low ceilings, circular doors, and lots of plants. It has yellow hangings, overstuffed sofas, and a warm, welcoming atmosphere.',
    notableMembers: ['Cedric Diggory', 'Newt Scamander', 'Nymphadora Tonks', 'Pomona Sprout', 'Justin Finch-Fletchley']
  }
};

export function HouseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const house = id ? HOUSES_DATA[id as keyof typeof HOUSES_DATA] : null;

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        House not found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative bg-slate-900">
      <MagicalParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/houses')} 
          className="flex items-center text-gold hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Houses
        </button>

        {/* Hero Section – Fixed Crest on Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-12"
        >
          <img 
            src={house.commonRoom} 
            alt={`${house.name} Common Room`} 
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${house.colors} opacity-60`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6">
            {/* Responsive Crest – Perfect Size on All Devices */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <img 
                src={house.crest} 
                alt={`${house.name} Crest`} 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-2xl"
              />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-cinzel drop-shadow-2xl leading-tight">
              {house.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gold mt-3 sm:mt-4 italic max-w-2xl drop-shadow-lg px-4">
              "{house.description}"
            </p>
          </div>
        </motion.div>

        {/* Responsive Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Traits Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
              <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-gold mr-3" />
              Core Traits
            </h2>
            <ul className="space-y-3 sm:space-y-4">
              {house.traits.map(trait => (
                <li key={trait} className="text-base sm:text-lg text-slate-300 flex items-center">
                  <span className="text-gold mr-3 text-xl">✦</span>
                  {trait}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* House Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-gold mr-3" />
              House Details
            </h2>
            <div className="space-y-4 text-slate-300">
              <p className="text-sm sm:text-base"><span className="text-gold font-medium">Founder:</span> {house.founder}</p>
              <p className="text-sm sm:text-base"><span className="text-gold font-medium">Mascot:</span> {house.mascot}</p>
              <p className="text-sm sm:text-base"><span className="text-gold font-medium">Element:</span> {house.element}</p>
            </div>
          </motion.div>

          {/* Common Room Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700 md:col-span-2 lg:col-span-1"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
              <Home className="h-7 w-7 sm:h-8 sm:w-8 text-gold mr-3" />
              Common Room
            </h2>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              {house.commonRoomDesc}
            </p>
          </motion.div>

          {/* Notable Members Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700 md:col-span-2 lg:col-span-3"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
              <Users className="h-7 w-7 sm:h-8 sm:w-8 text-gold mr-3" />
              Notable Members
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {house.notableMembers.map(member => (
                <div key={member} className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-center hover:bg-slate-700 transition-colors">
                  <p className="text-slate-300 text-sm sm:text-base">{member}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}