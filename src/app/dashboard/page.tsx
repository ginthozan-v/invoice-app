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

export default function DashboardPage() {
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
          <TableRow>
            <TableCell className="text-left font-bold p-4">
              10/21/2024
            </TableCell>
            <TableCell className="text-left font-bold p-4">John Doe</TableCell>
            <TableCell className="text-left p-4">john@gmail.com</TableCell>
            <TableCell className="text-center p-4">
              <Badge className="rounded-full bg-blue-500 text-white">
                Badge
              </Badge>
            </TableCell>
            <TableCell className="text-right p-4">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left font-bold p-4">
              10/21/2024
            </TableCell>
            <TableCell className="text-left font-bold p-4">John Doe</TableCell>
            <TableCell className="text-left p-4">john@gmail.com</TableCell>
            <TableCell className="text-center p-4">
              <Badge className="rounded-full bg-blue-500 text-white">
                Badge
              </Badge>
            </TableCell>
            <TableCell className="text-right p-4">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
