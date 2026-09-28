'use client';

import React from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Rapports Financiers & TVA
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Générez les synthèses mensuelles de TVA 18% collectée pour la déclaration fiscale.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-2xl shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Exporter Rapport (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-semibold text-slate-400">Total TVA Collectée (18%)</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrency(868000, 'XOF')}
          </div>
          <p className="text-[11px] text-slate-400">Déclaration UEMOA / CEMAC du mois en cours</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-semibold text-slate-400">Total Ventes Exonérées</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrency(0, 'XOF')}
          </div>
          <p className="text-[11px] text-slate-400">Exonérations et exportations hors zone</p>
        </div>
      </div>
    </div>
  );
}
