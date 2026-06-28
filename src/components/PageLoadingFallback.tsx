import React from 'react';

const PageLoadingFallback: React.FC = () => {
    return (
        <div
            className="min-h-screen bg-black flex items-center justify-center"
            style={{ position: 'fixed', inset: 0, zIndex: 100 }}
        >
            <div className="flex flex-col items-center gap-4">
                <div
                    style={{
                        width: 48,
                        height: 48,
                        border: '3px solid rgba(234, 179, 8, 0.2)',
                        borderTop: '3px solid #eab308',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }}
                />
                <span className="text-yellow-500 text-sm tracking-widest uppercase">Loading</span>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default PageLoadingFallback;
