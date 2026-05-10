import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, Calendar, Globe, Eye, EyeOff, ArrowLeft, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function CreateTripPage() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', destination: '', startDate: '', endDate: '', description: '', visibility: 'public',
    coverUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate(-1)} className={`flex items-center gap-1 text-sm mb-6 cursor-pointer ${dark ? 'text-dark-muted' : 'text-light-muted'} hover:text-primary`}>
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="font-outfit text-3xl font-bold mb-2">Create New Trip</h1>
          <p className={`mb-8 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Set up your trip details and start building your itinerary</p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <h3 className="font-outfit font-bold text-lg mb-4">Trip Details</h3>
                <div className="space-y-5">
                  <Input label="Trip Name" placeholder="e.g., Japanese Culture Explorer" icon="✈️" value={form.name} onChange={(e) => update('name', e.target.value)} />
                  <Input label="Destination" placeholder="e.g., Tokyo & Kyoto, Japan" icon="📍" value={form.destination} onChange={(e) => update('destination', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Start Date" type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} />
                    <Input label="End Date" type="date" value={form.endDate} onChange={(e) => update('endDate', e.target.value)} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Description</label>
                    <textarea
                      placeholder="Describe your trip..."
                      rows={4}
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                      className={`w-full rounded-xl px-4 py-3 text-base outline-none resize-none transition-all
                        ${dark ? 'bg-dark-surface border border-dark-border text-dark-text focus:border-primary-light' : 'bg-light-surface border border-light-border text-light-text focus:border-primary'}
                        focus:ring-2 focus:ring-primary/20`}
                    />
                  </div>
                  <Input label="Cover Image URL" placeholder="https://..." icon="🖼️" value={form.coverUrl} onChange={(e) => update('coverUrl', e.target.value)} />
                </div>
              </Card>

              <Card>
                <h3 className="font-outfit font-bold text-lg mb-4">Visibility</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'public', label: 'Public', desc: 'Anyone can discover', icon: <Globe size={20} /> },
                    { id: 'private', label: 'Private', desc: 'Invite only', icon: <EyeOff size={20} /> },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => update('visibility', opt.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer
                        ${form.visibility === opt.id ? 'border-primary bg-primary/5' : dark ? 'border-dark-border hover:border-dark-muted' : 'border-light-border hover:border-light-muted'}
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {opt.icon}
                        <span className="font-semibold text-sm">{opt.label}</span>
                      </div>
                      <p className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </Card>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg" onClick={() => navigate('/itinerary-builder')}>Create & Build Itinerary</Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/my-trips')}>Save as Draft</Button>
              </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h3 className={`text-sm font-medium mb-3 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Preview</h3>
                <Card padding={false} className="overflow-hidden">
                  <div className="relative h-48">
                    <img src={form.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge color={form.visibility === 'public' ? 'green' : 'purple'} className="absolute top-3 left-3">{form.visibility}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-outfit font-bold text-lg">{form.name || 'Trip Name'}</h3>
                    {form.destination && (
                      <p className={`text-sm flex items-center gap-1 mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                        <MapPin size={12} /> {form.destination}
                      </p>
                    )}
                    {form.startDate && form.endDate && (
                      <p className={`text-sm flex items-center gap-1 mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                        <Calendar size={12} /> {form.startDate} → {form.endDate}
                      </p>
                    )}
                    {form.description && (
                      <p className={`text-sm mt-3 line-clamp-3 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{form.description}</p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
