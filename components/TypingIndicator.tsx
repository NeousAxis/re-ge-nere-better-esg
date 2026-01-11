import React from 'react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-center justify-start gap-1 py-2 px-1">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
        </div>
    );
};
