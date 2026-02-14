import React, { useState, useMemo } from 'react';
import { LibraryItem, CEFRLevel, LibraryCategory } from '../types';
import { LIBRARY_CONTENT } from '../constants';
import { BookOpen, Video, Headphones, GraduationCap, X, Play, Clock, Tag, ExternalLink, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LibrarySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [filterLevel, setFilterLevel] = useState<CEFRLevel | 'ALL'>('ALL');
  const [filterCategory, setFilterCategory] = useState<LibraryCategory | 'ALL'>('ALL');

  const filteredItems = useMemo(() => {
    return LIBRARY_CONTENT.filter(item => {
      const levelMatch = filterLevel === 'ALL' || item.level === filterLevel;
      const catMatch = filterCategory === 'ALL' || item.category === filterCategory;
      return levelMatch && catMatch;
    });
  }, [filterLevel, filterCategory]);

  const LevelBadge = ({ level }: { level: CEFRLevel }) => {
    const colors = {
      'A1': 'bg-green-500/20 text-green-400 border-green-500/50',
      'A2': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
      'B1': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'B2': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      'C1': 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors[level]}`}>
        {level}
      </span>
    );
  };

  const CategoryIcon = ({ category }: { category: LibraryCategory }) => {
    switch (category) {
      case 'STORY': return <BookOpen size={16} className="text-orange-400" />;
      case 'VIDEO': return <Video size={16} className="text-red-400" />;
      case 'AUDIOBOOK': return <Headphones size={16} className="text-blue-400" />;
      case 'EXAM_SCENARIO': return <GraduationCap size={16} className="text-purple-400" />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 space-y-8">
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-2 text-gray-400 mr-4">
            <Filter size={18} />
            <span className="font-bold text-sm">FILTER:</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
            {['ALL', 'A1', 'A2', 'B1', 'B2'].map((lvl) => (
                <button
                    key={lvl}
                    onClick={() => setFilterLevel(lvl as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterLevel === lvl 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                        : 'bg-slate-800 text-gray-500 border border-transparent hover:border-gray-600'
                    }`}
                >
                    {lvl}
                </button>
            ))}
        </div>

        <div className="w-[1px] h-6 bg-gray-700 mx-2"></div>

        <div className="flex gap-2 overflow-x-auto">
            {[
                { id: 'ALL', label: 'All' },
                { id: 'STORY', label: 'Stories' },
                { id: 'VIDEO', label: 'Videos' },
                { id: 'EXAM_SCENARIO', label: 'Exam Prep' }
            ].map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterCategory === cat.id 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                        : 'bg-slate-800 text-gray-500 border border-transparent hover:border-gray-600'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
        {filteredItems.map((item) => (
            <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all cursor-pointer hover:shadow-2xl hover:shadow-purple-900/20"
            >
                {/* Cover Art Gradient */}
                <div className={`h-32 bg-gradient-to-br ${item.coverGradient} relative p-6 flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                        <LevelBadge level={item.level} />
                        <div className="bg-black/30 backdrop-blur-md p-1.5 rounded-lg text-white">
                            <CategoryIcon category={item.category} />
                        </div>
                    </div>
                    <h3 className="text-white font-bold text-lg drop-shadow-md leading-tight line-clamp-2">{item.title}</h3>
                </div>

                <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-mono mb-4">
                        <span className="flex items-center gap-1"><Clock size={12}/> {item.duration}</span>
                        <span>{item.author}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-800 text-gray-400 px-2 py-1 rounded flex items-center gap-1">
                                <Tag size={10}/> {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold group-hover:underline">
                        {item.category === 'VIDEO' ? 'WATCH NOW' : 'START READING'} <Play size={14} className="fill-current"/>
                    </div>
                </div>
            </motion.div>
        ))}
        </AnimatePresence>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedItem && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    onClick={() => setSelectedItem(null)}
                />
                
                <motion.div 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    exit={{ y: 50, opacity: 0 }}
                    className="relative w-full max-w-4xl bg-[#1a1b26] rounded-2xl shadow-2xl border border-gray-700 flex flex-col max-h-[90vh] overflow-hidden"
                >
                    {/* Reader Header */}
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#13141f]">
                        <div>
                            <h2 className="text-xl font-bold text-white line-clamp-1">{selectedItem.title}</h2>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mt-1">
                                <LevelBadge level={selectedItem.level} />
                                <span>• {selectedItem.author}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {selectedItem.url && (
                                <a 
                                    href={selectedItem.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2 text-sm font-bold"
                                >
                                    <ExternalLink size={16}/> OPEN RESOURCE
                                </a>
                            )}
                            <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Reader Content */}
                    <div className="overflow-y-auto p-8 md:p-12 custom-scrollbar bg-[#1a1b26]">
                        {selectedItem.content ? (
                            <div 
                                className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-serif"
                                dangerouslySetInnerHTML={{ __html: selectedItem.content }}
                            />
                        ) : selectedItem.url ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Video size={64} className="text-gray-700 mb-6"/>
                                <h3 className="text-2xl font-bold text-white mb-2">Video Resource</h3>
                                <p className="text-gray-400 mb-8 max-w-md">This content is hosted externally. Click the button above to access the learning material.</p>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-20">Content not available offline.</div>
                        )}
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LibrarySection;