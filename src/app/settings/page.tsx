'use client';

import React, { useState } from 'react';
import {
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Check,
  ShieldCheck,
  Smartphone,
  Save,
} from 'lucide-react';
import { MOCK_COMPANY_PROFILE } from '@/lib/mockData';
import { CompanyProfile } from '@/types';

export default function SettingsPage() {
  const [profile, setProfile] = useState<CompanyProfile>(MOCK_COMPANY_PROFILE);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Paramètres de l'Entreprise
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configurez vos informations légales, votre logo et vos méthodes de règlement.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-xl animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>Paramètres enregistrés !</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identité de l'entreprise */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Building className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Identité de l'Émetteur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Nom ou Raison Sociale
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Email professionnel
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Téléphone principal
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Adresse complète
              </label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Mentions Légales & Fiscalité */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Identifiants Fiscaux (NINEA / IFU / RCCM)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                N° NINEA / IFU (Identifiant Fiscal Unique)
              </label>
              <input
                type="text"
                value={profile.taxId || ''}
                onChange={(e) => setProfile({ ...profile, taxId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold outline-none"
                placeholder="ex. NINEA 008451923 2V3"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                N° RCCM (Registre du Commerce)
              </label>
              <input
                type="text"
                value={profile.rccm || ''}
                onChange={(e) => setProfile({ ...profile, rccm: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold outline-none"
                placeholder="ex. SN-DKR-2024-B-12890"
              />
            </div>
          </div>
        </div>

        {/* Coordonnées bancaires & Mobile Money */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Modalités de Règlement (RIB & Mobile Money)
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Nom de la Banque & Numéro de Compte RIB / IBAN
              </label>
              <input
                type="text"
                value={profile.iban || ''}
                onChange={(e) => setProfile({ ...profile, iban: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold outline-none"
                placeholder="ex. SN12 0100 1001 332176141910 371"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Numéro Mobile Money (Wave / Orange Money / MTN)</span>
              </label>
              <input
                type="text"
                value={profile.mobileMoneyNumber || ''}
                onChange={(e) => setProfile({ ...profile, mobileMoneyNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                placeholder="ex. +221 77 123 45 67 (Wave)"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les Modifications</span>
          </button>
        </div>
      </form>
    </div>
  );
}
