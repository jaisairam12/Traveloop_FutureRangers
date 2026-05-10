import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, Heart, MapPin, Star, ArrowRight, PlusCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { destinations, myTrips } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

export default function UserDashboard() {
  const { dark } = useTheme();

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <motion.div {...fadeUp}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight">Welcome back, Traveler! 👋</h1>
            <p className={`mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Ready for your next adventure?</p>
          </div>
          <Link to="/quiz">
            <Button icon={<Sparkles size={18} />}>Raise Trip Request</Button>
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="uniform-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <PlusCircle size={22} />, label: 'New Request', to: '/quiz', color: 'from-primary to-emerald-500' },
          { icon: <Compass size={22} />, label: 'Explore', to: '/explore', color: 'from-blue-500 to-cyan-500' },
          { icon: <Heart size={22} />, label: 'Saved', to: '#', color: 'from-pink-500 to-rose-500' },
          { icon: <TrendingUp size={22} />, label: 'Trending', to: '/gallery', color: 'from-purple-500 to-violet-500' },
        ].map((a, i) => (
          <motion.div key={a.label} {...fadeUp} transition={{ delay: i * 0.1 }}>
            <Link to={a.to}>
              <Card className="flex items-center gap-3 min-h-[92px]">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white shrink-0`}>
                  {a.icon}
                </div>
                <span className="font-semibold text-sm">{a.label}</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recommended Trips */}
      <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-outfit text-2xl font-bold">Recommended for You</h2>
          <Link to="/explore" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="uniform-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 3).map((d, i) => (
            <Card key={d.id} padding={false} className="group flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {d.trending && <Badge color="amber" className="absolute top-3 left-3 shadow-sm">🔥 Trending</Badge>}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <Heart size={14} className="text-white" />
                </button>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold">{d.name}</h3>
                  <div className="flex items-center justify-between text-white/80 text-xs mt-1">
                    <span className="flex items-center gap-1"><Star size={12} className="fill-accent text-accent" /> {d.rating}</span>
                    <span>from {d.price}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* My Trips */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-outfit text-2xl font-bold">My Trips</h2>
          <Link to="/my-trips" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="uniform-grid grid-cols-1 sm:grid-cols-2">
          {myTrips.slice(0, 2).map(trip => (
            <Card key={trip.id} className="flex gap-4 items-center min-h-[124px]">
              <img src={trip.cover} alt={trip.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{trip.name}</h3>
                <p className={`text-sm flex items-center gap-1 mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                  <MapPin size={12} /> {trip.destination}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge color={trip.status === 'active' ? 'green' : trip.status === 'completed' ? 'blue' : 'gray'} dot>
                    {trip.status}
                  </Badge>
                  <span className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{trip.dates}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
