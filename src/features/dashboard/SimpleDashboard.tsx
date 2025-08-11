import React from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { useMetrics } from '../../hooks/useMetrics';
import { formatCurrency, formatDateShort } from '../../utils/formatters';

interface SimpleDashboardProps {
  onAddTransaction: () => void;
}

export const SimpleDashboard: React.FC<SimpleDashboardProps> = ({ onAddTransaction }) => {
  const { transactions, categories } = useAppStore();
  const metrics = useMetrics();

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Autre';
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Solde total</p>
          <p className={`text-3xl font-bold ${
            metrics.balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatCurrency(metrics.balance)}
          </p>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Revenus</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(metrics.monthlyIncome)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Dépenses</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(metrics.monthlyExpenses)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Button */}
      <button
        onClick={onAddTransaction}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
        <span>Ajouter une transaction</span>
      </button>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Transactions récentes
          </h3>
        </div>
        
        {recentTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Aucune transaction</p>
            <button
              onClick={onAddTransaction}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Ajouter votre première transaction
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getCategoryName(transaction.category)} • {formatDateShort(transaction.date)}
                  </p>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};