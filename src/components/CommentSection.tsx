// src/components/CommentSection.tsx  (FIXED – No More Invalid Date!)

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Comment } from '../types';

interface CommentSectionProps {
  parentId: string;
  parentType: 'theory' | 'blog';
}

export function CommentSection({ parentId, parentType }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const commentsRef = collection(db, parentType === 'theory' ? 'theories' : 'blogs', parentId, 'comments');
    const q = query(commentsRef, orderBy('date', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const loadedComments = snapshot.docs.map(doc => {
        const data = doc.data();
        let displayDate = 'Just now';

        if (data.date) {
          // If it's a Firebase Timestamp, convert properly
          if (data.date instanceof Timestamp) {
            displayDate = data.date.toDate().toLocaleDateString('en-GB');
          } else {
            // Fallback: try to parse string
            const parsed = new Date(data.date);
            if (!isNaN(parsed.getTime())) {
              displayDate = parsed.toLocaleDateString('en-GB');
            }
          }
        }

        return {
          id: doc.id,
          name: data.name || 'Anonymous',
          message: data.message || '',
          date: displayDate,
          parentId: data.parentId,
          parentType: data.parentType
        } as Comment;
      });
      setComments(loadedComments);
    });

    return () => unsub();
  }, [parentId, parentType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    try {
      const commentsRef = collection(db, parentType === 'theory' ? 'theories' : 'blogs', parentId, 'comments');
      await addDoc(commentsRef, {
        name: name.trim(),
        message: message.trim(),
        date: serverTimestamp(),
        parentId,
        parentType
      });
      setName('');
      setMessage('');
    } catch (error) {
      alert('Failed to post comment. Try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-8 font-cinzel flex items-center">
        <MessageCircle className="h-8 w-8 text-gold mr-4" />
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8"
      >
        <h3 className="text-xl font-bold text-white mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-gold transition-colors"
            required
          />
          <textarea
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-gold transition-colors resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-gold text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
            <span>{loading ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </form>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-slate-500 py-8">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">{comment.name}</h4>
                <p className="text-sm text-slate-400">
                  {comment.date}
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed">{comment.message}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}