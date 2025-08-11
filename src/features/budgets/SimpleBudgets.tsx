import React from 'react';
import { Plus } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { formatCurrency } from '../../utils/formatters';

export const SimpleBudgets: React.FC = () => {
  const { budgets, categories, transactions } = useAppStore();

  const getBudgetProgress = (budgetId: string) => {
    const budget = budgets.find(b => b.id === budgetId);
    if (!budget) return { spent: 0, percentage: 0 };

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const spent = transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.category === budget.categoryId && 
               t.type === 'expense' &&
               date.getMonth() === currentMonth &&
               date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      spent,
      percentage: (spent / budget.amount) * 100
    };
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Autre';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Budgets
        </h2>
        <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Budgets List */}
      {budgets.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Aucun budget défini</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Créer un budget
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {budgets.map(budget => {
            const { spent, percentage } = getBudgetProgress(budget.id);
            const isOverBudget = spent > budget.amount;
            
            return (
              <div key={budget.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {getCategoryName(budget.categoryId)}
                  </h3>
                  <span className={`text-sm font-medium ${
                    isOverBudget ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${
                      isOverBudget ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {percentage.toFixed(1)}% utilisé
                  {isOverBudget && (
                    <span className="text-red-500 ml-2">
                      (Dépassement de {formatCurrency(spent - budget.amount)})
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};