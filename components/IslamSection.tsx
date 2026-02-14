import React, { useState, useEffect } from 'react';
import { Moon, BookOpen, Calendar, Search, Star, ChevronRight, Loader2, Sunrise, Sun, Sunset, Clock, MapPin, Settings, X, Check, Bookmark } from 'lucide-react';
import { Surah } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { storage, STORAGE_KEYS } from '../services/storage';

// Types for AlAdhan API
interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface HijriDate {
  date: string;
  month: { en: string; ar: string };
  weekday: { en: string; ar: string };
  year: string;
}

interface GregorianDate {
  date: string;
  weekday: { en: string };
}

interface APIResponse {
  data: {
    timings: PrayerTimings;
    date: {
      readable: string;
      hijri: HijriDate;
      gregorian: GregorianDate;
    };
    meta: {
      timezone: string;
      method: { name: string };
    }
  };
}

// Major Moroccan Cities Coordinates
const CITIES = [
  { name: 'Martil', lat: 35.6166, lng: -5.2667 },
  { name: 'Tétouan', lat: 35.5785, lng: -5.3684 },
  { name: 'Tanger', lat: 35.7595, lng: -5.8340 },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416 },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898 },
  { name: 'Fès', lat: 34.0181, lng: -5.0078 },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811 },
  { name: 'Agadir', lat: 30.4278, lng: -9.5981 },
  { name: 'Oujda', lat: 34.6817, lng: -1.9077 },
  { name: 'Laâyoune', lat: 27.1253, lng: -13.1625 }
];

const IslamSection: React.FC = () => {
  const [activeView, setActiveView] = useState<'PRAYER' | 'QURAN' | 'CALENDAR'>('PRAYER');
  
  // Location State - Persistent
  const [selectedCity, setSelectedCity] = useState(
      () => storage.get(STORAGE_KEYS.CITY, CITIES[0])
  );
  const [showCitySelector, setShowCitySelector] = useState(false);

  // Save city on change
  useEffect(() => {
      storage.set(STORAGE_KEYS.CITY, selectedCity);
  }, [selectedCity]);

  // Data State
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [hijri, setHijri] = useState<HijriDate | null>(null);
  const [gregorian, setGregorian] = useState<GregorianDate | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState(false);

  // Quran State
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingQuran, setLoadingQuran] = useState(false);
  const [lastRead, setLastRead] = useState<number>(() => storage.get(STORAGE_KEYS.LAST_SURAH, 0));

  // Save last read on change
  useEffect(() => {
      if (lastRead > 0) storage.set(STORAGE_KEYS.LAST_SURAH, lastRead);
  }, [lastRead]);

  // Fetch Data (Prayer + Calendar)
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        // Method 21: Moroccan Ministry of Habous and Islamic Affairs
        // This ensures compatibility with official Moroccan times (habous.gov.ma)
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&method=21`);
        const json: APIResponse = await res.json();
        if (json.data) {
          setTimings(json.data.timings);
          setHijri(json.data.date.hijri);
          setGregorian(json.data.date.gregorian);
        }
        setLoadingData(false);
      } catch (e) {
        console.error("Failed to fetch AlAdhan data", e);
        setDataError(true);
        setLoadingData(false);
      }
    };
    fetchData();
  }, [selectedCity]);

  // Fetch Quran Data
  useEffect(() => {
    if (activeView === 'QURAN' && surahs.length === 0) {
      setLoadingQuran(true);
      fetch('https://api.alquran.cloud/v1/surah')
        .then(res => res.json())
        .then(data => {
          if (data.code === 200) {
            setSurahs(data.data);
          }
          setLoadingQuran(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingQuran(false);
        });
    }
  }, [activeView, surahs.length]);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.includes(searchQuery) ||
    String(s.number).includes(searchQuery)
  );

  const prayerIcons = {
    Fajr: <Sunrise size={24} className="text-cyan-400" />,
    Dhuhr: <Sun size={24} className="text-yellow-400" />,
    Asr: <Sun size={24} className="text-orange-400" />,
    Maghrib: <Sunset size={24} className="text-red-400" />,
    Isha: <Moon size={24} className="text-indigo-400" />
  };

  const PrayerCard = ({ name, time, icon }: { name: string, time: string, icon: React.ReactNode }) => (
    <div className="bg-slate-900/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between hover:bg-slate-800 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-950 rounded-xl group-hover:bg-slate-900 transition-colors">
          {icon}
        </div>
        <span className="text-xl font-bold text-gray-200">{name}</span>
      </div>
      <span className="text-2xl font-mono text-cyan-400 font-bold tracking-widest">{time}</span>
    </div>
  );

  // Helper to find last read surah name
  const lastReadName = surahs.find(s => s.number === lastRead)?.name;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 font-arabic" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800 pb-6">
          <div>
              <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Moon className="text-cyan-400 fill-cyan-400/20" /> 
                  مركز الروحانيات
              </h2>
              <div className="flex items-center gap-3">
                  <p className="text-gray-400 font-sans text-sm tracking-wide flex items-center gap-2">
                     <MapPin size={14} className="text-red-500" /> {selectedCity.name}, MOROCCO
                  </p>
                  <span className="text-gray-600 text-xs">|</span>
                  <p className="text-gray-500 text-xs font-mono">Habous.gov.ma Standard</p>
              </div>
          </div>

          {/* Navigation */}
          <div className="flex p-1 bg-slate-950/50 border border-gray-800 rounded-2xl backdrop-blur-md overflow-x-auto max-w-full">
              {[
                  { id: 'PRAYER', icon: Clock, label: 'المواقيت' },
                  { id: 'QURAN', icon: BookOpen, label: 'المصحف' },
                  { id: 'CALENDAR', icon: Calendar, label: 'التقويم' }
              ].map((tab) => (
                  <button
                      key={tab.id}
                      onClick={() => setActiveView(tab.id as any)}
                      className={`relative px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 z-10 whitespace-nowrap ${
                          activeView === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                      }`}
                  >
                      {activeView === tab.id && (
                          <motion.div
                              layoutId="activeTab"
                              className={`absolute inset-0 rounded-xl ${
                                  tab.id === 'PRAYER' ? 'bg-cyan-600/20 border border-cyan-500/50 shadow-[0_0_15px_rgba(8,145,178,0.3)]' :
                                  tab.id === 'QURAN' ? 'bg-green-600/20 border border-green-500/50 shadow-[0_0_15px_rgba(22,163,74,0.3)]' :
                                  'bg-purple-600/20 border border-purple-500/50 shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                              }`}
                          />
                      )}
                      <tab.icon size={18} className="relative z-10" />
                      <span className="relative z-10">{tab.label}</span>
                  </button>
              ))}
          </div>
      </div>

      {/* Content */}
      <AnimatePresence mode='wait'>
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[500px]"
          >
              {activeView === 'PRAYER' && (
                  <div className="max-w-4xl mx-auto">
                      <div className="flex justify-end mb-4">
                          <button 
                            onClick={() => setShowCitySelector(!showCitySelector)}
                            className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:bg-cyan-900/50 transition-colors"
                          >
                              <Settings size={14} /> تغيير المدينة
                          </button>
                      </div>

                      <AnimatePresence>
                      {showCitySelector && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-900 border border-gray-800 rounded-2xl p-4 mb-6 overflow-hidden"
                          >
                              <h4 className="text-gray-400 text-sm mb-3">اختر المدينة (Select Location):</h4>
                              <div className="flex flex-wrap gap-2">
                                  {CITIES.map(city => (
                                      <button
                                        key={city.name}
                                        onClick={() => { setSelectedCity(city); setShowCitySelector(false); }}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${
                                            selectedCity.name === city.name 
                                            ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/20' 
                                            : 'bg-slate-950 text-gray-400 border-gray-800 hover:border-gray-600'
                                        }`}
                                      >
                                          {city.name}
                                          {selectedCity.name === city.name && <Check size={14} />}
                                      </button>
                                  ))}
                              </div>
                          </motion.div>
                      )}
                      </AnimatePresence>

                      {loadingData ? (
                           <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-500" size={48} /></div>
                      ) : dataError || !timings ? (
                           <div className="text-center text-red-500 py-20">فشل في تحميل البيانات. تأكد من الاتصال بالإنترنت.</div>
                      ) : (
                          <div className="grid gap-4">
                              <PrayerCard name="الفجر" time={timings.Fajr} icon={prayerIcons.Fajr} />
                              <PrayerCard name="الشروق" time={timings.Sunrise} icon={<Sunrise size={24} className="text-gray-400"/>} />
                              <PrayerCard name="الظهر" time={timings.Dhuhr} icon={prayerIcons.Dhuhr} />
                              <PrayerCard name="العصر" time={timings.Asr} icon={prayerIcons.Asr} />
                              <PrayerCard name="المغرب" time={timings.Maghrib} icon={prayerIcons.Maghrib} />
                              <PrayerCard name="العشاء" time={timings.Isha} icon={prayerIcons.Isha} />
                          </div>
                      )}
                  </div>
              )}

              {activeView === 'CALENDAR' && (
                  <div className="flex justify-center items-center h-full pt-10">
                       {loadingData ? (
                           <Loader2 className="animate-spin text-purple-500" size={48} />
                       ) : !hijri ? (
                           <div className="text-red-500">لا توجد بيانات</div>
                       ) : (
                           <div className="relative w-full max-w-md aspect-square bg-slate-900 border border-purple-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)] p-10 text-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
                                <div className="z-10">
                                    <h3 className="text-purple-400 font-bold text-xl mb-2">{hijri.weekday.ar}</h3>
                                    <div className="text-8xl font-bold text-white mb-2 font-mono">{hijri.date.split('-')[0]}</div>
                                    <div className="text-3xl text-gray-200 font-bold mb-6">{hijri.month.ar} {hijri.year}</div>
                                    <div className="inline-block bg-slate-800 px-4 py-2 rounded-full border border-gray-700 text-gray-400 font-sans dir-ltr">
                                        {gregorian?.date}
                                    </div>
                                </div>
                           </div>
                       )}
                  </div>
              )}

              {activeView === 'QURAN' && (
                  <div className="space-y-6">
                      
                      {/* Last Read Banner */}
                      {lastRead > 0 && (
                          <motion.div 
                             initial={{ opacity: 0, y: -10 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="bg-gradient-to-r from-green-900/50 to-slate-900 border border-green-500/30 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(34,197,94,0.1)] relative overflow-hidden"
                          >
                              <div className="absolute left-0 top-0 h-full w-1 bg-green-500"></div>
                              <div className="flex items-center gap-4 z-10">
                                  <div className="p-3 bg-green-500/20 rounded-xl text-green-400 border border-green-500/30">
                                      <Bookmark size={24} fill="currentColor" />
                                  </div>
                                  <div>
                                      <p className="text-gray-400 text-xs uppercase tracking-wider font-sans mb-1">متابعة الختمة (Continue Reading)</p>
                                      <h3 className="text-xl font-bold text-white font-arabic">
                                          {lastReadName ? `سورة ${lastReadName}` : `سورة رقم ${lastRead}`}
                                      </h3>
                                  </div>
                              </div>
                              <a 
                                  href={`https://quran.com/${lastRead}`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-500/20 text-sm flex items-center gap-2 z-10"
                              >
                                  <span>أكمل القراءة</span> <ChevronRight size={16} className="rotate-180" />
                              </a>
                          </motion.div>
                      )}

                      <div className="relative max-w-xl mx-auto mb-8">
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                              <Search className="text-green-500" size={20} />
                          </div>
                          <input 
                              type="text" 
                              placeholder="بحث عن سورة (بالاسم أو الرقم)..." 
                              className="w-full bg-slate-900/80 border border-gray-700 text-white rounded-2xl py-4 pr-12 pl-4 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all placeholder:text-gray-600 text-lg"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>

                      {loadingQuran ? (
                          <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
                              <Loader2 size={48} className="animate-spin text-green-500"/>
                              <p className="font-sans">Jari Tahmil Al-Quran...</p>
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {filteredSurahs.map((surah) => {
                                  const isLastRead = lastRead === surah.number;
                                  return (
                                    <a 
                                        href={`https://quran.com/${surah.number}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        key={surah.number}
                                        onClick={() => setLastRead(surah.number)}
                                        className={`group relative backdrop-blur-sm border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4 overflow-hidden ${
                                            isLastRead 
                                            ? 'bg-green-900/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]' 
                                            : 'bg-slate-900/60 border-gray-800 hover:bg-slate-800 hover:border-green-500/50'
                                        }`}
                                    >
                                        <div className="absolute -right-4 -top-4 text-gray-800 opacity-20 group-hover:opacity-10 group-hover:scale-110 transition-all">
                                            <Star size={80} />
                                        </div>
                                        
                                        {isLastRead && (
                                            <div className="absolute top-3 left-3 text-green-500 z-20" title="Last Read">
                                                <Bookmark size={18} fill="currentColor" />
                                            </div>
                                        )}

                                        <div className={`relative z-10 w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center font-bold font-mono text-lg group-hover:scale-110 transition-transform border ${
                                            isLastRead 
                                            ? 'bg-green-950 text-green-400 border-green-500' 
                                            : 'bg-slate-950 text-green-400 border-gray-700 group-hover:border-green-500'
                                        }`}>
                                            {surah.number}
                                        </div>
                                        <div className="relative z-10 flex-1">
                                            <h3 className={`text-2xl font-bold mb-1 transition-colors ${isLastRead ? 'text-green-400' : 'text-white group-hover:text-green-400'}`}>{surah.name}</h3>
                                            <div className="flex items-center justify-between text-xs text-gray-500 font-sans tracking-wide">
                                                <span>{surah.englishName}</span>
                                                <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-400">{surah.numberOfAyahs} Āyahs</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={`transition-colors ${isLastRead ? 'text-green-500' : 'text-gray-700 group-hover:text-white'}`} size={20}/>
                                    </a>
                                  );
                              })}
                          </div>
                      )}
                  </div>
              )}
          </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IslamSection;