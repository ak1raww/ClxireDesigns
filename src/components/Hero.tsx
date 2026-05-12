import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

export default function Hero() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;
    video.autoplay = true;
    video.muted = true;

    // Force play in case autoplay is blocked
    video.play().catch(() => { });

    return () => {
      video.loop = false;
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
      id="home"
    >
      {/* Background Video (parallax) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4"
          muted
          playsInline
          autoPlay
          // No loop attribute – handled in useEffect
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 blur-sm"
        />

        {/* Blobs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full"
        />
      </div>

      {/* Fixed bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0c0c0c] to-transparent z-[1] pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        <h1 className="hero-heading mb-4">
          {t.hero.title.split('\n').map((line: string, i: number) => (
            <React.Fragment key={i}>
              {line}
              {i < t.hero.title.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-80 mb-12 max-w-2xl mx-auto">
          {t.hero.tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={siteConfig.common.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-full font-black uppercase text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(182,0,168,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#BE4C00]" />
            <div className="absolute inset-0 border border-white/40 rounded-full" />
            <span className="relative z-10">{t.hero.ctaPrimary}</span>
          </a>

          <Link
            to={lang === 'en' ? '/en/socials' : '/socials'}
            className="px-8 py-4 rounded-full border-2 border-brand-text/50 font-bold uppercase text-sm hover:bg-white/10 transition-all active:scale-95"
          >
            {t.hero.ctaGhost}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}