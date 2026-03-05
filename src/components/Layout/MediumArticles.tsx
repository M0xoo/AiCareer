import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useMediumArticles } from '../../hooks/useMediumArticles';

export const MediumArticles: React.FC = () => {
  const { articles } = useMediumArticles();

  if (articles.length === 0) return null;

  return (
    <section className="py-12 border-b border-white/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon">
          LATEST_PUBLICATIONS // MEDIUM
        </h3>
        <a 
          href="https://medium.com/@emokhles" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
        >
          VIEW_ALL <ExternalLink size={12} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 4).map((article, idx) => (
          <a 
            key={idx}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 glass border-l-2 border-white/10 hover:border-neon transition-all duration-500"
          >
            <div className="flex flex-col h-full">
              <span className="font-mono text-[9px] text-zinc-600 mb-2 uppercase">
                {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <h4 className="font-display text-xl uppercase tracking-tight mb-3 group-hover:text-neon transition-colors line-clamp-2">
                {article.title}
              </h4>
              <p className="font-mono text-[11px] text-zinc-500 leading-relaxed line-clamp-3 mb-4">
                {article.snippet}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {article.categories?.slice(0, 3).map((cat: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 border border-white/5 rounded-full text-[8px] font-mono text-zinc-600 uppercase">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
