import React from 'react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-center text-slate-500 p-1">
            <svg width="24" height="12" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                <circle cx="4" cy="6" r="2.5">
                    <animate attributeName="cy" begin="0s" dur="1s" values="6;2;6" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" repeatCount="indefinite" />
                </circle>
                <circle cx="12" cy="6" r="2.5">
                    <animate attributeName="cy" begin="0.2s" dur="1s" values="6;2;6" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" repeatCount="indefinite" />
                </circle>
                <circle cx="20" cy="6" r="2.5">
                    <animate attributeName="cy" begin="0.4s" dur="1s" values="6;2;6" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
};
