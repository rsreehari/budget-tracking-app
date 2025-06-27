import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { BudgetSettings } from './components/BudgetSettings';
import { useBudget } from './hooks/useBudget';

function App() {
  const { expenses, budget, addExpense, deleteExpense, updateBudget } = useBudget();

  const handleAddExpense = (expenseData: any) => {
    addExpense({
      amount: parseFloat(expenseData.amount),
      description: expenseData.description,
      category: expenseData.category,
      date: expenseData.date,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Dashboard and Expense Form */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl shadow-md border border-primary-100 p-6">
              <Dashboard expenses={expenses} budget={budget} />
            </section>
            <section className="bg-white rounded-xl shadow-md border border-primary-100 p-6">
              <ExpenseForm onSubmit={handleAddExpense} />
            </section>
          </div>
          {/* Right Column - Budget Settings */}
          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-md border border-primary-100 p-6">
              <BudgetSettings budget={budget} onUpdateBudget={updateBudget} />
            </section>
          </div>
        </div>
        {/* Full Width - Expense List */}
        <section className="mt-10 bg-white rounded-xl shadow-md border border-primary-100 p-6">
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </section>
      </main>
    </div>
  );
}

export default App;