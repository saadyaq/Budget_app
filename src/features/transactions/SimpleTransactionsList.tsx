import React from 'react';
import { Plus, Search } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { formatCurrency, formatDateShort } from '../../utils/formatters';

interface SimpleTransactionsListProps {
  onAdd: () => void;
}

export const SimpleTransactionsList: React.FC<SimpleTransactionsListProps> = ({ onAdd }) => {
  const { transactions, categories } = useAppStore();
  const [search, setSearch] = React.useState('');

  const filteredTransactions = transactions
    .filter(t => t.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Autre';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Transactions
        </h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher une transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Aucune transaction trouvée</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTransactions.map(transaction => (
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