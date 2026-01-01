import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Facebook, Twitter, Instagram, Mail , } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';
export function Footer() {
  return <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-gold" />
              <span className="text-xl font-bold text-white font-cinzel">
                HP Fan Club <span className="text-gold">LK</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The premier gathering place for Sri Lankan witches and wizards.
              Explore theories, take quizzes, and join our magical community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-cinzel">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/houses" className="text-slate-400 hover:text-gold transition-colors">
                  Hogwarts Houses
                </Link>
              </li>
              <li>
                <Link to="/characters" className="text-slate-400 hover:text-gold transition-colors">
                  Characters
                </Link>
              </li>
              <li>
                <Link to="/theories" className="text-slate-400 hover:text-gold transition-colors">
                  Fan Theories
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-gold transition-colors">
                  Magical Blog
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-slate-400 hover:text-gold transition-colors">
                  Sorting Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-bold mb-4 font-cinzel">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-gold transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-gold transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-gold transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="mailto:mrcring007@gmail.com" className="text-slate-400 hover:text-gold transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-4 font-cinzel">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-gold transition-colors p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-gold transition-colors p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-gold transition-colors p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:mrcring007@gmail.com" className="text-slate-400 hover:text-gold transition-colors p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
            <div className="mt-8 mb-4">
              <VisitorCounter />
            </div>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Harry Potter Fan Club LK. All rights
            reserved. This is a fan-made site and is not affiliated with J.K.
            Rowling or Warner Bros.
          </p>
        </div>
      </div>
    </footer>;
}