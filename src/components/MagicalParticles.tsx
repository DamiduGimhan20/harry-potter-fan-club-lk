import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}
export function MagicalParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    // Generate random particles
    const particleCount = 30;
    const newParticles = Array.from({
      length: particleCount
    }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(particle => <motion.div key={particle.id} className="absolute rounded-full bg-white/40 blur-[1px]" style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: particle.size,
      height: particle.size
    }} animate={{
      opacity: [0, 0.8, 0],
      scale: [0, 1.5, 0],
      y: [0, -20] // Float upward slightly
    }} transition={{
      duration: particle.duration,
      repeat: Infinity,
      delay: particle.delay,
      ease: 'easeInOut'
    }} />)}
    </div>;
}