import { Client, CompanyProfile, Invoice, CurrencyOption } from '@/types';

export const CURRENCIES: CurrencyOption[] = [
  { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (BCEAO)' },
  { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA (BEAC)' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
];

export const MOCK_COMPANY_PROFILE: CompanyProfile = {
  id: 'comp-1',
  name: 'Angelina Caroline',
  email: 'angelina.creatinf@gmail.com',
  phone: '+221 77 123 45 67',
  address: '14 Persimmon, Springfield, IN 54129',
  logoUrl: '',
  taxId: 'NINEA 008451923 2V3',
  rccm: 'SN-DKR-2024-B-12890',
  bankName: 'CBAO Groupe Attijariwafa Bank',
  iban: 'SN12 0100 1001 332176141910 371',
  mobileMoneyNumber: '+221 77 123 45 67 (Wave / Orange Money)',
};

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'client-1',
    name: 'Cansaas Agency',
    email: 'cansaas.creatinf@gmail.com',
    phone: '+221 78 456 78 90',
    address: '123 Mapple, Metropolis Street',
    companyName: 'Cansaas Agency SARL',
    createdAt: '2026-01-05',
  },
  {
    id: 'client-2',
    name: 'AfriTech Solutions',
    email: 'contact@afritech.sn',
    phone: '+221 33 820 12 34',
    address: 'Avenue Cheikh Anta Diop, Dakar',
    companyName: 'AfriTech Solutions SA',
    createdAt: '2026-01-10',
  },
  {
    id: 'client-3',
    name: 'Kouassi & Associés',
    email: 'contact@kouassi-law.ci',
    phone: '+225 07 08 09 10 11',
    address: 'Plateau, Boulevard Chardy, Abidjan',
    companyName: 'Kouassi & Associés',
    createdAt: '2026-01-15',
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: '#INV-345442-000',
    senderName: 'Angelina Caroline',
    senderEmail: 'angelina.creatinf@gmail.com',
    senderAddress: '14 Persimmon, Springfield, IN 54129',
    senderTaxId: 'NINEA 008451923 2V3',
    
    clientId: 'client-1',
    clientName: 'Cansaas Agency',
    clientEmail: 'cansaas.creatinf@gmail.com',
    clientAddress: '123 Mapple, Metropolis Street',
    
    issueDate: '2026-01-08',
    dueDate: '2026-01-31',
    status: 'sent',
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
    createdAt: '2026-01-08',
  },
  {
    id: 'inv-2',
    invoiceNumber: '#INV-891023-001',
    senderName: 'Angelina Caroline',
    senderEmail: 'angelina.creatinf@gmail.com',
    senderAddress: '14 Persimmon, Springfield, IN 54129',
    
    clientId: 'client-2',
    clientName: 'AfriTech Solutions',
    clientEmail: 'contact@afritech.sn',
    clientAddress: 'Avenue Cheikh Anta Diop, Dakar',
    
    issueDate: '2026-02-01',
    dueDate: '2026-02-15',
    status: 'paid',
    type: 'standard',
    currency: 'XOF',
    
    items: [
      {
        id: 'item-201',
        description: 'Développement Web SaaS',
        quantity: 1,
        unitPrice: 1500000,
        taxRate: 18,
        amount: 1500000,
      },
      {
        id: 'item-202',
        description: 'Maintenance & Support (1 mois)',
        quantity: 1,
        unitPrice: 250000,
        taxRate: 18,
        amount: 250000,
      },
    ],
    
    subtotal: 1750000,
    discountRate: 0,
    discountAmount: 0,
    taxAmount: 315000,
    totalAmount: 2065000,
    
    notes: 'Payé via Wave Business. Merci pour votre confiance !',
    createdAt: '2026-02-01',
  },
  {
    id: 'inv-3',
    invoiceNumber: '#INV-110293-002',
    senderName: 'Angelina Caroline',
    senderEmail: 'angelina.creatinf@gmail.com',
    senderAddress: '14 Persimmon, Springfield, IN 54129',
    
    clientId: 'client-3',
    clientName: 'Kouassi & Associés',
    clientEmail: 'contact@kouassi-law.ci',
    clientAddress: 'Plateau, Boulevard Chardy, Abidjan',
    
    issueDate: '2026-01-20',
    dueDate: '2026-02-05',
    status: 'overdue',
    type: 'standard',
    currency: 'XOF',
    
    items: [
      {
        id: 'item-301',
        description: 'Audit & Securité Informatique',
        quantity: 1,
        unitPrice: 850000,
        taxRate: 18,
        amount: 850000,
      },
    ],
    
    subtotal: 850000,
    discountRate: 0,
    discountAmount: 0,
    taxAmount: 153000,
    totalAmount: 1003000,
    
    notes: 'Facture en retard de paiement. Merci d effectuer le virement bancaire.',
    createdAt: '2026-01-20',
  },
];
