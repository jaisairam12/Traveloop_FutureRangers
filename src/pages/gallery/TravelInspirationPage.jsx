import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Heart, TrendingUp, Compass } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { destinations } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Badge from '../../components/ui/Badge';

const cats = ['All', 'Beach', 'Mountain', 'City', 'Culture', 'Adventure'];

export default function TravelInspirationPage() {
  const { dark } = useTheme();
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState([]);

  const filtered = destinations.filter(d => {
    if (cat !== 'All' && d.category !== cat) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80" alt="Hero" className="w-full h-full object-cover opacity-40 dark:opacity-20" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-light-bg dark:to-dark-bg" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge color="primary" className="mb-4 backdrop-blur-md bg-white/50 dark:bg-black/50 border border-primary/20 shadow-lg">
                <span className="flex items-center gap-2"><Compass size={14}/> Destination Gallery</span>
              </Badge>
              <h1 className="font-outfit text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">Discover the Extraordinary</h1>
              <p className={`mb-8 text-lg ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                Get inspired by world-class destinations and curated trips from the Traveloop community.
              </p>

              {/* Search */}
              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-xl backdrop-blur-xl ${dark ? 'bg-dark-card/80 border border-dark-border' : 'bg-white/80 border border-light-border'}`}>
                <Search size={20} className="text-primary" />
                <input type="text" placeholder="Where do you want to go next?" value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent outline-none w-full text-lg" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-3 justify-center mb-10 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`inline-flex items-center justify-center text-center leading-none min-h-10 min-w-[88px] px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer shadow-sm
                  ${cat === c 
                    ? 'bg-primary text-white scale-105 shadow-primary/25' 
                    : dark 
                      ? 'bg-dark-surface text-dark-muted hover:bg-dark-card border border-dark-border hover:border-primary/50' 
                      : 'bg-white text-light-muted border border-light-border hover:border-primary/50'}
                `}>{c}</button>
            ))}
          </div>

          {/* Grid - Masonry style with framer motion */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filtered.map((d, i) => {
                const isLiked = liked.includes(d.id);
                // Cycle through heights for masonry effect
                const heights = ['h-64', 'h-96', 'h-72', 'h-80', 'h-64', 'h-80'];
                return (
                  <motion.div 
                    key={d.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring" }} 
                    className="break-inside-avoid"
                  >
                    <div className={`relative ${heights[i % heights.length]} rounded-3xl overflow-hidden group shadow-lg`}>
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      
                      {/* Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {d.trending && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge color="amber" className="backdrop-blur-md bg-white/20 border-white/10 shadow-lg">🔥 Trending</Badge>
                        </div>
                      )}
                      
                      <button onClick={() => setLiked(prev => prev.includes(d.id) ? prev.filter(x => x !== d.id) : [...prev, d.id])}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all hover:scale-110">
                        <Heart size={18} className={`transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-500">
                        <Badge color="primary" className="mb-2 backdrop-blur-md bg-white/20 border-white/10">{d.category}</Badge>
                        <h3 className="text-white font-outfit font-bold text-2xl mb-1">{d.name}</h3>
                        
                        <div className="flex justify-between items-center text-white/90 text-sm font-medium">
                          <span className="flex items-center gap-1.5"><Star size={14} className="fill-accent text-accent" /> {d.rating}</span>
                          <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">from {d.price}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {filtered.length === 0 && (
             <div className="text-center py-20">
               <span className="text-6xl mb-4 block opacity-50">🧭</span>
               <h3 className="font-outfit text-2xl font-bold mb-2">No destinations found</h3>
               <p className={dark ? 'text-dark-muted' : 'text-light-muted'}>Try adjusting your search or filters</p>
             </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
