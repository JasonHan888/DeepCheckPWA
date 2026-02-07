import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '../Icon';

interface UploadScreenProps {
  onImageSelected: (file: File) => void;
  onBackToHome?: () => void;
  errorMessage?: string | null;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onImageSelected, onBackToHome, errorMessage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const handleLensClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header */}
      {/* Header */}
      <header className="w-full px-6 pt-12 pb-4 flex items-center shrink-0">
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-slate-100 -ml-2"
            aria-label="Back to home"
          >
            <Icon name="arrow_back" className="text-2xl" />
          </button>
        )}
      </header>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-[shake_0.5s_ease-in-out]">
          <div className="flex items-start gap-3">
            <Icon name="error" className="text-red-600 text-xl shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-bold text-sm">Analysis Failed</p>
              <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full relative z-10 min-h-0">
        <div className="flex flex-col items-center justify-center gap-12 w-full max-w-sm">

          {/* Pulsing Lens Button */}
          <div
            className="relative group cursor-pointer"
            onClick={handleLensClick}
          >
            {/* Main Outer Body with Pulse Animation - Updated to match Shield glow */}
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-blue-50 relative z-10 animate-[pulseShadow_3s_infinite_ease-in-out]">

              {/* Metallic/Gradient Ring */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 shadow-[inset_0_2px_5px_rgba(0,0,0,0.05),0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center p-1">

                {/* Dark Lens Center */}
                <div className="w-full h-full rounded-full bg-slate-900 shadow-[inset_0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden group-hover:shadow-[inset_0_10px_35px_rgba(0,0,0,0.8)] transition-shadow duration-500">

                  {/* Glass Reflection (Top Half) */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

                  {/* Aperture Icon */}
                  <Icon name="camera" className="text-slate-600 text-[48px] opacity-80 group-hover:text-primary transition-colors duration-500" filled />

                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="flex flex-col items-center gap-6 w-full">
            <p className="text-slate-400 text-sm font-semibold tracking-wide">
              Tap lens to upload photo
            </p>
          </div>

        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </main>

      {/* Footer Area */}
      <footer className="w-full pb-6 pt-4 flex flex-col items-center gap-4 relative z-10 shrink-0 mt-auto">


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