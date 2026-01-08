
import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, pass: string) => Promise<{ success: boolean; errorCode?: string }>;
  onRegister: (email: string, pass: string) => Promise<{ success: boolean; errorCode?: string }>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin, onRegister }) => {
    // PRE-FILL for immediate access in testing environment
    const [email, setEmail] = useState('demo@re-ge-nere.com');
    const [password, setPassword] = useState('123456');
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const getErrorMessage = (code: string | undefined, fallbackKey: string) => {
        if (!code) {
            return t(fallbackKey);
        }
        const key = `auth.error.${code.replace(/\//g, '-')}`;
        const translated = t(key);
        // If translation is not found, t returns the key itself. Use a generic fallback.
        return translated === key ? t('auth.error.auth-unknown-error') : translated;
    }

    const handleLogin = async () => {
        if (!email || !password) {
            setError(t('auth.error.fill_all_fields'));
            return;
        }
        setIsLoading(true);
        setError('');
        const result = await onLogin(email, password);
        if (!result.success) {
            setError(getErrorMessage(result.errorCode, 'auth.error.invalid_credentials'));
        }
        setIsLoading(false);
    }

    const handleRegister = async () => {
        if (!email || !password) {
            setError(t('auth.error.fill_all_fields'));
            return;
        }
        setIsLoading(true);
        setError('');
        const result = await onRegister(email, password);
        if (!result.success) {
            setError(getErrorMessage(result.errorCode, 'auth.error.registration_failed'));
        }
        setIsLoading(false);
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">{t('auth.title')}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" disabled={isLoading}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg mb-4 text-xs">
            <strong>Mode Test :</strong> Identifiants pré-remchis pour tester l'application immédiatement (contourne l'absence de base de données réelle ici).
        </div>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</p>}

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-slate-600">{t('auth.email_label')}</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder={t('auth.email_placeholder')} required disabled={isLoading} />
                </div>
                 <div>
                    <label className="block mb-1 text-sm font-medium text-slate-600">{t('auth.password_label')}</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required disabled={isLoading} />
                </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                 <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:bg-slate-400" disabled={isLoading}>
                    {isLoading ? t('auth.login_button_loading') : t('auth.login_button')}
                 </button>
                 <button type="button" onClick={handleRegister} className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:bg-slate-400" disabled={isLoading}>
                    {isLoading ? t('auth.register_button_loading') : t('auth.register_button')}
                 </button>
            </div>
        </form>

      </div>
    </div>
  );
};
