import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { Transaction } from '../../types';

export const TransactionsView: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | undefined>();

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos revenus et dépenses
          </p>
        </div>
        
        <Button 
          icon={Plus}
          onClick={() => setIsFormOpen(true)}
        >
          Nouvelle transaction
        </Button>
      </div>

      <TransactionList onEdit={handleEdit} />

      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        transaction={editingTransaction}
      />
    </div>
  );
};