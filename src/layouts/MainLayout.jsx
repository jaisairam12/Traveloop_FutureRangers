import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';

function Navbar() {
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/gallery', label: 'Inspiration' },
    { to: '/quiz', label: 'Plan Trip' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 dark:border-dark-border/60"
    >
      <div className="site-container">
        <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center flex items-center justify-between h-[4.5rem] gap-3">
          {/* Logo */}
          <div className="flex-1 md:flex-none flex min-w-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Globe className="text-white" size={20} />
              </div>
              <span className="font-outfit font-bold text-xl tracking-tight">
                Travel<span className="text-primary">oop</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center gap-1 p-1 rounded-2xl border border-current/10 justify-self-center">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${location.pathname === link.to
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                    : dark ? 'text-dark-muted hover:text-dark-text hover:bg-white/5' : 'text-light-muted hover:text-light-text hover:bg-black/5'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex-1 md:flex-none hidden md:flex items-center justify-end gap-2 justify-self-end">
            <button
              onClick={toggle}
              className={`h-10 w-10 inline-flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer ${dark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/role-select">
              <Button size="sm" pill>Get Started</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex-1 md:hidden flex justify-end items-center gap-2">
            <button onClick={toggle} className="h-10 w-10 inline-flex items-center justify-center rounded-xl cursor-pointer">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="h-10 w-10 inline-flex items-center justify-center rounded-xl cursor-pointer">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-white/10"
          >
            <div className="site-container py-4 space-y-2">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${location.pathname === link.to ? 'bg-primary/10 text-primary' : ''}
                  `}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex gap-2">
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Log in</Button>
                </Link>
                <Link to="/role-select" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Footer() {
  const { dark } = useTheme();

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Integrations', 'API'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Help Center', 'Community', 'Guides', 'Status'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy'],
  };

  return (
    <footer className={`border-t ${dark ? 'border-dark-border bg-dark-bg' : 'border-light-border bg-light-bg'}`}>
      <div className="site-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Globe className="text-white" size={16} />
              </div>
              <span className="font-outfit font-bold text-lg">Traveloop</span>
            </div>
            <p className={`text-sm pr-4 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
              AI-powered collaborative travel planning for everyone.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className={`text-sm transition-colors ${dark ? 'text-dark-muted hover:text-dark-text' : 'text-light-muted hover:text-light-text'}`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-12 pt-8 border-t ${dark ? 'border-dark-border' : 'border-light-border'} flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
            © 2026 Traveloop. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['🐦', '📸', '💼', '📘'].map((icon, i) => (
              <a key={i} href="#" className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${dark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[4.5rem]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
