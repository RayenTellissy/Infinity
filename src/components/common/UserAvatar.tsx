import React from 'react';

// ui components
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

type UserAvatarProps = {
  image: string | null | undefined
}

const UserAvatar = ({ image }: UserAvatarProps) => {
  return (
    <Avatar>
      {image ? <AvatarImage src={image} />
        : <AvatarFallback className='h-8 w-8 m-auto select-none'>?</AvatarFallback>}
    </Avatar>
  );
};

export default UserAvatar;