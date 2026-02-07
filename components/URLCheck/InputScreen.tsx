import React, { useState } from 'react';
import { Logo } from '../Logo';

interface UrlInputScreenProps {
    onUrlSubmitted: (url: string) => void;
    onBackToHome: () => void;
    initialUrl?: string;
}

export const UrlInputScreen: React.FC<UrlInputScreenProps> = ({ onUrlSubmitted, onBackToHome, initialUrl = '' }) => {
    const [url, setUrl] = useState(initialUrl);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onUrlSubmitted(url.trim());
        }
    };

    return (
        <div className="h-full flex flex-col bg-white relative overflow-hidden">
            {/* Header removed as there is no home screen */}
            <div className="w-full h-12"></div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center w-full px-6 z-10 overflow-y-auto">
                <div className="flex flex-col items-center justify-center gap-4 md:gap-12 w-full max-w-lg">

                    {/* DeepCheck Logo */}
                    <div className="relative group shrink-0">
                        <Logo size="lg" />
                    </div>

                    {/* Title and Description */}
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-slate-500 text-sm text-center max-w-md">
                            Enter a URL to analyze for potential malware or malicious content
                        </p>
                    </div>

                    {/* URL Input Form */}
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full pl-6 pr-6 py-4 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:border-primary focus:outline-none transition-colors text-base"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!url.trim()}
                                className="w-full bg-primary hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg disabled:shadow-none active:scale-95 mb-8"
                            >
                                Analyze URL
                            </button>
                        </div>
                    </form>


                </div>
            </div>

            {/* Footer Area */}
            <footer className="w-full pb-6 pt-4 flex flex-col items-center gap-6 relative z-10 shrink-0 mt-auto">
            </footer>

            <style>{`
        @keyframes pulseShadow {
            0% { box-shadow: 0 10px 30px rgba(0,122,255,0.1); }
            50% { box-shadow: 0 10px 50px rgba(0,122,255,0.3); }
            100% { box-shadow: 0 10px 30px rgba(0,122,255,0.1); }
        }
        @keyframes pulseGreen {
            0% { opacity: 0.6; transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
            100% { opacity: 0.6; transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes blinkRed {
            0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(239, 68, 68, 0.5); }
            50% { opacity: 0.4; box-shadow: 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
        </div >
    );
};
