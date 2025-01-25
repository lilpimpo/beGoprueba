import React, { useState, useEffect } from 'react';
import './rmndrBStylo.css';

interface CountdownButtonProps {
  countdownTime: number; 
  className?: string;
}

function RemndrButtn({ countdownTime, className }: CountdownButtonProps) {
  const [timeLeft, setTimeLeft] = useState(countdownTime);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(interval);
          setIsEnabled(true);
          console.log("navegar");
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTime]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <button
      className={`${className} ${isEnabled ? 'enabled' : 'disabled'}`}
      disabled={!isEnabled}
    >
      {isEnabled ? "It's time for pickup!" : "start pickup in " + formatTime(timeLeft)}
    </button>
  );
}

export default RemndrButtn;
