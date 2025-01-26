import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-[75vh] text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Invoicepedia</h1>

      <SignedOut>
        <Button className="bg-black text-white w-auto" asChild>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
}
