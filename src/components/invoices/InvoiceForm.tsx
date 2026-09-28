'use client';

import React from 'react';
import {
  Calendar,
  Trash2,
  Plus,
  User,
  Building,
  DollarSign,
  Percent,
  Check,
  ChevronDown,
} from 'lucide-react';
import { Invoice, InvoiceItem, InvoiceType, CurrencyCode, Client } from '@/types';
import { CURRENCIES, MOCK_CLIENTS } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface InvoiceFormProps {
  invoice: Invoice;
  onChange: (updated: Invoice) => void;
  showPreview: boolean;
  onTogglePreview: () => void;
  clients?: Client[];
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onChange,
  showPreview,
  onTogglePreview,
  clients = MOCK_CLIENTS,
}) => {
  const handleTypeChange = (type: InvoiceType) => {
    onChange({ ...invoice, type });
  };

  const handleClientSelect = (clientId: string) => {
    const selected = clients.find((c) => c.id === clientId);
    if (selected) {
      onChange({
        ...invoice,
        clientId: selected.id,
        clientName: selected.companyName || selected.name,
        clientEmail: selected.email,
        clientAddress: selected.address,
      });
    }
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: 'New Service / Product',
      quantity: 1,
      unitPrice: 1000,
      taxRate: 18, // Default 18% TVA Africa
      amount: 1000,
    };

    const updatedItems = [...invoice.items, newItem];
    recalculateInvoice(updatedItems, invoice.discountAmount, invoice.currency);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = invoice.items.filter((item) => item.id !== id);
    recalculateInvoice(updatedItems, invoice.discountAmount, invoice.currency);
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = invoice.items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.amount = Number(updated.quantity) * Number(updated.unitPrice);
        }
        return updated;
      }
      return item;
    });

    recalculateInvoice(updatedItems, invoice.discountAmount, invoice.currency);
  };

  const recalculateInvoice = (
    items: InvoiceItem[],
    discount: number,
    currency: CurrencyCode
  ) => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice * (item.taxRate / 100),
      0
    );
    const totalAmount = Math.max(0, subtotal - discount + taxAmount);

    onChange({
      ...invoice,
      currency,
      items,
      subtotal,
      discountAmount: discount,
      taxAmount,
      totalAmount,
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium mb-1">
            <span>Invoice</span>
            <span>&gt;</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              Create Invoice
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Create Invoice
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create a new invoice and deliver it instantly.
          </p>
        </div>

        {/* Show Preview Pill Toggle Switch */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-semibold px-2 text-slate-700 dark:text-slate-300">
            Show Preview
          </span>
          <button
            type="button"
            onClick={onTogglePreview}
            className={cn(
              'w-9 h-5 rounded-full p-0.5 transition-colors relative flex items-center',
              showPreview ? 'bg-blue-600 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'
            )}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
          </button>
        </div>
      </div>

      {/* Invoice Type Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
        {(['standard', 'split', 'recurring'] as InvoiceType[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTypeChange(tab)}
            className={cn(
              'flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all',
              invoice.type === tab
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Invoice Information Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Invoice Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Full Name<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={invoice.senderName}
                onChange={(e) => onChange({ ...invoice, senderName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                placeholder="Angelina Caroline"
              />
            </div>
          </div>

          {/* Billed To */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Billed To<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
              <select
                value={invoice.clientId}
                onChange={(e) => handleClientSelect(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition appearance-none"
              >
                <option value="">Select a Client...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.companyName || client.name} ({client.email})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Date Issue */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Date Issue<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={invoice.issueDate}
                onChange={(e) => onChange({ ...invoice, issueDate: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Due Date<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => onChange({ ...invoice, dueDate: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Invoice Number */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => onChange({ ...invoice, invoiceNumber: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Invoice Items/Service Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Invoice Items/Service
          </h2>

          {/* Currency Dropdown */}
          <div className="w-44">
            <select
              value={invoice.currency}
              onChange={(e) =>
                recalculateInvoice(invoice.items, invoice.discountAmount, e.target.value as CurrencyCode)
              }
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none transition"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Item Cards */}
        <div className="space-y-3">
          {invoice.items.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Item {index + 1}
                </span>
                {invoice.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">
                  Item Name
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500/30 outline-none"
                  placeholder="e.g. Brand Guidelines"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* QTY */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500">
                    QTY
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-center"
                  />
                </div>

                {/* Tax Rate */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500">
                    TVA (Tax %)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={item.taxRate}
                    onChange={(e) => handleItemChange(item.id, 'taxRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-center"
                  />
                </div>

                {/* Unit Price / Amount */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500">
                    Prix Unitaire
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-right"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <button
          type="button"
          onClick={handleAddItem}
          className="w-full py-2.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center space-x-2 transition"
        >
          <Plus className="w-4 h-4 text-blue-600" />
          <span>Add Items</span>
        </button>
      </div>

      {/* Discount Section */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={invoice.discountAmount > 0}
            onChange={(e) => {
              const discount = e.target.checked ? 2500 : 0;
              recalculateInvoice(invoice.items, discount, invoice.currency);
            }}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
          />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Add Discount
          </span>
        </label>

        {invoice.discountAmount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Montant remise:</span>
            <input
              type="number"
              min="0"
              value={invoice.discountAmount}
              onChange={(e) =>
                recalculateInvoice(invoice.items, parseFloat(e.target.value) || 0, invoice.currency)
              }
              className="w-28 px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-right"
            />
          </div>
        )}
      </div>
    </div>
  );
};
