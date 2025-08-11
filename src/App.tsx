import React from 'react';
import { MobileLayout } from './components/layout/MobileLayout';
import { MobileDashboard } from './features/dashboard/MobileDashboard';
import { TransactionsView } from './features/transactions/TransactionsView';
import { BudgetsView } from './features/budgets/BudgetsView';
import { TransactionForm } from './features/transactions/TransactionForm';
import { FloatingActionButton } from './components/ui/FloatingActionButton';
import { Card } from './components/ui/Card';

function App() {
  const [activeView, setActiveView] = React.useState('dashboard');
  const [showTransactionForm, setShowTransactionForm] = React.useState(false);

  const ComingSoonView = ({ title }: { title: string }) => (
    <Card variant="glass" className="text-center py-12">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span className="text-white font-bold text-xl">🚀</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Cette fonctionnalité arrive bientôt !
      </p>
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-medium">
        En développement
      </div>
    </Card>
  );

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <MobileDashboard onAddTransaction={() => setShowTransactionForm(true)} />;
      case 'transactions':
        return <TransactionsView />;
      case 'budgets':
        return <BudgetsView />;
      case 'goals':
        return <ComingSoonView title="Objectifs d'épargne" />;
      case 'reports':
        return <ComingSoonView title="Statistiques avancées" />;
      case 'settings':
        return <ComingSoonView title="Paramètres" />;
      default:
        return <MobileDashboard onAddTransaction={() => setShowTransactionForm(true)} />;
    }
  };

  return (
    <>
      <MobileLayout activeView={activeView} onViewChange={setActiveView}>
        {renderView()}
      </MobileLayout>

      {/* FAB - only show on dashboard and transactions */}
      {(activeView === 'dashboard' || activeView === 'transactions') && (
        <FloatingActionButton 
          onClick={() => setShowTransactionForm(true)}
        />
      )}

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={showTransactionForm}
        onClose={() => setShowTransactionForm(false)}
      />
    </>
  );
}

export default App;
