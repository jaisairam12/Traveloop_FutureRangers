import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { User, Map, Users, ArrowRight, Check, Globe, Sun, Moon } from 'lucide-react';
import Button from '../components/ui/Button';

const roles = [
  {
    id: 'user',
    icon: User,
    emoji: '🧳',
    title: 'Simple User',
    subtitle: 'I want to travel',
    desc: 'Take our AI travel quiz, share your preferences, and get matched with the perfect trip planner.',
    features: ['AI Travel Quiz', 'Personalized Matches', 'Trip Recommendations', 'Save & Compare Trips'],
    color: 'from-blue-500 to-cyan-500',
    bgGlow: 'bg-blue-500/20',
    to: '/signup?role=user',
  },
  {
    id: 'planner',
    icon: Map,
    emoji: '📋',
    title: 'Trip Planner',
    subtitle: 'I plan trips for others',
    desc: 'Accept trip requests, build stunning itineraries, and grow your planning business on Traveloop.',
    features: ['Trip Request Feed', 'Itinerary Builder', 'Budget Analytics', 'Client Management'],
    color: 'from-primary to-emerald-500',
    bgGlow: 'bg-primary/20',
    to: '/signup?role=planner',
  },
  {
    id: 'joiner',
    icon: Users,
    emoji: '🤝',
    title: 'Trip Joiner',
    subtitle: 'I join group trips',
    desc: 'Browse open trips, join travel groups, and collaborate on shared itineraries with fellow travelers.',
    features: ['Browse Open Trips', 'Join Travel Groups', 'Shared Itineraries', 'Group Chat'],
    color: 'from-purple-500 to-pink-500',
    bgGlow: 'bg-purple-500/20',
    to: '/signup?role=joiner',
  },
];

export default function RoleSelectionPage() {
  const { dark, toggle } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden ${dark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      {/* Background mesh */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className={`absolute top-6 right-6 p-3 rounded-xl transition-all cursor-pointer ${dark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Globe className="text-white" size={22} />
          </div>
          <span className="font-outfit font-bold text-2xl">Traveloop</span>
        </Link>
        <h1 className="font-outfit text-3xl sm:text-4xl font-bold mb-3">How will you use Traveloop?</h1>
        <p className={`text-lg ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
          Choose your role to get started. You can always change this later.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full relative z-10">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <Link to={role.to}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 h-full
                  ${dark ? 'bg-dark-card border border-dark-border hover:border-primary/50' : 'bg-white border border-light-border hover:border-primary/50 shadow-sm hover:shadow-xl'}
                `}
              >
                {/* Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${role.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <role.icon size={28} />
                </div>

                <span className="text-3xl mb-2 block">{role.emoji}</span>
                <h3 className="font-outfit font-bold text-xl mb-1">{role.title}</h3>
                <p className={`text-sm mb-4 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{role.subtitle}</p>
                <p className={`text-sm mb-6 leading-relaxed ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{role.desc}</p>

                <ul className="space-y-2 mb-6">
                  {role.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center gap-2 text-sm font-semibold text-primary`}>
                  Get Started <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-8 text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}
      >
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
      </motion.p>
    </div>
  );
}
