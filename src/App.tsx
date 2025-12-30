import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HousesPage } from './pages/HousesPage';
import { HouseDetailPage } from './pages/HouseDetailPage';
import { CharactersPage } from './pages/CharactersPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { FanTheoriesPage } from './pages/FanTheoriesPage';
import { TheoryDetailPage } from './pages/TheoryDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { QuizPage } from './pages/QuizPage';
import { AdminPage } from './pages/AdminPage';
function ScrollToTop() {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
export function App() {
  return <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-gold selection:text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/houses" element={<HousesPage />} />
              <Route path="/houses/:id" element={<HouseDetailPage />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/characters/:id" element={<CharacterDetailPage />} />
              <Route path="/theories" element={<FanTheoriesPage />} />
              <Route path="/theories/:id" element={<TheoryDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>;
}