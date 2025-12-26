
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      if (!isVisible) setIsVisible(true);

      // Smoothly update dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Smoothly update ring position with slight delay/easing handled by CSS transition
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.style.scale = '0.8';
    };

    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.style.scale = '1';
    };

    // Handle interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.group') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isClickable);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window)) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-blue-500 pointer-events-none z-[9999] transition-all duration-300 ease-out flex items-center justify-center ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'w-12 h-12 -ml-6 -mt-6 bg-blue-500/10 border-blue-400' : ''}`}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-blue-400 rounded-full pointer-events-none z-[10000] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'scale-0 opacity-0' : 'scale-100'}`}
      />
    </>
  );
};

export default CustomCursor;
