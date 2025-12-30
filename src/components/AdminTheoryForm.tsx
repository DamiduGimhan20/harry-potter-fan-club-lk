import React, { useState } from 'react';
import { Theory } from '../types';
import { Plus, Save, X } from 'lucide-react';
interface AdminTheoryFormProps {
  onSubmit: (theory: Omit<Theory, 'id' | 'likes'>) => void;
  onCancel: () => void;
  initialData?: Theory;
}
export function AdminTheoryForm({
  onSubmit,
  onCancel,
  initialData
}: AdminTheoryFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    content: initialData?.content || '',
    imageUrl: initialData?.imageUrl || ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: initialData?.date || new Date().toISOString().split('T')[0]
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white font-cinzel">
          {initialData ? 'Edit Theory' : 'Add New Theory'}
        </h3>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Title
          </label>
          <input type="text" required value={formData.title} onChange={e => setFormData({
          ...formData,
          title: e.target.value
        })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="e.g., Is Dumbledore actually Ron?" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Author Name
          </label>
          <input type="text" required value={formData.author} onChange={e => setFormData({
          ...formData,
          author: e.target.value
        })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="Your name" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          Image URL
        </label>
        <input type="url" value={formData.imageUrl} onChange={e => setFormData({
        ...formData,
        imageUrl: e.target.value
      })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="https://example.com/image.jpg" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          Theory Content
        </label>
        <textarea required rows={6} value={formData.content} onChange={e => setFormData({
        ...formData,
        content: e.target.value
      })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none resize-none" placeholder="Write your theory here..." />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
          Cancel
        </button>
        <button type="submit" className="flex items-center space-x-2 bg-gold text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
          <Save className="h-4 w-4" />
          <span>{initialData ? 'Update Theory' : 'Publish Theory'}</span>
        </button>
      </div>
    </form>;
}