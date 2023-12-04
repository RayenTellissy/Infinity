import React from 'react';
import Image from "next/image"

type UserAvatarProps = {
  image: string | null | undefined
  size?: number
}

const UserAvatar = ({ image, size = 40 }: UserAvatarProps) => {
  return (
    <>
      {image ? <Image className='rounded-full aspect-square ' height={size} width={size} src={image} alt="user image" />
        : <div className={`h-[${size}px] w-[${size}px] select-none dark:bg-zinc-700 bg-grayish text-white rounded-full flex justify-center items-center`}>
          ?
        </div>}
    </>
  );
};

export default UserAvatar;