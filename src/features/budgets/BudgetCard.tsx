import React from 'react';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { Budget } from '../../types';
import { Card, Button } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

interface BudgetCardProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onEdit }) => {
  const { categories, transactions, deleteBudget } = useAppStore();
  
  const category = categories.find(c => c.id === budget.categoryId);
  
  const currentSpent = React.useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.category === budget.categoryId && 
               t.type === 'expense' &&
               date.getMonth() === currentMonth &&
               date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions, budget.categoryId]);

  const percentage = (currentSpent / budget.amount) * 100;
  const isOverBudget = currentSpent > budget.amount;
  const isNearLimit = percentage >= budget.alertThreshold;
  
  const getProgressColor = () => {
    if (isOverBudget) return 'bg-red-500';
    if (isNearLimit) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce budget ?')) {
      deleteBudget(budget.id);
    }
  };

  if (!category) return null;

  return (
    <Card hover>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {category.name}
            </h3>
            {isNearLimit && (
              <AlertTriangle 
                className={`w-4 h-4 ${isOverBudget ? 'text-red-500' : 'text-yellow-500'}`} 
              />
            )}
          </div>
          
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(budget)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {formatCurrency(currentSpent)} / {formatCurrency(budget.amount)}
            </span>
            <span className={`font-medium ${
              isOverBudget 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              {percentage.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {isOverBudget && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              Dépassement de {formatCurrency(currentSpent - budget.amount)}
            </p>
          </div>
        )}

        {isNearLimit && !isOverBudget && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Attention : {budget.alertThreshold}% du budget atteint
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Budget {budget.period === 'monthly' ? 'mensuel' : 'annuel'}
          {budget.period === 'monthly' && ' • Ce mois-ci'}
        </div>
      </div>
    </Card>
  );
};