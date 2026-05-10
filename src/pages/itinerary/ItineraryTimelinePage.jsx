import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Calendar, ArrowLeft, Pencil, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { itineraryDays } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import TripMap from '../../components/map/TripMap';

const activityColors = {
  transport: 'border-blue-500 bg-blue-500',
  accommodation: 'border-purple-500 bg-purple-500',
  sightseeing: 'border-emerald-500 bg-emerald-500',
  food: 'border-amber-500 bg-amber-500',
  entertainment: 'border-pink-500 bg-pink-500',
  shopping: 'border-indigo-500 bg-indigo-500',
  culture: 'border-red-500 bg-red-500',
};

export default function ItineraryTimelinePage() {
  const { dark } = useTheme();
  const [expandedDays, setExpandedDays] = useState([0]); // First day expanded by default
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const toggleDay = (idx) => {
    setExpandedDays(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
    setActiveDayIndex(idx);
  };

  const activeDayData = itineraryDays[activeDayIndex];

  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col h-auto lg:h-[calc(100vh-64px)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shrink-0">
            <div>
              <button onClick={() => window.history.back()} className={`flex items-center gap-1 text-sm mb-3 cursor-pointer ${dark ? 'text-dark-muted' : 'text-light-muted'} hover:text-primary`}>
                <ArrowLeft size={16} /> Back
              </button>
              <h1 className="font-outfit text-3xl font-bold">Japanese Culture Explorer</h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <Badge color="green" dot>Active</Badge>
                <span className={`text-sm flex items-center gap-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}><MapPin size={14} /> Tokyo & Kyoto</span>
                <span className={`text-sm flex items-center gap-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}><Calendar size={14} /> Mar 15-25, 2026</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={<Share2 size={14} />}>Share</Button>
              <Link to="/itinerary-builder">
                <Button size="sm" icon={<Pencil size={14} />}>Edit</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
            {/* Timeline Column */}
            <div className="relative overflow-y-auto pr-4 custom-scrollbar pb-12">
              {/* Vertical line */}
              <div className={`absolute left-6 top-6 bottom-0 w-0.5 ${dark ? 'bg-dark-border' : 'bg-light-border'}`} />

              <div className="space-y-6 relative">
                {itineraryDays.map((day, dayIdx) => {
                  const isExpanded = expandedDays.includes(dayIdx);
                  const isActive = activeDayIndex === dayIdx;
                  
                  return (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: dayIdx * 0.1 }}
                      className="relative"
                    >
                      {/* Day Header */}
                      <div 
                        className={`flex items-center gap-4 mb-4 cursor-pointer p-2 rounded-2xl transition-colors ${isActive ? (dark ? 'bg-white/5' : 'bg-black/5') : 'hover:bg-primary/5'}`}
                        onClick={() => toggleDay(dayIdx)}
                      >
                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-white z-10 shrink-0 transition-all duration-300 ${isActive ? 'gradient-primary shadow-lg shadow-primary/20 scale-110' : 'bg-gray-400 dark:bg-gray-700'}`}>
                          <span className="text-[10px] font-medium opacity-80">DAY</span>
                          <span className="font-outfit font-bold text-lg leading-none">{day.day}</span>
                        </div>
                        <div className="flex-1">
                          <h2 className="font-outfit font-bold text-xl">{day.city}</h2>
                          <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{day.date}</p>
                        </div>
                        <div className={`p-2 rounded-full ${dark ? 'bg-dark-surface' : 'bg-light-surface'}`}>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>

                      {/* Activities */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-14 space-y-3 overflow-hidden"
                          >
                            <div className="pt-2 pb-4">
                              {day.activities.map((act, actIdx) => (
                                <motion.div
                                  key={act.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.05 * actIdx }}
                                  className="mb-3 last:mb-0"
                                >
                                  <Card className={`relative flex gap-4 items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${dark ? 'hover:shadow-black/50' : 'hover:shadow-primary/10'}`}>
                                    {/* Timeline dot */}
                                    <div className={`absolute -left-[2.85rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${activityColors[act.type]?.split(' ')[0] || 'border-primary'} ${dark ? 'bg-dark-bg' : 'bg-light-bg'} z-10`} />

                                    <span className="text-2xl shrink-0">{act.icon}</span>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <div>
                                          <h4 className="font-semibold text-sm">{act.title}</h4>
                                          <div className={`flex items-center gap-3 text-xs mt-1 flex-wrap ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                                            <span className="flex items-center gap-1"><Clock size={10} /> {act.time}</span>
                                            <span>{act.duration}</span>
                                            <span className="flex items-center gap-1"><DollarSign size={10} /> {act.cost}</span>
                                          </div>
                                        </div>
                                        <Badge color={
                                          act.type === 'food' ? 'amber' :
                                          act.type === 'transport' ? 'blue' :
                                          act.type === 'accommodation' ? 'purple' : 'green'
                                        }>
                                          {act.type}
                                        </Badge>
                                      </div>
                                    </div>
                                  </Card>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Map Column (Sticky on Desktop) */}
            <div className="h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-xl border border-primary/10 sticky top-4">
               <TripMap activeDay={activeDayData?.day} activities={activeDayData?.activities || []} />
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
