import React from 'react';

// ui components
import { Skeleton } from '@/components/ui/skeleton';

const AuthLoading = () => {
  return (
    <div className='flex flex-row items-center gap-3 mr-4'>
      <Skeleton className='w-8 h-8 p-0 rounded-full' />
      <Skeleton className='w-8 h-8 p-0 rounded-full' />
      <Skeleton className='w-8 h-8 p-0 rounded-full' />
    </div>
  );
};

export default AuthLoading;