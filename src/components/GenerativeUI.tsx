import { motion } from 'motion/react';
import { MOKHLES_DATA } from '../constants';
import { Briefcase, MapPin, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export const ExperienceTimeline = ({ filter }: { filter?: string }) => {
  const filteredExperience = filter 
    ? MOKHLES_DATA.experience.filter(exp => 
        exp.company.toLowerCase().includes(filter.toLowerCase()) || 
        exp.role.toLowerCase().includes(filter.toLowerCase()) ||
        exp.skills.some(s => s.toLowerCase().includes(filter.toLowerCase()))
      )
    : MOKHLES_DATA.experience;

  return (
    <div className="space-y-12 my-6 relative">
      <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-zinc-800" />
      {filteredExperience.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-12"
        >
          <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-zinc-900 border-2 border-neon flex items-center justify-center z-10">
            <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-display text-2xl uppercase tracking-tight text-white">{exp.role}</h3>
              <span className="text-xs font-mono text-neon border border-neon/30 px-2 py-1 rounded">
                {exp.period}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm font-mono text-zinc-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-neon" /> {exp.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-neon" /> {exp.location}
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {exp.description.map((item, i) => (
                <li key={i} className="text-sm text-zinc-300 leading-relaxed flex gap-3">
                  <span className="text-neon font-mono mt-0.5">0{i+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-6">
              {exp.skills.map((skill) => (
                <span key={skill} className="text-[10px] font-mono uppercase tracking-tighter text-zinc-500 border border-zinc-800 px-2 py-1 hover:border-neon hover:text-neon transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const SkillsGrid = ({ category }: { category?: string }) => {
  const skillEntries = Object.entries(MOKHLES_DATA.skills) as [string, string[]][];
  const filteredSkills = category
    ? skillEntries.filter(([cat]) => cat.toLowerCase().includes(category.toLowerCase()))
    : skillEntries;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {filteredSkills.map(([category, skills], index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-none border-l-2 border-neon bg-zinc-900/40 backdrop-blur-sm"
        >
          <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-neon" />
            {category}
          </h4>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 border border-zinc-800 text-sm font-medium text-zinc-300 hover:bg-neon hover:text-black transition-all duration-300 cursor-crosshair">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const ContactCard = () => {
  return (
    <div className="flex flex-wrap gap-6 my-8">
      <motion.a
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        href={`mailto:${MOKHLES_DATA.email}`}
        className="flex items-center gap-3 px-8 py-4 bg-neon text-black font-display text-xl uppercase tracking-tight hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all"
      >
        <Calendar size={20} />
        <span>Initialize Contact</span>
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        href={MOKHLES_DATA.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-display text-xl uppercase tracking-tight hover:bg-white hover:text-black transition-all"
      >
        <Briefcase size={20} />
        <span>View Network</span>
      </motion.a>
    </div>
  );
};

export const GithubRepos = ({ limit = 4 }: { limit?: number }) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github-repos');
        const data = await response.json();
        setRepos(data.slice(0, limit));
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-zinc-900/40 border-l-2 border-white/10 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {repos.map((repo, idx) => (
        <motion.a
          key={idx}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="group p-5 bg-zinc-900/40 backdrop-blur-sm border-l-2 border-white/10 hover:border-neon transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-display text-lg uppercase tracking-tight group-hover:text-neon transition-colors truncate pr-4">
              {repo.name}
            </h4>
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px]">
              <span className="flex items-center gap-1"><Sparkles size={10} /> {repo.stars}</span>
            </div>
          </div>
          <p className="font-mono text-[10px] text-zinc-500 leading-relaxed line-clamp-2 mb-4 h-8">
            {repo.description || "NO_DESCRIPTION_PROVIDED"}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="px-2 py-0.5 border border-zinc-800 rounded-full text-[8px] font-mono text-zinc-600 uppercase">
              {repo.language || "MISC"}
            </span>
            <ExternalLink size={12} className="text-zinc-700 group-hover:text-neon transition-colors" />
          </div>
        </motion.a>
      ))}
    </div>
  );
};
