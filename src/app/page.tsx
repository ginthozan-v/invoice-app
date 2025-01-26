import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Invoicepedia</h1>
      <Button className='bg-black text-white w-auto' asChild>
        <Link href="/dashboard">Sign in</Link>
      </Button>
    </main>
  );
}
