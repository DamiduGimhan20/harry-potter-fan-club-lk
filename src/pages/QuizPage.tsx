import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, RefreshCw, Trophy } from 'lucide-react';
import { MagicalParticles } from '../components/MagicalParticles';
interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    house: string;
  }[];
}
const QUESTIONS: Question[] = [{
  id: 1,
  text: 'Which quality do you value most?',
  options: [{
    text: 'Bravery',
    house: 'Gryffindor'
  }, {
    text: 'Intelligence',
    house: 'Ravenclaw'
  }, {
    text: 'Loyalty',
    house: 'Hufflepuff'
  }, {
    text: 'Ambition',
    house: 'Slytherin'
  }]
}, {
  id: 2,
  text: 'Which instrument pleases your ear?',
  options: [{
    text: 'The violin',
    house: 'Slytherin'
  }, {
    text: 'The trumpet',
    house: 'Gryffindor'
  }, {
    text: 'The piano',
    house: 'Ravenclaw'
  }, {
    text: 'The drum',
    house: 'Hufflepuff'
  }]
}, {
  id: 3,
  text: 'What would you rather be?',
  options: [{
    text: 'Trusted',
    house: 'Hufflepuff'
  }, {
    text: 'Praised',
    house: 'Gryffindor'
  }, {
    text: 'Feared',
    house: 'Slytherin'
  }, {
    text: 'Wise',
    house: 'Ravenclaw'
  }]
}, {
  id: 4,
  text: 'Which potion would you choose?',
  options: [{
    text: 'Glory Potion',
    house: 'Gryffindor'
  }, {
    text: 'Wisdom Elixir',
    house: 'Ravenclaw'
  }, {
    text: 'Power Brew',
    house: 'Slytherin'
  }, {
    text: 'Love Potion',
    house: 'Hufflepuff'
  }]
}, {
  id: 5,
  text: 'How would you like to be known to history?',
  options: [{
    text: 'The Wise',
    house: 'Ravenclaw'
  }, {
    text: 'The Good',
    house: 'Hufflepuff'
  }, {
    text: 'The Great',
    house: 'Slytherin'
  }, {
    text: 'The Bold',
    house: 'Gryffindor'
  }]
}, {
  id: 6,
  text: 'Which road tempts you most?',
  options: [{
    text: 'The wide, sunny, grassy lane',
    house: 'Hufflepuff'
  }, {
    text: 'The narrow, dark, lantern-lit alley',
    house: 'Slytherin'
  }, {
    text: 'The twisting, leaf-strewn path through woods',
    house: 'Gryffindor'
  }, {
    text: 'The cobbled street lined with ancient buildings',
    house: 'Ravenclaw'
  }]
}, {
  id: 7,
  text: 'If you could have any power, which would you choose?',
  options: [{
    text: 'Invisibility',
    house: 'Gryffindor'
  }, {
    text: 'Mind Reading',
    house: 'Ravenclaw'
  }, {
    text: 'Super Strength',
    house: 'Slytherin'
  }, {
    text: 'Speaking to Animals',
    house: 'Hufflepuff'
  }]
}, {
  id: 8,
  text: 'Which nightmare would frighten you most?',
  options: [{
    text: 'Standing on top of something very high',
    house: 'Ravenclaw'
  }, {
    text: 'An eye at the keyhole of the dark room',
    house: 'Gryffindor'
  }, {
    text: 'Being forced to speak in a silly voice',
    house: 'Slytherin'
  }, {
    text: 'Waking up to find that neither your friends nor family know you',
    house: 'Hufflepuff'
  }]
}, {
  id: 9,
  text: 'A Muggle confronts you and says that they know you are a wizard. You would:',
  options: [{
    text: 'Ask them what makes them think so',
    house: 'Ravenclaw'
  }, {
    text: "Agree, and ask whether they'd like a free sample of a jinx",
    house: 'Slytherin'
  }, {
    text: 'Agree, and walk away, leaving them to wonder whether you are bluffing',
    house: 'Gryffindor'
  }, {
    text: 'Tell them that you are worried about their mental health',
    house: 'Hufflepuff'
  }]
}, {
  id: 10,
  text: 'Which of the following do you find most difficult to deal with?',
  options: [{
    text: 'Hunger',
    house: 'Hufflepuff'
  }, {
    text: 'Cold',
    house: 'Slytherin'
  }, {
    text: 'Loneliness',
    house: 'Gryffindor'
  }, {
    text: 'Boredom',
    house: 'Ravenclaw'
  }]
}];
export function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    Gryffindor: 0,
    Slytherin: 0,
    Ravenclaw: 0,
    Hufflepuff: 0
  });
  const [showResult, setShowResult] = useState(false);
  const handleAnswer = (house: string) => {
    const newScores = {
      ...scores,
      [house]: scores[house] + 1
    };
    setScores(newScores);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };
  const getWinner = () => {
    return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };
  const restartQuiz = () => {
    setScores({
      Gryffindor: 0,
      Slytherin: 0,
      Ravenclaw: 0,
      Hufflepuff: 0
    });
    setCurrentQuestion(0);
    setShowResult(false);
  };
  const winner = getWinner();
  return <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center relative">
      <MagicalParticles />

      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!showResult ? <motion.div key="question" initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.95
        }} className="bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl border border-slate-700 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gold font-cinzel text-lg">
                  Question {currentQuestion + 1}/{QUESTIONS.length}
                </span>
                <Wand2 className="text-purple-400 h-6 w-6" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-cinzel text-center">
                {QUESTIONS[currentQuestion].text}
              </h2>

              <div className="grid gap-4">
                {QUESTIONS[currentQuestion].options.map((option, idx) => <button key={idx} onClick={() => handleAnswer(option.house)} className="w-full text-left p-4 rounded-xl bg-slate-700/50 hover:bg-gold hover:text-slate-900 border border-slate-600 hover:border-gold transition-all duration-300 group">
                    <span className="font-medium">{option.text}</span>
                  </button>)}
              </div>
            </motion.div> : <motion.div key="result" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="bg-slate-800/80 backdrop-blur-md p-10 rounded-2xl border border-gold shadow-[0_0_50px_rgba(212,175,55,0.2)] text-center">
              <Trophy className="h-16 w-16 text-gold mx-auto mb-6 animate-bounce" />
              <h2 className="text-2xl text-slate-300 mb-2 font-cinzel">
                You belong in...
              </h2>
              <h1 className={`text-5xl md:text-7xl font-bold mb-8 font-cinzel text-glow ${winner === 'Gryffindor' ? 'text-red-500' : winner === 'Slytherin' ? 'text-green-500' : winner === 'Ravenclaw' ? 'text-blue-500' : 'text-yellow-500'}`}>
                {winner}!
              </h1>

              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                {winner === 'Gryffindor' && 'You possess daring, nerve, and chivalry. A true brave heart!'}
                {winner === 'Slytherin' && "You possess cunning, ambition, and resourcefulness. You'll go far!"}
                {winner === 'Ravenclaw' && 'You possess wit, learning, and wisdom. A brilliant mind!'}
                {winner === 'Hufflepuff' && 'You possess patience, loyalty, and fair play. A true friend!'}
              </p>

              <button onClick={restartQuiz} className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full transition-colors">
                <RefreshCw className="h-4 w-4" />
                <span>Sort Again</span>
              </button>
            </motion.div>}
        </AnimatePresence>
      </div>
    </div>;
}