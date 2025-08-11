import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Minus } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { Transaction } from '../../types';
import { Button, Input, Modal } from '../../components/ui';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
}

interface FormData {
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const { categories, addTransaction, updateTransaction } = useAppStore();
  const isEditing = !!transaction;
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: transaction ? {
      amount: transaction.amount,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    } : {
      amount: 0,
      description: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    }
  });
  
  const watchedType = watch('type');
  const filteredCategories = categories.filter(cat => cat.type === watchedType);

  const onSubmit = (data: FormData) => {
    if (isEditing && transaction) {
      updateTransaction(transaction.id, data);
    } else {
      addTransaction(data);
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
      title={isEditing ? 'Modifier la transaction' : 'Nouvelle transaction'}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={watchedType === 'income' ? 'primary' : 'secondary'}
            onClick={() => reset({ ...watch(), type: 'income' })}
            icon={Plus}
            fullWidth
          >
            Revenus
          </Button>
          <Button
            type="button"
            variant={watchedType === 'expense' ? 'primary' : 'secondary'}
            onClick={() => reset({ ...watch(), type: 'expense' })}
            icon={Minus}
            fullWidth
          >
            Dépenses
          </Button>
        </div>

        <Input
          label="Montant (€)"
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

        <Input
          label="Description"
          {...register('description', { 
            required: 'La description est obligatoire',
            maxLength: { value: 100, message: 'Maximum 100 caractères' }
          })}
          error={errors.description?.message}
          fullWidth
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Catégorie
          </label>
          <select
            {...register('category', { required: 'La catégorie est obligatoire' })}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Sélectionner une catégorie</option>
            {filteredCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.category.message}
            </p>
          )}
        </div>

        <Input
          label="Date"
          type="date"
          {...register('date', { required: 'La date est obligatoire' })}
          error={errors.date?.message}
          fullWidth
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button type="submit">
            {isEditing ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};