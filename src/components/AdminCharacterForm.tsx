// src/components/AdminCharacterForm.tsx
import React, { useState } from 'react';
import { Character } from '../types';
import { Save, X } from 'lucide-react';

const IMGBB_API_KEY = '6ca54a56d23ec272bbd75f8f92cacabe';

interface AdminCharacterFormProps {
  onSubmit: (character: Omit<Character, 'id'>) => void;
  onCancel: () => void;
  initialData?: Character;
}

export function AdminCharacterForm({
  onSubmit,
  onCancel,
  initialData
}: AdminCharacterFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    house: initialData?.house || 'Gryffindor',
    role: initialData?.role || '',
    description: initialData?.description || '',
    patronus: initialData?.patronus || '',
    wand: initialData?.wand || '',
    bloodStatus: initialData?.bloodStatus || '',
    backstory: initialData?.backstory || '',
    achievements: initialData?.achievements?.join('\n') || '',
    quotes: initialData?.quotes?.join('\n') || '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialData?.imageUrl || null);

  const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

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
        achievements: formData.achievements.split('\n').filter(a => a.trim()),
        quotes: formData.quotes.split('\n').filter(q => q.trim()),
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
          {initialData ? 'Edit Character' : 'Add New Character'}
        </h3>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">House</label>
          <select
            value={formData.house}
            onChange={(e) => setFormData({ ...formData, house: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
          >
            {houses.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Role</label>
          <input
            type="text"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Image Upload (via ImgBB)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
        />
        {(preview || initialData?.imageUrl) && (
          <img src={preview || initialData?.imageUrl} alt="Preview" className="mt-4 w-64 h-64 object-cover rounded-lg" />
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Description</label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Patronus</label>
          <input
            type="text"
            value={formData.patronus}
            onChange={(e) => setFormData({ ...formData, patronus: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Wand</label>
          <input
            type="text"
            value={formData.wand}
            onChange={(e) => setFormData({ ...formData, wand: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Blood Status</label>
          <input
            type="text"
            value={formData.bloodStatus}
            onChange={(e) => setFormData({ ...formData, bloodStatus: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Backstory</label>
        <textarea
          rows={5}
          value={formData.backstory}
          onChange={(e) => setFormData({ ...formData, backstory: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Achievements (one per line)</label>
          <textarea
            rows={5}
            value={formData.achievements}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none resize-none"
            placeholder="Youngest Seeker in a century&#10;Defeated Lord Voldemort"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Quotes (one per line)</label>
          <textarea
            rows={5}
            value={formData.quotes}
            onChange={(e) => setFormData({ ...formData, quotes: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-gold outline-none resize-none"
            placeholder="&quot;I solemnly swear that I am up to no good.&quot;&#10;&quot;Working hard is important...&quot;"
          />
        </div>
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
          <span>{uploading ? 'Saving...' : initialData ? 'Update Character' : 'Add Character'}</span>
        </button>
      </div>
    </form>
  );
}