import React from 'react';
import { Edit, Trash2, Search, Filter } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { Transaction } from '../../types';
import { Button, Card, Input } from '../../components/ui';
import { formatCurrency, formatDateShort } from '../../utils/formatters';

interface TransactionListProps {
  onEdit: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ onEdit }) => {
  const { transactions, categories, deleteTransaction } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = React.useState('');

  const filteredTransactions = React.useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = !filterCategory || t.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, filterType, filterCategory]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Non catégorisé';
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#6b7280';
  };

  return (
    <div className="space-y-4">
      {/* Filtres et recherche */}
      <Card>
        <div className="space-y-4">
          <Input
            placeholder="Rechercher une transaction..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-40">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="all">Tous</option>
                <option value="income">Revenus</option>
                <option value="expense">Dépenses</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-40">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Catégorie
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="">Toutes</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Liste des transactions */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <Card>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {searchTerm || filterType !== 'all' || filterCategory
                ? 'Aucune transaction ne correspond à vos critères'
                : 'Aucune transaction enregistrée'
              }
            </div>
          </Card>
        ) : (
          filteredTransactions.map(transaction => (
            <Card key={transaction.id} hover>
              <div className="flex items-center justify-between">
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
                      {getCategoryName(transaction.category)} • {formatDateShort(transaction.date)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div
                    className={`font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(transaction)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
                          deleteTransaction(transaction.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};