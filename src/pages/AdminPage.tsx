import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Trash2, Edit2, LogOut } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Theory, BlogPost } from '../types';
import { AdminTheoryForm } from '../components/AdminTheoryForm';
import { AdminBlogForm } from '../components/AdminBlogForm';
export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'theories' | 'blogs'>('theories');
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [theories, setTheories] = useLocalStorage<Theory[]>('hp_theories', []);
  const [posts, setPosts] = useLocalStorage<BlogPost[]>('hp_blog_posts', []);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lumos') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password! Try "lumos"');
    }
  };
  const handleTheorySubmit = (theoryData: Omit<Theory, 'id' | 'likes'>) => {
    if (editItem) {
      setTheories(theories.map(t => t.id === editItem.id ? {
        ...t,
        ...theoryData
      } : t));
    } else {
      const newTheory: Theory = {
        ...theoryData,
        id: Date.now().toString(),
        likes: 0
      };
      setTheories([newTheory, ...theories]);
    }
    setIsEditing(false);
    setEditItem(null);
  };
  const handleBlogSubmit = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    if (editItem) {
      setPosts(posts.map(p => p.id === editItem.id ? {
        ...p,
        ...postData
      } : p));
    } else {
      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString(),
        views: 0
      };
      setPosts([newPost, ...posts]);
    }
    setIsEditing(false);
    setEditItem(null);
  };
  const handleDelete = (id: string, type: 'theory' | 'blog') => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'theory') {
        setTheories(theories.filter(t => t.id !== id));
      } else {
        setPosts(posts.filter(p => p.id !== id));
      }
    }
  };
  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-gold mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white font-cinzel">
              Admin Access
            </h1>
            <p className="text-slate-400 text-sm">
              Speak the password to enter
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none text-center tracking-widest" placeholder="Password" />
            <button type="submit" className="w-full bg-gold text-slate-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors">
              Unlock
            </button>
          </form>
        </motion.div>
      </div>;
  }
  return <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white font-cinzel">
            Admin Dashboard
          </h1>
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center space-x-2 text-slate-400 hover:text-white">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>

        <div className="flex space-x-4 mb-8 border-b border-slate-700">
          <button onClick={() => {
          setActiveTab('theories');
          setIsEditing(false);
        }} className={`pb-4 px-4 font-medium transition-colors relative ${activeTab === 'theories' ? 'text-gold' : 'text-slate-400 hover:text-white'}`}>
            Fan Theories
            {activeTab === 'theories' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
          </button>
          <button onClick={() => {
          setActiveTab('blogs');
          setIsEditing(false);
        }} className={`pb-4 px-4 font-medium transition-colors relative ${activeTab === 'blogs' ? 'text-gold' : 'text-slate-400 hover:text-white'}`}>
            Blog Posts
            {activeTab === 'blogs' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
          </button>
        </div>

        {isEditing ? <div className="max-w-3xl mx-auto">
            {activeTab === 'theories' ? <AdminTheoryForm onSubmit={handleTheorySubmit} onCancel={() => {
          setIsEditing(false);
          setEditItem(null);
        }} initialData={editItem} /> : <AdminBlogForm onSubmit={handleBlogSubmit} onCancel={() => {
          setIsEditing(false);
          setEditItem(null);
        }} initialData={editItem} />}
          </div> : <div>
            <div className="flex justify-end mb-6">
              <button onClick={() => {
            setIsEditing(true);
            setEditItem(null);
          }} className="flex items-center space-x-2 bg-gold text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
                <Plus className="h-4 w-4" />
                <span>
                  Add New {activeTab === 'theories' ? 'Theory' : 'Post'}
                </span>
              </button>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Author</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {(activeTab === 'theories' ? theories : posts).map((item: any) => <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4 text-white font-medium">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 text-slate-300">
                            {item.author}
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">
                            {item.date}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button onClick={() => {
                      setEditItem(item);
                      setIsEditing(true);
                    }} className="text-blue-400 hover:text-blue-300 p-1">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete(item.id, activeTab === 'theories' ? 'theory' : 'blog')} className="text-red-400 hover:text-red-300 p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>)}
                    {(activeTab === 'theories' ? theories : posts).length === 0 && <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                          No items found. Create your first one!
                        </td>
                      </tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}