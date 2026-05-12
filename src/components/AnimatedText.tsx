/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  scrollOffset?: any;
}

export default function AnimatedText({
  text,
  className = '',
  style,
  scrollOffset = ['start 0.8', 'end 0.2'],
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset as any,
  });

  const words = text.split(' ');
  let charCount = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const result = (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIndex) => {
              const globalIndex = charCount + charIndex;
              return (
                <AnimatedLetter
                  key={globalIndex}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  index={globalIndex}
                  total={text.length}
                />
              );
            })}
            {wordIndex < words.length - 1 && (
              <AnimatedLetter
                key={`space-${wordIndex}`}
                char=" "
                scrollYProgress={scrollYProgress}
                index={charCount + wordChars.length}
                total={text.length}
              />
            )}
          </span>
        );
        charCount += wordChars.length + 1;
        return result;
      })}
    </p>
  );
}

interface AnimatedLetterProps {
  char: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  key?: React.Key;
}

function AnimatedLetter({
  char,
  scrollYProgress,
  index,
  total,
}: AnimatedLetterProps) {
  const charProgress = index / total;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible font-medium">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 font-medium"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
}
