import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2, Copy, MapPin, Calendar, Users, DollarSign, Clock, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { itineraryDays, myTrips } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function PublicTripPage() {
  const { dark } = useTheme();
  const trip = myTrips[0];

  return (
    <MainLayout>
      {/* Hero */}
      <div className="relative h-72 sm:h-96">
        <img src={trip.cover} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-8 max-w-5xl mx-auto">
          <Badge color="green" className="mb-3" dot>Public Trip</Badge>
          <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white mb-2">{trip.name}</h1>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1"><MapPin size={14} /> {trip.destination}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {trip.dates}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {trip.travelers} travelers</span>
            <span className="flex items-center gap-1"><DollarSign size={14} /> {trip.budget}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {/* Action Bar */}
        <div className="flex gap-3 mb-8">
          <Button icon={<Copy size={16} />} variant="outline">Copy Trip</Button>
          <Button icon={<Share2 size={16} />} variant="outline">Share</Button>
        </div>

        {/* Timeline */}
        <h2 className="font-outfit text-2xl font-bold mb-6">Itinerary</h2>
        <div className="space-y-6">
          {itineraryDays.map((day, i) => (
            <motion.div key={day.day} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex flex-col items-center justify-center text-white text-xs">
                  <span className="font-bold text-sm">{day.day}</span>
                </div>
                <div>
                  <h3 className="font-outfit font-bold">{day.city}</h3>
                  <span className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{day.date}</span>
                </div>
              </div>
              <div className="ml-5 border-l-2 border-primary/20 pl-6 space-y-3">
                {day.activities.map(act => (
                  <Card key={act.id} className="flex items-center gap-3 py-3 px-4">
                    <span className="text-xl">{act.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{act.title}</p>
                      <div className={`flex gap-3 text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                        <span className="flex items-center gap-1"><Clock size={10} />{act.time}</span>
                        <span>{act.duration}</span>
                        <span>{act.cost}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
