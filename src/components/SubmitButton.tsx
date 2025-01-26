'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full font-semibold bg-black text-white" disabled={pending}>
      {pending ? (
        <span className='flex items-center justify-center'>
          <Loader2 className="animate-spin" />
        </span>
      ) : (
        <span>Submit</span>
      )}
    </Button>
  );
};

export default SubmitButton;
