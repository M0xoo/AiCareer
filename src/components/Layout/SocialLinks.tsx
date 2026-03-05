import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { MOKHLES_DATA } from '../../constants';

export const SocialLinks: React.FC = () => {
  return (
    <div className="absolute top-12 right-12 flex items-center gap-4 z-50">
      <a 
        href={MOKHLES_DATA.linkedin} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-neon transition-colors cursor-pointer group bg-ink/50 backdrop-blur-md"
      >
        <Linkedin size={20} className="group-hover:text-neon transition-colors" />
      </a>
      <a 
        href={`mailto:${MOKHLES_DATA.email}`} 
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-neon transition-colors cursor-pointer group bg-ink/50 backdrop-blur-md"
      >
        <Mail size={20} className="group-hover:text-neon transition-colors" />
      </a>
    </div>
  );
};
