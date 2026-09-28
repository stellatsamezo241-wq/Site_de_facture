export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export type InvoiceType = 'standard' | 'split' | 'recurring';

export type CurrencyCode = 'XOF' | 'XAF' | 'EUR' | 'USD';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  country?: string;
  companyName?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // default 18 (%)
  amount: number;
}

export interface CompanyProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  logoUrl?: string;
  taxId?: string; // NINEA / IFU / RCCM
  rccm?: string;
  bankName?: string;
  iban?: string; // RIB / IBAN
  mobileMoneyNumber?: string; // Wave / Orange Money
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  senderPhone?: string;
  senderTaxId?: string;
  senderLogoUrl?: string;
  
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  type: InvoiceType;
  currency: CurrencyCode;
  
  items: InvoiceItem[];
  
  subtotal: number;
  discountRate: number; // percentage or fixed
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  
  notes?: string;
  paymentMethodInfo?: string;
  createdAt: string;
}
