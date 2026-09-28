import { createClient } from './client';
import { MOCK_INVOICES, MOCK_CLIENTS, MOCK_COMPANY_PROFILE } from '@/lib/mockData';
import { Invoice, Client, CompanyProfile, InvoiceStatus } from '@/types';

// Client Service
export async function fetchClients(): Promise<Client[]> {
  const supabase = createClient();
  if (!supabase) return MOCK_CLIENTS;

  try {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (error || !data) return MOCK_CLIENTS;

    return data.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone || '',
      address: c.address || '',
      companyName: c.company_name || c.name,
      createdAt: c.created_at,
    }));
  } catch (err) {
    return MOCK_CLIENTS;
  }
}

export async function saveClient(client: Client): Promise<Client> {
  const supabase = createClient();
  if (!supabase) return client;

  try {
    const { data, error } = await supabase.from('clients').upsert({
      id: client.id.startsWith('client-') ? undefined : client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      company_name: client.companyName,
    }).select().single();

    if (error || !data) return client;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      companyName: data.company_name,
      createdAt: data.created_at,
    };
  } catch (err) {
    return client;
  }
}

// Invoices Service
export async function fetchInvoices(): Promise<Invoice[]> {
  const supabase = createClient();
  if (!supabase) return MOCK_INVOICES;

  try {
    const { data: invData, error } = await supabase
      .from('invoices')
      .select('*, invoice_items(*)')
      .order('created_at', { ascending: false });

    if (error || !invData || invData.length === 0) return MOCK_INVOICES;

    return invData.map((inv: any) => ({
      id: inv.id,
      invoiceNumber: inv.invoice_number,
      senderName: inv.sender_name,
      senderEmail: inv.sender_email,
      senderAddress: inv.sender_address,
      senderTaxId: inv.sender_tax_id,
      clientId: inv.client_id,
      clientName: inv.client_name,
      clientEmail: inv.client_email,
      clientAddress: inv.client_address,
      issueDate: inv.issue_date,
      dueDate: inv.due_date,
      status: inv.status as InvoiceStatus,
      type: inv.type,
      currency: inv.currency,
      items: (inv.invoice_items || []).map((item: any) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: Number(item.unit_price),
        taxRate: Number(item.tax_rate),
        amount: Number(item.amount),
      })),
      subtotal: Number(inv.subtotal),
      discountRate: 0,
      discountAmount: Number(inv.discount_amount),
      taxAmount: Number(inv.tax_amount),
      totalAmount: Number(inv.total_amount),
      notes: inv.notes,
      paymentMethodInfo: inv.payment_method_info,
      createdAt: inv.created_at,
    }));
  } catch (err) {
    return MOCK_INVOICES;
  }
}

export async function saveInvoice(invoice: Invoice): Promise<Invoice> {
  const supabase = createClient();
  if (!supabase) return invoice;

  try {
    // Upsert Invoice Header
    const { data: invData, error: invError } = await supabase
      .from('invoices')
      .upsert({
        invoice_number: invoice.invoiceNumber,
        sender_name: invoice.senderName,
        sender_email: invoice.senderEmail,
        sender_address: invoice.senderAddress,
        sender_tax_id: invoice.senderTaxId,
        client_id: invoice.clientId.startsWith('client-') ? null : invoice.clientId,
        client_name: invoice.clientName,
        client_email: invoice.clientEmail,
        client_address: invoice.clientAddress,
        issue_date: invoice.issueDate,
        due_date: invoice.dueDate,
        status: invoice.status,
        type: invoice.type,
        currency: invoice.currency,
        subtotal: invoice.subtotal,
        discount_amount: invoice.discountAmount,
        tax_amount: invoice.taxAmount,
        total_amount: invoice.totalAmount,
        notes: invoice.notes,
        payment_method_info: invoice.paymentMethodInfo,
      })
      .select()
      .single();

    if (invError || !invData) return invoice;

    // Delete & Insert Items
    await supabase.from('invoice_items').delete().eq('invoice_id', invData.id);

    const itemsToInsert = invoice.items.map((item) => ({
      invoice_id: invData.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      tax_rate: item.taxRate,
      amount: item.amount,
    }));

    await supabase.from('invoice_items').insert(itemsToInsert);

    return { ...invoice, id: invData.id };
  } catch (err) {
    return invoice;
  }
}

export async function updateInvoiceStatusInDb(id: string, status: InvoiceStatus): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) return true;

  try {
    const { error } = await supabase.from('invoices').update({ status }).eq('id', id);
    return !error;
  } catch (err) {
    return false;
  }
}
