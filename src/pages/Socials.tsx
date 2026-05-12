import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import { Instagram, Twitch, Pin, ExternalLink, ArrowLeft, Palette, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Custom Discord Icon as Lucide usually doesn't have it
const DiscordIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
  </svg>
);

const iconMap: Record<string, any> = {
  Instagram,
  Twitch,
  Pin,
  ExternalLink,
  Behance: Palette,
  MessageSquare,
  Discord: DiscordIcon
};

export default function Socials() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-bg font-dm relative">
      <Navbar />

      <main className="flex flex-col items-center pt-32 pb-64 px-6 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-orange-600/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          {/* Navigation & Header Section */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-full flex justify-between items-center mb-12">
              <Link
                to={lang === 'en' ? '/en' : '/'}
                className="group flex items-center gap-3 opacity-40 hover:opacity-100 transition-all duration-300 font-black uppercase text-[10px] tracking-[0.4em]"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowLeft size={14} />
                </div>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full scale-150" />
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-[40px] p-[1.5px] bg-gradient-to-br from-white/30 to-transparent relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                  <div className="w-full h-full rounded-[38.5px] overflow-hidden relative">
                    <img
                      src="https://imgur.com/kluxcQr.png"
                      alt="Clxire"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                  {t.socialsPage.title}
                </h1>
                <p className="text-xl md:text-2xl opacity-60 font-medium font-caveat text-orange-400">
                  {t.socialsPage.subtitle}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Social Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {siteConfig.common.socials.map((social, i) => {
              const isDiscord = social.platform === 'Discord';
              const Icon = isDiscord ? DiscordIcon : (iconMap[social.iconName] || ExternalLink);
              
              // Define Grid Layout Classes
              let gridClass = "md:col-span-2"; // Default behavior
              if (isDiscord) gridClass = "md:col-span-4 md:row-span-1 h-auto"; // Featured Discord
              else if (i % 3 === 0) gridClass = "md:col-span-2";
              else gridClass = "md:col-span-2";

              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target={isDiscord ? undefined : "_blank"}
                  rel={isDiscord ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  className={`
                  ${gridClass}
                  relative p-[1px] rounded-[32px] transition-all duration-500
                  ${isDiscord
                      ? 'bg-gradient-to-r from-[#5865F2] to-[#404EED] shadow-[0_20px_60px_-20px_rgba(88,101,242,0.6)] z-10'
                      : 'liquid-glass-strong hover:scale-[1.02]'
                    }
                  group overflow-hidden
                `}
                >
                  <div className={`
                    flex flex-col md:flex-row items-center p-6 md:p-8 rounded-[31px] h-full relative z-10
                    ${isDiscord ? 'bg-[#2C2F33]/40 backdrop-blur-3xl' : 'bg-brand-bg/20 backdrop-blur-md'}
                  `}>
                    {/* Gloss Reflection Overlay */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    
                    {/* Animated Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <div className={`
                      w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl md:mr-6 mb-4 md:mb-0 transition-all duration-500 group-hover:scale-110 shadow-lg
                      ${isDiscord ? 'bg-[#5865F2] text-white' : 'bg-white/5 group-hover:bg-white group-hover:text-black'}
                    `}>
                      <Icon size={isDiscord ? 32 : 28} className="transition-transform group-hover:rotate-12" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                        <h3 className={`font-black text-xl md:text-2xl uppercase tracking-tight ${isDiscord ? 'text-[#5865F2]' : 'text-white'}`}>
                          {social.platform}
                        </h3>
                        {isDiscord && (
                          <motion.span 
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-[#5865F2] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-lg whitespace-nowrap"
                          >
                            {t.socialsPage.openForCommissions}
                          </motion.span>
                        )}
                      </div>
                      <p className="text-sm md:text-base font-medium opacity-40 lowercase italic line-clamp-1 font-inter">
                        {isDiscord ? t.socialsPage.directMessage : social.handle}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all shadow-inner">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Etsy Shop CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic whitespace-nowrap text-center">{t.socialsPage.supportTheCraft}</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <a
              href={siteConfig.common.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-20 py-8 rounded-[40px] overflow-hidden shadow-2xl transition-all hover:scale-[1.02] active:scale-95 w-full flex justify-center border border-white/10"
            >
              <div className="absolute inset-0 c5-animated-gradient opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-brand-bg/40 backdrop-blur-md" />
              {/* Glossy Overlay */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              
              <span className="relative z-10 font-black uppercase text-lg tracking-[0.4em] text-white flex items-center gap-4 text-center">
                {t.socialsPage.visitEtsyStore} 
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✦
                </motion.span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* Fade transition to footer */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent pointer-events-none z-20" />
      </main>

      <Footer />
    </div>
  );
}
