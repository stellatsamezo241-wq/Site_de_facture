'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Smartphone,
  Globe,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              <span className="text-xl">C</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              creatinf
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-white transition">Fonctionnalités</a>
            <a href="#demo" className="hover:text-white transition">Démo</a>
            <a href="#pricing" className="hover:text-white transition">Tarifs</a>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5"
            >
              Essai Gratuit
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto text-center space-y-8">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SaaS N°1 de Facturation pour Entrepreneurs en Afrique</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Gérez vos Factures en FCFA, la TVA 18% &amp; vos Paiements Mobile Money.
        </h1>

        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Formulaire de facturation ultra-rapide avec aperçu en temps réel, export PDF haute définition et mentions légales UEMOA/CEMAC (NINEA, IFU, RCCM).
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-500/30 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>Démarrer Gratuitement</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-2xl text-sm font-bold transition flex items-center justify-center space-x-2"
          >
            <span>Explorer le Dashboard Démo</span>
          </Link>
        </div>

        {/* Product Visual Mockup */}
        <div id="demo" className="pt-12 relative max-w-5xl mx-auto">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-4 md:p-6 backdrop-blur-xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-500 font-mono ml-2">creatinf.com/invoices/new</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
                Aperçu Temps Réel
              </span>
            </div>

            {/* Split Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400">Éditeur de Facture</span>
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-900 rounded-xl text-xs flex justify-between font-semibold">
                    <span className="text-slate-400">Client:</span>
                    <span className="text-white">Cansaas Agency SARL</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl text-xs flex justify-between font-semibold">
                    <span className="text-slate-400">Prestation:</span>
                    <span className="text-white">Développement SaaS (2 500 000 FCFA)</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl text-xs flex justify-between font-semibold">
                    <span className="text-slate-400">TVA:</span>
                    <span className="text-blue-400 font-bold">18% (450 000 FCFA)</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white text-slate-900 rounded-2xl shadow-xl space-y-3">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="font-black text-base text-slate-900">FACTURE</span>
                    <p className="text-[10px] text-slate-400">#INV-345442-000</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    ✳
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Total Net à Payer:</span>
                    <span className="text-blue-600 font-black text-sm">2 950 000 FCFA</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Règlement: Wave (+221 77 123 45 67) &amp; RIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Pensé pour la Réalité des Entreprises Africaines
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Gagnez du temps et soyez 100% conforme avec les exigences administratives et financières locales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Conformité TVA 18% &amp; NINEA</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calcul automatique de la TVA UEMOA/CEMAC à 18% et intégration explicite des identifiants NINEA, IFU et RCCM.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Mobile Money &amp; RIB Bancaire</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Incorporez directement vos numéros Wave, Orange Money et RIB bancaire sur vos factures pour des règlements 5x plus rapides.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Export PDF Instantané</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Générez et téléchargez des factures au format PDF ultra-nettes ou partagez-les directement par e-mail à vos clients.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Tarifs Transparents &amp; Adaptés
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Optez pour le plan qui correspond à la taille de votre entreprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="p-8 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h3 className="font-bold text-base text-white">Starter</h3>
              <p className="text-xs text-slate-400 mt-1">Idéal pour les indépendants</p>
            </div>
            <div className="text-3xl font-black text-white">
              0 FCFA <span className="text-xs text-slate-500 font-normal">/ mois</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Jusqu'à 10 factures / mois</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Export PDF HD</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Devise Franc CFA (FCFA)</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block text-center py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold transition"
            >
              Commencer
            </Link>
          </div>

          {/* Pro Business */}
          <div className="p-8 bg-gradient-to-b from-blue-900/60 to-slate-900 rounded-3xl border-2 border-blue-500 space-y-6 relative shadow-2xl">
            <span className="absolute -top-3.5 right-6 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-full">
              Populaire
            </span>
            <div>
              <h3 className="font-bold text-base text-white">Pro Business</h3>
              <p className="text-xs text-blue-200 mt-1">Pour les TPE &amp; PME en croissance</p>
            </div>
            <div className="text-3xl font-black text-white">
              15 000 FCFA <span className="text-xs text-slate-400 font-normal">/ mois</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Factures illimitées</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Calcul TVA 18% &amp; NINEA / IFU</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Intégration Mobile Money Wave</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Relance client automatique</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block text-center py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/30 transition"
            >
              Passer Pro
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-8 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h3 className="font-bold text-base text-white">Entreprise</h3>
              <p className="text-xs text-slate-400 mt-1">Grands comptes &amp; agences</p>
            </div>
            <div className="text-3xl font-black text-white">
              Sur Mesure
            </div>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Multi-utilisateurs &amp; Rôles</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>API &amp; Webhooks</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Support dédié 24/7</span>
              </li>
            </ul>
            <Link
              href="/support"
              className="block text-center py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold transition"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            C
          </div>
          <span className="font-bold text-white text-sm">creatinf</span>
        </div>
        <p>© 2026 creatinf. Tous droits réservés. Conçu pour les entrepreneurs africains.</p>
      </footer>
    </div>
  );
}
