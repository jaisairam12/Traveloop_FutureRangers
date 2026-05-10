import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Inbox, PlusCircle, Map, BarChart3, MapPin, DollarSign, Clock, Users, Zap, ArrowRight, TrendingUp, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { tripRequests, myTrips } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

export default function PlannerDashboard() {
  const { dark } = useTheme();

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <motion.div {...fadeUp}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight">Planner Dashboard 📋</h1>
            <p className={`mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>You have 5 new trip requests waiting</p>
          </div>
          <Link to="/create-trip">
            <Button icon={<PlusCircle size={18} />}>Create Trip</Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="uniform-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Requests', value: '12', icon: <Inbox size={20} />, color: 'from-blue-500 to-cyan-500', change: '+3' },
          { label: 'Trips Created', value: '28', icon: <Map size={20} />, color: 'from-primary to-emerald-500', change: '+5' },
          { label: 'Total Travelers', value: '156', icon: <Users size={20} />, color: 'from-purple-500 to-violet-500', change: '+12' },
          { label: 'Revenue', value: '$4.2K', icon: <TrendingUp size={20} />, color: 'from-accent to-orange-500', change: '+18%' },
        ].map((s, i) => (
          <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1 }}>
            <Card className="min-h-[146px]">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white`}>
                  {s.icon}
                </div>
                <Badge color="green">{s.change}</Badge>
              </div>
              <p className="font-outfit text-2xl font-bold">{s.value}</p>
              <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trip Requests Feed */}
      <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-outfit text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Trip Requests
          </h2>
          <span className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>5 open requests</span>
        </div>
        <div className="space-y-4">
          {tripRequests.map((req, i) => (
            <motion.div key={req.id} {...fadeUp} transition={{ delay: 0.25 + i * 0.05 }}>
              <Card className="flex flex-col xl:flex-row items-start xl:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl">{req.avatar}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{req.user}</span>
                      <Badge color={req.status === 'open' ? 'green' : 'blue'} dot>{req.status}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-primary shrink-0" />
                      <span className="text-sm truncate">{req.destination}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1"><DollarSign size={12} className="text-accent" />{req.budget}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-blue-500" />{req.duration}</span>
                  <span className="flex items-center gap-1"><Zap size={12} className="text-purple-500" />{req.style}</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><Eye size={14} /> View</Button>
                  <Button size="sm" className="flex-1 sm:flex-none">Accept</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* My Trips */}
      <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-outfit text-2xl font-bold">My Created Trips</h2>
          <Link to="/my-trips" className="text-primary text-sm font-medium flex items-center gap-1">See all <ArrowRight size={14} /></Link>
        </div>
        <div className="uniform-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {myTrips.slice(0, 3).map(trip => (
            <Card key={trip.id} padding={false} className="group flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                <img src={trip.cover} alt={trip.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge color={trip.status === 'active' ? 'green' : trip.status === 'completed' ? 'blue' : 'gray'} className="absolute top-3 left-3 shadow-sm">{trip.status}</Badge>
              </div>
              <div className="p-[var(--space-card)] flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-sm truncate">{trip.name}</h3>
                <p className={`text-xs mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{trip.destination} · {trip.days} days · {trip.travelers} travelers</p>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
