/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';

export default function CustomScrollbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  
  // Smooth the scroll progress for natural movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) {
        setScrollPercentage(0);
      } else {
        setScrollPercentage(scrolled / height);
      }
    };

    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  const handleDrag = (e: MouseEvent | TouchEvent | any) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const percentage = y / rect.height;
    
    const height = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: percentage * height,
      behavior: 'auto'
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleDrag(e);
    
    const onMouseMove = (moveEvent: MouseEvent) => handleDrag(moveEvent);
    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Convert progress into visual position (accounting for thumb height)
  // We'll use a fixed thumb height for the "bubble" feel
  const thumbY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <div 
      className="fixed right-2 top-1/2 -translate-y-1/2 h-[70vh] w-6 z-[100] flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isDragging && setIsHovered(false)}
    >
      {/* Scroll Track */}
      <div 
        ref={trackRef}
        onMouseDown={onMouseDown}
        className="w-1.5 h-full relative cursor-pointer flex items-center justify-center"
      >
        {/* Track Line */}
        <div className="absolute inset-y-0 w-[1px] bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               style={{ scaleY: smoothProgress }}
               className="w-full h-full bg-gradient-to-b from-orange-500 to-orange-400 origin-top opacity-30" 
             />
        </div>

        {/* Liquid Thumb Overlay */}
        <motion.div
          style={{ top: thumbY, y: '-50%' }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <AnimatePresence>
            {(isHovered || isDragging) && (
              <motion.div
                initial={{ scale: 0, opacity: 0, x: '-50%' }}
                animate={{ scale: 1, opacity: 1, x: '-50%' }}
                exit={{ scale: 0, opacity: 0, x: '-50%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute left-1/2"
              >
                {/* The Bubble Glass */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-orange-500/30 blur-xl rounded-full animate-pulse" />
                  
                  {/* Liquid Body */}
                  <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-full border border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_8px_16px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                    {/* Inner Fluid Detail */}
                    <motion.div 
                        animate={{ 
                            y: [0, -2, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-4 h-4 bg-orange-500 rounded-full blur-[2px] opacity-80"
                    />
                    
                    {/* Gloss Reflection */}
                    <div className="absolute top-1 left-2 w-2 h-1 bg-white/60 blur-[1px] rounded-full rotate-[-45deg]" />
                  </div>

                  {/* Percentage Tooltip */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isDragging ? 1 : 0, x: isDragging ? 10 : 20 }}
                    style={{ left: '-60px', top: '50%', y: '-50%' }}
                    className="absolute bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] font-black text-orange-500 uppercase tracking-tighter"
                  >
                    {Math.round(scrollPercentage * 100)}%
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal Thumb (always visible or slightly visible) */}
          <motion.div 
            animate={{ 
                height: (isHovered || isDragging) ? 0 : 24,
                opacity: (isHovered || isDragging) ? 0 : 0.6
            }}
            className="w-1.5 bg-white/40 rounded-full backdrop-blur-sm"
          />
        </motion.div>
      </div>
    </div>
  );
}
