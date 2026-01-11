import React from 'react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-center justify-start gap-1.5 py-2 px-1">
            <style>{`
                @keyframes typing-bounce {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.4;
                    }
                    30% {
                        transform: translateY(-8px);
                        opacity: 1;
                    }
                }
                .typing-dot-1 {
                    animation: typing-bounce 1.4s infinite ease-in-out;
                    animation-delay: 0s;
                }
                .typing-dot-2 {
                    animation: typing-bounce 1.4s infinite ease-in-out;
                    animation-delay: 0.2s;
                }
                .typing-dot-3 {
                    animation: typing-bounce 1.4s infinite ease-in-out;
                    animation-delay: 0.4s;
                }
            `}</style>
            <span className="typing-dot-1 inline-block w-2 h-2 bg-slate-600 rounded-full"></span>
            <span className="typing-dot-2 inline-block w-2 h-2 bg-slate-600 rounded-full"></span>
            <span className="typing-dot-3 inline-block w-2 h-2 bg-slate-600 rounded-full"></span>
        </div>
    );
};
