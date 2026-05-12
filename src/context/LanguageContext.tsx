import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

type Language = 'it' | 'en';

interface LanguageContextType {
  lang: Language;
  t: typeof siteConfig.it;
  toggleLang: () => void;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('it');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isEn = location.pathname.startsWith('/en');
    setLangState(isEn ? 'en' : 'it');
  }, [location.pathname]);

  const setLang = (newLang: Language) => {
    if (newLang === lang) return;
    
    let newPath = location.pathname;
    if (newLang === 'en' && !newPath.startsWith('/en')) {
      newPath = `/en${newPath === '/' ? '' : newPath}`;
    } else if (newLang === 'it' && newPath.startsWith('/en')) {
      newPath = newPath.replace(/^\/en/, '') || '/';
    }
    
    navigate(newPath);
  };

  const toggleLang = () => {
    setLang(lang === 'it' ? 'en' : 'it');
  };

  const t = siteConfig[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
