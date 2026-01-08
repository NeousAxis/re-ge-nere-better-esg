import React, { useState } from 'react';
import { AssessmentData, ModelCompany } from '../types';
import { useChat } from '../hooks/useChat';
import { ChatFlyout } from './ChatFlyout';
import { useTranslation } from '../context/LanguageContext';

interface ChatbotProps {
    assessment: AssessmentData;
    modelCompany: ModelCompany;
    lang: 'fr' | 'en';
}

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
);

const CloseIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


export const Chatbot: React.FC<ChatbotProps> = ({ assessment, modelCompany, lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const { messages, isLoading, sendMessage } = useChat({ mode: 'support', assessment, modelCompany, lang });

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    aria-label={isOpen ? t('chatbot.close_aria_label') : t('chatbot.open_aria_label')}
                >
                   {isOpen ? <CloseIcon /> : <ChatIcon />}
                </button>
            </div>
            {isOpen && (
                <ChatFlyout 
                    messages={messages} 
                    isLoading={isLoading} 
                    onSendMessage={sendMessage}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};