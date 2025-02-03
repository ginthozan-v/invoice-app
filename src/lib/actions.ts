'use server';

import { redirect } from 'next/navigation';
import { Invoices } from '@/db/schema';
import { db } from '@/db';

export async function createInvoice(formData: FormData) {
  const value = Math.floor(parseFloat(formData.get('value') as string) * 100);
  const description = formData.get('description') as string;

  const results = await db.insert(Invoices).values({
    value,
    description,
    status: 'open',
  }).returning({ id: Invoices.id })

  redirect(`/invoices/${results[0].id}`);
}
