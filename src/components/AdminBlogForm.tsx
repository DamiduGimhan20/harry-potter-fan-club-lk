// src/components/AdminBlogForm.tsx
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Save, X } from 'lucide-react';

const IMGBB_API_KEY = '6ca54a56d23ec272bbd75f8f92cacabe';
interface AdminBlogFormProps {
  onSubmit: (post: Omit<BlogPost, 'id' | 'views'>) => void;
  onCancel: () => void;
  initialData?: BlogPost;
}

export function AdminBlogForm({
  onSubmit,
  onCancel,
  initialData
}: AdminBlogFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    category: initialData?.category || 'General',
    content: initialData?.content || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialData?.imageUrl || null);

  const categories = ['General', 'News', 'Events', 'Magic', 'Creatures'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', file);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    if (!data.success) throw new Error(data.error?.message || 'Upload error');

    return data.data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = initialData?.imageUrl || '';

      if (imageFile) {
        imageUrl = await uploadToImgBB(imageFile);
      }

      onSubmit({
        ...formData,
        imageUrl,
        date: initialData?.date || new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      alert('Image upload failed: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white font-cinzel">
          {initialData ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h3>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Author</label>
          <input
            type="text"
            required
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Image Upload (Free via ImgBB)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
        />
        {(preview || initialData?.imageUrl) && (
          <img src={preview || initialData?.imageUrl} alt="Preview" className="mt-4 w-64 h-64 object-cover rounded-lg" />
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Blog Content</label>
        <textarea
          required
          rows={8}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none resize-none"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center space-x-2 bg-gold text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{uploading ? 'Uploading...' : initialData ? 'Update Post' : 'Publish Post'}</span>
        </button>
      </div>
    </form>
  );
}