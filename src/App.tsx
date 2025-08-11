import React from 'react';
import { Layout } from './components/layout/Layout';
import { DashboardView } from './features/dashboard/DashboardView';
import { TransactionsView } from './features/transactions/TransactionsView';
import { BudgetsView } from './features/budgets/BudgetsView';

function App() {
  const [activeView, setActiveView] = React.useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'transactions':
        return <TransactionsView />;
      case 'budgets':
        return <BudgetsView />;
      case 'goals':
        return <div>Objectifs d'épargne - En développement</div>;
      case 'reports':
        return <div>Rapports - En développement</div>;
      case 'settings':
        return <div>Paramètres - En développement</div>;
      default:
        return <DashboardView />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
}

export default App;
