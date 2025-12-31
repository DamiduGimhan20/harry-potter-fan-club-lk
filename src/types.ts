

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
  likes?: number;
}

export interface Character {
  id: string;
  name: string;
  house: string;
  role: string;
  imageUrl?: string;
  description: string;
  patronus?: string;
  wand?: string;
  bloodStatus?: string;
  backstory?: string;
  achievements?: string[];
  quotes?: string[];
}
export interface Spell {
  id: string;
  name: string;
  incantation: string | null;
  type: string;
  effect: string;
  notes: string | null;
  likes?: number;
}