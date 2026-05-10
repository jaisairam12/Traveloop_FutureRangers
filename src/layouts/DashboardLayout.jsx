import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Map, PlusCircle, Users, Compass, Heart,
  BarChart3, Globe, Sun, Moon, Menu, X,
  ClipboardList, Inbox, Share2, ChevronLeft
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const roleMenus = {
  user: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard/user' },
    { icon: PlusCircle, label: 'Raise Request', to: '/quiz' },
    { icon: Compass, label: 'Explore Trips', to: '/explore' },
    { icon: Heart, label: 'Saved', to: '/dashboard/user' },
    { icon: Map, label: 'My Trips', to: '/my-trips' },
  ],
  planner: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard/planner' },
    { icon: Inbox, label: 'Trip Requests', to: '/dashboard/planner' },
    { icon: PlusCircle, label: 'Create Trip', to: '/create-trip' },
    { icon: Map, label: 'My Trips', to: '/my-trips' },
    { icon: BarChart3, label: 'Analytics', to: '/budget' },
  ],
  joiner: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard/joiner' },
    { icon: Map, label: 'Joined Trips', to: '/my-trips' },
    { icon: ClipboardList, label: 'Invitations', to: '/dashboard/joiner' },
    { icon: Share2, label: 'Shared Plans', to: '/dashboard/joiner' },
    { icon: Compass, label: 'Explore', to: '/explore' },
  ],
};

export default function DashboardLayout({ role = 'user' }) {
  const { dark, toggle } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menu = roleMenus[role] || roleMenus.user;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar — Desktop */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 backdrop-blur
          ${dark ? 'bg-dark-card border-r border-dark-border' : 'bg-white border-r border-light-border'}
        `}
      >
        {/* Logo */}
        <div className="h-18 flex items-center px-4 gap-3 border-b border-current/10">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Globe className="text-white" size={20} />
          </div>
          {!collapsed && <span className="font-outfit font-bold text-lg">Traveloop</span>}
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1.5">
          {menu.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : dark ? 'text-dark-muted hover:text-dark-text hover:bg-white/5' : 'text-light-muted hover:text-light-text hover:bg-black/5'
                  }
                `}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 pb-4 space-y-1">
          <button onClick={toggle} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${dark ? 'text-dark-muted hover:bg-white/5' : 'text-light-muted hover:bg-black/5'}`}>
            {dark ? <Sun size={20} /> : <Moon size={20} />}
            {!collapsed && <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${dark ? 'text-dark-muted hover:bg-white/5' : 'text-light-muted hover:bg-black/5'}`}
          >
            <ChevronLeft size={20} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 h-14 glass border-b border-white/10 flex items-center justify-between px-4`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Globe className="text-white" size={16} />
          </div>
          <span className="font-outfit font-bold">Traveloop</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="w-9 h-9 inline-flex items-center justify-center rounded-lg cursor-pointer">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="w-9 h-9 inline-flex items-center justify-center rounded-lg cursor-pointer">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className={`lg:hidden fixed left-0 top-0 bottom-0 w-[260px] z-50 ${dark ? 'bg-dark-card border-r border-dark-border' : 'bg-white border-r border-light-border'} p-4 pt-16`}
          >
            <nav className="space-y-1">
              {menu.map(item => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${active ? 'bg-primary/10 text-primary' : dark ? 'text-dark-muted' : 'text-light-muted'}
                    `}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'} pt-14 lg:pt-0`}>
        <div className="site-container py-6 sm:py-8 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
