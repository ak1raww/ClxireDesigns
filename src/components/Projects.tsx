import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  index: number;
  progress: any;
  targetScale: number;
  title: string;
  category: string;
  links?: { label: string; url: string }[];
  link?: string; // fallback
  cta: string;
  images: { url: string }[];
  key?: React.Key;
}

function ProjectCard({ index, progress, targetScale, title, category, links, link, cta, images }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(progress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5% + ${index * 25}px)` }}
        className="glass-card w-full h-[80vh] rounded-[40px] md:rounded-[60px] border-2 border-brand-text/20 p-8 md:p-12 overflow-hidden flex flex-col gap-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="text-4xl md:text-6xl font-black opacity-20">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">{category}</div>
              <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">{title}</h3>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {links ? (
              links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors uppercase font-bold text-sm bg-white/5"
                >
                  {l.label} <ArrowUpRight size={14} />
                </a>
              ))
            ) : (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors uppercase font-bold text-sm bg-white/5"
              >
                {cta} <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-10 gap-4 overflow-hidden">
          <div className="md:col-span-4 flex flex-col gap-4 overflow-hidden">
            <img src={images[0].url} className="w-full h-1/2 object-cover rounded-3xl" alt="Preview 1" />
            <img src={images[1].url} className="w-full h-1/2 object-cover rounded-3xl" alt="Preview 2" />
          </div>
          <div className="md:col-span-6 overflow-hidden">
            <img src={images[2].url} className="w-full h-full object-cover rounded-3xl" alt="Preview 3" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section id="projects" ref={containerRef} className="bg-brand-bg relative pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hero-heading py-32 text-center"
        >
          {t.projects.heading}
        </motion.h2>

        <div className="flex flex-col gap-24">
          {t.projects.cards.map((card, i) => {
            const targetScale = 1 - ((t.projects.cards.length - 1 - i) * 0.05);
            return (
              <ProjectCard
                key={i}
                index={i}
                progress={scrollYProgress}
                targetScale={targetScale}
                title={card.name}
                category={card.category}
                links={card.links}
                link={card.link}
                cta={t.projects.cta}
                images={siteConfig.common.featuredImages}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
