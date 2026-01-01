import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SpellCard } from '../components/SpellCard';
import { MagicalParticles } from '../components/MagicalParticles';

const SPELLS = [
  { id: 'aberto', name: 'Aberto', incantation: null, type: 'Charm', effect: 'unlocks doors', notes: null },
  { id: 'accio', name: 'Accio', incantation: 'Accio', type: 'Charm', effect: 'summons objects directly to the spell-caster', notes: null },
  { id: 'aguamenti', name: 'Aguamenti', incantation: 'Aguamenti', type: 'Spell', effect: 'creates a stream of water from the spell-caster’s wand', notes: null },
  { id: 'alarte-ascendare', name: 'Alarte Ascendare', incantation: 'Alarte Ascendare', type: 'Spell', effect: 'launches objects into the air', notes: null },
  { id: 'alohomora', name: 'Alohomora', incantation: 'Alohomora', type: 'Charm', effect: 'opens locked doors; counter charm for Colloportus', notes: null },
  { id: 'appare-vestigium', name: 'Appare Vestigium', incantation: null, type: 'Spell', effect: 'tracks recent magical activity', notes: 'Newt Scamander uses Appare Vestigium, a spell to track recent magical activity' },
  { id: 'anapneo', name: 'Anapneo', incantation: 'Anapneo', type: 'Charm', effect: 'eliminates blockages within the target’s airway', notes: null },
  { id: 'anteoculatia', name: 'Anteoculatia', incantation: 'Anteoculatia', type: 'Curse', effect: 'causes antlers to grow from the target’s head', notes: null },
  { id: 'aparecium', name: 'Aparecium', incantation: 'Aparecium', type: 'Charm', effect: 'renders invisible ink visible again', notes: null },
  { id: 'ascendio', name: 'Ascendio', incantation: 'Ascendio', type: 'Charm', effect: 'propels the spell-caster into the air', notes: null },
  { id: 'avada-kedavra', name: 'Avada Kedavra', incantation: 'Avada Kedavra', type: 'Curse', effect: 'kills the target; one of the three Unforgivable Curses', notes: null },
  { id: 'avenseguim', name: 'Avenseguim', incantation: null, type: 'Charm', effect: 'turns an object into a tracking device', notes: null },
  { id: 'avis', name: 'Avis', incantation: 'Avis', type: 'Spell', effect: 'conjures a flock of birds', notes: null },
  { id: 'babbling-curse', name: 'Babbling Curse', incantation: null, type: 'Curse', effect: 'causes the target to speak incoherently', notes: null },
  { id: 'bat-bogey-hex', name: 'Bat-Bogey Hex', incantation: null, type: 'Hex', effect: 'transforms the target’s bogeys into bats which fly out of the target’s nose', notes: null },
  { id: 'bombarda', name: 'Bombarda', incantation: 'Bombarda', type: 'Spell', effect: 'detonates target objects with a small explosion', notes: null },
  { id: 'brachiabindo', name: 'Brachiabindo', incantation: null, type: 'Curse', effect: 'binds the target with invisible bindings', notes: null },
  { id: 'bubble-head-charm', name: 'Bubble-Head Charm', incantation: null, type: 'Charm', effect: 'creates a protective oxygen-filled bubble around the head of the spell-caster allowing them to breathe underwater', notes: null },
  { id: 'caterwauling-charm', name: 'Caterwauling Charm', incantation: null, type: 'Charm', effect: 'produces a high-pitched scream when an unauthorised person enters a designated target area', notes: null },
  { id: 'cave-inimicum', name: 'Cave Inimicum', incantation: null, type: 'Charm', effect: 'creates a protective barrier around the spell-caster which renders them both invisible and mute to others', notes: null },
  { id: 'cheering-charm', name: 'Cheering Charm', incantation: null, type: 'Charm', effect: 'makes the target feel cheerful and elated', notes: null },
  { id: 'colloportus', name: 'Colloportus', incantation: 'Colloportus', type: 'Charm', effect: 'locks doors; counter charm for Alohomora', notes: null },
  { id: 'cruciatus-curse', name: 'Cruciatus Curse', incantation: 'Crucio', type: 'Curse', effect: 'inflicts extreme pain upon the target; one of the three Unforgivable Curses', notes: 'Harry attempts the Unforgivable Cruciatus Curse to inflict pain upon Bellatrix Lestrange' },
  { id: 'colovaria', name: 'Colovaria', incantation: null, type: 'Charm', effect: 'changes the colour of objects', notes: null },
  { id: 'confringo', name: 'Confringo', incantation: null, type: 'Spell', effect: 'causes the target to explode', notes: null },
  { id: 'confundo', name: 'Confundo', incantation: 'Confundo', type: 'Hex', effect: 'confuses and misdirects the target', notes: null },
  { id: 'conjunctivitis-curse', name: 'Conjunctivitis Curse', incantation: null, type: 'Curse', effect: 'causes the target’s eyes to swell and shut', notes: null },
  { id: 'cornflake-skin-charm', name: 'Cornflake Skin Charm', incantation: null, type: 'Charm', effect: 'causes the target’s skin to take on the appearance of cornflakes', notes: null },
  { id: 'defodio', name: 'Defodio', incantation: null, type: 'Spell', effect: 'carves through earth or stone material', notes: null },
  { id: 'deletrius', name: 'Deletrius', incantation: null, type: 'Spell', effect: 'disintegrates objects', notes: null },
  { id: 'densaugeo', name: 'Densaugeo', incantation: 'Densaugeo', type: 'Curse', effect: 'causes the target’s teeth to elongate', notes: null },
  { id: 'deprimo', name: 'Deprimo', incantation: null, type: 'Spell', effect: 'blasts holes in the ground', notes: null },
  { id: 'depulso', name: 'Depulso', incantation: null, type: 'Charm', effect: 'causes objects to move away from the spell-caster’s location', notes: null },
  { id: 'descendo', name: 'Descendo', incantation: null, type: 'Spell', effect: 'causes objects to move downwards', notes: null },
  { id: 'diffindo', name: 'Diffindo', incantation: 'Diffindo', type: 'Spell', effect: 'splits objects apart', notes: null },
  { id: 'disillusionment-charm', name: 'Disillusionment Charm', incantation: null, type: 'Charm', effect: 'hides the target through a chameleon-like effect where the target takes on the appearance of the background', notes: null },
  { id: 'dissendium', name: 'Dissendium', incantation: null, type: 'Charm', effect: 'reveals hidden passageways', notes: null },
  { id: 'drought-charm', name: 'Drought Charm', incantation: null, type: 'Charm', effect: 'dries up bodies of water', notes: null },
  { id: 'duro', name: 'Duro', incantation: null, type: 'Charm', effect: 'turns objects to stone', notes: null },
  { id: 'ear-shrivelling-curse', name: 'Ear-Shrivelling Curse', incantation: null, type: 'Curse', effect: 'causes the target’s ears to shrivel', notes: null },
  { id: 'emancipare', name: 'Emancipare', incantation: null, type: 'Charm', effect: 'releases bindings; counter-charm for Fulgari', notes: null },
  { id: 'enervate', name: 'Enervate', incantation: null, type: 'Charm', effect: 'revives or returns the target to their normal state', notes: null },
  { id: 'engorgio', name: 'Engorgio', incantation: 'Engorgio', type: 'Charm', effect: 'causes the target to grow in size', notes: null },
  { id: 'entrail-expelling-curse', name: 'Entrail-Expelling Curse', incantation: null, type: 'Curse', effect: 'causes the target’s entrails to be expelled from their body', notes: null },
  { id: 'episkey', name: 'Episkey', incantation: 'Episkey', type: 'Charm', effect: 'heals minor injuries like broken bones or split lips', notes: null },
  { id: 'erecto', name: 'Erecto', incantation: null, type: 'Charm', effect: 'straightens out and erects target objects (e.g. tents)', notes: null },
  { id: 'evanesco', name: 'Evanesco', incantation: null, type: 'Spell', effect: 'causes objects to disappear', notes: null },
  { id: 'expecto-patronum', name: 'Expecto Patronum', incantation: 'Expecto Patronum', type: 'Charm', effect: 'creates a protective spirit-like animal guardian to ward off Dementors; also used as a form of communication', notes: 'Hermione Granger uses Expecto Patronum to conjure a protective animal guardian' },
  { id: 'expelliarmus', name: 'Expelliarmus', incantation: 'Expelliarmus', type: 'Charm', effect: 'disarms the target by causing their wand to fly from their hand', notes: null },
  { id: 'expulso', name: 'Expulso', incantation: null, type: 'Spell', effect: 'produces a powerful explosion', notes: null },
  { id: 'ferula', name: 'Ferula', incantation: 'Ferula', type: 'Charm', effect: 'conjures and wraps bandages and slings', notes: null },
  { id: 'fidelius-charm', name: 'Fidelius Charm', incantation: null, type: 'Charm', effect: 'conceals secrets through the use of a ‘Secret Keeper’; the secret is known only to the Secret Keeper and cannot be learned unless explicitly revealed by the Secret Keeper', notes: null },
  { id: 'fiendfyre-curse', name: 'Fiendfyre Curse', incantation: null, type: 'Curse', effect: 'creates immense Dark animal-shaped flames which seek out and destroy everything in their path', notes: 'An inferno of Cursed Fiendfyre destroys the contents of the Room of Requirement' },
  { id: 'finestra', name: 'Finestra', incantation: null, type: 'Spell', effect: 'shatters glass', notes: null },
  { id: 'finite-incantatem', name: 'Finite Incantatem', incantation: 'Finite Incantatem', type: 'Charm', effect: 'terminates the effects of an already-cast spell', notes: null },
  { id: 'flagrante-curse', name: 'Flagrante Curse', incantation: null, type: 'Curse', effect: 'causes objects to emit immense heat when touched', notes: null },
  { id: 'flagrate', name: 'Flagrate', incantation: null, type: 'Charm', effect: 'draws fiery marks in the air', notes: null },
  { id: 'flame-freezing-charm', name: 'Flame-Freezing Charm', incantation: null, type: 'Charm', effect: 'renders the spell-caster immune to burning by fire', notes: null },
  { id: 'flipendo', name: 'Flipendo', incantation: 'Flipendo', type: 'Spell', effect: 'knocks the target backwards', notes: null },
  { id: 'furnunculus', name: 'Furnunculus', incantation: 'Furnunculus', type: 'Curse', effect: 'causes the target to break out in boils', notes: null },
  { id: 'geminio', name: 'Geminio', incantation: 'Geminio', type: 'Curse', effect: 'duplicates objects', notes: null },
  { id: 'glisseo', name: 'Glisseo', incantation: 'Glisseo', type: 'Spell', effect: 'turns stairs into a slide', notes: null },
  { id: 'harmonia-nectere-passus', name: 'Harmonia Nectere Passus', incantation: 'Harmonia Nectere Passus', type: 'Charm', effect: 'repairs Vanishing Cabinets', notes: null },
  { id: 'homenum-revelio', name: 'Homenum Revelio', incantation: 'Homenum Revelio', type: 'Charm', effect: 'reveals human presence', notes: null },
  { id: 'horcrux-making-spell', name: 'Horcrux-making spell', incantation: null, type: 'Dark magic', effect: 'splits the soul and encases the torn piece in an object', notes: null },
  { id: 'imperio', name: 'Imperio', incantation: 'Imperio', type: 'Curse', effect: 'places the target completely under the spell-caster’s control; one of the three Unforgivable Curses', notes: null },
  { id: 'impervius', name: 'Impervius', incantation: 'Impervius', type: 'Charm', effect: 'makes objects waterproof', notes: null },
  { id: 'incarcerous', name: 'Incarcerous', incantation: 'Incarcerous', type: 'Spell', effect: 'binds the target with ropes', notes: null },
  { id: 'incendio', name: 'Incendio', incantation: 'Incendio', type: 'Spell', effect: 'produces fire', notes: null },
  { id: 'jelly-legs-jinx', name: 'Jelly-Legs Jinx', incantation: null, type: 'Jinx', effect: 'causes the target’s legs to wobble uncontrollably', notes: null },
  { id: 'langlock', name: 'Langlock', incantation: 'Langlock', type: 'Jinx', effect: 'glues the target’s tongue to the roof of their mouth', notes: null },
  { id: 'legilimens', name: 'Legilimens', incantation: 'Legilimens', type: 'Charm', effect: 'allows the spell-caster to delve into the target’s mind and view memories', notes: null },
  { id: 'levicorpus', name: 'Levicorpus', incantation: 'Levicorpus', type: 'Jinx', effect: 'hoists the target into the air by their ankle', notes: null },
  { id: 'liberacorpus', name: 'Liberacorpus', incantation: 'Liberacorpus', type: 'Counter-jinx', effect: 'lowers the target hoisted by Levicorpus', notes: null },
  { id: 'locomotor', name: 'Locomotor', incantation: 'Locomotor', type: 'Charm', effect: 'moves objects', notes: null },
  { id: 'locomotor-morti', name: 'Locomotor Mortis', incantation: 'Locomotor Mortis', type: 'Curse', effect: 'binds the target’s legs together', notes: null },
  { id: 'lumos', name: 'Lumos', incantation: 'Lumos', type: 'Charm', effect: 'creates light at the end of the spell-caster’s wand', notes: null },
  { id: 'muffliato', name: 'Muffliato', incantation: 'Muffliato', type: 'Charm', effect: 'prevents nearby people from hearing conversations', notes: null },
  { id: 'nox', name: 'Nox', incantation: 'Nox', type: 'Charm', effect: 'extinguishes light created by Lumos; counter charm for Lumos', notes: null },
  { id: 'obliviate', name: 'Obliviate', incantation: 'Obliviate', type: 'Charm', effect: 'erases or modifies memories', notes: null },
  { id: 'obscuro', name: 'Obscuro', incantation: 'Obscuro', type: 'Charm', effect: 'blindfolds the target', notes: null },
  { id: 'oppugno', name: 'Oppugno', incantation: 'Oppugno', type: 'Jinx', effect: 'causes conjured objects to attack the target', notes: null },
  { id: 'orchideous', name: 'Orchideous', incantation: 'Orchideous', type: 'Spell', effect: 'conjures a bouquet of flowers', notes: null },
  { id: 'pack', name: 'Pack', incantation: null, type: 'Charm', effect: 'packs luggage', notes: null },
  { id: 'peskipiksi-pesternomi', name: 'Peskipiksi Pesternomi', incantation: 'Peskipiksi Pesternomi', type: 'Charm', effect: 'supposed to immobilise pixies (does not work)', notes: null },
  { id: 'petrificus-totalus', name: 'Petrificus Totalus', incantation: 'Petrificus Totalus', type: 'Curse', effect: 'paralyses the target', notes: null },
  { id: 'piertotum-locomotor', name: 'Piertotum Locomotor', incantation: 'Piertotum Locomotor', type: 'Spell', effect: 'animates statues and armour', notes: null },
  { id: 'point-me', name: 'Point Me', incantation: 'Point Me', type: 'Charm', effect: 'turns the spell-caster’s wand into a compass', notes: null },
  { id: 'portus', name: 'Portus', incantation: 'Portus', type: 'Charm', effect: 'turns an object into a Portkey', notes: null },
  { id: 'priori-incantato', name: 'Priori Incantato', incantation: 'Priori Incantato', type: 'Charm', effect: 'reveals the last spell cast by a wand', notes: null },
  { id: 'protego', name: 'Protego', incantation: 'Protego', type: 'Charm', effect: 'creates a protective shield', notes: null },
  { id: 'protego-maxima', name: 'Protego Maxima', incantation: 'Protego Maxima', type: 'Charm', effect: 'creates a powerful protective barrier', notes: null },
  { id: 'quiets', name: 'Quietus', incantation: 'Quietus', type: 'Charm', effect: 'reduces the volume of the target’s voice; counter charm for Sonorus', notes: null },
  { id: 'reducio', name: 'Reducio', incantation: 'Reducio', type: 'Charm', effect: 'shrinks the target; counter charm for Engorgio', notes: null },
  { id: 'reducto', name: 'Reducto', incantation: 'Reducto', type: 'Spell', effect: 'blasts solid objects apart', notes: null },
  { id: 'relashio', name: 'Relashio', incantation: 'Relashio', type: 'Charm', effect: 'releases bindings or forces the target to release their grip', notes: null },
  { id: 'rennervate', name: 'Rennervate', incantation: 'Rennervate', type: 'Charm', effect: 'revives a stunned target', notes: null },
  { id: 'repello-muggletum', name: 'Repello Muggletum', incantation: null, type: 'Charm', effect: 'repels Muggles from a designated area', notes: null },
  { id: 'reparo', name: 'Reparo', incantation: 'Reparo', type: 'Charm', effect: 'repairs broken objects', notes: null },
  { id: 'revelio', name: 'Revelio', incantation: 'Revelio', type: 'Charm', effect: 'reveals hidden objects or secrets', notes: null },
  { id: 'rictusempra', name: 'Rictusempra', incantation: 'Rictusempra', type: 'Charm', effect: 'tickles the target', notes: null },
  { id: 'riddikulus', name: 'Riddikulus', incantation: 'Riddikulus', type: 'Charm', effect: 'transforms a Boggart into something humorous', notes: null },
  { id: 'salvio-hexia', name: 'Salvio Hexia', incantation: null, type: 'Charm', effect: 'provides protection against hexes', notes: null },
  { id: 'scourgify', name: 'Scourgify', incantation: 'Scourgify', type: 'Charm', effect: 'cleans objects', notes: null },
  { id: 'sectumsempra', name: 'Sectumsempra', incantation: 'Sectumsempra', type: 'Curse', effect: 'causes deep gashes on the target', notes: null },
  { id: 'serpensortia', name: 'Serpensortia', incantation: 'Serpensortia', type: 'Spell', effect: 'conjures a snake', notes: null },
  { id: 'silencio', name: 'Silencio', incantation: 'Silencio', type: 'Charm', effect: 'silences the target', notes: null },
  { id: 'sonorus', name: 'Sonorus', incantation: 'Sonorus', type: 'Charm', effect: 'amplifies the spell-caster’s voice', notes: null },
  { id: 'stupefy', name: 'Stupefy', incantation: 'Stupefy', type: 'Spell', effect: 'stuns the target', notes: null },
  { id: 'tarantallegra', name: 'Tarantallegra', incantation: 'Tarantallegra', type: 'Charm', effect: 'forces the target’s legs to dance uncontrollably', notes: null },
  { id: 'tergeo', name: 'Tergeo', incantation: 'Tergeo', type: 'Charm', effect: 'siphons liquid or dust from a surface', notes: null },
  { id: 'wingardium-leviosa', name: 'Wingardium Leviosa', incantation: 'Wingardium Leviosa', type: 'Charm', effect: 'levitates objects', notes: null },
  
];

export function SpellsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpells = SPELLS.filter(spell =>
    spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spell.effect.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (spell.incantation && spell.incantation.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (spell.notes && spell.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative">
      <MagicalParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-cinzel mb-4">Spells & Charms</h1>
          <p className="text-slate-400 text-base sm:text-lg">Master the ancient arts of wizardry – over 100 spells!</p>
        </motion.div>

        {/* Search Bar – Responsive */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, effect, incantation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 px-10 text-white placeholder-slate-400 focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
          />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredSpells.map((spell, index) => (
            <SpellCard key={spell.id} spell={spell} index={index} />
          ))}
        </div>

        {filteredSpells.length === 0 && (
          <p className="text-center text-slate-500 mt-20 text-lg sm:text-xl">
            No spells found – try "Accio" or "Lumos"!
          </p>
        )}
      </div>
    </div>
  );
}