import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import {
  Instagram,
  Twitch,
  Pin as Pinterest,
  Twitter,
  Github,
  Linkedin,
  ExternalLink,
  Palette,
  MessageSquare,
  MessageCircle,
  Mail
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Instagram,
  Twitch,
  Pin: Pinterest,
  Twitter,
  Github,
  Linkedin,
  ExternalLink,
  Behance: Palette,
  MessageSquare
};

export default function Footer() {
  const { t, lang } = useLanguage();
  const watermarkSvgRef = useRef<SVGSVGElement>(null);
  const watermarkTextRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const fitWatermark = () => {
      if (watermarkSvgRef.current && watermarkTextRef.current) {
        try {
          const bbox = watermarkTextRef.current.getBBox();
          watermarkSvgRef.current.setAttribute(
            'viewBox',
            `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
          );
        } catch (e) {
          // ignore
        }
      }
    };

    fitWatermark();
    window.addEventListener('resize', fitWatermark);
    document.fonts.ready.then(fitWatermark);

    return () => window.removeEventListener('resize', fitWatermark);
  }, []);

  return (
    <footer id="footer" className="bg-brand-bg relative pb-12 font-dm overflow-hidden">
      <div className="max-w-[1150px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 p-5 items-stretch">

        {/* Left Card: Branding & Video */}
        <div className="relative min-h-[400px] md:min-h-full rounded-[32px] p-8 overflow-hidden flex flex-col justify-between group shadow-2xl border border-white/5">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
                <img src="https://imgur.com/xkVlKtC.png" alt="Weboven" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black h-fit uppercase tracking-tight text-2xl text-white">Weboven</span>
                <span className="font-caveat text-white/40 text-sm italic leading-none">{t.footer.motto}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto mb-8">
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">{t.footer.craftedWithPrecision}</p>
              <p className="text-xl md:text-2xl font-light text-white leading-tight">
                {t.footer.designedBy} <span className="font-black italic">Alex</span>,<br />
                <span className="text-white/60">{t.footer.builtBy} </span>
                <a href="https://weboven.it" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-bold hover:underline">Weboven</a>
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <span className="font-caveat text-xl text-white/90 font-semibold tracking-wide">{t.footer.stayInTouch}</span>
            <div className="flex gap-2">
              {[
                { platform: 'WhatsApp', url: 'https://wa.me/393388666909?text=Ciao,%20sono%20qui%20dal%20tuo%20sito!', Icon: MessageCircle },
                { platform: 'Instagram', url: 'https://instagram.com/surradiant', Icon: Instagram },
                { platform: 'Email', url: 'mailto:contact@weboven.it', Icon: Mail }
              ].map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1 shadow-xl"
                  title={s.platform}
                >
                  <s.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Navigation & Info */}
        <div className="liquid-glass-card rounded-[32px] p-10 md:p-14 pt-24 md:pt-32 flex flex-col justify-end items-center relative border border-white/5">

          {/* Floating Badge */}
          <div className="absolute -top-0 right-10 z-10 hidden sm:flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-[22px] bg-gradient-to-br from-orange-500 via-orange-700 to-red-900 shadow-2xl flex items-center justify-center -rotate-[10deg] border border-white/20 overflow-hidden group relative">
                {/* PFP Placeholder */}
                <img
                  src="https://imgur.com/nUMxLvp.png"
                  alt="Clxire"
                  className="absolute inset-0 w-full h-full object-cover z-20 opacity-90 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-orange-900/40 mix-blend-multiply z-10" />
              </div>
              <div className="flex items-center gap-2 -rotate-[4deg] mt-3">
                <svg className="w-6 h-6 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20 C 6 14, 10 9, 18 5" />
                  <path d="M18 5 L 12 5" />
                  <path d="M18 5 L 18 11" />
                </svg>
                <span className="font-caveat text-xl font-semibold text-zinc-500 italic">{t.footer.thatsMe}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-12 w-full">
            <div className="flex flex-col items-center gap-6">
              <h4 className="font-caveat text-3xl font-bold italic text-zinc-500">{t.footer.navHeading}</h4>
              <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#D7E2EA]/80">
                <a href="#services" className="hover:text-orange-400 transition-colors">{t.nav.services}</a>
                <a href="#projects" className="hover:text-orange-400 transition-colors">{t.nav.projects}</a>
                <a href="#about" className="hover:text-orange-400 transition-colors">{t.nav.about}</a>
                <Link to={lang === 'en' ? '/en/socials' : '/socials'} className="hover:text-orange-400 transition-colors">{t.nav.socials}</Link>
              </nav>
            </div>

            <div className="flex flex-col items-center gap-6">
              <h4 className="font-caveat text-3xl font-bold italic text-zinc-500">{t.footer.theShop}</h4>
              <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#D7E2EA]/80">
                <a href={siteConfig.common.etsyUrl} target="_blank" className="hover:text-orange-400 transition-colors">{t.footer.etsyStore}</a>
                <a href={siteConfig.common.socials.find(s => s.platform === 'Behance')?.url} target="_blank" className="hover:text-orange-400 transition-colors">Behance</a>
                <Link to={lang === 'en' ? '/en/socials' : '/socials'} className="hover:text-orange-400 transition-colors underline underline-offset-8 decoration-orange-500/30">{t.footer.customWork}</Link>
              </nav>
            </div>
          </div>

          <div className="mt-20 w-full flex flex-col items-center gap-4 pt-10 border-t border-white/5">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] text-center">
              {t.footer.rights.replace('{year}', new Date().getFullYear().toString())}
            </div>
            <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em] text-center opacity-60">
              {t.footer.builtBy} <a href="https://weboven.it" target="_blank" rel="noopener noreferrer" className="underline decoration-orange-500/40 hover:text-orange-400 transition-colors">Weboven</a>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark Section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none overflow-visible leading-[0] z-0 px-10">
        <svg
          ref={watermarkSvgRef}
          viewBox="0 0 1000 300"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block overflow-visible translate-y-[20%]"
        >
          <text
            ref={watermarkTextRef}
            x="500"
            y="200"
            textAnchor="middle"
            fontSize="260"
            className="font-sans font-black tracking-[0.4em] fill-white opacity-[0.02] uppercase"
          >
            CLXIRE
          </text>
        </svg>
      </div>
    </footer>
  );
}

