'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowUpDown,
  Wallet,
  FileText,
  PieChart,
  BarChart3,
  HelpCircle,
  Settings,
  Moon,
  Sun,
  Search,
  Users,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_COMPANY_PROFILE } from '@/lib/mockData';

interface SidebarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Transactions', icon: ArrowUpDown, href: '/transactions' },
    { label: 'Wallet', icon: Wallet, href: '/wallet' },
    { label: 'Invoice', icon: FileText, href: '/invoices' },
    { label: 'Clients', icon: Users, href: '/clients' },
    { label: 'Budgeting', icon: PieChart, href: '/budgeting' },
    { label: 'Reports', icon: BarChart3, href: '/reports' },
  ];

  const bottomItems = [
    { label: 'Help and Support', icon: HelpCircle, href: '/support' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between h-screen sticky top-0 z-30 transition-colors">
      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center space-x-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            <span className="text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
              creatinf
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
              Billing & Facturation
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative px-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">
            ⌘F
          </span>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <span className="px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Menu
          </span>
          <nav className="mt-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/invoices' && pathname.startsWith('/invoices'));
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group',
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={cn('w-4 h-4 transition-transform group-hover:scale-110', isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400')} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Lower Section */}
        <div className="space-y-1 pt-4 border-t border-slate-100 dark:border-slate-800">
          <nav className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all',
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  )}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Dark Mode Switch */}
            <div className="flex items-center justify-between px-3 py-2.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-3">
                {isDarkMode ? <Moon className="w-4 h-4 text-slate-400" /> : <Sun className="w-4 h-4 text-slate-400" />}
                <span>Dark Mode</span>
              </div>
              <button
                type="button"
                onClick={onToggleDarkMode}
                className={cn(
                  'w-9 h-5 rounded-full p-0.5 transition-colors relative flex items-center',
                  isDarkMode ? 'bg-blue-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                )}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <Link href="/settings" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm overflow-hidden flex-shrink-0">
              S
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {MOCK_COMPANY_PROFILE.name}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {MOCK_COMPANY_PROFILE.email}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
        </Link>
      </div>
    </aside>
  );
};
