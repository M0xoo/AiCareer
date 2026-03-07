import React, { useState } from 'react';
import { ExternalLink, Briefcase, FileText, ChevronRight } from 'lucide-react';
import { useMediumArticles } from '../../hooks/useMediumArticles';
import { MOKHLES_DATA } from '../../constants';
import { motion, AnimatePresence } from 'motion/react';

export const PortfolioSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'experiences' | 'articles'>('experiences');
    const { articles, isLoading } = useMediumArticles();

    const isExperiences = activeTab === 'experiences';

    return (
        <section className="py-8 md:py-12 border-b border-white/5">
            {/* SECTION HEADER & TABS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

                {/* TAB CONTROLS */}
                <div className="flex bg-black/40 border border-white/10 p-1 rounded-md overflow-hidden relative z-10">
                    <button
                        onClick={() => setActiveTab('experiences')}
                        className={`relative px-6 py-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 z-20 ${isExperiences ? 'text-black' : 'text-zinc-500 hover:text-white'
                            }`}
                    >
                        {isExperiences && (
                            <motion.div
                                layoutId="activeTabBg"
                                className="absolute inset-0 bg-neon rounded-sm"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <Briefcase size={14} className="relative z-10" />
                        <span className="relative z-10">CORE_EXPERIENCE</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`relative px-6 py-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 z-20 ${!isExperiences ? 'text-black' : 'text-zinc-500 hover:text-white'
                            }`}
                    >
                        {!isExperiences && (
                            <motion.div
                                layoutId="activeTabBg"
                                className="absolute inset-0 bg-neon rounded-sm"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <FileText size={14} className="relative z-10" />
                        <span className="relative z-10">DATABANKS // MEDIUM</span>
                    </button>
                </div>

                {/* DYNAMIC ACTION LINK based on tab */}
                {activeTab === 'articles' ? (
                    <a
                        href="https://medium.com/@emokhles"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-neon transition-colors flex items-center gap-2"
                    >
                        VIEW_MEDIUM <ExternalLink size={12} />
                    </a>
                ) : (
                    <a
                        href={MOKHLES_DATA.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-neon transition-colors flex items-center gap-2"
                    >
                        VIEW_LINKEDIN <ExternalLink size={12} />
                    </a>
                )}
            </div>

            {/* TAB CONTENT OVERLAY & TRANSITIONS */}
            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">

                    {/* EXPERIENCES VIEW */}
                    {activeTab === 'experiences' && (
                        <motion.div
                            key="experiences"
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col"
                        >
                            {MOKHLES_DATA.experience.map((exp, idx) => {
                                const isLast = idx === MOKHLES_DATA.experience.length - 1;
                                return (
                                    <div
                                        key={idx}
                                        className={`group relative pl-8 md:pl-0 border-l border-white/5 md:border-none ${isLast ? '' : 'pb-8 md:pb-0'}`}
                                    >
                                        <div className="md:grid md:grid-cols-4 md:gap-8 h-full">

                                            {/* TIMELINE MARKER & DATE (Desktop uses grid, Mobile uses absolute) */}
                                            <div className={`hidden md:flex flex-col items-end pt-1 pr-6 border-r border-white/10 group-hover:border-neon transition-colors duration-500 relative ${isLast ? '' : 'md:pb-12'}`}>
                                                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-neon transition-colors">
                                                    {exp.period}
                                                </span>
                                                {/* Timeline Dot */}
                                                <span className="absolute -right-[5px] top-2 w-2 h-2 rounded-full bg-black border border-white/20 group-hover:border-neon group-hover:bg-neon/20 group-hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-all duration-300" />
                                            </div>

                                            {/* Mobile Timeline Date */}
                                            <div className="md:hidden absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-black border border-white/20 group-hover:border-neon group-hover:bg-neon/20 transition-all duration-300" />
                                            <span className="md:hidden block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2 group-hover:text-neon transition-colors">
                                                {exp.period}
                                            </span>

                                            {/* CONTENT */}
                                            <div className={`md:col-span-3 ${isLast ? '' : 'md:pb-12'}`}>
                                                <div className="glass p-6 border-l-2 border-white/10 hover:border-neon transition-all duration-500 bg-black/20 group-hover:bg-black/40 h-full">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                                        <div>
                                                            <h4 className="font-display text-xl uppercase tracking-tight text-white group-hover:text-neon transition-colors inline-flex items-center gap-2">
                                                                {exp.role}
                                                            </h4>
                                                            <span className="block font-mono text-[11px] text-zinc-400 mt-1 uppercase tracking-wider">
                                                                {exp.company} <span className="opacity-50 mx-1">//</span> {exp.location}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <ul className="space-y-2 mb-6">
                                                        {exp.description.map((desc, i) => (
                                                            <li key={i} className="flex items-start text-zinc-400 text-sm">
                                                                <ChevronRight size={14} className="min-w-[14px] mt-1 mr-2 text-neon/50" />
                                                                <span className="leading-relaxed">{desc}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.skills.map((skill, i) => (
                                                            <span key={i} className="px-2 py-1 border border-white/5 rounded-full text-[9px] font-mono text-zinc-500 uppercase tracking-wider group-hover:border-white/10 group-hover:text-zinc-400 transition-colors">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* ARTICLES VIEW */}
                    {activeTab === 'articles' && (
                        <motion.div
                            key="articles"
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {!isLoading && articles.length === 0 && (
                                    <div className="col-span-2 text-center py-12 font-mono text-xs text-zinc-500 uppercase">
                                        NO_DATA_FOUND
                                    </div>
                                )}

                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, idx) => (
                                        <div key={`loader-${idx}`} className="group block p-6 glass border-l-2 border-neon/30 opacity-70 animate-pulse bg-black/20">
                                            <div className="flex flex-col h-full">
                                                <span className="font-mono text-[9px] text-neon/60 mb-2 uppercase flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-neon/60 animate-ping"></span>
                                                    ESTABLISHING_LINK...
                                                </span>
                                                <div className="h-6 w-3/4 bg-neon/10 border border-neon/20 mb-3" />
                                                <div className="h-3 w-full bg-white/5 mb-2" />
                                                <div className="h-3 w-5/6 bg-white/5 mb-4" />
                                                <div className="mt-auto flex flex-wrap gap-2">
                                                    <span className="px-2 py-0.5 border border-neon/30 text-neon/50 rounded-full text-[8px] font-mono">
                                                        AWAITING_SYNC
                                                    </span>
                                                    <span className="px-2 py-0.5 border border-white/10 text-zinc-600 rounded-full text-[8px] font-mono animate-pulse">
                                                        ...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    articles.slice(0, 4).map((article, idx) => (
                                        <a
                                            key={idx}
                                            href={article.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block p-6 glass border-l-2 border-white/10 hover:border-neon transition-all duration-500"
                                        >
                                            <div className="flex flex-col h-full">
                                                <span className="font-mono text-[9px] text-zinc-600 mb-2 uppercase group-hover:text-neon/70 transition-colors">
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
                                                        <span key={i} className="px-2 py-0.5 border border-white/5 group-hover:border-neon/30 transition-colors rounded-full text-[8px] font-mono text-zinc-600 uppercase">
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </a>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </section>
    );
};
