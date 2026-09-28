'use client';

import React, { useState, useEffect } from 'react';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { InvoicePreview } from '@/components/invoices/InvoicePreview';
import { MOCK_CLIENTS, MOCK_COMPANY_PROFILE } from '@/lib/mockData';
import { fetchClients, saveInvoice } from '@/lib/supabase/service';
import { Invoice, Client } from '@/types';
import { generateInvoiceNumber } from '@/lib/utils';
import { Check, Mail, Send, X } from 'lucide-react';

export default function NewInvoicePage() {
  const [showPreview, setShowPreview] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);

  useEffect(() => {
    async function loadData() {
      const clientData = await fetchClients();
      if (clientData && clientData.length > 0) {
        setClients(clientData);
      }
    }
    loadData();
  }, []);

  // Initialize draft invoice with default company profile & first client
  const [invoice, setInvoice] = useState<Invoice>({
    id: `inv-${Date.now()}`,
    invoiceNumber: generateInvoiceNumber(),
    senderName: MOCK_COMPANY_PROFILE.name,
    senderEmail: MOCK_COMPANY_PROFILE.email,
    senderAddress: MOCK_COMPANY_PROFILE.address,
    senderTaxId: MOCK_COMPANY_PROFILE.taxId,
    
    clientId: clients[0]?.id || 'client-1',
    clientName: clients[0]?.companyName || clients[0]?.name || 'Cansaas Agency',
    clientEmail: clients[0]?.email || 'cansaas.creatinf@gmail.com',
    clientAddress: clients[0]?.address || '123 Mapple, Metropolis Street',
    
    issueDate: '2026-01-08',
    dueDate: '2026-01-31',
    status: 'draft',
    type: 'standard',
    currency: 'USD',
    
    items: [
      {
        id: 'item-1',
        description: 'Brand Guidelines',
        quantity: 2,
        unitPrice: 1250,
        taxRate: 10,
        amount: 2500,
      },
      {
        id: 'item-2',
        description: 'Logo Usage',
        quantity: 3,
        unitPrice: 1000,
        taxRate: 10,
        amount: 3000,
      },
      {
        id: 'item-3',
        description: 'Color Palette',
        quantity: 4,
        unitPrice: 1000,
        taxRate: 10,
        amount: 4000,
      },
      {
        id: 'item-4',
        description: 'Typography Standards',
        quantity: 5,
        unitPrice: 1000,
        taxRate: 10,
        amount: 5000,
      },
    ],
    
    subtotal: 14500,
    discountRate: 0,
    discountAmount: 2500,
    taxAmount: 0,
    totalAmount: 12000,
    
    notes: 'Late payments will incur a 10% annual fee, calculated daily.',
    paymentMethodInfo: 'EFT Bank Transfer - Account Number: 332176141910371',
    createdAt: new Date().toISOString().split('T')[0],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveDraft = async () => {
    const draftInvoice = { ...invoice, status: 'draft' as const };
    await saveInvoice(draftInvoice);
    showToast('Facture sauvegardée en brouillon avec succès !');
  };

  const handleSendInvoice = async () => {
    const sentInvoice = { ...invoice, status: 'sent' as const };
    await saveInvoice(sentInvoice);
    showToast(`Facture ${invoice.invoiceNumber} envoyée avec succès à ${invoice.clientEmail} !`);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-2xl animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Split Screen Layout matching screenshot */}
      <div className={`grid grid-cols-1 ${showPreview ? 'lg:grid-cols-12' : ''} gap-8 items-start`}>
        {/* Left Column: Invoice Form */}
        <div className={showPreview ? 'lg:col-span-7' : 'w-full max-w-3xl mx-auto'}>
          <InvoiceForm
            invoice={invoice}
            onChange={setInvoice}
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview((prev) => !prev)}
            clients={clients}
          />
        </div>

        {/* Right Column: Live Sheet Preview */}
        {showPreview && (
          <div className="lg:col-span-5 sticky top-6">
            <InvoicePreview
              invoice={invoice}
              onSaveDraft={handleSaveDraft}
              onSendInvoice={handleSendInvoice}
              onDownloadPdf={handleDownloadPdf}
              onEmailShare={() => setIsEmailModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Email Share Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Envoyer la Facture par Email
                </h3>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">
                  Destinataire:
                </label>
                <input
                  type="email"
                  value={invoice.clientEmail}
                  onChange={(e) => setInvoice({ ...invoice, clientEmail: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">
                  Objet:
                </label>
                <input
                  type="text"
                  defaultValue={`Facture ${invoice.invoiceNumber} de ${invoice.senderName}`}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">
                  Message:
                </label>
                <textarea
                  rows={3}
                  defaultValue={`Bonjour,\nVeuillez trouver ci-joint votre facture ${invoice.invoiceNumber} d'un montant de ${invoice.totalAmount} ${invoice.currency}.\n\nCordialement,`}
                  className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setIsEmailModalOpen(false);
                  handleSendInvoice();
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
