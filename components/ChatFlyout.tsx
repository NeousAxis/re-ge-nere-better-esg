
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface ChatFlyoutProps {
    messages: ChatMessage[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
    onClose: () => void;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);


export const ChatFlyout: React.FC<ChatFlyoutProps> = ({ messages, isLoading, onSendMessage, onClose }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 animate-fade-in-up">
            <header className="p-4 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
                <h3 className="font-bold text-slate-800 text-lg">{t('chat_flyout.title')}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </header>

            <div className="flex-grow p-4 overflow-y-auto bg-slate-50">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="brand-mark !w-8 !h-8 !text-xs !rounded-xl !shadow-md">GE</div>}
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                                {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                            <div className="brand-mark !w-8 !h-8 !text-xs !rounded-xl !shadow-md">GE</div>
                            <div className="max-w-[80%] p-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                                <div className="flex gap-1.5 p-1">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <footer className="p-4 border-t border-slate-200">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('chat_flyout.placeholder')}
                        className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-blue-600 text-white rounded-lg disabled:bg-slate-300 hover:bg-blue-700 transition-colors">
                        <SendIcon />
                    </button>
                </form>
            </footer>
        </div>
    );
};
