import React from 'react';
import { Plus } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { Button, Card } from '../../components/ui';
import { BudgetForm } from './BudgetForm';
import { BudgetCard } from './BudgetCard';
import { Budget } from '../../types';

export const BudgetsView: React.FC = () => {
  const { budgets } = useAppStore();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingBudget, setEditingBudget] = React.useState<Budget | undefined>();

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBudget(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Budgets
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Définissez et suivez vos budgets par catégorie
            </p>
          </div>
          <Button 
            icon={Plus}
            onClick={() => setIsFormOpen(true)}
          >
            Nouveau budget
          </Button>
        </div>
      </div>

      {budgets.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Aucun budget défini
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Commencez par créer un budget pour suivre vos dépenses par catégorie
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              Créer mon premier budget
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map(budget => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <BudgetForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        budget={editingBudget}
      />
    </div>
  );
};