import { useTheme } from '../../context/ThemeContext';

export default function Input({ label, icon, error, className = '', type = 'text', ...props }) {
  const { dark } = useTheme();

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className={`block text-sm font-medium ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50">
            {icon}
          </span>
        )}
        <input
          type={type}
          className={`
            w-full rounded-xl px-4 py-3 text-base outline-none
            transition-all duration-300
            ${icon ? 'pl-12' : ''}
            ${dark
              ? 'bg-dark-surface border border-dark-border text-dark-text placeholder:text-dark-muted/50 focus:border-primary-light'
              : 'bg-light-surface border border-light-border text-light-text placeholder:text-light-muted/50 focus:border-primary'
            }
            focus:ring-2 focus:ring-primary/20
            ${error ? 'border-danger!' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
