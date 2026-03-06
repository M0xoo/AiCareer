import React from 'react';
import { Linkedin, Calendar } from 'lucide-react';
import { MOKHLES_DATA } from '../../constants';

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-4 z-50 ${className}`}>
      <a
        href={MOKHLES_DATA.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-neon transition-colors cursor-pointer group bg-ink/50 backdrop-blur-md"
      >
        <Linkedin size={20} className="group-hover:text-neon transition-colors" />
      </a>
      <a
        href="https://calendly.com/moelheni/taking-contact"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-neon transition-colors cursor-pointer group bg-ink/50 backdrop-blur-md"
      >
        <Calendar size={20} className="group-hover:text-neon transition-colors" />
      </a>
    </div>
  );
};
