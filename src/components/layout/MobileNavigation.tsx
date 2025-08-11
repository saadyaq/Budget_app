import React from 'react';
import { 
  Home, 
  CreditCard, 
  PieChart, 
  Target, 
  BarChart3
} from 'lucide-react';

interface MobileNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'transactions', label: 'Transactions', icon: CreditCard },
  { id: 'budgets', label: 'Budgets', icon: PieChart },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'reports', label: 'Stats', icon: BarChart3 },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeView,
  onViewChange,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 pb-safe">
      <div className="flex items-center justify-around py-2 px-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};