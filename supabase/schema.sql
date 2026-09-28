-- ========================================================
-- SAAS FACTURATION AFRIQUE - SCHÉMA DE BASE DE DONNÉES SUPABASE
-- ========================================================

-- 1. Table des Profils d'Entreprise Émettrices
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  logo_url TEXT,
  tax_id TEXT, -- NINEA / IFU
  rccm TEXT,   -- N° Registre du commerce
  bank_name TEXT,
  iban TEXT,   -- RIB bancaire
  mobile_money_number TEXT, -- Wave / Orange Money
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des Clients
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table des Factures
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  invoice_number TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_address TEXT NOT NULL,
  sender_tax_id TEXT,
  sender_logo_url TEXT,
  
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_address TEXT NOT NULL,
  
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
  type TEXT NOT NULL DEFAULT 'standard' CHECK (type IN ('standard', 'split', 'recurring')),
  currency TEXT NOT NULL DEFAULT 'XOF' CHECK (currency IN ('XOF', 'XAF', 'EUR', 'USD')),
  
  subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
  
  notes TEXT,
  payment_method_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table des Lignes de Facture (Items / Services)
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(15, 2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 18,
  amount NUMERIC(15, 2) NOT NULL DEFAULT 0
);

-- Index pour accélérer les requêtes
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);

-- Données d'exemple (Seed SQL)
INSERT INTO public.clients (id, name, email, phone, address, company_name)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Cansaas Agency', 'cansaas.creatinf@gmail.com', '+221 78 456 78 90', '123 Mapple, Metropolis Street', 'Cansaas Agency SARL'),
  ('22222222-2222-2222-2222-222222222222', 'AfriTech Solutions', 'contact@afritech.sn', '+221 33 820 12 34', 'Avenue Cheikh Anta Diop, Dakar', 'AfriTech Solutions SA')
ON CONFLICT (id) DO NOTHING;
