import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-[75dvh] text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Invoicepedia</h1>
      <Button className="bg-black text-white w-auto" asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </main>
  );
}
