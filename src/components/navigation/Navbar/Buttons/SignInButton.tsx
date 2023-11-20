import React from 'react';

// icons
import { UserCircle2 } from 'lucide-react';

// ui components
import { Button } from '@/components/ui/button';

// helpers
import navigate from '@/helpers/navigate';

const SignInButton = () => {
  return (
    <Button className='p-3 flex gap-1' variant="icon" onClick={() => navigate("/auth")}>
      <UserCircle2 />
      <p>Sign in</p>
    </Button>
  );
};

export default SignInButton;