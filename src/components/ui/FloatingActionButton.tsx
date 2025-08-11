import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-24 right-4 z-40
        w-14 h-14 
        bg-gradient-to-r from-blue-600 to-purple-600 
        hover:from-blue-700 hover:to-purple-700
        text-white
        rounded-2xl
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        flex items-center justify-center
        hover:scale-110 active:scale-95
        border-4 border-white dark:border-gray-900
        ${className}
      `}
    >
      <Plus className="w-6 h-6" />
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 animate-pulse" />
    </button>
  );
};