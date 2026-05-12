import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { Globe, ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        // If the navbar is roughly where the services section is
        if (rect.top <= 60 && rect.bottom >= 60) {
          setIsLight(true);
        } else {
          setIsLight(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, id: '#services' },
    { name: t.nav.about, id: '#about' },
    { name: t.nav.projects, id: '#projects' },
    { name: t.nav.socials, path: lang === 'en' ? '/en/socials' : '/socials' },
  ];

  const handleLinkClick = (link: { name: string; id?: string; path?: string }) => {
    setIsOpen(false);
    if (link.id) {
      const element = document.querySelector(link.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(lang === 'en' ? '/en' : '/');
        setTimeout(() => {
          document.querySelector(link.id!)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className={`py-3 px-6 flex items-center justify-between transition-all duration-300 rounded-full ${isLight ? 'liquid-glass-dark text-black' : 'liquid-glass text-white'}`}>
        {/* Logo */}
        <Link to={lang === 'en' ? '/en' : '/'} className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden border border-white/20 shadow-xl transition-transform group-hover:scale-105">
            <img
              src="https://imgur.com/nUMxLvp.png"
              alt="Clxire Designs"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <span className="font-black uppercase tracking-[0.15em] text-sm md:text-base whitespace-nowrap">
            Clxire <span className="opacity-50 font-light">Designs</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link)}
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity cursor-pointer uppercase tracking-wider"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${isLight ? 'bg-black/5 hover:bg-black/10' : 'liquid-glass-strong hover:bg-white/10'}`}
          >
            <Globe size={14} />
            {lang.toUpperCase()}
          </button>

          <a
            href={siteConfig.common.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg ${isLight ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-orange-50'}`}
          >
            <ShoppingCart size={14} />
            {t.nav.shop}
          </a>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 liquid-glass-strong p-8 flex flex-col gap-6 md:hidden rounded-3xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className="text-2xl font-black uppercase tracking-tight text-left"
              >
                {link.name}
              </button>
            ))}
            <div className="h-[1px] bg-white/10 my-2" />
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
                className="flex items-center justify-between w-full p-4 liquid-glass rounded-2xl font-bold"
              >
                {t.nav.language}
                <span className="flex items-center gap-2"><Globe size={16} /> {lang.toUpperCase()}</span>
              </button>
              <a
                href={siteConfig.common.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-black p-4 rounded-2xl font-black uppercase text-sm"
              >
                <ShoppingCart size={18} />
                {t.nav.shop}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

