import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Clock, MapPin, DollarSign, Plus, Check, Filter, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { activities } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const categories = ['All', 'Water Sports', 'Culture', 'Food', 'Adventure', 'Nature'];

export default function ActivitySearchPage() {
  const { dark } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [added, setAdded] = useState([]);

  const toggleAdd = (id) => {
    setAdded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = activities.filter(a => {
    if (category !== 'All' && a.category !== category) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-outfit text-3xl font-bold mb-2">Search Activities</h1>
          <p className={`mb-6 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Find and add activities to your itinerary</p>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-light-border'}`}>
              <Search size={18} className="opacity-40" />
              <input type="text" placeholder="Search activities..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent outline-none w-full" />
              {search && <button onClick={() => setSearch('')} className="cursor-pointer opacity-40 hover:opacity-100"><X size={16} /></button>}
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map(c => (
              <button
                key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer
                  ${category === c ? 'bg-primary text-white' : dark ? 'bg-dark-surface text-dark-muted hover:bg-dark-card' : 'bg-white text-light-muted hover:bg-gray-100 border border-light-border'}
                `}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((act, i) => {
              const isAdded = added.includes(act.id);
              return (
                <motion.div key={act.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card padding={false} className="group overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img src={act.image} alt={act.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge color="amber" className="absolute top-3 left-3">{act.category}</Badge>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-sm">{act.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className={`flex items-center gap-3 text-xs mb-3 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                        <span className="flex items-center gap-1"><MapPin size={10} /> {act.location}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {act.duration}</span>
                        <span className="flex items-center gap-1"><Star size={10} className="text-accent fill-accent" /> {act.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-outfit font-bold text-primary">{act.price}</span>
                        <Button
                          size="sm"
                          variant={isAdded ? 'ghost' : 'primary'}
                          onClick={() => toggleAdd(act.id)}
                          icon={isAdded ? <Check size={14} /> : <Plus size={14} />}
                        >
                          {isAdded ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🔍</span>
              <h3 className="font-outfit text-xl font-bold mb-2">No activities found</h3>
              <p className={dark ? 'text-dark-muted' : 'text-light-muted'}>Try a different search or category</p>
            </div>
          )}

          {added.length > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl px-6 py-3 flex items-center gap-4"
            >
              <span className="text-sm font-medium">{added.length} activities selected</span>
              <Button size="sm">Add to Itinerary</Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
