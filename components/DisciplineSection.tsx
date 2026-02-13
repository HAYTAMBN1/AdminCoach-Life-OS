import React, { useState } from 'react';
import { ShieldAlert, Activity, Flame, X, UserCheck, Calendar as CalIcon } from 'lucide-react';
import { ISLAMIC_CONTENT } from '../constants';
import { CalendarHistory } from '../types';

interface Props {
  streak: number;
  day: number;
  history: CalendarHistory;
  toggleDayStatus: (dateKey: string) => void;
}

const DisciplineSection: React.FC<Props> = ({ streak, history, toggleDayStatus }) => {
  const [showEmergency, setShowEmergency] = useState(false);

  // Generate 30 days based on real dates backward from today
  const today = new Date();
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (29 - i));
    const dateKey = date.toISOString().split('T')[0];
    const status = history[dateKey] || 'PENDING';
    const dayNum = date.getDate();
    return { dateKey, dayNum, status };
  });

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto font-arabic" dir="rtl">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 border border-gray-800 rounded-3xl p-6 text-center relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center">
                 <div className="p-4 bg-purple-500/10 text-purple-400 rounded-full mb-4 ring-1 ring-purple-500/50">
                    <Flame size={32} className={streak > 3 ? "animate-pulse" : ""} />
                 </div>
                <h2 className="text-6xl font-bold text-white font-mono mb-2">{streak}</h2>
                <p className="text-gray-400 text-sm font-bold">أيام الصمود (Streak)</p>
            </div>
        </div>

        <div className="md:col-span-2 bg-slate-950 border border-gray-800 rounded-3xl p-8 flex flex-col justify-center relative shadow-sm">
            <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Activity size={16}/> حالة النفس
            </h3>
            <p className="text-2xl text-gray-200 font-bold leading-tight">
                "وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ ۝ فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ"
            </p>
            <div className="mt-4 text-xs text-gray-500 font-mono">سورة النازعات [40-41]</div>
        </div>
      </div>

      {/* Manual Tracker */}
      <div className="bg-slate-900 border border-gray-800 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
             <h3 className="text-white font-bold flex items-center gap-2 text-xl">
                <CalIcon size={24} className="text-cyan-400"/> سجل الانضباط
             </h3>
             <span className="text-xs text-gray-500">اضغط لتغيير الحالة</span>
        </div>
        
        <div className="grid grid-cols-7 md:grid-cols-10 gap-3">
            {calendarDays.map((d) => (
                <button 
                    key={d.dateKey} 
                    onClick={() => toggleDayStatus(d.dateKey)}
                    className={`aspect-square rounded-xl flex items-center justify-center text-lg font-bold border-2 transition-all shadow-lg ${
                        d.status === 'SUCCESS' 
                        ? 'bg-green-500/10 text-green-400 border-green-500' 
                        : d.status === 'FAIL'
                        ? 'bg-red-500/10 text-red-500 border-red-500'
                        : 'bg-slate-950 border-gray-800 text-gray-600 hover:border-gray-600'
                    }`}
                >
                    {d.dayNum}
                </button>
            ))}
        </div>
      </div>

      {/* Emergency Button */}
      <div className="h-64">
          <button 
              onClick={() => setShowEmergency(true)}
              className="group relative bg-red-900/10 border-2 border-red-900/50 hover:border-red-500 text-red-500 w-full h-full rounded-3xl p-6 transition-all flex flex-col items-center justify-center gap-4 overflow-hidden"
          >
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors"></div>
              <ShieldAlert size={64} className="group-hover:animate-ping duration-1000" />
              <span className="text-3xl font-bold">زر الطوارئ</span>
              <span className="text-sm text-red-400 opacity-80 tracking-widest font-mono uppercase">EMERGENCY PROTOCOL: ACTIVATE</span>
          </button>
      </div>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <div className="bg-slate-950 border border-red-600 rounded-3xl max-w-lg w-full p-8 shadow-[0_0_100px_rgba(220,38,38,0.4)] relative">
                <button 
                    onClick={() => setShowEmergency(false)}
                    className="absolute top-4 left-4 text-gray-500 hover:text-white"
                >
                    <X size={24} />
                </button>
                
                <div className="text-center mb-10">
                    <ShieldAlert size={64} className="text-red-500 mx-auto mb-6 animate-bounce" />
                    <h2 className="text-4xl font-bold text-white tracking-widest">{ISLAMIC_CONTENT.emergency.title}</h2>
                </div>

                <div className="space-y-4 mb-10">
                    {ISLAMIC_CONTENT.emergency.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-gray-200 bg-red-900/10 p-4 rounded-2xl border border-red-900/30">
                            <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-sm font-bold border border-red-500/50">{idx + 1}</span>
                            <span className="text-lg font-bold">{step}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center p-4 border border-dashed border-red-800 rounded-xl text-red-400 italic mb-8">
                     "{ISLAMIC_CONTENT.emergency.verse}"
                </div>

                <button 
                    onClick={() => setShowEmergency(false)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/50 text-xl"
                >
                    استعدت السيطرة
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default DisciplineSection;
