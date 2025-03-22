'use server';

import { redirect } from 'next/navigation';
import { Customers, Invoices, Status } from '@/db/schema';
import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createInvoice(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const value = Math.floor(parseFloat(formData.get('value') as string) * 100);
  const description = formData.get('description') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  const [customer] = await db.insert(Customers).values({
    name,
    email,
    userId,
  }).returning({ id: Customers.id })

  const results = await db.insert(Invoices).values({
    value,
    description,
    userId,
    customerId: customer.id,
    status: 'open',
  }).returning({ id: Invoices.id })

  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {

  const { userId } = await auth();
  if (!userId) return;

  const id = formData.get('id') as string;
  const status = formData.get('status') as Status;

  await db
    .update(Invoices)
    .set({ status })
    .where(
      and(
        eq(Invoices.id, Number.parseInt(id)),
        eq(Invoices.userId, userId),
      ),
    );

  revalidatePath(`/invoices/${id}`, "page");
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const id = formData.get('id') as string;

  await db.delete(Invoices).where(
    and(
      eq(Invoices.id, Number.parseInt(id)),
      eq(Invoices.userId, userId),
    ),
  );

  redirect('/dashboard');
}