import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Map, Users, Share2, Compass, MapPin, Calendar, Check, X, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { myTrips } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import CollaborativeSidebar from '../../components/collaboration/CollaborativeSidebar';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

const invitations = [
  { id: 1, tripName: 'Bali Beach Getaway', from: 'Sarah M.', avatar: '👩‍🦰', date: '2 hours ago' },
  { id: 2, tripName: 'Tokyo Food Tour', from: 'Kenji T.', avatar: '👨‍🍳', date: '1 day ago' },
];

export default function JoinerDashboard() {
  const { dark } = useTheme();

  return (
    <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
      {/* Main Content */}
      <div className="flex-1 space-y-10">
        {/* Welcome */}
        <motion.div {...fadeUp}>
          <h1 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight">Trip Joiner Dashboard 🤝</h1>
          <p className={`mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>2 new invitations and 2 active trips</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="uniform-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Map size={20} />, label: 'Joined Trips', value: '5', color: 'from-primary to-emerald-500' },
            { icon: <Users size={20} />, label: 'Invitations', value: '2', color: 'from-amber-500 to-orange-500' },
            { icon: <Share2 size={20} />, label: 'Shared Plans', value: '8', color: 'from-purple-500 to-violet-500' },
            { icon: <Compass size={20} />, label: 'Upcoming', value: '2', color: 'from-blue-500 to-cyan-500' },
          ].map((s, i) => (
            <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1 }}>
              <Card className="min-h-[146px]">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-3`}>
                  {s.icon}
                </div>
                <p className="font-outfit text-2xl font-bold">{s.value}</p>
                <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Invitations */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <h2 className="font-outfit text-2xl font-bold mb-5 flex items-center gap-2">
            Pending Invitations <Badge color="amber">2 new</Badge>
          </h2>
          <div className="space-y-4">
            {invitations.map((inv, i) => (
              <motion.div key={inv.id} {...fadeUp} transition={{ delay: 0.25 + i * 0.05 }}>
                <Card className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{inv.avatar}</span>
                    <div>
                      <p className="font-semibold text-sm">{inv.tripName}</p>
                      <p className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                        Invited by {inv.from} · {inv.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button size="sm" className="flex-1 sm:flex-none" icon={<Check size={14} />}>Accept</Button>
                    <Button variant="ghost" size="sm" className="flex-1 sm:flex-none" icon={<X size={14} />}>Decline</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Joined Trips */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-outfit text-2xl font-bold">Your Joined Trips</h2>
            <Link to="/my-trips" className="text-primary text-sm font-medium flex items-center gap-1">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="uniform-grid grid-cols-1 sm:grid-cols-2">
            {myTrips.slice(0, 4).map(trip => (
              <Link key={trip.id} to="/itinerary-timeline">
                <Card className="flex gap-4 items-center min-h-[124px] hover:border-primary/30 transition-colors">
                  <img src={trip.cover} alt={trip.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">{trip.name}</h3>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                      <MapPin size={12} /> {trip.destination}
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                      <Calendar size={12} /> {trip.dates}
                    </p>
                    <Badge color={trip.status === 'active' ? 'green' : 'blue'} className="mt-2" dot>{trip.status}</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Collaborative Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.4 }}
        className="xl:w-80 shrink-0"
      >
        <CollaborativeSidebar />
      </motion.div>
    </div>
  );
}
