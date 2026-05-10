import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const roleLabels = { user: '🧳 Simple User', planner: '📋 Trip Planner', joiner: '🤝 Trip Joiner' };
const roleColors = { user: 'blue', planner: 'green', joiner: 'purple' };

export default function SignupPage() {
  const { dark } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'user';
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: form.name, email: form.email }, role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <AuthLayout>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-outfit text-3xl font-bold">Create Account</h2>
        <Badge color={roleColors[role]}>{roleLabels[role]}</Badge>
      </div>
      <p className={`mb-8 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
        Start your journey with Traveloop today
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="John Doe"
          icon="👤"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon="✉️"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon="🔒"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <label className="flex items-start gap-2 cursor-pointer text-sm">
          <input type="checkbox" className="mt-1 rounded accent-primary" />
          <span className={dark ? 'text-dark-muted' : 'text-light-muted'}>
            I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and{' '}
            <a href="#" className="text-primary underline">Privacy Policy</a>
          </span>
        </label>

        <Button type="submit" className="w-full" size="lg">Create Account</Button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className={`flex-1 h-px ${dark ? 'bg-dark-border' : 'bg-light-border'}`} />
        <span className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>OR</span>
        <div className={`flex-1 h-px ${dark ? 'bg-dark-border' : 'bg-light-border'}`} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" size="md" icon="🔵">Google</Button>
        <Button variant="secondary" size="md" icon="⚫">GitHub</Button>
      </div>

      <p className={`mt-6 text-center text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}
