import React from 'react';
import Channel from '@/components/channel/Channel';

const page = ({ params }: { params: { username: string } }) => {
  return <Channel username={params.username} />
};

export default page;