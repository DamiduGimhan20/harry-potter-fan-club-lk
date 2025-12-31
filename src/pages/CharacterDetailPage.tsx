// src/pages/CharacterDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Wand2, BookOpen, Trophy, Quote } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { Character } from '../types';
import { MagicalParticles } from '../components/MagicalParticles';

// Hardcoded characters
const HARDCODED_CHARACTERS: Record<string, Character> = {
 'harry-potter': {
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
    achievements: ['Youngest Seeker in a century', 'Defeated Lord Voldemort', 'Master of the Deathly Hallows', "Founded Dumbledore's Army", 'Triwizard Tournament Champion'],
    quotes: ['"I solemnly swear that I am up to no good."', '"It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends."', '"Working hard is important. But there is something that matters even more: believing in yourself."']
  },
  'hermione-granger': {
    id: 'hermione-granger',
    name: 'Hermione Granger',
    house: 'Gryffindor',
    role: 'Brightest Witch of Her Age',
    imageUrl:'/images/characters/hermoine.webp',
    description: 'Hermione Jean Granger is a Muggle-born witch who became one of the most accomplished witches of her generation. She later became the Minister for Magic.',
    patronus: 'Otter',
    wand: '10¾" Vine, Dragon Heartstring',
    bloodStatus: 'Muggle-born',
    backstory: 'Born to Muggle parents, Hermione discovered her magical abilities at age eleven. Despite facing prejudice for her blood status, she excelled academically and became known for her exceptional intelligence, quick thinking, and dedication to justice. She was instrumental in the defeat of Voldemort.',
    achievements: ['Top student in her year', "Co-founded Dumbledore's Army", 'Helped destroy multiple Horcruxes', 'Became Minister for Magic', 'Championed house-elf rights (S.P.E.W.)'],
    quotes: ['"Books! And cleverness! There are more important things — friendship and bravery."', '"Fear of a name increases fear of the thing itself."', '"Just because you have the emotional range of a teaspoon doesn\'t mean we all have."']
  },
  'ron-weasley': {
    id: 'ron-weasley',
    name: 'Ron Weasley',
    house: 'Gryffindor',
    role: 'King Weasley',
    imageUrl: '/images/characters/ron.jpg',
    description: "Ronald Bilius Weasley is a pure-blood wizard and Harry Potter's best friend. Known for his loyalty, humor, and strategic mind, particularly in wizard chess.",
    patronus: 'Jack Russell Terrier',
    wand: '14" Willow, Unicorn Hair',
    bloodStatus: 'Pure-blood',
    backstory: 'Ron grew up in a loving but financially struggling pure-blood family. As the sixth of seven children, he often felt overshadowed by his accomplished siblings. Despite his insecurities, Ron proved himself to be brave, loyal, and an invaluable friend to Harry throughout their adventures.',
    achievements: ['Helped defeat Voldemort', 'Destroyed a Horcrux', 'Won the House Cup for Gryffindor with his chess skills', 'Became an Auror', "Co-managed Weasleys' Wizard Wheezes"],
    quotes: ['"Don\'t let the Muggles get you down."', '"Bloody hell!"', '"You\'re a little scary sometimes, you know that? Brilliant... but scary."']
  },
  'draco-malfoy': {
    id: 'draco-malfoy',
    name: 'Draco Malfoy',
    house: 'Slytherin',
    role: 'Slytherin Prince',
    imageUrl: '/images/characters/draco.jpg',
    description: "Draco Lucius Malfoy is a pure-blood wizard and Harry Potter's rival at Hogwarts. Despite his antagonistic behavior, he showed moments of conscience and ultimately chose his family over Voldemort.",
    patronus: 'Unknown',
    wand: '10" Hawthorn, Unicorn Hair',
    bloodStatus: 'Pure-blood',
    backstory: "Born into the wealthy and influential Malfoy family, Draco was raised with pure-blood supremacist beliefs. Throughout his time at Hogwarts, he served as Harry's rival and later became a Death Eater under duress. However, he ultimately could not bring himself to kill Dumbledore or identify Harry to Voldemort.",
    achievements: ['Skilled in Occlumency', 'Repaired the Vanishing Cabinet', 'Survived the Second Wizarding War', "Raised a son who befriended Harry's son"],
    quotes: ['"My father will hear about this!"', '"I didn\'t know you could read."', '"Potter, is it true you fainted?"']
  },
  'luna-lovegood': {
    id: 'luna-lovegood',
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
    role: 'Magizoologist',
    imageUrl: '/images/characters/luna.jpg',
    description: 'Luna Lovegood is a quirky Ravenclaw student known for her unique perspective on the world and unwavering belief in magical creatures others dismiss as myths.',
    patronus: 'Hare',
    wand: 'Unknown',
    bloodStatus: 'Pure-blood',
    backstory: "Luna lost her mother at age nine when an experimental spell went wrong. This tragedy shaped her philosophical outlook on life and death. Despite being bullied for her eccentric beliefs, Luna remained true to herself and became a loyal member of Dumbledore's Army.",
    achievements: ["Member of Dumbledore's Army", 'Fought in the Battle of Hogwarts', 'Became a famous Magizoologist', 'Discovered and classified new magical creatures', 'Married Rolf Scamander (grandson of Newt Scamander)'],
    quotes: ['"You\'re just as sane as I am."', '"Things we lose have a way of coming back to us in the end, if not always in the way we expect."', "\"I think they think I'm a bit odd, you know. Some people call me 'Loony' Lovegood, actually.\""]
  },
  'severus-snape': {
    id: 'severus-snape',
    name: 'Severus Snape',
    house: 'Slytherin',
    role: 'Half-Blood Prince',
    imageUrl: '/images/characters/severus-snape.jpg',
    description: 'Severus Snape was a complex wizard whose true loyalties remained hidden until the end. A master of Potions and Occlumency, he served as a double agent during both Wizarding Wars.',
    patronus: 'Doe (same as Lily Potter)',
    wand: 'Unknown',
    bloodStatus: 'Half-blood',
    backstory: 'Born to a witch mother and Muggle father, Snape grew up in poverty and was bullied at Hogwarts. His unrequited love for Lily Evans drove many of his actions, including his defection from the Death Eaters and his protection of Harry Potter. He was one of the bravest men Harry ever knew.',
    achievements: ['Youngest Potions Master at Hogwarts', 'Invented numerous spells', 'Master of Occlumency and Legilimency', 'Double agent for the Order of the Phoenix', 'Headmaster of Hogwarts', 'Protected Harry Potter for years'],
    quotes: ['"Always."', '"Turn to page 394."', '"You have your mother\'s eyes."']
  },'albus-dumbledore': {
    id: 'albus-dumbledore',
    name: 'Albus Dumbledore',
    house: 'Gryffindor',
    role: 'Headmaster',
    imageUrl: '/images/characters/albus.webp',
    description: 'Albus Percival Wulfric Brian Dumbledore was one of the most powerful and respected wizards in history. Known for his wisdom, kindness, and unmatched magical ability, he served as the Headmaster of Hogwarts School of Witchcraft and Wizardry and played a crucial role in the defeat of Lord Voldemort.',
    patronus: 'Phoenix',
    wand: '15" Elder, Thestral Tail Hair',
    bloodStatus: 'Half-blood',
    backstory: "Born in the late 19th century, Albus Dumbledore showed extraordinary magical talent from a young age. After graduating from Hogwarts, he briefly pursued grand ambitions alongside Gellert Grindelwald, dreaming of wizard dominance “for the greater good.”However, a tragic family incident changed his path forever. Dumbledore devoted his life to protecting others, teaching at Hogwarts, and guiding future generations. As Headmaster, he became a symbol of hope during both Wizarding Wars and quietly worked behind the scenes to ensure Voldemort’s downfall.",
    achievements: ["Defeated the dark wizard Gellert Grindelwald", 'Founder and leader of the Order of the Phoenix', 'Discovered the 12 uses of dragon’s blood', 'Wielder of the Elder Wand', 'Married Rolf Scamander (grandson of Newt Scamander)'],
    quotes: ['It does not do to dwell on dreams and forget to live.', 'Happiness can be found even in the darkest of times, if one only remembers to turn on the light.', 'It matters not what someone is born, but what they grow to be.']
  },

};

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSingle } = useFirestore<Character>('characters');
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      if (!id) return;

      // Check hardcoded first
      const hardcoded = HARDCODED_CHARACTERS[id];
      if (hardcoded) {
        setCharacter(hardcoded);
        return;
      }

      // Then Firebase
      const firebaseChar = await getSingle(id);
      setCharacter(firebaseChar);
    };

    loadCharacter();
  }, [id, getSingle]);

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading character...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative bg-slate-900">
      <MagicalParticles />
      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/characters')} 
          className="flex items-center text-gold hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Characters
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-12"
        >
          {/* Top Section: Image + Name + Role + Description */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <img 
                src={character.imageUrl || 'https://placehold.co/400x600?text=' + character.name.charAt(0)} 
                alt={character.name} 
                className="w-full max-w-sm h-auto rounded-xl shadow-2xl border border-gold/20"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white font-cinzel mb-2">
                {character.name}
              </h1>
              <p className="text-2xl text-gold mb-6">
                {character.role}
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                {character.description}
              </p>
            </div>
          </div>

          {/* Magical Profile (Details Box) */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
              <Shield className="h-8 w-8 text-gold mr-3" />
              Magical Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-400 uppercase mb-1">House</p>
                <p className="text-xl text-white">{character.house}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 uppercase mb-1">Blood Status</p>
                <p className="text-xl text-white">{character.bloodStatus}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 uppercase mb-1">Patronus</p>
                <p className="text-xl text-white">{character.patronus}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 uppercase mb-1">Wand</p>
                <p className="text-xl text-white">{character.wand}</p>
              </div>
            </div>
          </div>

          {/* Backstory Section */}
          {character.backstory && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
                <BookOpen className="h-8 w-8 text-gold mr-3" />
                Backstory
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                {character.backstory}
              </p>
            </div>
          )}

          {/* Notable Achievements */}
          {character.achievements && character.achievements.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
                <Trophy className="h-8 w-8 text-gold mr-3" />
                Notable Achievements
              </h2>
              <ul className="space-y-4">
                {character.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start text-slate-300 text-lg">
                    <span className="text-gold mr-3">•</span>
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Memorable Quotes */}
          {character.quotes && character.quotes.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-6 font-cinzel flex items-center">
                <Quote className="h-8 w-8 text-gold mr-3 rotate-180" />
                Memorable Quotes
              </h2>
              <div className="space-y-8">
                {character.quotes.map((quote, i) => (
                  <blockquote key={i} className="text-slate-300 text-lg italic border-l-4 border-gold pl-6">
                    {quote}
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}