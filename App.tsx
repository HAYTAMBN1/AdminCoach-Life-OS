import React, { useState, useEffect } from 'react';
import { TabView, CalendarHistory, Todo, DictionaryEntry } from './types';
import { LEXICON_INITIAL_DATA } from './constants';
import Header from './components/Header';
import GermanSection from './components/GermanSection';
import TechSection from './components/TechSection';
import IslamSection from './components/IslamSection';
import DictionarySection from './components/DictionarySection';
import DisciplineSection from './components/DisciplineSection';
import LibrarySection from './components/LibrarySection';
import { generateDailyTasks } from './services/geminiService';
import { Terminal, Book, Cpu, Shield, Library, LayoutDashboard, CheckSquare, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Dashboard Component ---
const Dashboard: React.FC<{ 
    xp: number; 
    rank: string;
    todos: Todo[]; 
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    generateTodos: () => Promise<void>;
}> = ({ xp, rank, todos, toggleTodo, deleteTodo, generateTodos }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGen = async () => {
        setIsGenerating(true);
        await generateTodos();
        setIsGenerating(false);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Hero */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-slate-900 to-slate-950 border border-purple-500/30 p-8 rounded-3xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <h2 className="text-4xl font-bold mb-2 text-white">Willkommen, <span className="text-cyan-400 neon-text">Admin Haitham</span></h2>
                <p className="text-gray-400 font-mono">STATUS: ONLINE | RANK: {rank} | XP: {xp}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Todo Widget */}
                <div className="bg-slate-950/80 p-6 rounded-3xl border border-gray-800 backdrop-blur-sm flex flex-col h-[400px]">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                        <CheckSquare className="text-purple-500"/> DAILY MISSIONS
                    </h3>
                    
                    {/* AI Generator Button */}
                    <button 
                        onClick={handleGen}
                        disabled={isGenerating}
                        className="w-full py-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 hover:border-cyan-400 rounded-xl font-bold text-white flex items-center justify-center gap-2 mb-4 transition-all disabled:opacity-50 group"
                    >
                        {isGenerating ? <Loader2 className="animate-spin text-cyan-400"/> : <Sparkles className="text-yellow-400 group-hover:scale-110 transition-transform"/>}
                        {isGenerating ? 'INITIALIZING PROTOCOLS...' : 'GENERATE AI PROTOCOLS'}
                    </button>

                    <ul className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {todos.length === 0 && (
                            <div className="text-center text-gray-500 py-10 font-mono text-sm">
                                NO ACTIVE PROTOCOLS.<br/>INITIATE GENERATION SEQUENCE.
                            </div>
                        )}
                        {todos.map(todo => (
                            <li key={todo.id} className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-gray-800 group hover:border-gray-600 transition-colors">
                                <button onClick={() => toggleTodo(todo.id)} className={`w-6 h-6 rounded flex items-center justify-center transition-all ${todo.completed ? 'bg-green-500 text-black' : 'border border-gray-600 hover:border-white'}`}>
                                    {todo.completed && <CheckSquare size={14}/>}
                                </button>
                                <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>{todo.text}</span>
                                <button onClick={() => deleteTodo(todo.id)} className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* System Stats */}
                <div className="bg-slate-950/80 p-6 rounded-3xl border border-gray-800 backdrop-blur-sm flex flex-col justify-center h-[400px]">
                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><Cpu className="text-cyan-500"/> SYSTEM INTEGRITY</h3>
                     <div className="grid grid-cols-2 gap-4">
                         <div className="bg-black/40 p-6 rounded-2xl text-center border border-gray-800 flex flex-col items-center justify-center h-full">
                             <div className="text-5xl font-bold text-cyan-400 font-digital mb-2">B1</div>
                             <div className="text-xs text-gray-500 tracking-widest uppercase">Target Level</div>
                         </div>
                         <div className="bg-black/40 p-6 rounded-2xl text-center border border-gray-800 flex flex-col items-center justify-center h-full">
                             <div className="text-5xl font-bold text-purple-400 font-digital mb-2">36</div>
                             <div className="text-xs text-gray-500 tracking-widest uppercase">Modules</div>
                         </div>
                     </div>
                     <div className="mt-4 bg-black/40 p-4 rounded-2xl border border-gray-800">
                         <div className="flex justify-between text-xs text-gray-400 mb-1">
                             <span>DISCIPLINE STREAK</span>
                             <span className="text-green-400 font-bold">ONLINE</span>
                         </div>
                         <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500 w-[75%] shadow-[0_0_10px_#22c55e]"></div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---
const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabView>('DASHBOARD');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [todos, setTodos] = useState<Todo[]>(() => {
      const saved = localStorage.getItem('haytham_todos');
      return saved ? JSON.parse(saved) : [];
  });
  const [xp, setXp] = useState(1250);
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>([]);
  const [history, setHistory] = useState<CalendarHistory>({});

  // Persist Todos
  useEffect(() => {
    localStorage.setItem('haytham_todos', JSON.stringify(todos));
  }, [todos]);

  // Rank Logic
  const getRank = (xp: number) => {
      if (xp < 1000) return "Newbie";
      if (xp < 2500) return "Azubi";
      if (xp < 5000) return "Admin";
      return "System Master";
  };
  const rank = getRank(xp);

  const handleTaskComplete = (taskId: string) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks(prev => [...prev, taskId]);
      setXp(prev => prev + 50); // +50 XP per task
    }
  };

  const addToLexicon = (word: string, translation: string, context: 'TECH' | 'GERMAN', example: string) => {
      setDictionary(prev => [...prev, { id: Date.now().toString(), word, translation, context, example }]);
  };

  const handleTodo = {
      toggle: (id: string) => setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)),
      delete: (id: string) => setTodos(prev => prev.filter(t => t.id !== id)),
      generate: async () => {
          try {
              const aiTasks = await generateDailyTasks(xp, rank);
              const newTodos = aiTasks.map((t, i) => ({
                  id: Date.now().toString() + i,
                  text: t.text,
                  completed: false
              }));
              setTodos(newTodos);
          } catch (error) {
              console.error("AI Generation failed", error);
              // Optional: Add simple error toast here
          }
      }
  };

  const toggleDayStatus = (dateKey: string) => {
    setHistory(prev => ({
        ...prev,
        [dateKey]: prev[dateKey] === 'SUCCESS' ? 'FAIL' : prev[dateKey] === 'FAIL' ? 'PENDING' : 'SUCCESS'
    }));
  };

  const NavItem = ({ tab, icon, label }: { tab: TabView, icon: React.ReactNode, label: string }) => (
      <button 
        onClick={() => setCurrentTab(tab)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            currentTab === tab 
            ? 'bg-purple-600/10 text-cyan-400 border-r-2 border-cyan-400 font-bold' 
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
      >
          {icon}
          <span className="tracking-wide text-sm">{label}</span>
      </button>
  );

  return (
    <div className="flex h-screen bg-[#050510] text-gray-100 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col w-64 bg-slate-950 border-r border-gray-800 transition-all z-50`}>
          <div className="p-6 flex items-center gap-2 border-b border-gray-800">
             <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-bold text-black text-lg">H</div>
             <h1 className="font-bold text-xl tracking-tighter text-white">ADMIN<span className="text-cyan-400">OS</span></h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <NavItem tab="DASHBOARD" icon={<LayoutDashboard size={18}/>} label="HUB" />
              <div className="text-[10px] font-bold text-gray-600 mt-6 mb-2 px-4 uppercase tracking-widest">Modules</div>
              <NavItem tab="GERMAN" icon={<Book size={18}/>} label="DEUTSCH B1" />
              <NavItem tab="TECH" icon={<Cpu size={18}/>} label="SYSTEM INT." />
              <NavItem tab="ISLAM" icon={<Terminal size={18}/>} label="ISLAM_OS" />
              <div className="text-[10px] font-bold text-gray-600 mt-6 mb-2 px-4 uppercase tracking-widest">Knowledge</div>
              <NavItem tab="LIBRARY" icon={<BookOpen size={18}/>} label="BIBLIOTHEK" />
              <NavItem tab="DICTIONARY" icon={<Library size={18}/>} label="LEXICON" />
              <div className="text-[10px] font-bold text-gray-600 mt-6 mb-2 px-4 uppercase tracking-widest">Self</div>
              <NavItem tab="DISCIPLINE" icon={<Shield size={18}/>} label="NAFS CTRL" />
          </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
          <Header currentTab={currentTab} setTab={setCurrentTab} xp={xp} rank={rank} isDark={true} toggleTheme={() => {}} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentTab === 'DASHBOARD' && (
                        <Dashboard 
                            xp={xp} 
                            rank={rank} 
                            todos={todos} 
                            toggleTodo={handleTodo.toggle} 
                            deleteTodo={handleTodo.delete} 
                            generateTodos={handleTodo.generate}
                        />
                    )}
                    {currentTab === 'GERMAN' && <GermanSection completedTasks={completedTasks} onTaskComplete={handleTaskComplete} onAddToLexicon={addToLexicon} />}
                    {currentTab === 'TECH' && <TechSection completedTasks={completedTasks} onTaskComplete={handleTaskComplete} />}
                    {currentTab === 'ISLAM' && <IslamSection />}
                    {currentTab === 'LIBRARY' && <LibrarySection />}
                    {currentTab === 'DICTIONARY' && <DictionarySection dictionary={dictionary} />}
                    {currentTab === 'DISCIPLINE' && <DisciplineSection streak={3} day={1} history={history} toggleDayStatus={toggleDayStatus} />}
                  </motion.div>
              </AnimatePresence>
          </main>

          {/* Mobile Tab Bar */}
          <div className="md:hidden bg-slate-950 border-t border-gray-800 flex justify-around p-4 z-50 fixed bottom-0 w-full pb-6">
              <button onClick={() => setCurrentTab('DASHBOARD')} className={currentTab === 'DASHBOARD' ? 'text-cyan-400' : 'text-gray-600'}><LayoutDashboard size={24}/></button>
              <button onClick={() => setCurrentTab('GERMAN')} className={currentTab === 'GERMAN' ? 'text-cyan-400' : 'text-gray-600'}><Book size={24}/></button>
              <button onClick={() => setCurrentTab('LIBRARY')} className={currentTab === 'LIBRARY' ? 'text-cyan-400' : 'text-gray-600'}><BookOpen size={24}/></button>
              <button onClick={() => setCurrentTab('TECH')} className={currentTab === 'TECH' ? 'text-cyan-400' : 'text-gray-600'}><Cpu size={24}/></button>
              <button onClick={() => setCurrentTab('ISLAM')} className={currentTab === 'ISLAM' ? 'text-cyan-400' : 'text-gray-600'}><Terminal size={24}/></button>
          </div>
      </div>
    </div>
  );
};

export default App;