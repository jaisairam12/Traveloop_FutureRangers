const colors = {
  green: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  blue: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  red: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20',
  purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20',
  gray: 'bg-gray-500/15 text-gray-600 dark:text-gray-400 border border-gray-500/20',
};

export default function Badge({ children, color = 'green', className = '', dot = false }) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
      ${colors[color]} ${className}
    `}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full bg-current`} />}
      {children}
    </span>
  );
}
