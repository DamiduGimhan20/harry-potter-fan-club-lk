import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Wand2, BookOpen } from 'lucide-react';
import { MagicalParticles } from '../components/MagicalParticles';

import harryPotterImg from '../images/characters/harry-potter.jpg';
import severusImg from '../images/characters/severus-snape.jpg';
import hermoine from '../images/characters/hermoine.webp';
import ron from '../images/characters/ron.jpg';
import draco from '../images/characters/draco.jpg';
import luna from '../images/characters/luna.jpg';
import albus from '../images/characters/albus.webp';
const CHARACTERS_DATA = {
  'harry-potter': {
    name: 'Harry Potter',
    house: 'Gryffindor',
    role: 'The Boy Who Lived',
    imageUrl: harryPotterImg,
    description: 'Harry James Potter is the only known survivor of the Killing Curse and the defeater of Lord Voldemort. Born to James and Lily Potter, he became an orphan at the age of one when Voldemort murdered his parents.',
    patronus: 'Stag',
    wand: '11" Holly, Phoenix Feather',
    bloodStatus: 'Half-blood',
    backstory: 'Harry grew up with his aunt and uncle, the Dursleys, who treated him poorly and kept his magical heritage a secret. On his eleventh birthday, he discovered he was a wizard and began attending Hogwarts School of Witchcraft and Wizardry. Throughout his years at Hogwarts, Harry faced numerous challenges, including confronting Voldemort multiple times.',
    achievements: ['Youngest Seeker in a century', 'Defeated Lord Voldemort', 'Master of the Deathly Hallows', "Founded Dumbledore's Army", 'Triwizard Tournament Champion'],
    quotes: ['"I solemnly swear that I am up to no good."', '"It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends."', '"Working hard is important. But there is something that matters even more: believing in yourself."']
  },
  'hermione-granger': {
    name: 'Hermione Granger',
    house: 'Gryffindor',
    role: 'Brightest Witch of Her Age',
    imageUrl: hermoine,
    description: 'Hermione Jean Granger is a Muggle-born witch who became one of the most accomplished witches of her generation. She later became the Minister for Magic.',
    patronus: 'Otter',
    wand: '10¾" Vine, Dragon Heartstring',
    bloodStatus: 'Muggle-born',
    backstory: 'Born to Muggle parents, Hermione discovered her magical abilities at age eleven. Despite facing prejudice for her blood status, she excelled academically and became known for her exceptional intelligence, quick thinking, and dedication to justice. She was instrumental in the defeat of Voldemort.',
    achievements: ['Top student in her year', "Co-founded Dumbledore's Army", 'Helped destroy multiple Horcruxes', 'Became Minister for Magic', 'Championed house-elf rights (S.P.E.W.)'],
    quotes: ['"Books! And cleverness! There are more important things — friendship and bravery."', '"Fear of a name increases fear of the thing itself."', '"Just because you have the emotional range of a teaspoon doesn\'t mean we all have."']
  },
  'ron-weasley': {
    name: 'Ron Weasley',
    house: 'Gryffindor',
    role: 'King Weasley',
    imageUrl: ron,
    description: "Ronald Bilius Weasley is a pure-blood wizard and Harry Potter's best friend. Known for his loyalty, humor, and strategic mind, particularly in wizard chess.",
    patronus: 'Jack Russell Terrier',
    wand: '14" Willow, Unicorn Hair',
    bloodStatus: 'Pure-blood',
    backstory: 'Ron grew up in a loving but financially struggling pure-blood family. As the sixth of seven children, he often felt overshadowed by his accomplished siblings. Despite his insecurities, Ron proved himself to be brave, loyal, and an invaluable friend to Harry throughout their adventures.',
    achievements: ['Helped defeat Voldemort', 'Destroyed a Horcrux', 'Won the House Cup for Gryffindor with his chess skills', 'Became an Auror', "Co-managed Weasleys' Wizard Wheezes"],
    quotes: ['"Don\'t let the Muggles get you down."', '"Bloody hell!"', '"You\'re a little scary sometimes, you know that? Brilliant... but scary."']
  },
  'draco-malfoy': {
    name: 'Draco Malfoy',
    house: 'Slytherin',
    role: 'Slytherin Prince',
    imageUrl: draco,
    description: "Draco Lucius Malfoy is a pure-blood wizard and Harry Potter's rival at Hogwarts. Despite his antagonistic behavior, he showed moments of conscience and ultimately chose his family over Voldemort.",
    patronus: 'Unknown',
    wand: '10" Hawthorn, Unicorn Hair',
    bloodStatus: 'Pure-blood',
    backstory: "Born into the wealthy and influential Malfoy family, Draco was raised with pure-blood supremacist beliefs. Throughout his time at Hogwarts, he served as Harry's rival and later became a Death Eater under duress. However, he ultimately could not bring himself to kill Dumbledore or identify Harry to Voldemort.",
    achievements: ['Skilled in Occlumency', 'Repaired the Vanishing Cabinet', 'Survived the Second Wizarding War', "Raised a son who befriended Harry's son"],
    quotes: ['"My father will hear about this!"', '"I didn\'t know you could read."', '"Potter, is it true you fainted?"']
  },
  'luna-lovegood': {
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
    role: 'Magizoologist',
    imageUrl: luna,
    description: 'Luna Lovegood is a quirky Ravenclaw student known for her unique perspective on the world and unwavering belief in magical creatures others dismiss as myths.',
    patronus: 'Hare',
    wand: 'Unknown',
    bloodStatus: 'Pure-blood',
    backstory: "Luna lost her mother at age nine when an experimental spell went wrong. This tragedy shaped her philosophical outlook on life and death. Despite being bullied for her eccentric beliefs, Luna remained true to herself and became a loyal member of Dumbledore's Army.",
    achievements: ["Member of Dumbledore's Army", 'Fought in the Battle of Hogwarts', 'Became a famous Magizoologist', 'Discovered and classified new magical creatures', 'Married Rolf Scamander (grandson of Newt Scamander)'],
    quotes: ['"You\'re just as sane as I am."', '"Things we lose have a way of coming back to us in the end, if not always in the way we expect."', "\"I think they think I'm a bit odd, you know. Some people call me 'Loony' Lovegood, actually.\""]
  },
  'severus-snape': {
    name: 'Severus Snape',
    house: 'Slytherin',
    role: 'Half-Blood Prince',
    imageUrl: severusImg,
    description: 'Severus Snape was a complex wizard whose true loyalties remained hidden until the end. A master of Potions and Occlumency, he served as a double agent during both Wizarding Wars.',
    patronus: 'Doe (same as Lily Potter)',
    wand: 'Unknown',
    bloodStatus: 'Half-blood',
    backstory: 'Born to a witch mother and Muggle father, Snape grew up in poverty and was bullied at Hogwarts. His unrequited love for Lily Evans drove many of his actions, including his defection from the Death Eaters and his protection of Harry Potter. He was one of the bravest men Harry ever knew.',
    achievements: ['Youngest Potions Master at Hogwarts', 'Invented numerous spells', 'Master of Occlumency and Legilimency', 'Double agent for the Order of the Phoenix', 'Headmaster of Hogwarts', 'Protected Harry Potter for years'],
    quotes: ['"Always."', '"Turn to page 394."', '"You have your mother\'s eyes."']
  },'albus-dumbledore': {
    name: 'Albus Dumbledore',
    house: 'Gryffindor',
    role: 'Headmaster',
    imageUrl: albus,
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
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const character = CHARACTERS_DATA[id as keyof typeof CHARACTERS_DATA];
  if (!character) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Character not found</h1>
          <button onClick={() => navigate('/characters')} className="text-gold hover:text-white">
            Go back to characters
          </button>
        </div>
      </div>;
  }
  const houseColors = {
    Gryffindor: 'from-red-900 to-red-600',
    Slytherin: 'from-green-900 to-green-600',
    Ravenclaw: 'from-blue-900 to-blue-600',
    Hufflepuff: 'from-yellow-600 to-yellow-400'
  };
  return <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <MagicalParticles />

      <div className="max-w-5xl mx-auto relative z-10">
        <button onClick={() => navigate('/characters')} className="flex items-center space-x-2 text-slate-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Characters</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} className="md:col-span-1">
            <div className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[3/4]">
                <img src={character.imageUrl} alt={character.name} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${houseColors[character.house as keyof typeof houseColors]} opacity-20`} />
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4">
                  Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">House</span>
                    <span className="text-white font-medium">
                      {character.house}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Blood Status</span>
                    <span className="text-white font-medium">
                      {character.bloodStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Patronus</span>
                    <span className="text-white font-medium">
                      {character.patronus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Wand</span>
                    <span className="text-white font-medium text-right">
                      {character.wand}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-cinzel">
                {character.name}
              </h1>
              <p className="text-gold text-xl mb-6">{character.role}</p>
              <p className="text-slate-300 leading-relaxed">
                {character.description}
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-bold text-white font-cinzel">
                  Backstory
                </h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {character.backstory}
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-bold text-white font-cinzel">
                  Notable Achievements
                </h2>
              </div>
              <ul className="space-y-2">
                {character.achievements.map((achievement, idx) => <li key={idx} className="flex items-start space-x-2 text-slate-300">
                    <span className="text-gold mt-1">•</span>
                    <span>{achievement}</span>
                  </li>)}
              </ul>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center space-x-2 mb-4">
                <Wand2 className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-bold text-white font-cinzel">
                  Memorable Quotes
                </h2>
              </div>
              <div className="space-y-4">
                {character.quotes.map((quote, idx) => <blockquote key={idx} className="border-l-2 border-gold pl-4 italic text-slate-300">
                    {quote}
                  </blockquote>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
}