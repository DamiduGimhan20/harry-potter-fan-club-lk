// src/pages/AdminPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Trash2, Edit2 } from 'lucide-react';
import { AdminTheoryForm } from '../components/AdminTheoryForm';
import { AdminBlogForm } from '../components/AdminBlogForm';
import { AdminCharacterForm } from '../components/AdminCharacterForm';
import { useFirestore } from '../hooks/useFirestore';
import { Theory, BlogPost, Character } from '../types';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'theories' | 'blogs' | 'characters'>('theories');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const { items: theories, add: addTheory, update: updateTheory, remove: deleteTheory } = useFirestore<Theory>('theories');
  const { items: blogs, add: addBlog, update: updateBlog, remove: deleteBlog } = useFirestore<BlogPost>('blogs');
  const { items: characters, add: addCharacter, update: updateCharacter, remove: deleteCharacter } = useFirestore<Character>('characters');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lumos') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const handleTheorySubmit = async (data: any) => {
    if (editItem) await updateTheory(editItem.id, data);
    else await addTheory({ ...data, likes: 0 });
    resetForm();
  };

  const handleBlogSubmit = async (data: any) => {
    if (editItem) await updateBlog(editItem.id, data);
    else await addBlog({ ...data, views: 0, likes: 0 });
    resetForm();
  };

  const handleCharacterSubmit = async (data: any) => {
    if (editItem) await updateCharacter(editItem.id, data);
    else await addCharacter(data);
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditItem(null);
  };

  const handleDelete = async (id: string, type: 'theory' | 'blog' | 'character') => {
    if (confirm(`Delete this ${type}?`)) {
      if (type === 'theory') await deleteTheory(id);
      else if (type === 'blog') await deleteBlog(id);
      else await deleteCharacter(id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-6 font-cinzel text-center">Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full mb-4 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
            required 
          />
          <button type="submit" className="w-full bg-gold text-slate-900 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
            Enter the Chamber
          </button>
        </form>
      </div>
    );
  }

  const currentItems = activeTab === 'theories' ? theories : activeTab === 'blogs' ? blogs : characters;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-cinzel">Admin Dashboard</h1>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={() => setActiveTab('theories')} className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'theories' ? 'bg-gold text-slate-900' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
            Theories
          </button>
          <button onClick={() => setActiveTab('blogs')} className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'blogs' ? 'bg-gold text-slate-900' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
            Blogs
          </button>
          <button onClick={() => setActiveTab('characters')} className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'characters' ? 'bg-gold text-slate-900' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
            Characters
          </button>
        </div>

        <button 
          onClick={() => { setIsAdding(true); setIsEditing(false); setEditItem(null); }} 
          className="mb-6 flex items-center space-x-2 bg-gold text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors mx-auto block"
        >
          <Plus className="h-4 w-4" />
          <span>Add New {activeTab === 'characters' ? 'Character' : activeTab === 'blogs' ? 'Blog' : 'Theory'}</span>
        </button>

        {(isAdding || isEditing) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {activeTab === 'theories' ? (
              <AdminTheoryForm onSubmit={handleTheorySubmit} onCancel={resetForm} initialData={editItem} />
            ) : activeTab === 'blogs' ? (
              <AdminBlogForm onSubmit={handleBlogSubmit} onCancel={resetForm} initialData={editItem} />
            ) : (
              <AdminCharacterForm onSubmit={handleCharacterSubmit} onCancel={resetForm} initialData={editItem} />
            )}
          </motion.div>
        )}

        <div className="overflow-x-auto bg-slate-800 rounded-xl border border-slate-700 mt-8">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
                  {activeTab === 'characters' ? 'Name' : 'Title'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
                  {activeTab === 'characters' ? 'House' : activeTab === 'blogs' ? 'Category' : 'Author'}
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {currentItems.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-white">{item.name || item.title}</td>
                  <td className="px-6 py-4 text-slate-300">{item.house || item.category || item.author}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => { setEditItem(item); setIsEditing(true); setIsAdding(false); }} className="text-blue-400 hover:text-blue-300">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id, activeTab === 'characters' ? 'character' : activeTab === 'blogs' ? 'blog' : 'theory')} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    No {activeTab} yet. Add one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}