import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, Users, Star, Clock, DollarSign, Search, ChevronRight, Globe, Compass, Zap, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { destinations, tripRequests, testimonials } from '../data/mockData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import MainLayout from '../layouts/MainLayout';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

function HeroSection() {
  const { dark } = useTheme();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${dark ? 'bg-dark-bg/80' : 'bg-gradient-to-r from-black/60 via-black/40 to-transparent'}`} />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-32 right-[10%] hidden lg:block"
      >
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🗺️</span>
          <div>
            <p className="text-white text-sm font-semibold">2,500+ Trips</p>
            <p className="text-white/60 text-xs">Planned this month</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-40 left-[10%] hidden lg:block"
      >
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="text-white text-sm font-semibold">4.9 Rating</p>
            <p className="text-white/60 text-xs">From 10K+ travelers</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 site-container py-24 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="text-accent" size={16} />
            <span className="text-white/90 text-sm font-medium">AI-Powered Travel Planning</span>
          </motion.div>

          <h1 className="font-outfit text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
            Plan Your Next <br/>
            <span className="font-playfair italic text-gradient">Adventure</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
            Take our AI quiz, get matched with expert planners, and build your dream trip — collaboratively.
          </p>

          {/* Search Bar */}
          <div className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2 mb-10 w-full max-w-xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="text-white/50" size={20} />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm"
              />
            </div>
            <Link to="/quiz" className="w-full sm:w-auto">
              <Button size="md" className="w-full whitespace-nowrap">
                <Sparkles size={16} /> Start Planning
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-2">
            {[
              { value: '50K+', label: 'Happy Travelers' },
              { value: '120+', label: 'Destinations' },
              { value: '4.9', label: 'User Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <p className="text-2xl font-outfit font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DestinationGrid() {
  const { dark } = useTheme();
  const featured = destinations.slice(0, 6);

  return (
    <section className="section-shell">
      <div className="site-container">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge color="green" className="mb-4">🌍 Popular Destinations</Badge>
          <h2 className="section-title font-bold mb-4">
            Explore Trending Destinations
          </h2>
          <p className={`section-subtitle ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
            Discover the world's most breathtaking places, handpicked by our community
          </p>
        </motion.div>

        <div className="uniform-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dest, i) => (
            <motion.div
              key={dest.id}
              {...stagger}
              transition={{ delay: i * 0.1 }}
            >
              <Card padding={false} className="group overflow-hidden h-full">
                <div className="relative aspect-[4/3] overflow-hidden h-full">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {dest.trending && (
                    <div className="absolute top-4 left-4">
                      <Badge color="amber">🔥 Trending</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-outfit font-bold text-xl mb-1">{dest.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <Star size={14} className="text-accent fill-accent" />
                        <span>{dest.rating}</span>
                      </div>
                      <span className="text-white font-semibold">from {dest.price}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center mt-10">
          <Link to="/gallery">
            <Button variant="outline" iconRight={<ArrowRight size={18} />}>
              View All Destinations
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { dark } = useTheme();
  const steps = [
    { icon: <Sparkles size={28} />, title: 'Take the AI Quiz', desc: 'Answer fun questions about your travel style, budget, and dream destinations.', color: 'from-violet-500 to-purple-600' },
    { icon: <Users size={28} />, title: 'Get Matched', desc: 'Our AI matches you with expert trip planners who fit your style perfectly.', color: 'from-primary to-emerald-500' },
    { icon: <Compass size={28} />, title: 'Plan Together', desc: 'Collaborate on your itinerary in real-time with drag & drop tools.', color: 'from-accent to-orange-500' },
    { icon: <Globe size={28} />, title: 'Travel & Share', desc: 'Experience your dream trip and share your journey with the community.', color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <section className={`section-shell section-soft ${dark ? 'bg-dark-card/50' : 'bg-white/50'}`}>
      <div className="site-container">
        <motion.div {...fadeUp} className="text-center mb-16">
          <Badge color="blue" className="mb-4">✨ How It Works</Badge>
          <h2 className="section-title font-bold mb-4">
            Your Dream Trip in 4 Simple Steps
          </h2>
        </motion.div>

        <div className="uniform-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              {...stagger}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-5 shadow-lg`}>
                {step.icon}
              </div>
              <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                Step {i + 1}
              </div>
              <h3 className="font-outfit font-bold text-lg mb-2">{step.title}</h3>
              <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TripRequestFeed() {
  const { dark } = useTheme();

  return (
    <section className="section-shell">
      <div className="site-container">
        <motion.div {...fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <Badge color="purple" className="mb-4">🔴 Live Feed</Badge>
            <h2 className="section-title font-bold">
              Latest Trip Requests
            </h2>
          </div>
          <Link to="/dashboard/planner">
            <Button variant="outline" size="sm">View All Requests <ChevronRight size={16} /></Button>
          </Link>
        </motion.div>

        <div className="uniform-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tripRequests.slice(0, 3).map((req, i) => (
            <motion.div key={req.id} {...stagger} transition={{ delay: i * 0.1 }}>
              <Card className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{req.avatar}</span>
                    <div>
                      <p className="font-semibold text-sm">{req.user}</p>
                      <p className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{req.date}</p>
                    </div>
                  </div>
                  <Badge color={req.status === 'open' ? 'green' : 'blue'} dot>{req.status}</Badge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-primary" />
                    <span className="font-medium">{req.destination}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1"><DollarSign size={12} className="text-accent" />{req.budget}</span>
                    <span className="flex items-center gap-1"><Clock size={12} className="text-blue-500" />{req.duration}</span>
                    <span className="flex items-center gap-1"><Zap size={12} className="text-purple-500" />{req.style}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-auto">View Request</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { dark } = useTheme();

  return (
    <section className={`section-shell section-soft ${dark ? 'bg-dark-card/50' : 'bg-white/50'}`}>
      <div className="site-container">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge color="amber" className="mb-4">💬 Testimonials</Badge>
          <h2 className="section-title font-bold mb-4">
            Loved by Travelers Worldwide
          </h2>
        </motion.div>

        <div className="uniform-grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} {...stagger} transition={{ delay: i * 0.15 }}>
              <Card className="h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed flex-1 mb-4 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-current/10">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-shell">
      <div className="site-container">
        <motion.div
          {...fadeUp}
          className="relative rounded-3xl overflow-hidden gradient-primary p-10 sm:p-14 lg:p-16 text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="font-outfit text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join 50,000+ travelers who plan smarter with Traveloop. Take the quiz and get your personalized trip plan in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button variant="accent" size="lg" icon={<Sparkles size={20} />}>
                  Take the AI Quiz
                </Button>
              </Link>
              <Link to="/role-select">
                <Button variant="secondary" size="lg">
                  Become a Planner
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <MainLayout>
      <HeroSection />
      <DestinationGrid />
      <HowItWorks />
      <TripRequestFeed />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
}
