import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function Card({ children, className = '', hover = true, glass = false, onClick, padding = true }) {
  const { dark } = useTheme();

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.008 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        rounded-[var(--card-radius-lg)] overflow-hidden h-full
        ${glass
          ? 'glass'
          : dark
            ? 'bg-dark-card border border-dark-border hover:shadow-lg hover:shadow-black/50'
            : 'bg-light-card border border-light-border/50 shadow-sm hover:shadow-md hover:shadow-primary/5'
        }
        ${hover && onClick ? 'cursor-pointer' : ''}
        ${padding ? 'p-[var(--space-card)]' : ''}
        interaction-smooth will-change-transform
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
