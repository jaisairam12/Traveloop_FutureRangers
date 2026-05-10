import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, max = 100, className = '', showLabel = false, color = 'primary' }) {
  const pct = Math.min((value / max) * 100, 100);
  const colors = {
    primary: 'from-primary to-primary-light',
    accent: 'from-accent to-amber-400',
    danger: 'from-danger to-red-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>{Math.round(pct)}%</span>
          <span className="opacity-50">{value}/{max}</span>
        </div>
      )}
      <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
        />
      </div>
    </div>
  );
}
