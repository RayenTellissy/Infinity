import Video from '@/components/video/Video';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return <Video videoId={params.id} />
};

export default page;