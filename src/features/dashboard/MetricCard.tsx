import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color: 'green' | 'red' | 'blue' | 'yellow';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  color,
}) => {
  const colorClasses = {
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      icon: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      icon: 'text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
    },
  };

  const selectedColor = colorClasses[color];

  return (
    <Card className={`${selectedColor.bg} ${selectedColor.border} border`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {formatCurrency(value)}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${
              change.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {change.isPositive ? '+' : ''}
              {formatCurrency(change.value)} ce mois
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${selectedColor.bg}`}>
          <Icon className={`w-6 h-6 ${selectedColor.icon}`} />
        </div>
      </div>
    </Card>
  );
};