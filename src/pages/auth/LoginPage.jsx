import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const { dark } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Demo User', email: form.email }, 'user');
    navigate('/dashboard/user');
  };

  return (
    <AuthLayout>
      <h2 className="font-outfit text-3xl font-bold mb-2">Welcome back</h2>
      <p className={`mb-8 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
        Log in to continue planning your next adventure
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon="✉️"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            icon="🔒"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-[38px] cursor-pointer opacity-50 hover:opacity-100"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded accent-primary" />
            <span className={dark ? 'text-dark-muted' : 'text-light-muted'}>Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-primary font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg">Log In</Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className={`flex-1 h-px ${dark ? 'bg-dark-border' : 'bg-light-border'}`} />
        <span className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>OR</span>
        <div className={`flex-1 h-px ${dark ? 'bg-dark-border' : 'bg-light-border'}`} />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" size="md" icon="🔵">Google</Button>
        <Button variant="secondary" size="md" icon="⚫">GitHub</Button>
      </div>

      <p className={`mt-6 text-center text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
        Don't have an account?{' '}
        <Link to="/role-select" className="text-primary font-semibold hover:underline">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
