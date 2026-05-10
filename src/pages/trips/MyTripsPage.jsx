import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Users, PlusCircle, Search, MoreVertical, Pencil, Trash2, Eye, Share2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { myTrips } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const tabs = ['All', 'Active', 'Planning', 'Completed', 'Draft'];
const statusColors = { active: 'green', planning: 'blue', completed: 'gray', draft: 'amber' };

export default function MyTripsPage() {
  const { dark } = useTheme();
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = myTrips.filter(t => {
    if (tab !== 'All' && t.status.toLowerCase() !== tab.toLowerCase()) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="font-outfit text-3xl font-bold">My Trips</h1>
              <p className={`mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{myTrips.length} trips total</p>
            </div>
            <Link to="/create-trip">
              <Button icon={<PlusCircle size={18} />}>New Trip</Button>
            </Link>
          </div>

          {/* Search & Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl ${dark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-light-border'}`}>
              <Search size={18} className="opacity-40" />
              <input
                type="text" placeholder="Search trips..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer
                    ${tab === t ? 'bg-primary text-white' : dark ? 'text-dark-muted hover:bg-white/5' : 'text-light-muted hover:bg-black/5'}
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card padding={false} className="group flex flex-col h-full overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <img src={trip.cover} alt={trip.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <Badge color={statusColors[trip.status]} className="absolute top-3 left-3 shadow-sm" dot>{trip.status}</Badge>
                    <div className="absolute top-3 right-3 flex gap-1">
                      <button className="w-8 h-8 rounded-full glass flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors"><Share2 size={14} /></button>
                      <button className="w-8 h-8 rounded-full glass flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors"><MoreVertical size={14} /></button>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-outfit font-bold text-lg truncate">{trip.name}</h3>
                      <p className="text-white/80 text-sm flex items-center gap-1 mt-0.5">
                        <MapPin size={12} /> {trip.destination}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className={`flex items-center gap-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}><Calendar size={14} /> {trip.days} days</span>
                      <span className={`flex items-center gap-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}><DollarSign size={14} /> {trip.budget}</span>
                      <span className={`flex items-center gap-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}><Users size={14} /> {trip.travelers}</span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Link to="/itinerary-timeline" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full h-full"><Eye size={14} /> View</Button>
                      </Link>
                      <Link to="/itinerary-builder" className="flex-1">
                        <Button size="sm" className="w-full h-full"><Pencil size={14} /> Edit</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🗺️</span>
              <h3 className="font-outfit text-xl font-bold mb-2">No trips found</h3>
              <p className={`mb-6 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Start planning your first trip!</p>
              <Link to="/create-trip"><Button>Create Trip</Button></Link>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
