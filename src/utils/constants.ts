import { Category } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Salaire', color: '#10b981', icon: 'DollarSign', type: 'income' },
  { id: '2', name: 'Freelance', color: '#3b82f6', icon: 'Briefcase', type: 'income' },
  { id: '3', name: 'Alimentation', color: '#ef4444', icon: 'ShoppingCart', type: 'expense' },
  { id: '4', name: 'Transport', color: '#f59e0b', icon: 'Car', type: 'expense' },
  { id: '5', name: 'Logement', color: '#8b5cf6', icon: 'Home', type: 'expense' },
  { id: '6', name: 'Divertissement', color: '#ec4899', icon: 'Film', type: 'expense' },
  { id: '7', name: 'Santé', color: '#06b6d4', icon: 'Heart', type: 'expense' },
  { id: '8', name: 'Éducation', color: '#84cc16', icon: 'BookOpen', type: 'expense' },
];

export const CURRENCY_SYMBOL = '€';
export const STORAGE_KEY = 'budget-app-data';