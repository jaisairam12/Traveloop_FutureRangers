import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, DollarSign, Clock, Check, X, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const mockSuggestions = [
  {
    id: 's1',
    type: 'activity',
    title: 'Tea Ceremony Experience',
    location: 'Kyoto',
    duration: '2 hours',
    cost: '$45',
    reason: 'Matches your interest in traditional culture. Perfect for Day 3 afternoon.',
  },
  {
    id: 's2',
    type: 'budget',
    title: 'JR Pass Optimization',
    reason: 'Based on your route (Tokyo -> Kyoto -> Osaka), getting a 7-day JR Pass will save you approximately $120.',
  },
  {
    id: 's3',
    type: 'activity',
    title: 'Tsukiji Outer Market',
    location: 'Tokyo',
    duration: '3 hours',
    cost: '$30',
    reason: 'Highly rated food tour. Adds great culinary variety to your Tokyo days.',
  }
];

export default function AISuggestionPanel() {
  const { dark } = useTheme();
  const [suggestions, setSuggestions] = useState(mockSuggestions);

  const dismiss = (id) => setSuggestions(suggestions.filter(s => s.id !== id));
  
  const accept = (id) => {
    // Logic to add to itinerary would go here
    dismiss(id);
  };

  return (
    <Card className="flex flex-col h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Sparkles className="text-white" size={16} />
        </div>
        <h3 className="font-outfit font-bold text-lg">AI Travel Assistant</h3>
      </div>

      <p className={`text-sm mb-4 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
        I've analyzed your itinerary. Here are some smart recommendations to enhance your trip:
      </p>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        <AnimatePresence>
          {suggestions.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <Sparkles className={`mx-auto mb-2 opacity-30 ${dark ? 'text-dark-muted' : 'text-light-muted'}`} size={32} />
              <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Your itinerary looks perfectly optimized!</p>
            </motion.div>
          )}
          {suggestions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${dark ? 'bg-dark-surface border-primary/20' : 'bg-white border-primary/30'} shadow-sm relative group`}
            >
              <Badge color={s.type === 'budget' ? 'green' : 'amber'} className="mb-2">
                {s.type === 'budget' ? '💰 Budget Tip' : '✨ Activity Idea'}
              </Badge>
              
              <h4 className="font-semibold text-sm mb-1">{s.title}</h4>
              
              {s.type === 'activity' && (
                <div className={`flex flex-wrap gap-x-3 gap-y-1 text-xs mb-2 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                  <span className="flex items-center gap-1"><MapPin size={10} /> {s.location}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {s.duration}</span>
                  <span className="flex items-center gap-1"><DollarSign size={10} /> {s.cost}</span>
                </div>
              )}
              
              <p className={`text-xs leading-relaxed mb-3 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                {s.reason}
              </p>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 py-1.5 text-xs h-auto" onClick={() => accept(s.id)} icon={<Check size={12} />}>
                  {s.type === 'activity' ? 'Add to Itinerary' : 'Apply Suggestion'}
                </Button>
                <button 
                  onClick={() => dismiss(s.id)}
                  className={`px-2 rounded-lg transition-colors cursor-pointer ${dark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                >
                  <X size={14} className="opacity-50" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
