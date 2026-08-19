'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Lang = 'id' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (id: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (id) => id,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('id');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved === 'en' || saved === 'id') {
      setLangState(saved);
    } else {
      const browserLang = navigator.language || '';
      const isIndonesian = browserLang.startsWith('id') || browserLang.startsWith('ms');
      setLangState(isIndonesian ? 'id' : 'en');
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  }, []);

  const t = useCallback((id: string, en: string) => {
    return lang === 'en' ? en : id;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function T({ children, en }: { children: React.ReactNode; en: string }) {
  const { lang } = useContext(LanguageContext);
  return <>{lang === 'en' ? en : children}</>;
}
