
import React from 'react';
import { User } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout }) => {
    const { language, setLanguage, t } = useTranslation();

    const langButtonClasses = (lang: 'fr' | 'en') => 
        `px-2 py-1 text-xs font-bold rounded-md transition-colors ${
            language === lang 
            ? 'bg-blue-600 text-white' 
            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
        }`;

    return (
        <header className="py-4 bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="brand-mark">GE</div>
                    <div>
                        <strong className="text-slate-800 font-bold text-lg">re-GE-nere</strong>
                        <p className="text-slate-500 text-sm hidden sm:block">{t('header.tagline')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <button onClick={() => setLanguage('fr')} className={langButtonClasses('fr')}>FR</button>
                        <button onClick={() => setLanguage('en')} className={langButtonClasses('en')}>EN</button>
                    </div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-600 hidden md:inline">{t('header.greeting')}, {user.email}</span>
                            <button onClick={onLogout} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                {t('header.logout')}
                            </button>
                        </div>
                    ) : (
                        <button onClick={onLoginClick} className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                            {t('header.login_register')}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
