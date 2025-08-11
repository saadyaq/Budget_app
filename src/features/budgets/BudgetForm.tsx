import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../stores/useAppStore';
import { Budget } from '../../types';
import { Button, Input, Modal } from '../../components/ui';

interface BudgetFormProps {
  isOpen: boolean;
  onClose: () => void;
  budget?: Budget;
}

interface FormData {
  categoryId: string;
  amount: number;
  period: 'monthly' | 'yearly';
  alertThreshold: number;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({
  isOpen,
  onClose,
  budget,
}) => {
  const { categories, budgets, addBudget, updateBudget } = useAppStore();
  const isEditing = !!budget;
  
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const usedCategoryIds = budgets
    .filter(b => b.id !== budget?.id)
    .map(b => b.categoryId);
  
  const availableCategories = expenseCategories.filter(c => 
    !usedCategoryIds.includes(c.id)
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: budget ? {
      categoryId: budget.categoryId,
      amount: budget.amount,
      period: budget.period,
      alertThreshold: budget.alertThreshold,
    } : {
      categoryId: '',
      amount: 0,
      period: 'monthly',
      alertThreshold: 80,
    }
  });

  const onSubmit = (data: FormData) => {
    if (isEditing && budget) {
      updateBudget(budget.id, data);
    } else {
      addBudget(data);
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Modifier le budget' : 'Nouveau budget'}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Catégorie
          </label>
          <select
            {...register('categoryId', { required: 'La catégorie est obligatoire' })}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            disabled={isEditing}
          >
            <option value="">Sélectionner une catégorie</option>
            {isEditing ? (
              <option value={budget.categoryId}>
                {categories.find(c => c.id === budget.categoryId)?.name}
              </option>
            ) : (
              availableCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.categoryId.message}
            </p>
          )}
          {!isEditing && availableCategories.length === 0 && (
            <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
              Toutes les catégories de dépenses ont déjà un budget assigné
            </p>
          )}
        </div>

        <Input
          label="Montant du budget (€)"
          type="number"
          step="0.01"
          min="0"
          {...register('amount', { 
            required: 'Le montant est obligatoire',
            min: { value: 0.01, message: 'Le montant doit être positif' }
          })}
          error={errors.amount?.message}
          fullWidth
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Période
          </label>
          <select
            {...register('period', { required: 'La période est obligatoire' })}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="monthly">Mensuel</option>
            <option value="yearly">Annuel</option>
          </select>
          {errors.period && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.period.message}
            </p>
          )}
        </div>

        <Input
          label="Seuil d'alerte (%)"
          type="number"
          min="1"
          max="100"
          {...register('alertThreshold', { 
            required: 'Le seuil d\'alerte est obligatoire',
            min: { value: 1, message: 'Le seuil doit être au moins de 1%' },
            max: { value: 100, message: 'Le seuil ne peut pas dépasser 100%' }
          })}
          error={errors.alertThreshold?.message}
          fullWidth
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={!isEditing && availableCategories.length === 0}
          >
            {isEditing ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};