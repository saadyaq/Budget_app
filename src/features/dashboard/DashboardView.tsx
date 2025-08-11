import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { useMetrics } from '../../hooks/useMetrics';
import { Card } from '../../components/ui';
import { MetricCard } from './MetricCard';
import { SimpleChart } from '../../components/charts/SimpleChart';

export const DashboardView: React.FC = () => {
  const { transactions, categories } = useAppStore();
  const metrics = useMetrics();

  const expensesByCategory = React.useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = transactions.filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' &&
             date.getMonth() === currentMonth &&
             date.getFullYear() === currentYear;
    });

    const categoryTotals = monthlyExpenses.reduce((acc, transaction) => {
      const category = categories.find(c => c.id === transaction.category);
      if (category) {
        acc[category.name] = (acc[category.name] || 0) + transaction.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        label: name,
        value,
        color: categories.find(c => c.name === name)?.color || '#6b7280',
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [transactions, categories]);

  const recentTransactions = React.useMemo(() => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Non catégorisé';
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#6b7280';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Vue d'ensemble de vos finances
        </p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenus du mois"
          value={metrics.monthlyIncome}
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Dépenses du mois"
          value={metrics.monthlyExpenses}
          icon={TrendingDown}
          color="red"
        />
        <MetricCard
          title="Solde du mois"
          value={metrics.monthlyBalance}
          icon={Wallet}
          color={metrics.monthlyBalance >= 0 ? 'blue' : 'red'}
        />
        <MetricCard
          title="Solde total"
          value={metrics.balance}
          icon={Target}
          color={metrics.balance >= 0 ? 'green' : 'red'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des dépenses */}
        <Card>
          <SimpleChart
            data={expensesByCategory}
            type="pie"
            title="Dépenses par catégorie (ce mois)"
          />
        </Card>

        {/* Transactions récentes */}
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Transactions récentes
            </h3>
            
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Aucune transaction récente
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getCategoryColor(transaction.category) }}
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {transaction.description}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getCategoryName(transaction.category)}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${
                        transaction.type === 'income' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      €{transaction.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Graphique en barres des top dépenses */}
      {expensesByCategory.length > 0 && (
        <Card>
          <SimpleChart
            data={expensesByCategory}
            type="bar"
            title="Top des catégories de dépenses (ce mois)"
          />
        </Card>
      )}

      {transactions.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Commencez à suivre vos finances
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Ajoutez vos premières transactions pour voir apparaître vos statistiques
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};