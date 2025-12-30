import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Scroll, Users, GraduationCap } from 'lucide-react';
import { MagicalParticles } from '../components/MagicalParticles';
export function HomePage() {
  return <div className="min-h-screen relative overflow-hidden">
      <MagicalParticles />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547756536-cde3673fa2e5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 1
        }} className="mb-6">
            <Sparkles className="h-16 w-16 text-gold mx-auto animate-pulse" />
          </motion.div>

          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="text-5xl md:text-8xl font-bold text-white mb-6 font-cinzel text-glow">
            Harry Potter <br />
            <span className="text-gold">Fan Club LK</span>
          </motion.h1>

          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.6
        }} className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Welcome to the premier gathering place for Sri Lankan witches and
            wizards. Discover your house, explore theories, and join the magic.
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.9
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/quiz" className="px-8 py-4 bg-gold text-slate-900 rounded-full font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Get Sorted
            </Link>
            <Link to="/theories" className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
              Explore Theories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 relative z-10 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            title: 'Hogwarts Houses',
            desc: 'Discover the history and traits of the four noble houses.',
            icon: <ShieldIcon />,
            link: '/houses',
            color: 'text-red-500'
          }, {
            title: 'Fan Theories',
            desc: 'Dive into deep lore and community speculations.',
            icon: <Scroll className="h-8 w-8" />,
            link: '/theories',
            color: 'text-blue-500'
          }, {
            title: 'Characters',
            desc: 'Profiles of legendary witches and wizards.',
            icon: <Users className="h-8 w-8" />,
            link: '/characters',
            color: 'text-green-500'
          }, {
            title: 'Magical Quiz',
            desc: 'Test your knowledge and find your true house.',
            icon: <GraduationCap className="h-8 w-8" />,
            link: '/quiz',
            color: 'text-yellow-500'
          }].map((feature, idx) => <Link to={feature.link} key={idx} className="group">
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-gold/50 transition-all duration-300 h-full hover:-translate-y-2">
                  <div className={`mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-cinzel">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">{feature.desc}</p>
                  <div className="flex items-center text-gold text-sm font-medium group-hover:translate-x-2 transition-transform">
                    Explore <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Link>)}
          </div>
        </div>
      </section>
    </div>;
}
function ShieldIcon() {
  return <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>;
}