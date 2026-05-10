import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Globe } from 'lucide-react';

export default function AuthLayout({ children }) {
  const { dark } = useTheme();

  return (
    <div className="min-h-screen flex">
      {/* Left — Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden gradient-hero items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-8">
            <Globe className="text-white" size={32} />
          </div>
          <h1 className="font-outfit text-4xl font-bold mb-4">
            Welcome to Traveloop
          </h1>
          <p className="text-lg text-white/70 max-w-md">
            AI-powered collaborative travel planning. Plan smarter, travel better, explore together.
          </p>

          {/* Floating cards */}
          <div className="mt-12 flex gap-4 justify-center">
            {['🏝️ Bali', '🗼 Tokyo', '🏔️ Alps'].map((dest, i) => (
              <motion.div
                key={dest}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm"
              >
                {dest}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right — Form */}
      <div className={`flex-1 flex items-center justify-center p-6 sm:p-12 ${dark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Globe className="text-white" size={22} />
            </div>
            <span className="font-outfit font-bold text-2xl">Traveloop</span>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
