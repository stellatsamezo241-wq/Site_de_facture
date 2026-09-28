'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { fetchInvoices, updateInvoiceStatusInDb } from '@/lib/supabase/service';
import { formatCurrency, formatDate } from '@/lib/utils';
import { InvoiceStatus, Invoice } from '@/types';

export default function InvoicesListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchInvoices();
      setInvoices(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );
    await updateInvoiceStatusInDb(id, newStatus);
  };

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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Toutes les Factures
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gérez, filtrez et suivez l&apos;état de règlement de vos factures clients.
          </p>
        </div>

        <Link
          href="/invoices/new"
          className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Facture</span>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par n° ou client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/30 outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'draft', label: 'Brouillons' },
            { id: 'sent', label: 'Envoyées' },
            { id: 'paid', label: 'Payées' },
            { id: 'overdue', label: 'En retard' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${filterStatus === tab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-6">
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
                <th className="py-3 px-3 text-right">Changer Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Chargement des factures...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Aucune facture trouvée.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
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
                      <select
                        value={inv.status}
                        onChange={(e) =>
                          handleStatusChange(inv.id, e.target.value as InvoiceStatus)
                        }
                        className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300 outline-none"
                      >
                        <option value="draft">Brouillon</option>
                        <option value="sent">Envoyée</option>
                        <option value="paid">Payée</option>
                        <option value="overdue">En retard</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
