import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FadeIn from './FadeIn';

export default function FAQ() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [hoverButton, setHoverButton] = useState(false);

    return (
        <section id="faq" className="bg-brand-bg py-20 md:py-32 overflow-hidden font-dm">
            <main className="max-w-[1300px] w-full mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 items-stretch">
                    {/* Left column — Animated Gradient CTA card */}
                    <FadeIn delay={0} y={40} className="w-full">
                        <div className="c5-animated-gradient rounded-[40px] py-16 md:py-24 px-8 md:px-12 text-white flex flex-col justify-center items-center text-center h-full shadow-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-none" />

                            <h2
                                className="relative z-10 font-black uppercase leading-[0.9] mb-6 sm:mb-8"
                                style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', letterSpacing: '-0.03em' }}
                            >
                                {t.footer.ctaHeading.split('\n').map((line, i) => (
                                    <span key={i}>{line}<br /></span>
                                ))}
                            </h2>

                            <p className="relative z-10 text-lg md:text-xl mb-10 font-medium opacity-90 max-w-md">
                                {t.footer.ctaSubheading}
                            </p>

                            <a
                                href={siteConfig.common.etsyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHoverButton(true)}
                                onMouseLeave={() => setHoverButton(false)}
                                className="relative z-10 bg-white text-black font-black uppercase tracking-wider cursor-pointer border-none text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                                style={{
                                    padding: '18px 48px',
                                    borderRadius: '9999px',
                                    boxShadow: hoverButton ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.2)'
                                }}
                            >
                                {t.footer.ctaButton} ✦
                            </a>
                        </div>
                    </FadeIn>

                    {/* Right column — FAQ accordion */}
                    <div className="flex flex-col justify-center gap-4">
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em] mb-4 px-2 opacity-50">{t.faq.title}</h3>
                        {t.faq.items.map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1} y={20}>
                                <div
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className={`liquid-glass-strong rounded-2xl md:rounded-3xl p-6 cursor-pointer transition-all duration-300 border ${activeIndex === i ? 'border-orange-500/50 bg-white/5' : 'border-white/5 hover:border-white/10'}`}
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <span className={`font-bold text-sm md:text-base uppercase tracking-tight transition-colors ${activeIndex === i ? 'text-white' : 'text-white/60'}`}>
                                            {item.q}
                                        </span>
                                        <div className={`transition-transform duration-300 ${activeIndex === i ? 'rotate-180 text-orange-500' : 'opacity-40'}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {activeIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-4 pt-4 border-t border-white/5 text-sm md:text-base text-white/50 leading-relaxed font-normal">
                                                    {item.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    );
}
