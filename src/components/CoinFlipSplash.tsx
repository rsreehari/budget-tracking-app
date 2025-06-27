import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import coinFlip from '../assets/coin-flip.json';

interface CoinFlipSplashProps {
  onFinish: () => void;
}

const CoinFlipSplash: React.FC<CoinFlipSplashProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 400); // allow fade out
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <Lottie animationData={coinFlip} style={{ width: 160, height: 160 }} loop={false} />
    </div>
  );
};

export default CoinFlipSplash; 