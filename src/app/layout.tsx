'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <html lang="fr" className={isDarkMode ? 'dark' : ''}>
      <head>
        <title>creatinf - SaaS Facturation Afrique</title>
        <meta
          name="description"
          content="Plateforme moderne de facturation et gestion financière pour entrepreneurs africains."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased min-h-screen flex">
        {/* Persistent App Layout */}
        <Sidebar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

        {/* Main Workspace Area */}
        <main className="flex-1 min-w-0 min-h-screen p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
