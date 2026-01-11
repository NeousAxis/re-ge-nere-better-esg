import React, { useEffect, useState } from 'react';

export const TypingIndicator: React.FC = () => {
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDot((prev) => (prev + 1) % 3);
        }, 400);

        return () => clearInterval(interval);
    }, []);

    const getDotStyle = (index: number): React.CSSProperties => {
        const isActive = index === activeDot;
        return {
            display: 'inline-block',
            width: '12px',  // PLUS GROS
            height: '12px', // PLUS GROS
            backgroundColor: isActive ? '#1e293b' : '#64748b', // NOIR FONCE si actif, gris moyen sinon
            borderRadius: '50%',
            transform: isActive ? 'translateY(-8px) scale(1.3)' : 'translateY(0) scale(1)',
            opacity: isActive ? 1 : 0.6,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        };
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            padding: '12px 8px',
            minHeight: '32px',
        }}>
            <span style={getDotStyle(0)}></span>
            <span style={getDotStyle(1)}></span>
            <span style={getDotStyle(2)}></span>
        </div>
    );
};
