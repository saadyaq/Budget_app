import React from 'react';
import { Home, List, PieChart, User } from 'lucide-react';

interface SimpleLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'transactions', label: 'Transactions', icon: List },
  { id: 'budgets', label: 'Budgets', icon: PieChart },
  { id: 'settings', label: 'Profile', icon: User },
];

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  children,
  activeView,
  onViewChange,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Budget App
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="pb-20">
        <div className="p-4">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onViewChange(tab.id)}
                className={`flex-1 flex flex-col items-center py-2 px-1 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};