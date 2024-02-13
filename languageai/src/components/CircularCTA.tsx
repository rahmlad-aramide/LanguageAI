'use client'
import { useEffect } from "react";

export const CircularCTA: React.FC = () => {
    useEffect(() => {
        const textPath = document.querySelector('.animate-text');
        let startOffset = 0;
        const animateTextPath = () => {
          startOffset = (startOffset + 1) % 100; // Loop from 0 to 100
          textPath?.setAttribute('startOffset', `${startOffset}%`);
          requestAnimationFrame(animateTextPath);
        };
        animateTextPath();
      }, []);
    return (
        <div className="flex justify-center items-center h-screen">
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-dark relative">
          {/* Circular path for the text */}
          <path id="circlePath" fill="none" stroke="transparent"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
          {/* Animated Circular text */}
          <text fill="currentColor">
            <textPath xlinkHref="#circlePath" startOffset="0" style={{ fontSize: '12px' }} className="animate-text">
              • Translate your word below • Translate your word below •
            </textPath>
          </text>
          {/* Center Icon (Example: Star) with Circular Border */}
          <circle cx="80" cy="80" r="80" stroke="currentColor" strokeWidth="2" fill="none" />
          <polygon points="100,70 110,100 140,100 115,120 125,150 100,130 75,150 85,120 60,100 90,100" fill="currentColor" className="absolute" />
        </svg>
        </div>
    );
  };