import React from 'react';
import Link from 'next/link';

type IconLinkProps = {
  route: string
  icon: React.ReactNode
  text: string
}

const IconLink = ({ route, icon, text }: IconLinkProps) => {
  return (
    <Link href={route} className='flex flex-row items-center justify-start gap-3 rounded-none hover:bg-accent py-2 px-4'>
      { icon }
      { text }
    </Link>
  );
};

export default IconLink;