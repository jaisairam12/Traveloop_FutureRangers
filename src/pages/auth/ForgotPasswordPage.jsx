import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ForgotPasswordPage() {
  const { dark } = useTheme();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Link to="/login" className={`inline-flex items-center gap-1 text-sm mb-6 ${dark ? 'text-dark-muted' : 'text-light-muted'} hover:text-primary transition-colors`}>
              <ArrowLeft size={16} /> Back to login
            </Link>
            <h2 className="font-outfit text-3xl font-bold mb-2">Reset Password</h2>
            <p className={`mb-8 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
              Enter your email and we'll send you a reset link
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <Input label="Email" type="email" placeholder="you@example.com" icon="✉️" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button type="submit" className="w-full" size="lg">Send Reset Link</Button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-primary" />
            </motion.div>
            <h2 className="font-outfit text-2xl font-bold mb-2">Check Your Email</h2>
            <p className={`mb-6 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
              We sent a password reset link to <strong>{email}</strong>
            </p>
            <Link to="/login">
              <Button variant="outline">Back to Login</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
