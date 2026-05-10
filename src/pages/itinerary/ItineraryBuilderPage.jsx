import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical, Trash2, MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useTheme } from '../../context/ThemeContext';
import { itineraryDays } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import TripMap from '../../components/map/TripMap';
import AISuggestionPanel from '../../components/ai/AISuggestionPanel';
import WeatherWidget from '../../components/weather/WeatherWidget';

const activityColors = {
  transport: 'from-blue-500 to-cyan-500',
  accommodation: 'from-purple-500 to-violet-500',
  sightseeing: 'from-primary to-emerald-500',
  food: 'from-amber-500 to-orange-500',
  entertainment: 'from-pink-500 to-rose-500',
  shopping: 'from-indigo-500 to-blue-500',
  culture: 'from-red-500 to-pink-500',
};

// Sortable Activity Item Component
function SortableActivity({ act, dark, removeActivity }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: act.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${dark ? 'bg-dark-surface hover:bg-dark-surface/80' : 'bg-light-surface hover:bg-light-surface/80'} ${isDragging ? 'shadow-xl ring-2 ring-primary/50' : ''}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab opacity-30 hover:opacity-60 active:cursor-grabbing p-1">
        <GripVertical size={16} />
      </div>
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activityColors[act.type] || activityColors.sightseeing} flex items-center justify-center text-lg shrink-0`}>
        {act.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{act.title}</p>
        <div className={`flex items-center gap-3 text-xs mt-0.5 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
          <span className="flex items-center gap-1"><Clock size={10} /> {act.time}</span>
          <span>{act.duration}</span>
          <span className="flex items-center gap-1"><DollarSign size={10} /> {act.cost}</span>
        </div>
      </div>
      <Badge color={
        act.type === 'food' ? 'amber' :
        act.type === 'transport' ? 'blue' :
        act.type === 'accommodation' ? 'purple' :
        act.type === 'entertainment' ? 'red' : 'green'
      }>
        {act.type}
      </Badge>
      <button
        onClick={() => removeActivity(act.id)}
        className="p-1.5 rounded-lg hover:bg-danger/10 text-danger/50 hover:text-danger transition-colors cursor-pointer"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}


export default function ItineraryBuilderPage() {
  const { dark } = useTheme();
  const [days, setDays] = useState(itineraryDays);
  const [expandedDay, setExpandedDay] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const toggleDay = (i) => setExpandedDay(expandedDay === i ? -1 : i);

  const removeActivity = (dayIdx, actId) => {
    const updated = [...days];
    updated[dayIdx] = { 
      ...updated[dayIdx], 
      activities: updated[dayIdx].activities.filter(a => a.id !== actId) 
    };
    setDays(updated);
  };

  const handleDragEnd = (event, dayIdx) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const updated = [...days];
      const items = updated[dayIdx].activities;
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
      
      updated[dayIdx] = {
        ...updated[dayIdx],
        activities: arrayMove(items, oldIndex, newIndex),
      };
      setDays(updated);
    }
  };

  const activeDayData = days[expandedDay === -1 ? 0 : expandedDay];

  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 h-auto lg:h-[calc(100vh-64px)] flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
            <div>
              <h1 className="font-outfit text-3xl font-bold">Itinerary Builder</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge color="amber">Japanese Culture Explorer</Badge>
                <span className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>10 Days · 2 Cities</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Preview</Button>
              <Button size="sm">Save Changes</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
            {/* Left Column - Builder (Scrollable) */}
            <div className="lg:col-span-7 h-full overflow-y-auto pr-2 custom-scrollbar pb-12">
              <div className="space-y-4">
                {days.map((day, dayIdx) => (
                  <Card key={day.day} padding={false} className="overflow-hidden">
                    {/* Day Header */}
                    <button
                      onClick={() => toggleDay(dayIdx)}
                      className={`w-full flex items-center justify-between p-4 cursor-pointer transition-colors ${dark ? 'hover:bg-white/5' : 'hover:bg-black/5'} ${expandedDay === dayIdx ? (dark ? 'bg-white/5' : 'bg-black/5') : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${expandedDay === dayIdx ? 'gradient-primary' : dark ? 'bg-dark-surface' : 'bg-light-surface'} flex flex-col items-center justify-center ${expandedDay === dayIdx ? 'text-white shadow-lg shadow-primary/20' : ''} shrink-0 transition-all`}>
                          <span className="font-outfit font-bold text-lg leading-none">{day.day}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-outfit font-bold text-base">{day.city}</h3>
                          <p className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{day.date} · {day.activities.length} activities</p>
                        </div>
                      </div>
                      {expandedDay === dayIdx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {/* Activities - Drag and Drop */}
                    <AnimatePresence>
                      {expandedDay === dayIdx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-primary/10"
                        >
                          <div className={`p-4 ${dark ? 'bg-dark-card/50' : 'bg-light-card/50'}`}>
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, dayIdx)}>
                              <SortableContext items={day.activities} strategy={verticalListSortingStrategy}>
                                <div className="space-y-2">
                                  {day.activities.map((act) => (
                                    <SortableActivity key={act.id} act={act} dark={dark} removeActivity={(id) => removeActivity(dayIdx, id)} />
                                  ))}
                                </div>
                              </SortableContext>
                            </DndContext>

                            <button className={`mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed transition-all cursor-pointer
                              ${dark ? 'border-dark-border text-dark-muted hover:border-primary hover:text-primary hover:bg-primary/5' : 'border-light-border text-light-muted hover:border-primary hover:text-primary hover:bg-primary/5'}
                            `}>
                              <Plus size={16} /> Add Activity
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
                
                <button className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed transition-all cursor-pointer
                  ${dark ? 'border-dark-border text-dark-muted hover:border-primary hover:text-primary' : 'border-light-border text-light-muted hover:border-primary hover:text-primary'}
                `}>
                  <Plus size={18} /> Add New Day
                </button>
              </div>
            </div>

            {/* Right Column - Map & AI Suggestions (Sticky) */}
            <div className="lg:col-span-5 flex flex-col gap-6 h-full min-h-[600px] lg:min-h-0">
              {/* Map Pane */}
              <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-primary/10">
                <TripMap activeDay={activeDayData?.day} activities={activeDayData?.activities || []} />
              </div>
              
              {/* Weather & AI Split */}
              <div className="h-64 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:h-2/5 shrink-0">
                <div className="hidden lg:block h-full">
                  <WeatherWidget city={activeDayData?.city || 'Tokyo'} />
                </div>
                <div className="h-full">
                  <AISuggestionPanel />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
