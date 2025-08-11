import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

interface ModernMetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  change?: {
    value: number;
    isPositive: boolean;
    percentage?: number;
  };
  color: 'green' | 'red' | 'blue' | 'purple' | 'orange';
  trend?: number[];
}

export const ModernMetricCard: React.FC<ModernMetricCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  color,
  trend = [],
}) => {
  const colorClasses = {
    green: {
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
    red: {
      gradient: 'from-red-500 to-pink-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
    },
    blue: {
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
    },
    purple: {
      gradient: 'from-purple-500 to-indigo-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
    },
    orange: {
      gradient: 'from-orange-500 to-red-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800',
    },
  };

  const selectedColor = colorClasses[color];

  const MiniChart = () => {
    if (trend.length < 2) return null;
    
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-0.5 h-8 mt-2">
        {trend.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`w-1 bg-gradient-to-t ${selectedColor.gradient} rounded-full opacity-60`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Card variant="gradient" hover className="overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${selectedColor.gradient} rounded-full -translate-y-10 translate-x-10`} />
      </div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(value)}
            </p>
          </div>
          
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedColor.gradient} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {change && (
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              change.isPositive 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              <span className="mr-1">
                {change.isPositive ? '↗' : '↘'}
              </span>
              {change.percentage ? `${change.percentage.toFixed(1)}%` : formatCurrency(Math.abs(change.value))}
            </div>
            
            <MiniChart />
          </div>
        )}
      </div>
    </Card>
  );
};