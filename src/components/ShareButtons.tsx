// src/components/ShareButtons.tsx
import React from 'react';
import { Facebook, Twitter, MessageCircle, Link } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard! 🪄');
  };

  return (
    <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-slate-700">
      <span className="text-slate-400 text-sm">Share this magic:</span>
      <div className="flex space-x-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5 text-white" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-black hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5 text-white" />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="h-5 w-5 text-white" />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-3 bg-gold hover:bg-yellow-500 rounded-full transition-colors"
          aria-label="Copy link"
        >
          <Link className="h-5 w-5 text-slate-900" />
        </button>
      </div>
    </div>
  );
}