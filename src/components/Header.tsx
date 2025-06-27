import React from 'react';

export const Header: React.FC = () => {
  return (
    <>
      <header className="bg-white shadow-md border-b border-brand-purple font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex items-center gap-4">
          <span className="text-3xl mr-2">💸</span>
          <div>
            <h1 className="text-2xl font-bold text-brand-purple tracking-tight">SpendWise</h1>
            <p className="text-sm text-brand-lime font-semibold">Smarter Money, Brighter Future</p>
          </div>
        </div>
      </header>
      <div className="bg-brand-bg py-4 text-center text-brand-purple font-semibold text-lg font-sans">
        Welcome to SpendWise! Track your money, reach your goals, and enjoy a smarter financial future.
      </div>
    </>
  );
};