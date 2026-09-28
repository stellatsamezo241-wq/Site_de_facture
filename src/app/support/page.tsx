'use client';

import React from 'react';
import { HelpCircle, Mail, MessageSquare, PhoneCall } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Aide & Assistance
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Besoin d'aide pour configurer vos factures ou vos comptes Mobile Money ?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Chat Direct</h3>
          <p className="text-xs text-slate-400">Assistance instantanée WhatsApp</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Email Support</h3>
          <p className="text-xs text-slate-400">support@creatinf.com</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Téléphone</h3>
          <p className="text-xs text-slate-400">+221 33 800 00 00</p>
        </div>
      </div>
    </div>
  );
}
