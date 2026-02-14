import React, { useState } from 'react';
import { StaticTechContent } from '../types';
import { CheckCircle, Lock, Play, X, Terminal, Copy, Server, FileText } from 'lucide-react';
import { CURRICULUM, STATIC_TECH_CONTENT } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onTaskComplete: (task: string) => void;
  completedTasks: string[];
}

const TechSection: React.FC<Props> = ({ onTaskComplete, completedTasks }) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  // Removed .slice(0, 4) to show all lessons
  const techLessons = CURRICULUM.filter(l => l.track === 'Fachinformatik').sort((a, b) => a.order - b.order); 
  
  const activeContent = activeLesson ? (STATIC_TECH_CONTENT[activeLesson] || {
      summary: "This advanced module is currently under development in the database.",
      labTitle: "Pending Update",
      labSteps: [],
      portfolioTask: "Check back later for the detailed lab instructions.",
      resources: []
  }) : null;

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      <h3 className="text-xl font-bold text-cyan-400 font-mono border-b border-gray-800 pb-2 mb-8 text-center">SYSTEM_INTEGRATION_ROADMAP</h3>
      
      {/* SVG Roadmap Visualization - Vertical Scrollable */}
      <div className="relative flex flex-col items-center py-10">
        {/* Continuous Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 -translate-x-1/2 z-0"></div>

        {techLessons.map((lesson, index) => {
             const isDone = completedTasks.includes(lesson.title) || lesson.completed;
             const isLocked = !isDone && index > 0 && !completedTasks.includes(techLessons[index - 1].title);
             const isLeft = index % 2 === 0;

             return (
                 <motion.div 
                    key={lesson.title}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }} // Faster stagger
                    className={`relative w-full flex ${isLeft ? 'justify-end pr-12 md:pr-32' : 'justify-start pl-12 md:pl-32'} mb-16`}
                 >
                     <div 
                        onClick={() => !isLocked && setActiveLesson(lesson.title)}
                        className={`
                            relative z-10 w-[350px] p-6 rounded-xl border transition-all duration-300 group cursor-pointer
                            ${isLocked 
                                ? 'bg-slate-900/50 border-gray-800 opacity-50 grayscale' 
                                : isDone
                                ? 'bg-slate-950 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                                : 'bg-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                            }
                        `}
                     >
                         <div className="flex justify-between items-start mb-3">
                             <span className="text-xs font-mono text-gray-500">NODE_0{index + 1}</span>
                             {isDone ? <CheckCircle size={18} className="text-green-400"/> : isLocked ? <Lock size={18} className="text-gray-600"/> : <Play size={18} className="text-cyan-400 animate-pulse"/>}
                         </div>
                         <h3 className="font-bold text-white text-lg leading-tight mb-2">{lesson.title}</h3>
                         <p className="text-xs text-gray-400">{lesson.notes}</p>
                         
                         {/* Status Bar */}
                         <div className="h-1 w-full bg-gray-800 mt-4 rounded overflow-hidden">
                             <div className={`h-full rounded ${isDone ? 'bg-green-500 w-full' : 'bg-cyan-400 w-1/3'}`}></div>
                         </div>
                     </div>

                     {/* Connector Dot */}
                     <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 z-20 ${
                         isDone ? 'bg-green-500 border-white' : isLocked ? 'bg-gray-800 border-gray-600' : 'bg-cyan-400 border-white shadow-[0_0_10px_#22d3ee]'
                     }`}></div>
                 </motion.div>
             )
        })}
      </div>

      {/* Lab Modal (Terminal Style) */}
      <AnimatePresence>
      {activeLesson && activeContent && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-sm" 
                onClick={() => setActiveLesson(null)} 
              />
              <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                className="relative w-full max-w-4xl bg-[#0c0c0c] rounded-lg border border-gray-700 flex flex-col max-h-[90vh] font-mono shadow-2xl"
              >
                  {/* Terminal Header */}
                  <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#1a1a1a] rounded-t-lg">
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-400 ml-2">root@admin-os:~/labs/{activeLesson.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20)}</span>
                      </div>
                      <button onClick={() => setActiveLesson(null)}><X size={16} className="text-gray-500 hover:text-white"/></button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto custom-scrollbar space-y-8 text-sm text-gray-300">
                      
                      {/* Objective */}
                      <div className="border-l-2 border-cyan-400 pl-4 py-1">
                          <h4 className="text-cyan-400 font-bold mb-1"> MISSION OBJECTIVE</h4>
                          <p className="text-gray-100 text-base">{activeContent.summary}</p>
                      </div>

                      {/* Commands */}
                      {activeContent.labSteps.length > 0 && (
                          <div className="space-y-4">
                              <h4 className="text-black font-bold bg-cyan-400 inline-block px-2 py-1 rounded">>> EXECUTE_PROTOCOL: {activeContent.labTitle}</h4>
                              {activeContent.labSteps.map((step, i) => (
                                  <div key={i} className="group">
                                      <div className="flex gap-4">
                                          <span className="text-gray-600 select-none font-bold">STEP_0{i + 1}</span>
                                          <div className="flex-1">
                                              {step.cmd && (
                                                  <div className="bg-black p-3 rounded border border-gray-800 text-green-400 mb-2 flex justify-between items-center group-hover:border-gray-600 transition-colors shadow-inner">
                                                      <code><span className="text-purple-400">$</span> {step.cmd}</code>
                                                      <button title="Copy" className="text-gray-600 hover:text-white"><Copy size={14}/></button>
                                                  </div>
                                              )}
                                              <p className="text-gray-400">{step.desc}</p>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}

                      {/* Azubi Task */}
                      <div className="mt-8 p-6 border border-dashed border-gray-600 rounded bg-gray-900/50">
                          <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                              <FileText size={18} className="text-yellow-400"/> AZUBI PORTFOLIO TASK
                          </h4>
                          <p className="text-gray-300 leading-relaxed">{activeContent.portfolioTask}</p>
                          <div className="mt-4 text-xs text-gray-500">
                              * Document this in your GitHub repository and Notion pages.
                          </div>
                      </div>

                      {/* Resources */}
                      {activeContent.resources && activeContent.resources.length > 0 && (
                          <div className="mt-4">
                              <h4 className="text-gray-400 font-bold mb-2">RESOURCES:</h4>
                              <ul className="list-disc pl-5">
                                  {activeContent.resources.map((res, i) => (
                                      <li key={i}>
                                          <a href={res.url} target="_blank" rel="noreferrer" className="text-cyan-500 hover:underline">{res.title}</a>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}

                      {/* Action */}
                      <button 
                        onClick={() => { onTaskComplete(activeLesson); setActiveLesson(null); }} 
                        className="w-full py-4 bg-green-500/10 border border-green-500 text-green-400 font-bold rounded hover:bg-green-500/20 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                          <Terminal size={16}/> [ COMMIT_LAB_REPORT +50XP ]
                      </button>
                  </div>
              </motion.div>
          </div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default TechSection;