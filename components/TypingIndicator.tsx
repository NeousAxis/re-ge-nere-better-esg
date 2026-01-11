import React from 'react';

export const TypingIndicator: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            padding: '12px 8px',
            minHeight: '32px',
        }}>
            <style>{`
                @keyframes typing-bounce {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.5;
                    }
                    30% {
                        transform: translateY(-10px);
                        opacity: 1;
                    }
                }
                .typing-dot {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    background-color: #1e293b;
                    border-radius: 50%;
                    animation: typing-bounce 1.4s infinite ease-in-out;
                }
                .typing-dot:nth-child(1) {
                    animation-delay: 0ms;
                }
                .typing-dot:nth-child(2) {
                    animation-delay: 200ms;
                }
                .typing-dot:nth-child(3) {
                    animation-delay: 400ms;
                }
            `}</style>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
        </div>
    );
};
