import { useState, useEffect } from 'react';
import { Expense, Budget } from '../types';

const STORAGE_KEYS = {
  EXPENSES: 'budget-app-expenses',
  BUDGET: 'budget-app-budget',
};

// Helper function to safely parse JSON from localStorage
const safeParseJSON = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper function to safely save to localStorage
const safeSaveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const useBudget = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget>({
    monthlyLimit: 0,
    currentMonth: new Date().toISOString().slice(0, 7),
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = safeParseJSON(STORAGE_KEYS.EXPENSES, []);
    const savedBudget = safeParseJSON(STORAGE_KEYS.BUDGET, {
      monthlyLimit: 0,
      currentMonth: new Date().toISOString().slice(0, 7),
    });

    // Validate expenses data structure
    if (Array.isArray(savedExpenses)) {
      setExpenses(savedExpenses);
    }

    // Validate budget data structure
    if (savedBudget && typeof savedBudget.monthlyLimit === 'number') {
      setBudget(savedBudget);
    }

    setIsLoaded(true);
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    if (isLoaded) {
      safeSaveToStorage(STORAGE_KEYS.EXPENSES, expenses);
    }
  }, [expenses, isLoaded]);

  // Save budget to localStorage whenever budget changes
  useEffect(() => {
    if (isLoaded) {
      safeSaveToStorage(STORAGE_KEYS.BUDGET, budget);
    }
  }, [budget, isLoaded]);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateBudget = (monthlyLimit: number) => {
    setBudget(prev => ({
      ...prev,
      monthlyLimit,
    }));
  };

  const clearAllData = () => {
    setExpenses([]);
    setBudget({
      monthlyLimit: 0,
      currentMonth: new Date().toISOString().slice(0, 7),
    });
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.BUDGET);
  };

  return {
    expenses,
    budget,
    addExpense,
    deleteExpense,
    updateBudget,
    clearAllData,
    isLoaded,
  };
};