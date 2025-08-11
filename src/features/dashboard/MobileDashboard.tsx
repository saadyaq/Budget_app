import React from 'react';
import { TrendingUp, TrendingDown, Wallet, CreditCard, Plus } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { useMetrics } from '../../hooks/useMetrics';
import { Card, Button } from '../../components/ui';
import { ModernMetricCard } from './ModernMetricCard';
import { formatCurrency, formatDateShort } from '../../utils/formatters';

interface MobileDashboardProps {
  onAddTransaction: () => void;
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({ onAddTransaction }) => {
  const { transactions, categories } = useAppStore();
  const metrics = useMetrics();

  const recentTransactions = React.useMemo(() => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [transactions]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Non catégorisé';
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#6b7280';
  };

  // Generate mock trend data (in real app, this would come from your data)
  const generateTrend = () => Array.from({length: 7}, () => Math.random() * 100);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <ModernMetricCard
          title="Solde total"
          value={metrics.balance}
          icon={Wallet}
          color={metrics.balance >= 0 ? 'green' : 'red'}
          change={{
            value: metrics.monthlyBalance,
            isPositive: metrics.monthlyBalance >= 0,
            percentage: 12.5,
          }}
          trend={generateTrend()}
        />
        
        <ModernMetricCard
          title="Ce mois"
          value={metrics.monthlyBalance}
          icon={TrendingUp}
          color={metrics.monthlyBalance >= 0 ? 'blue' : 'orange'}
          change={{
            value: metrics.monthlyIncome - metrics.monthlyExpenses,
            isPositive: metrics.monthlyBalance >= 0,
            percentage: 8.3,
          }}
          trend={generateTrend()}
        />
      </div>

      {/* Income/Expense Cards */}
      <div className="grid grid-cols-2 gap-4">
        <ModernMetricCard
          title="Revenus"
          value={metrics.monthlyIncome}
          icon={TrendingUp}
          color="green"
          change={{
            value: metrics.monthlyIncome * 0.1,
            isPositive: true,
            percentage: 15.2,
          }}
          trend={generateTrend()}
        />
        
        <ModernMetricCard
          title="Dépenses"
          value={metrics.monthlyExpenses}
          icon={TrendingDown}
          color="purple"
          change={{
            value: metrics.monthlyExpenses * 0.05,
            isPositive: false,
            percentage: 5.1,
          }}
          trend={generateTrend()}
        />
      </div>

      {/* Quick Actions */}
      <Card variant="gradient" className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Actions rapides
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={onAddTransaction}
            className="h-12 text-left justify-start"
            icon={Plus}
          >
            Ajouter transaction
          </Button>
          
          <Button 
            variant="secondary"
            className="h-12 text-left justify-start"
            icon={CreditCard}
            onClick={() => {/* Navigate to budgets */}}
          >
            Voir budgets
          </Button>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card variant="glass">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Transactions récentes
          </h3>
          <Button variant="ghost" size="sm">
            Voir tout
          </Button>
        </div>
        
        {recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Aucune transaction récente
            </p>
            <Button onClick={onAddTransaction} size="sm">
              Ajouter votre première transaction
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: getCategoryColor(transaction.category) + '20',
                      border: `2px solid ${getCategoryColor(transaction.category)}40`
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCategoryColor(transaction.category) }}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {transaction.description}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {getCategoryName(transaction.category)} • {formatDateShort(transaction.date)}
                    </div>
                  </div>
                </div>
                
                <div
                  className={`font-bold text-sm ${
                    transaction.type === 'income' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};