'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Users,
} from 'lucide-react';
import { MOCK_INVOICES } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { InvoiceStatus } from '@/types';

export default function DashboardPage() {
  const [invoices] = useState(MOCK_INVOICES);

  // Compute stats
  const totalBilled = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Payée</span>
          </span>
        );
      case 'sent':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
            <Clock className="w-3 h-3" />
            <span>Envoyée</span>
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-3 h-3" />
            <span>En retard</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <span>Brouillon</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Tableau de Bord
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Aperçu général de votre activité de facturation et de trésorerie.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/clients"
            className="flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 transition shadow-sm"
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>Gérer Clients</span>
          </Link>

          <Link
            href="/invoices/new"
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Facture</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Billed */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Total Facturé
            </span>
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatCurrency(totalBilled, 'XOF')}
            </span>
            <div className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% ce mois</span>
            </div>
          </div>
        </div>

        {/* Total Paid */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Montant Encaissé
            </span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatCurrency(totalPaid, 'XOF')}
            </span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">
              Paiements confirmés
            </p>
          </div>
        </div>

        {/* Total Pending */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              En Attente
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatCurrency(totalPending, 'XOF')}
            </span>
            <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-1">
              Factures à relancer
            </p>
          </div>
        </div>

        {/* Total Invoices Count */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Total Factures
            </span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {invoices.length} Factures
            </span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">
              3 Clients actifs
            </p>
          </div>
        </div>
      </div>

      {/* Visual Chart & Quick Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Chart Visual */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Revenus Mensuels (FCFA)
              </h2>
              <p className="text-xs text-slate-400">
                Évolution de la facturation sur le premier trimestre 2026
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
              2026
            </span>
          </div>

          {/* Bar chart rendering */}
          <div className="h-44 pt-6 flex items-end justify-between gap-4 px-2">
            {[
              { month: 'Jan', amount: 2500000, height: '40%' },
              { month: 'Fév', amount: 4800000, height: '75%' },
              { month: 'Mar', amount: 3200000, height: '55%' },
              { month: 'Avr', amount: 5600000, height: '90%' },
              { month: 'Mai', amount: 4100000, height: '65%' },
              { month: 'Juin', amount: 6200000, height: '100%' },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-32 rounded-xl p-1 flex items-end relative overflow-hidden">
                  <div
                    style={{ height: bar.height }}
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg transition-all duration-500 group-hover:from-blue-500 group-hover:to-blue-300"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips & Company Info Card */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Conformité Fiscale Afrique
            </span>
            <h3 className="text-lg font-bold tracking-tight">
              TVA 18% &amp; Identifiants Fiscaux
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Toutes vos factures générées incluent les mentions NINEA, IFU et RCCM requis par les administrations fiscales UEMOA / CEMAC.
            </p>
          </div>

          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-2">
            <span className="text-[10px] font-semibold text-slate-300">
              Coordonnées de Paiement configurées:
            </span>
            <p className="text-xs font-mono font-bold">
              RIB: SN12 0100 1001 3321...
            </p>
            <p className="text-xs font-semibold text-emerald-400">
              Mobile Money: Wave &amp; Orange Money
            </p>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Factures Récentes
            </h2>
            <p className="text-xs text-slate-400">
              Dernières factures émises et leur statut de paiement.
            </p>
          </div>
          <Link
            href="/invoices"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>Voir Tout</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Numéro</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Émission</th>
                <th className="py-3 px-3">Échéance</th>
                <th className="py-3 px-3">Montant Total</th>
                <th className="py-3 px-3 text-center">Statut</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 font-semibold">
                    {inv.clientName}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    {formatDate(inv.issueDate)}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    {formatDate(inv.dueDate)}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                    {formatCurrency(inv.totalAmount, inv.currency)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {getStatusBadge(inv.status)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      href="/invoices/new"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition"
                    >
                      Éditer
                    </Link>
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
