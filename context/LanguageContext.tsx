import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { translations } from '../locales/translations';

type Language = 'fr' | 'en';
type Translations = typeof translations.fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  // FIX: Changed return type from `string` to `any` to support complex translation objects (e.g., arrays).
  t: (key: keyof Translations | string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// FIX: Aligned component definition with project conventions by using React.FC and an explicit props interface.
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = useCallback((key: string): any => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if key not found in current language
        let fallbackResult: any = translations.en;
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
            if(fallbackResult === undefined) return key;
        }
        // FIX: Use nullish coalescing `??` to avoid incorrectly falling back on valid empty strings.
        return fallbackResult ?? key;
      }
    }
    return result ?? key;
  }, [language]);

  return (
    // FIX: Corrected typo from `Language-Context.Provider` to `LanguageContext.Provider`.
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};