'use client';

import React from 'react';
import { ArrowUpDown, CheckCircle2, Search, Filter } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function TransactionsPage() {
  const mockTransactions = [
    {
      id: 'tx-1',
      date: '2026-02-01',
      description: 'Paiement Facture #INV-891023-001 (AfriTech Solutions)',
      method: 'Wave Mobile Money',
      type: 'credit',
      amount: 2065000,
      currency: 'XOF',
      status: 'completed',
    },
    {
      id: 'tx-2',
      date: '2026-01-28',
      description: 'Paiement Facture #INV-345442-000 (Cansaas Agency)',
      method: 'Virement bancaire CBAO',
      type: 'credit',
      amount: 12000,
      currency: 'USD',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Historique des Transactions
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Suivi en temps réel des règlements bancaires et encaissés Mobile Money.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3">Moyen de Paiement</th>
                <th className="py-3 px-3">Montant</th>
                <th className="py-3 px-3 text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-3 text-slate-500">{formatDate(tx.date)}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {tx.description}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    {tx.method}
                  </td>
                  <td className="py-3.5 px-3 font-black text-emerald-600">
                    +{formatCurrency(tx.amount, tx.currency as any)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Confirmé</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
