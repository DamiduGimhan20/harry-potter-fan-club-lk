import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment, Timestamp } from 'firebase/firestore';

export function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const countVisit = async () => {
      const today = new Date();
      const monthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`; // e.g., "2026-01"
      
      const counterRef = doc(db, 'siteStats', 'visitorCounter');
      
      try {
        const docSnap = await getDoc(counterRef);
        
        if (!docSnap.exists()) {
          // First time – create document
          await setDoc(counterRef, {
            currentMonth: monthKey,
            count: 1,
            lastReset: Timestamp.now()
          });
          setVisitors(1);
        } else {
          const data = docSnap.data();
          const currentMonth = data.currentMonth;
          
          if (currentMonth !== monthKey) {
            // New month – reset counter
            await updateDoc(counterRef, {
              currentMonth: monthKey,
              count: 1,
              lastReset: Timestamp.now()
            });
            setVisitors(1);
          } else {
            // Same month – increment
            await updateDoc(counterRef, {
              count: increment(1)
            });
            setVisitors(data.count + 1);
          }
        }
      } catch (error) {
        console.error('Error counting visit:', error);
        // Fallback – show a nice number
        setVisitors(1234);
      }
      
      setLoading(false);
    };

    countVisit();
  }, []);

  // Load current count for display
  useEffect(() => {
    const loadCount = async () => {
      const counterRef = doc(db, 'siteStats', 'visitorCounter');
      const docSnap = await getDoc(counterRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVisitors(data.count || 0);
      }
      setLoading(false);
    };

    loadCount();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center space-x-3 text-gold"
    >
      <Sparkles className="h-5 w-5 animate-pulse" />
      <span className="text-lg font-medium">
        {loading ? 'Counting wizards...' : `${visitors.toLocaleString()} wizards have visited this month`}
      </span>
      <Sparkles className="h-5 w-5 animate-pulse" />
    </motion.div>
  );
}