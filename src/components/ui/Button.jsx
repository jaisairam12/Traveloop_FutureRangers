import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20',
  secondary: 'bg-white/10 border border-white/20 text-current hover:bg-white/20 backdrop-blur-sm',
  ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-current',
  accent: 'bg-accent text-white hover:bg-amber-600 shadow-lg shadow-accent/20',
  danger: 'bg-danger text-white hover:bg-red-600',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const sizes = {
  sm: 'px-4 h-10 text-sm',
  md: 'px-6 h-11 text-sm sm:text-base',
  lg: 'px-8 h-12 text-base sm:text-lg',
  xl: 'px-10 h-14 text-lg sm:text-xl',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', icon, iconRight, pill, disabled, onClick, ...props }) {
  const radius = pill ? 'rounded-full' : 'rounded-[var(--card-radius)]';

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap
        ${radius}
        interaction-smooth cursor-pointer will-change-transform
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
      {iconRight && <span className="text-lg">{iconRight}</span>}
    </motion.button>
  );
}
