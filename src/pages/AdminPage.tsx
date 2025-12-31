
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Trash2, Edit2 } from 'lucide-react';
import { AdminTheoryForm } from '../components/AdminTheoryForm';
import { AdminBlogForm } from '../components/AdminBlogForm';
import { useFirestore } from '../hooks/useFirestore';
import { Theory, BlogPost } from '../types';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'theories' | 'blogs'>('theories');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const { items: theories, add: addTheory, update: updateTheory, remove: deleteTheory } = useFirestore<Theory>('theories');
  const { items: blogs, add: addBlog, update: updateBlog, remove: deleteBlog } = useFirestore<BlogPost>('blogs');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lumos') {  // You can change this password anytime
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const handleTheorySubmit = async (theoryData: Omit<Theory, 'id' | 'likes'>) => {
    if (editItem) {
      await updateTheory(editItem.id, theoryData);
    } else {
      await addTheory({ ...theoryData, likes: 0 });
    }
    setIsAdding(false);
    setIsEditing(false);
    setEditItem(null);
  };

  const handleBlogSubmit = async (postData: Omit<BlogPost, 'id' | 'views'>) => {
    if (editItem) {
      await updateBlog(editItem.id, postData);
    } else {
      await addBlog({ ...postData, views: 0 });
    }
    setIsAdding(false);
    setIsEditing(false);
    setEditItem(null);
  };

  const handleDelete = async (id: string, type: 'theory' | 'blog') => {
    if (confirm(`Delete this ${type}?`)) {
      if (type === 'theory') {
        await deleteTheory(id);
      } else {
        await deleteBlog(id);
      }
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
            className="w-full mb-4 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
            required 
          />
          <button type="submit" className="w-full bg-gold text-slate-900 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
            Enter the Chamber
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-cinzel">Admin Dashboard</h1>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          <button 
            onClick={() => setActiveTab('theories')} 
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'theories' ? 'bg-gold text-slate-900' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
          >
            Theories
          </button>
          <button 
            onClick={() => setActiveTab('blogs')} 
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'blogs' ? 'bg-gold text-slate-900' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
          >
            Blogs
          </button>
        </div>

        <button 
          onClick={() => { setIsAdding(true); setIsEditing(false); setEditItem(null); }} 
          className="mb-6 flex items-center space-x-2 bg-gold text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors mx-auto block"
        >
          <Plus className="h-4 w-4" />
          <span>Add New {activeTab === 'theories' ? 'Theory' : 'Blog'}</span>
        </button>

        {(isAdding || isEditing) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {activeTab === 'theories' ? (
              <AdminTheoryForm onSubmit={handleTheorySubmit} onCancel={() => { setIsAdding(false); setIsEditing(false); }} initialData={editItem} />
            ) : (
              <AdminBlogForm onSubmit={handleBlogSubmit} onCancel={() => { setIsAdding(false); setIsEditing(false); }} initialData={editItem} />
            )}
          </motion.div>
        )}

        <div className="overflow-x-auto bg-slate-800 rounded-xl border border-slate-700 mt-8">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Author</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Date</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {(activeTab === 'theories' ? theories : blogs).map((item) => (
                <tr key={item.id} className="hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-white">{item.title}</td>
                  <td className="px-6 py-4 text-slate-300">{item.author}</td>
                  <td className="px-6 py-4 text-slate-400">{item.date}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => { setEditItem(item); setIsEditing(true); setIsAdding(false); }} 
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, activeTab === 'theories' ? 'theory' : 'blog')} 
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {(activeTab === 'theories' ? theories : blogs).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No items yet. Add one!
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