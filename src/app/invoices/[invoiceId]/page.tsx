import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { Invoices } from '@/db/schema';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';

interface PageProps {
  params: {
    invoiceId: string;
  };
}

const InvoicePage = async ({ params }: PageProps) => {
  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  return (
    <Container>
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">Invoice #{invoiceId}</h1>
        <Badge
          className={cn(
            'rounded-full text-white capitalize',
            result.status === 'open' && 'bg-green-500',
            result.status === 'paid' && 'bg-green-600',
            result.status === 'void' && 'bg-zinc-700',
            result.status === 'uncollectible' && 'bg-red-600'
          )}
        >
          {result.status}
        </Badge>
      </div>
      <p className="text-3xl mb-3">${(result.value / 100).toFixed(2)}</p>

      <ul className="mt-10">
        <p className="font-bold mb-2 text-lg">Billing Details</p>
        <li>Invoice ID: {invoiceId}</li>
        <li>Invoice Date: {new Date(result.createTs).toLocaleDateString()}</li>
        <li>Billing Name: John Doe</li>
        <li>Billing Email: john@gmail.com</li>
      </ul>
    </Container>
  );
};

export default InvoicePage;
