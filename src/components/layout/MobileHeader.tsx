import React from 'react';
import { Moon, Sun, Settings, Bell } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { Button } from '../ui/Button';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  title, 
  subtitle,
  showNotifications = true 
}) => {
  const { darkMode, toggleDarkMode } = useAppStore();

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">€</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {showNotifications && (
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => {/* TODO: Notifications */}}
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
              className="rounded-full"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};