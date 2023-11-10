import React from 'react';

type MiniplayerProps = {
  inMini: boolean
}

const Miniplayer = ({ inMini }: MiniplayerProps) => {
  return (
    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect fill={inMini ? "white" : ""} x="13" y="13" width="9" height="7" rx="2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Miniplayer;