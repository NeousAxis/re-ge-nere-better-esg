import React, { useEffect, useState } from 'react';

export const TypingIndicator: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Injecter les keyframes dans le document head une seule fois
    useEffect(() => {
        const styleId = 'typing-animation-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
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
            `;
            document.head.appendChild(style);
        }
    }, []);

    const dotStyle = (delay: number): React.CSSProperties => ({
        display: 'inline-block',
        width: '8px',
        height: '8px',
        backgroundColor: '#475569', // slate-600
        borderRadius: '9999px',
        animation: 'typing-bounce 1.4s infinite ease-in-out',
        animationDelay: `${delay}s`,
    });

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '6px',
            padding: '8px 4px'
        }}>
            <span style={dotStyle(0)}></span>
            <span style={dotStyle(0.2)}></span>
            <span style={dotStyle(0.4)}></span>
        </div>
    );
};
