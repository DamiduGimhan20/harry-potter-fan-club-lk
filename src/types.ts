// src/types.ts

export interface Theory {
  id: string;
  title: string;
  author: string;
  content: string;
  imageUrl?: string;
  date: string;
  likes?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  imageUrl?: string;
  date: string;
  views?: number;
  likes?: number;  // ← This line MUST be here
}