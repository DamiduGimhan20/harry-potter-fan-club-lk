import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Users, Home, Sparkles } from 'lucide-react';
import { MagicalParticles } from '../components/MagicalParticles';
const HOUSES_DATA = {
  gryffindor: {
    name: 'Gryffindor',
    colors: ['#740001', '#D3A625'],
    gradient: 'from-red-900 to-red-600',
    mascot: 'Lion',
    founder: 'Godric Gryffindor',
    element: 'Fire',
    traits: ['Bravery', 'Daring', 'Nerve', 'Chivalry', 'Courage', 'Determination'],
    description: 'Gryffindor values courage, bravery, nerve, and chivalry. Its emblematic animal is the lion, and its colours are scarlet and gold.',
    history: 'Founded by Godric Gryffindor, one of the four founders of Hogwarts School of Witchcraft and Wizardry. Gryffindor was known for his bravery and skill in battle. He valued courage above all other qualities and believed that any wizard or witch with a brave heart was worthy of learning magic.',
    commonRoom: "The Gryffindor common room is located in one of the castle's towers, accessible through the portrait of the Fat Lady. The room is cozy and comfortable, decorated in the house colors of scarlet and gold, with squashy armchairs, tables, and a fireplace.",
    notableMembers: ['Harry Potter - The Boy Who Lived', 'Hermione Granger - Brightest Witch of Her Age', 'Ron Weasley - Loyal Friend and Strategist', 'Albus Dumbledore - Greatest Wizard of Modern Times', 'Minerva McGonagall - Transfiguration Master', 'Sirius Black - The Last of the Blacks', 'James Potter - Marauder and Animagus', 'Lily Potter - Sacrificial Love'],
    values: 'Gryffindors are known for their daring, nerve, and chivalry. They are brave and willing to stand up for what is right, even in the face of danger. While sometimes accused of being reckless, their courage often leads them to great achievements.'
  },
  slytherin: {
    name: 'Slytherin',
    colors: ['#1A472A', '#5D5D5D'],
    gradient: 'from-green-900 to-green-600',
    mascot: 'Serpent',
    founder: 'Salazar Slytherin',
    element: 'Water',
    traits: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness', 'Determination', 'Self-Preservation'],
    description: 'Slytherin values ambition, cunning, leadership, and resourcefulness. Its emblematic animal is the serpent, and its colours are emerald green and silver.',
    history: 'Founded by Salazar Slytherin, who valued ambition, cunning, and pure-blood heritage. Slytherin was one of the four founders of Hogwarts but left the school after a disagreement with the other founders about admitting Muggle-born students. Despite its controversial reputation, Slytherin has produced many great witches and wizards.',
    commonRoom: 'The Slytherin common room is a long, low underground room with rough stone walls and ceiling, located in the dungeons beneath the Black Lake. It is lit by greenish lamps and has carved armchairs. The room has a distinctly medieval feel with its stone walls and mysterious ambiance.',
    notableMembers: ['Severus Snape - The Half-Blood Prince', 'Draco Malfoy - Redeemed Antagonist', 'Tom Riddle - Lord Voldemort (Dark Lord)', 'Horace Slughorn - Potions Master', 'Bellatrix Lestrange - Devoted Death Eater', 'Merlin - Greatest Wizard of All Time', 'Lucius Malfoy - Influential Pure-blood'],
    values: 'Slytherins are ambitious and determined, willing to do what it takes to achieve their goals. They are resourceful and cunning, often thinking strategically. While the house has produced Dark wizards, it has also produced many accomplished witches and wizards who used their ambition for good.'
  },
  ravenclaw: {
    name: 'Ravenclaw',
    colors: ['#0E1A40', '#946B2D'],
    gradient: 'from-blue-900 to-blue-600',
    mascot: 'Eagle',
    founder: 'Rowena Ravenclaw',
    element: 'Air',
    traits: ['Intelligence', 'Knowledge', 'Curiosity', 'Creativity', 'Wit', 'Wisdom'],
    description: 'Ravenclaw values intelligence, knowledge, curiosity, creativity, and wit. Its emblematic animal is the eagle, and its colours are blue and bronze.',
    history: "Founded by Rowena Ravenclaw, who valued intelligence and wisdom above all else. Ravenclaw believed that learning and knowledge were the greatest treasures. She was known for her brilliant mind and created the ever-changing floor plan of Hogwarts. Her diadem, which enhanced the wisdom of the wearer, became one of Voldemort's Horcruxes.",
    commonRoom: 'The Ravenclaw common room is located in a tower on the west side of the castle. To enter, students must answer a riddle posed by an eagle-shaped bronze knocker. The room is wide and circular, with arched windows offering spectacular views. It features blue and bronze silks, a domed ceiling painted with stars, and a white marble statue of Rowena Ravenclaw.',
    notableMembers: ['Luna Lovegood - Unique Magizoologist', 'Cho Chang - Seeker and D.A. Member', 'Filius Flitwick - Charms Master', 'Gilderoy Lockhart - Memory Charm Specialist', 'Garrick Ollivander - Wandmaker', 'Sybill Trelawney - Divination Professor', 'Padma Patil - Intelligent Witch'],
    values: 'Ravenclaws are known for their wisdom, wit, and love of learning. They value intelligence and creativity, often thinking outside the box. While sometimes seen as aloof, their pursuit of knowledge and understanding makes them invaluable in solving complex problems.'
  },
  hufflepuff: {
    name: 'Hufflepuff',
    colors: ['#FFD800', '#000000'],
    gradient: 'from-yellow-600 to-yellow-400',
    mascot: 'Badger',
    founder: 'Helga Hufflepuff',
    element: 'Earth',
    traits: ['Loyalty', 'Patience', 'Hard Work', 'Fair Play', 'Dedication', 'Tolerance'],
    description: 'Hufflepuff values hard work, dedication, patience, loyalty, and fair play. Its emblematic animal is the badger, and its colours are yellow and black.',
    history: "Founded by Helga Hufflepuff, who believed that everyone deserved a chance to learn magic, regardless of their background. Hufflepuff was the most inclusive of the four founders, accepting students who didn't fit the specific criteria of the other houses. She valued hard work and loyalty above all else and was known for her exceptional skills in food-related charms.",
    commonRoom: "The Hufflepuff common room is located in the basement, near the castle's kitchens. It is accessed through a pile of barrels. The room is cozy and welcoming, with low ceilings, round windows, and yellow hangings. It has a warm, earthy feel with plants and comfortable furniture, making it feel like a home away from home.",
    notableMembers: ['Newt Scamander - Magizoologist Extraordinaire', 'Cedric Diggory - Triwizard Champion', 'Nymphadora Tonks - Metamorphmagus Auror', 'Pomona Sprout - Herbology Professor', 'Theseus Scamander - War Hero', 'Fat Friar - House Ghost'],
    values: 'Hufflepuffs are known for their loyalty, patience, and strong work ethic. They value fair play and are often the most accepting and inclusive of the houses. While sometimes underestimated, their dedication and loyalty make them formidable allies and friends.'
  }
};
export function HouseDetailPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const house = HOUSES_DATA[id as keyof typeof HOUSES_DATA];
  if (!house) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">House not found</h1>
          <button onClick={() => navigate('/houses')} className="text-gold hover:text-white">
            Go back to houses
          </button>
        </div>
      </div>;
  }
  return <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <MagicalParticles />

      <div className="max-w-5xl mx-auto relative z-10">
        <button onClick={() => navigate('/houses')} className="flex items-center space-x-2 text-slate-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Houses</span>
        </button>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-12">
          <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${house.gradient} p-12 mb-8`}>
            <div className="relative z-10 text-center">
              <Shield className="h-20 w-20 text-white mx-auto mb-6 opacity-90" />
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-cinzel">
                {house.name}
              </h1>
              <p className="text-xl text-white/90 italic mb-6">
                "{house.description}"
              </p>
              <div className="flex justify-center gap-8 text-white/80">
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider mb-1">
                    Founder
                  </p>
                  <p className="font-bold">{house.founder}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider mb-1">
                    Mascot
                  </p>
                  <p className="font-bold">{house.mascot}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider mb-1">
                    Element
                  </p>
                  <p className="font-bold">{house.element}</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-bold text-white font-cinzel">
                  House Traits
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {house.traits.map((trait, idx) => <span key={idx} className="px-4 py-2 bg-slate-700/50 rounded-full text-sm text-slate-200 border border-slate-600">
                    {trait}
                  </span>)}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-bold text-white font-cinzel">
                  House Colors
                </h2>
              </div>
              <div className="flex gap-4">
                {house.colors.map((color, idx) => <div key={idx} className="flex-1">
                    <div className="h-20 rounded-lg border-2 border-slate-600 mb-2" style={{
                  backgroundColor: color
                }} />
                    <p className="text-xs text-slate-400 text-center font-mono">
                      {color}
                    </p>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4 font-cinzel">
                History
              </h2>
              <p className="text-slate-300 leading-relaxed">{house.history}</p>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4 font-cinzel">
                Common Room
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {house.commonRoom}
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4 font-cinzel">
                Values & Philosophy
              </h2>
              <p className="text-slate-300 leading-relaxed">{house.values}</p>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-gold" />
                <h2 className="text-2xl font-bold text-white font-cinzel">
                  Notable Members
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {house.notableMembers.map((member, idx) => <div key={idx} className="flex items-start space-x-2 text-slate-300">
                    <span className="text-gold mt-1">•</span>
                    <span>{member}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
}