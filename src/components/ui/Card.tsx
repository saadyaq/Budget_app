import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  variant?: 'default' | 'gradient' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  variant = 'default',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50',
  };

  const hoverClass = hover ? 'hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200' : '';

  return (
    <div
      className={`
        rounded-2xl shadow-lg ${variantClasses[variant]}
        ${paddingClasses[padding]} ${hoverClass} ${className}
      `}
    >
      {children}
    </div>
  );
};