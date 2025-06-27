import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { BudgetSettings } from './components/BudgetSettings';
import { useBudget } from './hooks/useBudget';
import { PiggyBank, TrendingUp, Settings, List, Clock } from 'lucide-react';
import { formatCurrency } from './utils/calculations';
import CoinFlipSplash from './components/CoinFlipSplash';

function SavingsGoal({ current, goal }: { current: number; goal: number }) {
  const percent = Math.min(100, Math.round((current / goal) * 100));
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-lime p-6 flex flex-col items-center transition-shadow duration-300 hover:shadow-2xl">
      <div className="text-brand-lime text-3xl mb-2">🎯</div>
      <div className="text-lg font-bold text-brand-purple mb-1">Savings Goal</div>
      <div className="text-2xl font-bold text-brand-lime">{percent}%</div>
      <div className="text-sm text-gray-500">${current} / ${goal}</div>
      <div className="w-full h-2 bg-brand-lime/20 rounded-full mt-3 overflow-hidden">
        <div className="h-2 bg-brand-lime rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function RecentActivity({ expenses }: { expenses: any[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-purple p-6">
      <div className="flex items-center gap-2 mb-4 text-brand-purple font-bold text-lg">
        <Clock className="w-5 h-5" /> Recent Activity
      </div>
      <ul className="space-y-3">
        {expenses.slice(0, 3).map((e) => (
          <li key={e.id} className="flex items-center gap-3 text-sm">
            <span className="p-2 rounded-full" style={{ background: '#f3f4f6' }}>
              <PiggyBank className="w-4 h-4 text-brand-purple" />
            </span>
            <span className="flex-1 text-gray-700">{e.description}</span>
            <span className="font-bold text-brand-lime">{formatCurrency(e.amount)}</span>
          </li>
        ))}
        {expenses.length === 0 && <li className="text-gray-400">No recent activity</li>}
      </ul>
    </div>
  );
}

export default function App() {
  const { expenses, budget, addExpense, deleteExpense, updateBudget } = useBudget();
  const [nav, setNav] = useState<'dashboard' | 'expenses' | 'settings'>('dashboard');
  const [showSplash, setShowSplash] = useState(true);

  // Example savings goal
  const savingsGoal = 1000;
  const saved = Math.max(0, budget.monthlyLimit - expenses.reduce((a, e) => a + e.amount, 0));

  return (
    <>
      {showSplash && <CoinFlipSplash onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <div className="min-h-screen bg-gradient-to-br from-brand-bg via-brand-purple/10 to-brand-lime/10 font-sans flex">
          {/* Sidebar Navigation */}
          <aside className="w-20 bg-brand-purple flex flex-col items-center py-8 space-y-8 min-h-screen shadow-lg">
            <button onClick={() => setNav('dashboard')} className={`p-3 rounded-xl ${nav==='dashboard' ? 'bg-brand-lime text-brand-purple' : 'text-white'} hover:bg-brand-lime/30 transition`} title="Dashboard" aria-label="Dashboard">
              <PiggyBank size={28} />
            </button>
            <button onClick={() => setNav('expenses')} className={`p-3 rounded-xl ${nav==='expenses' ? 'bg-brand-lime text-brand-purple' : 'text-white'} hover:bg-brand-lime/30 transition`} title="Transactions" aria-label="Transactions">
              <List size={28} />
            </button>
            <button onClick={() => setNav('settings')} className={`p-3 rounded-xl ${nav==='settings' ? 'bg-brand-lime text-brand-purple' : 'text-white'} hover:bg-brand-lime/30 transition`} title="Settings" aria-label="Settings">
              <Settings size={28} />
            </button>
          </aside>
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            <Header />
            <main className="max-w-5xl mx-auto w-full py-8 px-4 flex flex-col gap-8">
              {nav === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <section className="md:col-span-2 flex flex-col gap-8">
                    <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-purple p-6 transition-shadow duration-300 hover:shadow-2xl">
                      <Dashboard expenses={expenses} budget={budget} />
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-purple p-6 transition-shadow duration-300 hover:shadow-2xl">
                      <ExpenseForm onSubmit={(expenseData) => {
                        addExpense({
                          amount: parseFloat(expenseData.amount),
                          description: expenseData.description,
                          category: expenseData.category,
                          date: expenseData.date,
                        });
                      }} />
                    </div>
                  </section>
                  <div className="flex flex-col gap-8">
                    <SavingsGoal current={saved} goal={savingsGoal} />
                    <RecentActivity expenses={expenses} />
                    <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-purple p-6 transition-shadow duration-300 hover:shadow-2xl">
                      <BudgetSettings budget={budget} onUpdateBudget={updateBudget} />
                    </div>
                  </div>
                </div>
              )}
              {nav === 'expenses' && (
                <section className="bg-white rounded-2xl shadow-lg border-2 border-brand-purple p-6 transition-shadow duration-300 hover:shadow-2xl">
                  <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
                </section>
              )}
              {nav === 'settings' && (
                <section className="bg-white rounded-2xl shadow-lg border-2 border-brand-purple p-6 text-brand-purple font-semibold text-lg text-center">
                  Settings & Customization coming soon!
                </section>
              )}
            </main>
          </div>
        </div>
      )}
    </>
  );
}