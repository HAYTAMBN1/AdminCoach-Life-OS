import React, { useState } from 'react';
import { StaticGermanContent, Story } from '../types';
import { BookOpen, X, Youtube, Zap, Brain, PenTool, CheckCircle, Plus, Play, Gamepad2, GraduationCap, Mic, Headphones } from 'lucide-react';
import { CURRICULUM, STATIC_GERMAN_CONTENT, HAITHAM_ADVENTURE } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onTaskComplete: (task: string) => void;
  onAddToLexicon: (word: string, translation: string, context: 'TECH' | 'GERMAN', example: string) => void;
  completedTasks: string[];
}

const GermanSection: React.FC<Props> = ({ onTaskComplete, onAddToLexicon, completedTasks }) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState<'Grammatik' | 'Wortschatz' | 'Redemittel' | 'Exam'>('Grammatik');
  
  const tracks = {
      'Grammatik': { title: 'Grammatik B1', icon: Zap },
      'Wortschatz': { title: 'Hören & Lesen', icon: Headphones },
      'Redemittel': { title: 'Sprechen & Schreiben', icon: Mic },
      'Exam': { title: 'Exam Prep', icon: GraduationCap }
  };

  const currentLessons = CURRICULUM.filter(l => {
      if (activeTrack === 'Grammatik') return l.track === 'Grammatik B1';
      if (activeTrack === 'Wortschatz') return l.track === 'Hören & Lesen';
      if (activeTrack === 'Redemittel') return l.track === 'Sprechen & Schreiben';
      if (activeTrack === 'Exam') return l.track === 'Exam Prep';
      return false;
  });

  const content = activeLesson ? (STATIC_GERMAN_CONTENT[activeLesson] || { blocks: [
      { type: "GRAMMAR_CORE", title: activeLesson, content: "Lesson content not yet generated in static database." },
      { type: "VIDEO_HUB", title: "Youtube Search", content: `<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+${encodeURIComponent(activeLesson)}' target='_blank' class='text-cyan-400 hover:underline'>▶ Search "Deutsch mit Mira" for this topic</a>` }
  ] }) : null;

  // Story Logic
  const handleStartStory = () => {
    setActiveStory(HAITHAM_ADVENTURE);
    setCurrentStageId(HAITHAM_ADVENTURE.startStageId);
  };

  const handleChoice = (nextStageId: string) => {
    setCurrentStageId(nextStageId);
  };

  const currentStage = activeStory && currentStageId ? activeStory.stages[currentStageId] : null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      
      {/* Story Mode Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/50 to-slate-900 border border-purple-500/50 rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
        onClick={handleStartStory}
      >
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-600/20 to-transparent"></div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Gamepad2 className="text-cyan-400" size={32} />
              Adventure Mode: Server Room
          </h2>
          <p className="text-gray-300 max-w-xl">
              Play as Haitham in a text-based adventure. Navigate a German job interview and fix a server crisis using your B1 skills.
          </p>
          <div className="mt-6 flex items-center gap-2 text-cyan-400 font-bold font-mono text-sm group-hover:translate-x-2 transition-transform">
              START SIMULATION <Play size={16} />
          </div>
      </motion.div>

      {/* Track Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-800">
          {(Object.entries(tracks) as [keyof typeof tracks, {title: string, icon: any}][]).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setActiveTrack(key as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-bold transition-all whitespace-nowrap ${
                    activeTrack === key 
                    ? 'bg-purple-600/20 border-purple-500 text-white' 
                    : 'bg-slate-900 border-gray-800 text-gray-400 hover:bg-slate-800'
                }`}
              >
                  <info.icon size={16} />
                  {info.title}
              </button>
          ))}
      </div>

      {/* Lessons Grid */}
      <h3 className="text-xl font-bold text-cyan-400 font-mono border-b border-gray-800 pb-2 flex justify-between">
          <span>{tracks[activeTrack].title}</span>
          <span className="text-sm text-gray-500 font-normal">{currentLessons.length} Modules</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentLessons.map((lesson, idx) => (
            <motion.div 
                key={lesson.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveLesson(lesson.title)}
                className={`group cursor-pointer rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
                    completedTasks.includes(lesson.title) || lesson.completed 
                    ? 'bg-slate-900/50 border-gray-800 opacity-60' 
                    : 'bg-slate-900 border-purple-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                }`}
            >
                <div className={`absolute top-0 left-0 w-1 h-full ${lesson.examWeight === 'High' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono flex items-center gap-1">
                        {lesson.order < 10 ? `0${lesson.order}` : lesson.order} // {lesson.track}
                    </span>
                    {(completedTasks.includes(lesson.title) || lesson.completed) && <CheckCircle size={16} className="text-green-500"/>}
                </div>
                <h3 className="text-lg font-bold text-gray-100 leading-tight mb-2 group-hover:text-cyan-400 transition-colors">{lesson.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{lesson.notes}</p>
            </motion.div>
        ))}
      </div>

      {/* Lesson Modal */}
      <AnimatePresence>
      {activeLesson && content && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" 
                onClick={() => setActiveLesson(null)} 
              />
              <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                className="relative w-full max-w-5xl bg-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 flex flex-col max-h-[90vh]"
              >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-slate-950/50">
                      <div>
                          <h3 className="text-2xl font-bold text-white">{activeLesson}</h3>
                          <span className="text-xs text-cyan-400 font-mono">B1 LEARNING MATRIX</span>
                      </div>
                      <button onClick={() => setActiveLesson(null)} className="p-2 rounded-full hover:bg-white/10 transition-colors"><X size={24} className="text-gray-400"/></button>
                  </div>

                  {/* Body */}
                  <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                      {content.blocks.map((block, idx) => (
                          <div key={idx} className="bg-slate-950/50 rounded-xl p-6 border border-gray-800">
                              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-800">
                                  {block.type === 'GRAMMAR_CORE' && <Zap className="text-yellow-400" size={20} />}
                                  {block.type === 'VOCAB_CLUSTER' && <Brain className="text-purple-400" size={20} />}
                                  {block.type === 'EXAM_SKILLS' && <PenTool className="text-red-400" size={20} />}
                                  {block.type === 'VIDEO_HUB' && <Youtube className="text-red-600" size={20} />}
                                  <h4 className="text-lg font-bold text-gray-200 uppercase tracking-wider">{block.type.replace('_', ' ')}: {block.title}</h4>
                              </div>
                              
                              {/* Content Rendering */}
                              <div className="text-gray-300 leading-relaxed text-lg [&>b]:text-cyan-400 [&>b]:font-normal" dangerouslySetInnerHTML={{ __html: block.content }} />
                              
                              {/* Vocab Table Rendering */}
                              {block.type === 'VOCAB_CLUSTER' && block.vocabData && (
                                  <div className="mt-4 overflow-x-auto">
                                      <table className="w-full text-left text-sm text-gray-400">
                                          <thead className="bg-slate-800/50 text-gray-200 uppercase font-mono">
                                              <tr>
                                                  <th className="px-4 py-2">German</th>
                                                  <th className="px-4 py-2">Arabic</th>
                                                  <th className="px-4 py-2">Action</th>
                                              </tr>
                                          </thead>
                                          <tbody className="divide-y divide-gray-800">
                                              {block.vocabData.map((row, vIdx) => (
                                                  <tr key={vIdx} className="hover:bg-slate-800/30">
                                                      <td className="px-4 py-2 text-cyan-300 font-bold">{row.german}</td>
                                                      <td className="px-4 py-2 font-arabic text-lg">{row.arabic}</td>
                                                      <td className="px-4 py-2">
                                                          <button 
                                                            onClick={() => onAddToLexicon(row.german, row.arabic, "GERMAN", "From Lesson")}
                                                            className="text-xs bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                                                          >
                                                              <Plus size={12}/> ADD
                                                          </button>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </table>
                                  </div>
                              )}
                          </div>
                      ))}
                      
                      <button 
                        onClick={() => { onTaskComplete(activeLesson); setActiveLesson(null); }}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-lg rounded-xl hover:shadow-[0_0_20px_#22d3ee] transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle /> COMPLETE MODULE (+50 XP)
                      </button>
                  </div>
              </motion.div>
          </div>
      )}
      </AnimatePresence>

      {/* Story Modal */}
      <AnimatePresence>
      {activeStory && currentStage && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
               <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95" 
              />
              <motion.div 
                initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                className="relative w-full max-w-4xl bg-slate-900 border border-purple-500 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
              >
                  <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-4">
                      <h2 className="text-3xl font-bold text-cyan-400 font-digital">{currentStage.title}</h2>
                      <button onClick={() => setActiveStory(null)}><X className="text-gray-500 hover:text-white"/></button>
                  </div>

                  <div className="space-y-6 mb-8">
                      <p className="text-2xl text-white font-medium leading-relaxed">{currentStage.text}</p>
                      <p className="text-lg text-gray-500 font-arabic dir-rtl">{currentStage.translation}</p>
                  </div>

                  <div className="grid gap-4">
                      {currentStage.choices.map((choice, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleChoice(choice.nextStageId)}
                            className="p-4 bg-slate-800 hover:bg-purple-900/30 border border-gray-700 hover:border-purple-500 text-left rounded-xl transition-all text-gray-200 hover:text-white flex items-center gap-3"
                          >
                              <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm">{idx + 1}</span>
                              {choice.text}
                          </button>
                      ))}
                  </div>
              </motion.div>
          </div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default GermanSection;