'use server';

import { redirect } from 'next/navigation';
import { Invoices, Status } from '@/db/schema';
import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

export async function createInvoice(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const value = Math.floor(parseFloat(formData.get('value') as string) * 100);
  const description = formData.get('description') as string;

  const results = await db.insert(Invoices).values({
    value,
    description,
    userId,
    status: 'open',
  }).returning({ id: Invoices.id })

  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
  console.log('updateStatusAction');
  const { userId } = await auth();
  if (!userId) return;

  const id = formData.get('id') as string;
  const status = formData.get('status') as Status;

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(
      and(
        eq(Invoices.id, Number.parseInt(id)),
        eq(Invoices.userId, userId),
      ),
    );

  console.log(results);
}