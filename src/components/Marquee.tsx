import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { siteConfig } from '../data/siteConfig';

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split 12 images into two sets of 6
  const topImages = siteConfig.common.marqueeImages.slice(0, 6);
  const bottomImages = siteConfig.common.marqueeImages.slice(6, 12);

  // Duplicate for seamless looping
  const row1Images = [...topImages, ...topImages, ...topImages, ...topImages];
  const row2Images = [...bottomImages, ...bottomImages, ...bottomImages, ...bottomImages];

  // Horizontal scroll-driven movement (original marquee)
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Use the container's vertical position to drive horizontal movement
      const scrollPos = window.scrollY - (rect.top + window.scrollY);
      setScrollOffset(scrollPos);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vertical scroll progress of the whole marquee section (0 when just entering bottom, 1 when leaving top)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to grayscale: 1 (start) → 0 (when fully visible)
  const grayscale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [1, 0, 1]);

  return (
    <section ref={containerRef} className="bg-brand-bg pt-24 pb-10 overflow-hidden">
      {/* Row 1: Right */}
      <div
        className="flex gap-4 mb-4 whitespace-nowrap"
        style={{ transform: `translateX(${scrollOffset * 0.5}px)` }}
      >
        {row1Images.map((img, i) => (
          <motion.img
            key={`r1-${i}`}
            src={img}
            loading="lazy"
            className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl object-cover"
            style={{ filter: useTransform(grayscale, (val) => `grayscale(${val})`) }}
            alt="Design frame"
          />
        ))}
      </div>

      {/* Row 2: Left */}
      <div
        className="flex gap-4 whitespace-nowrap"
        style={{ transform: `translateX(${-scrollOffset * 0.5}px)` }}
      >
        {row2Images.map((img, i) => (
          <motion.img
            key={`r2-${i}`}
            src={img}
            loading="lazy"
            className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl object-cover"
            style={{ filter: useTransform(grayscale, (val) => `grayscale(${val})`) }}
            alt="Design frame"
          />
        ))}
      </div>
    </section>
  );
}