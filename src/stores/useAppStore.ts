import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Transaction, Category, Budget, SavingsGoal } from '../types';
import { DEFAULT_CATEGORIES, STORAGE_KEY } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';

interface AppStore extends AppState {
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  updateSavingsGoal: (id: string, goal: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  
  toggleDarkMode: () => void;
  importData: (data: Partial<AppState>) => void;
  resetData: () => void;
}

const initialState: AppState = {
  transactions: [],
  categories: DEFAULT_CATEGORIES,
  budgets: [],
  savingsGoals: [],
  darkMode: false,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: uuidv4() },
          ],
        })),

      updateTransaction: (id, updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTransaction } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: uuidv4() },
          ],
        })),

      updateCategory: (id, updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updatedCategory } : c
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      addBudget: (budget) =>
        set((state) => ({
          budgets: [
            ...state.budgets,
            { ...budget, id: uuidv4() },
          ],
        })),

      updateBudget: (id, updatedBudget) =>
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...updatedBudget } : b
          ),
        })),

      deleteBudget: (id) =>
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        })),

      addSavingsGoal: (goal) =>
        set((state) => ({
          savingsGoals: [
            ...state.savingsGoals,
            { ...goal, id: uuidv4() },
          ],
        })),

      updateSavingsGoal: (id, updatedGoal) =>
        set((state) => ({
          savingsGoals: state.savingsGoals.map((g) =>
            g.id === id ? { ...g, ...updatedGoal } : g
          ),
        })),

      deleteSavingsGoal: (id) =>
        set((state) => ({
          savingsGoals: state.savingsGoals.filter((g) => g.id !== id),
        })),

      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      importData: (data) =>
        set((state) => ({ ...state, ...data })),

      resetData: () => set(initialState),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);