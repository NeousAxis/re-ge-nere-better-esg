
import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useAssessment } from './hooks/useAssessment';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { AssessmentChat } from './components/AssessmentChat';
import ResultsDisplay from './components/ResultsDisplay';
import { Chatbot } from './components/Chatbot';
import { FormData } from './types';
import { useTranslation } from './context/LanguageContext';

const App: React.FC = () => {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const { currentUser, loading: authLoading, login, register, logout } = useAuth();
    const { language, t } = useTranslation();
    const {
        assessment,
        matchedCompany,
        loading: assessmentLoading,
        handleFindBenchmark,
        handleUpdateActionStatus,
        handleUpdateActionText,
        handleUpdateActionDate,
        handleUpdateActionCompletion,
        handleCreateAction,
        handleDeleteAction,
        handleUpdateKpi
    } = useAssessment(currentUser, language);


    const handleLogin = async (email: string, pass: string) => {
        const result = await login(email, pass);
        if (result.success) setAuthModalOpen(false);
        return result;
    };

    const handleRegister = async (email: string, pass: string) => {
        const result = await register(email, pass);
        if (result.success) setAuthModalOpen(false);
        return result;
    };

    const handleAssessmentComplete = (formData: FormData) => {
        handleFindBenchmark(formData);
    };

    const renderContent = () => {
        if (authLoading || assessmentLoading) {
            return (
                <div className="flex flex-col items-center justify-center p-20 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold">{t('app.loading')}</p>
                </div>
            );
        }

        if (!currentUser) {
            return (
                <div className="text-center bg-white p-12 sm:p-20 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 max-w-4xl mx-auto mt-8 animate-fade-in-up">
                    <div className="brand-mark !w-20 !h-20 !text-3xl !rounded-3xl !mx-auto !mb-8 !shadow-2xl">GE</div>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight">{t('app.welcome_title')}</h1>
                    <p className="mt-6 text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        {t('app.welcome_subtitle')}
                    </p>
                    <button onClick={() => setAuthModalOpen(true)} className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-12 rounded-2xl shadow-xl shadow-blue-200 transition-all transform hover:scale-105">
                        {t('app.welcome_cta')}
                    </button>
                </div>
            );
        }

        if (!matchedCompany) {
            return <AssessmentChat onComplete={handleAssessmentComplete} />;
        }

        return (
            <ResultsDisplay
                company={matchedCompany}
                userActions={assessment?.userActions || {}}
                formData={assessment?.formData!}
                onStatusChange={handleUpdateActionStatus}
                onTextChange={handleUpdateActionText}
                onDateChange={handleUpdateActionDate}
                onCreateAction={handleCreateAction}
                onDeleteAction={handleDeleteAction}
                onUpdateKpi={handleUpdateKpi}
                onCompletionChange={handleUpdateActionCompletion}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
            {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} onLogin={handleLogin} onRegister={handleRegister} />}

            <Header user={currentUser} onLoginClick={() => setAuthModalOpen(true)} onLogout={logout} />

            <main className="container mx-auto px-4 py-8 sm:py-16 flex-grow flex flex-col">
                {renderContent()}
            </main>

            {currentUser && assessment && matchedCompany && (
                <Chatbot assessment={assessment} modelCompany={matchedCompany} lang={language} />
            )}


            <footer className="text-center py-12 border-t border-slate-200 bg-white">
                <p className="text-sm font-bold text-slate-400">
                    {t('app.footer')} • v1.0.9
                </p>
            </footer>
        </div>
    );
};

export default App;
