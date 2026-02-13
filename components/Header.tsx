import React, { useEffect, useState } from 'react';
import { TabView } from '../types';
import { Clock, Github, Linkedin, Wifi, CloudSun, Trophy } from 'lucide-react';
import { EXAM_DATE } from '../constants';

interface Props {
  currentTab: TabView;
  setTab: (tab: TabView) => void;
  xp: number;
  rank: string;
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<Props> = ({ xp, rank }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number}>({ days: 0, hours: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date());
        const now = new Date();
        const difference = EXAM_DATE.getTime() - now.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft({ days, hours });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Level Progress (assuming 1000 XP per level)
  const levelProgress = (xp % 1000) / 10; 

  return (
    <header className="bg-slate-950/90 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-40 h-16 flex items-center justify-between px-6 shadow-lg shadow-purple-900/10">
       {/* Left: System Status & Weather */}
       <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 text-xs font-mono">
               <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
               <span>SYSTEM ONLINE</span>
           </div>
           
           <div className="hidden md:flex items-center gap-2 text-gray-400 text-xs font-mono">
               <CloudSun size={14} className="text-yellow-400"/>
               <span>MARTIL: 22°C</span>
           </div>
       </div>

       {/* Center: XP Bar (Hidden on small mobile) */}
       <div className="hidden lg:flex flex-col w-1/3 mx-4">
            <div className="flex justify-between text-[10px] text-cyan-400/80 font-mono mb-1">
                <span>RANK: {rank.toUpperCase()}</span>
                <span>{xp} XP</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 shadow-[0_0_10px_#22d3ee]" 
                    style={{ width: `${levelProgress}%`, transition: 'width 0.5s ease-out' }}
                ></div>
            </div>
       </div>

       {/* Right: Clock & Socials */}
       <div className="flex items-center gap-6">
           <div className="text-right hidden md:block">
               <div className="text-2xl font-digital text-cyan-400 tracking-widest leading-none drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                   {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </div>
               <div className="text-[10px] text-purple-400 font-mono flex items-center justify-end gap-1">
                   <Clock size={10} className="text-red-500"/>
                   B1: <span className="text-gray-300">{timeLeft.days}D LEFT</span>
               </div>
           </div>

           <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>

           <div className="flex items-center gap-3">
               <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github size={20}/></a>
               <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors"><Linkedin size={20}/></a>
           </div>
       </div>
    </header>
  );
};

export default Header;
