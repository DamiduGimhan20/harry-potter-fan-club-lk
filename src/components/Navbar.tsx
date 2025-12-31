import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Houses',
    path: '/houses'
  }, {
    name: 'Characters',
    path: '/characters'
  }, {
    name: 'Fan Theories',
    path: '/theories'
  }, {
    name: 'Blog',
    path: '/blog'
  }, {
    name: 'Spells',
    path: '/spells'
  }, {
    name: 'Quiz',
    path: '/quiz'
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-gold animate-pulse" />
              <div className="absolute inset-0 bg-gold blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-wider font-cinzel">
              HP Fan Club <span className="text-gold">LK</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname === link.path ? 'text-gold' : 'text-slate-300 hover:text-white'}`}>
                {link.name}
                {location.pathname === link.path && <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" initial={false} transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30
            }} />}
              </Link>)}
            {/*<Link to="/admin" className="px-4 py-2 text-xs font-medium text-slate-400 border border-slate-700 rounded hover:bg-slate-800 hover:text-white transition-colors">
              Admin
            </Link>*/}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2" aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map(link => <Link key={link.name} to={link.path} className={`block px-3 py-3 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-slate-800 text-gold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                  {link.name}
                </Link>)}
              {/*<Link to="/admin" className="block px-3 py-3 rounded-md text-base font-medium text-slate-400 hover:bg-slate-800 hover:text-white">
                Admin Dashboard
              </Link>*/}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
}