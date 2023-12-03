import React from 'react';
import { useRouter } from 'next/navigation';

// icons
import { UserCircle2 } from 'lucide-react';

// ui components
import { Button } from '@/components/ui/button';

const SignInButton = () => {
  const router = useRouter()

  return (
    <Button className='p-3 flex gap-1' variant="icon" onClick={() => router.push("/auth")}>
      <UserCircle2 />
      <p>Sign in</p>
    </Button>
  );
};

export default SignInButton;