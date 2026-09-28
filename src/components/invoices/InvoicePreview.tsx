'use client';

import React from 'react';
import { Mail, FileText, CheckCircle2, Download, Send } from 'lucide-react';
import { Invoice } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface InvoicePreviewProps {
  invoice: Invoice;
  onSaveDraft?: () => void;
  onSendInvoice?: () => void;
  onDownloadPdf?: () => void;
  onEmailShare?: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  onSaveDraft,
  onSendInvoice,
  onDownloadPdf,
  onEmailShare,
}) => {
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Preview
          </span>
          <button
            type="button"
            onClick={onEmailShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Email</span>
          </button>
          <button
            type="button"
            onClick={onDownloadPdf}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>PDF</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onSaveDraft}
            className="px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={onSendInvoice}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Invoice</span>
          </button>
        </div>
      </div>

      {/* Invoice Sheet Render */}
      <div
        id="invoice-sheet-print"
        className="flex-1 bg-white text-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-card flex flex-col justify-between overflow-y-auto min-h-[680px]"
      >
        <div>
          {/* Header section */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                INVOICE
              </h1>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Invoice Number{' '}
                <span className="font-semibold text-slate-700">
                  {invoice.invoiceNumber || '#INV-000000-000'}
                </span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shadow-md">
              <span className="text-xl font-black">✳</span>
            </div>
          </div>

          {/* Billed By & Billed To */}
          <div className="grid grid-cols-2 gap-8 my-6 text-xs">
            <div>
              <span className="font-medium text-slate-400 block mb-1">
                Billed by:
              </span>
              <p className="font-bold text-slate-900 text-sm">
                {invoice.senderName || 'Angelina Caroline'}
              </p>
              <p className="text-slate-500">{invoice.senderEmail}</p>
              <p className="text-slate-500">{invoice.senderAddress}</p>
              {invoice.senderTaxId && (
                <p className="text-slate-400 font-mono text-[10px] mt-1">
                  {invoice.senderTaxId}
                </p>
              )}
            </div>

            <div>
              <span className="font-medium text-slate-400 block mb-1">
                Billed to:
              </span>
              <p className="font-bold text-slate-900 text-sm">
                {invoice.clientName || 'Select Client'}
              </p>
              <p className="text-slate-500">{invoice.clientEmail}</p>
              <p className="text-slate-500">{invoice.clientAddress}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-8 my-6 py-3 px-4 bg-slate-50 rounded-xl text-xs">
            <div>
              <span className="font-medium text-slate-400 block mb-0.5">
                Date Issue:
              </span>
              <span className="font-bold text-slate-800">
                {formatDate(invoice.issueDate)}
              </span>
            </div>
            <div>
              <span className="font-medium text-slate-400 block mb-0.5">
                Due Date:
              </span>
              <span className="font-bold text-slate-800">
                {formatDate(invoice.dueDate)}
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-6">
            <span className="text-xs font-semibold text-slate-400 block mb-3">
              Invoice Items/Service:
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-medium">
                    <th className="py-2.5 px-2">Item Name</th>
                    <th className="py-2.5 px-2 text-center">QTY</th>
                    <th className="py-2.5 px-2 text-center">Tax %</th>
                    <th className="py-2.5 px-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400 italic">
                        No items added yet.
                      </td>
                    </tr>
                  ) : (
                    invoice.items.map((item) => (
                      <tr key={item.id} className="text-slate-800 font-medium">
                        <td className="py-3 px-2 font-semibold">
                          {item.description || 'Service Item'}
                        </td>
                        <td className="py-3 px-2 text-center text-slate-600">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-2 text-center text-slate-600">
                          {item.taxRate}%
                        </td>
                        <td className="py-3 px-2 text-right font-bold">
                          {formatCurrency(item.quantity * item.unitPrice, invoice.currency)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Totals */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col items-end space-y-2 text-xs">
            <div className="flex justify-between w-64 text-slate-500">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">
                {formatCurrency(invoice.subtotal, invoice.currency)}
              </span>
            </div>
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between w-64 text-slate-500">
                <span>Discount</span>
                <span className="font-bold text-emerald-600">
                  -{formatCurrency(invoice.discountAmount, invoice.currency)}
                </span>
              </div>
            )}
            {invoice.taxAmount > 0 && (
              <div className="flex justify-between w-64 text-slate-500">
                <span>TVA (Tax)</span>
                <span className="font-bold text-slate-800">
                  +{formatCurrency(invoice.taxAmount, invoice.currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between w-64 pt-2 border-t border-slate-200 text-slate-900 font-black text-sm">
              <span>Grand Total</span>
              <span className="text-blue-600 font-bold">
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Notes & Payment Method & Signature */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-4 text-[11px]">
          {invoice.notes && (
            <div className="p-3 bg-slate-50 rounded-xl text-slate-500">
              <span className="font-semibold text-slate-700 block mb-0.5">Note:</span>
              {invoice.notes}
            </div>
          )}

          <div className="flex items-end justify-between pt-2">
            <div>
              <span className="font-bold text-slate-800 block">Payment Method</span>
              <p className="text-slate-500">
                {invoice.paymentMethodInfo || 'EFT Bank Transfer / Mobile Money (Wave, Orange Money)'}
              </p>
              <p className="text-slate-400 font-mono text-[10px] mt-0.5">
                Account Number : 332176141910371
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-lg text-slate-700">
                  {invoice.senderName || 'Angelina Caroline'}
                </span>
              </div>
              <div className="w-32 border-t border-slate-300 pt-1 text-center font-medium text-slate-500 text-[10px]">
                {invoice.senderName || 'Authorized Signature'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
