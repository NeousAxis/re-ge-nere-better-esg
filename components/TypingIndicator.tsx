import React, { useEffect, useState } from 'react';

export const TypingIndicator: React.FC = () => {
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDot((prev) => (prev + 1) % 3);
        }, 400); // Change de dot toutes les 400ms

        return () => clearInterval(interval);
    }, []);

    const getDotStyle = (index: number): React.CSSProperties => {
        const isActive = index === activeDot;
        return {
            display: 'inline-block',
            width: '8px',
            height: '8px',
            backgroundColor: isActive ? '#475569' : '#94a3b8', // slate-600 si actif, slate-400 sinon
            borderRadius: '9999px',
            transform: isActive ? 'translateY(-6px) scale(1.2)' : 'translateY(0) scale(1)',
            opacity: isActive ? 1 : 0.5,
            transition: 'all 0.3s ease-in-out',
        };
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '6px',
            padding: '8px 4px',
            minHeight: '24px',
        }}>
            <span style={getDotStyle(0)}></span>
            <span style={getDotStyle(1)}></span>
            <span style={getDotStyle(2)}></span>
        </div>
    );
};
