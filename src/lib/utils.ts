import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CurrencyCode, InvoiceItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: CurrencyCode = 'XOF'): string {
  if (currency === 'XOF' || currency === 'XAF') {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(amount).replace('CFA', 'FCFA');
  }

  if (currency === 'EUR') {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function calculateTotals(
  items: InvoiceItem[],
  discountAmount: number = 0
) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  
  // Calculate total tax from items
  const taxAmount = items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice;
    return sum + (itemSubtotal * (item.taxRate / 100));
  }, 0);

  const totalAmount = Math.max(0, subtotal - discountAmount + taxAmount);

  return {
    subtotal,
    taxAmount,
    discountAmount,
    totalAmount,
  };
}

export function generateInvoiceNumber(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `#INV-${randomNum}-000`;
}
