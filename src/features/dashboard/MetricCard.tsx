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
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      text: 'text-white',
      iconBg: 'bg-white/20',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-500 to-red-600',
      text: 'text-white',
      iconBg: 'bg-white/20',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-white',
      iconBg: 'bg-white/20',
    },
    yellow: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      text: 'text-white',
      iconBg: 'bg-white/20',
    },
  };

  const selectedColor = colorClasses[color];

  return (
    <div className={`${selectedColor.bg} rounded-2xl p-6 ${selectedColor.text} shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8" />
        <div className="text-right">
          <p className="text-sm opacity-80">
            {title}
          </p>
          <p className="text-2xl font-bold">
            {formatCurrency(value)}
          </p>
        </div>
      </div>
      {change && (
        <p className="text-sm opacity-80">
          {change.isPositive ? '+' : ''}
          {formatCurrency(change.value)} ce mois
        </p>
      )}
    </div>
  );
};