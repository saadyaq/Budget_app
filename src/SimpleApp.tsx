import React from 'react';
import { SimpleLayout } from './components/layout/SimpleLayout';
import { SimpleDashboard } from './features/dashboard/SimpleDashboard';
import { SimpleTransactionsList } from './features/transactions/SimpleTransactionsList';
import { SimpleBudgets } from './features/budgets/SimpleBudgets';
import { TransactionForm } from './features/transactions/TransactionForm';

function SimpleApp() {
  const [activeView, setActiveView] = React.useState('dashboard');
  const [showTransactionForm, setShowTransactionForm] = React.useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <SimpleDashboard onAddTransaction={() => setShowTransactionForm(true)} />;
      case 'transactions':
        return <SimpleTransactionsList onAdd={() => setShowTransactionForm(true)} />;
      case 'budgets':
        return <SimpleBudgets />;
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Paramètres
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Fonctionnalité à venir
            </p>
          </div>
        );
      default:
        return <SimpleDashboard onAddTransaction={() => setShowTransactionForm(true)} />;
    }
  };

  return (
    <>
      <SimpleLayout activeView={activeView} onViewChange={setActiveView}>
        {renderView()}
      </SimpleLayout>

      <TransactionForm
        isOpen={showTransactionForm}
        onClose={() => setShowTransactionForm(false)}
      />
    </>
  );
}

export default SimpleApp;