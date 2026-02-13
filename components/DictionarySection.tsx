import React, { useState, useMemo } from 'react';
import { DictionaryEntry } from '../types';
import { Search, Database, Plus, Globe, ChevronDown } from 'lucide-react';
import { LEXICON_INITIAL_DATA } from '../constants';

interface Props {
    dictionary: DictionaryEntry[];
}

const DictionarySection: React.FC<Props> = ({ dictionary }) => {
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  
  // Combine props dictionary with seed data
  // Using useMemo to prevent recalculating on every render, though concatenation is fast.
  const allEntries = useMemo(() => [...LEXICON_INITIAL_DATA, ...dictionary], [dictionary]);
  
  const filtered = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return allEntries.filter(d => 
        d.word.toLowerCase().includes(lowerSearch) || 
        d.translation.toLowerCase().includes(lowerSearch)
    );
  }, [allEntries, search]);

  const visibleEntries = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
      setVisibleCount(prev => Math.min(prev + 50, filtered.length));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-800 pb-6">
             <div>
                 <h2 className="text-3xl font-bold text-white mb-2">Technical Lexicon</h2>
                 <p className="text-gray-400 font-mono text-sm">German B1 & IT Terminology Database</p>
             </div>
             <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-gray-800">
                 <Database size={16} className="text-cyan-400"/>
                 <span className="text-white font-bold">{allEntries.length}</span>
                 <span className="text-gray-500 text-xs uppercase">Entries</span>
             </div>
        </div>

        {/* Search Bar */}
        <div className="sticky top-0 z-30 bg-[#050510]/80 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-gray-800/50">
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search 6000+ words (e.g. 'Server', 'Bewerbung')..." 
                    className="w-full bg-slate-900 border border-gray-700 rounded-2xl py-4 pl-14 pr-4 text-white text-lg focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] outline-none transition-all"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setVisibleCount(50); // Reset pagination on search
                    }}
                />
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleEntries.map((entry, i) => (
                <div key={entry.id || i} className="bg-slate-950 p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Globe size={16} className="text-gray-600"/>
                    </div>
                    
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{entry.word}</h3>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                         <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase font-mono border ${
                            entry.context === 'TECH' 
                            ? 'bg-blue-900/20 text-blue-400 border-blue-500/30' 
                            : 'bg-purple-900/20 text-purple-400 border-purple-500/30'
                        }`}>
                            {entry.context}
                        </span>
                    </div>

                    <p className="text-gray-300 mb-4 font-arabic text-xl border-l-2 border-gray-700 pl-3" dir="rtl">{entry.translation}</p>
                    
                    {entry.example && (
                        <div className="bg-black/40 p-3 rounded-lg text-sm text-gray-500 italic">
                            "{entry.example}"
                        </div>
                    )}
                </div>
            ))}
        </div>
        
        {/* Pagination Status / Load More */}
        {filtered.length > 0 && (
            <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-gray-500 text-sm">
                    Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} entries
                </p>
                {visibleCount < filtered.length && (
                    <button 
                        onClick={handleLoadMore}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all border border-gray-700 hover:border-cyan-400"
                    >
                        Load More <ChevronDown size={18}/>
                    </button>
                )}
            </div>
        )}

        {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-600">
                <p>No entries found matching query.</p>
            </div>
        )}
    </div>
  );
};

export default DictionarySection;