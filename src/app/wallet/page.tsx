'use client';

import React from 'react';
import { Wallet, Smartphone, CreditCard, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function WalletPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Solde & Portefeuille Mobile Money
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Visualisez les soldes cumulés Wave, Orange Money et comptes bancaires.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-100">
              Wave Business
            </span>
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-black">{formatCurrency(4850000, 'XOF')}</span>
            <p className="text-[11px] text-cyan-100 mt-1">Solde prêt pour virement</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              Orange Money Pro
            </span>
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-black">{formatCurrency(1250000, 'XOF')}</span>
            <p className="text-[11px] text-orange-100 mt-1">Solde disponible</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Compte Bancaire CBAO
            </span>
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-black">{formatCurrency(8900000, 'XOF')}</span>
            <p className="text-[11px] text-slate-400 mt-1">Virements en attente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
