import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

import { db } from '@/db';
import { Invoices } from '@/db/schema';
import { cn } from '@/lib/utils';

export default async function DashboardPage() {
  const results = await db.select().from(Invoices);

  return (
    <main className="flex flex-col justify-center items-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Button variant="ghost" className="inline-flex gap-2" asChild>
          <Link href="/invoices/new">
            <CirclePlus className="h-4 w-4" /> Create invoice
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results?.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-neutral-50">
              <TableCell className="text-left font-bold  p-0">
                <Link href={`/invoices/${invoice.id}`} className="block p-4">
                  {new Date(invoice.createTs).toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="text-left font-bold p-0">
                <Link href={`/invoices/${invoice.id}`} className="block p-4">
                  John Doe
                </Link>
              </TableCell>
              <TableCell className="text-left p-0">
                <Link href={`/invoices/${invoice.id}`} className="block p-4">
                  john@gmail.com
                </Link>
              </TableCell>
              <TableCell className="text-center p-0">
                <Link href={`/invoices/${invoice.id}`} className="block p-4">
                  <Badge
                    className={cn(
                      'rounded-full text-white capitalize',
                      invoice.status === 'open' && 'bg-green-500',
                      invoice.status === 'paid' && 'bg-green-600',
                      invoice.status === 'void' && 'bg-zinc-700',
                      invoice.status === 'uncollectible' && 'bg-red-600'
                    )}
                  >
                    {invoice.status}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell className="text-right p-0">
                <Link href={`/invoices/${invoice.id}`} className="block p-4">
                  ${(invoice.value / 100).toFixed(2)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
