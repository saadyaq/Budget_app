import React from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileNavigation } from './MobileNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

const getViewTitle = (view: string) => {
  const titles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    budgets: 'Budgets',
    goals: 'Objectifs',
    reports: 'Statistiques',
    settings: 'Paramètres',
  };
  return titles[view as keyof typeof titles] || 'Budget App';
};

const getViewSubtitle = (view: string) => {
  const subtitles = {
    dashboard: 'Vue d\'ensemble de vos finances',
    transactions: 'Gérez vos revenus et dépenses',
    budgets: 'Suivez vos budgets',
    goals: 'Atteignez vos objectifs',
    reports: 'Analysez vos habitudes',
    settings: 'Configurez votre app',
  };
  return subtitles[view as keyof typeof subtitles];
};

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  activeView,
  onViewChange,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <MobileHeader 
        title={getViewTitle(activeView)}
        subtitle={getViewSubtitle(activeView)}
      />
      
      <main className="flex-1">
        <div className="p-4">
          {children}
        </div>
      </main>
      
      <MobileNavigation
        activeView={activeView}
        onViewChange={onViewChange}
      />
    </div>
  );
};