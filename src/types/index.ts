export interface Theory {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string;
  likes: number;
}
export interface BlogPost {
  likes: number;
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  imageUrl?: string;
  views: number;
}
export interface Character {
  id: string;
  name: string;
  house: string;
  role: string;
  imageUrl: string;
  description: string;
}
export interface House {
  id: string;
  name: string;
  colors: string[];
  mascot: string;
  founder: string;
  traits: string[];
  description: string;
  imageUrl: string;
}