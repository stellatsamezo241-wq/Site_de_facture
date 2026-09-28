'use client';

import React from 'react';
import { PieChart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function BudgetingPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Budgets &amp; Prévisions
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Suivez vos prévisions d&apos;encaissement et de dépenses d&apos;exploitation.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <PieChart className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Objectif de Chiffre d&apos;Affaires T1 2026
        </h2>
        <div className="text-3xl font-black text-blue-600">
          {formatCurrency(15000000, 'XOF')}
        </div>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Vous avez atteint 84% de votre objectif mensuel ce mois-ci.
        </p>
      </div>
    </div>
  );
}
