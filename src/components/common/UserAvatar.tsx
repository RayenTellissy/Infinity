import React from 'react';
import Image from "next/image"

type UserAvatarProps = {
  image: string | null | undefined
  size?: number
}

const UserAvatar = ({ image, size = 40 }: UserAvatarProps) => {
  return (
    <>
      {image ? <Image className='rounded-full' height={size} width={size} src={image} alt="user image" />
        : <div className='h-8 w-8 select-none dark:bg-zinc-700 bg-grayish text-white
          rounded-full flex justify-center items-center'>
          ?
        </div>}
    </>
  );
};

export default UserAvatar;