import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

interface DashboardProps {
  onPhotoCheckClick: () => void;
  onUrlCheckClick: () => void;
  hasCheckedSystem: boolean;
  onSystemCheckComplete: () => void;
  className?: string;
}

const ActionCard: React.FC<{
  onClick: () => void;
  icon: string;
  title: string;
  subtitle: string;
  hasCheckedSystem: boolean;
}> = ({ onClick, icon, title, subtitle, hasCheckedSystem }) => (
  <button
    onClick={onClick}
    className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 group hover:shadow-md hover:border-primary/30 active:scale-[0.98] cursor-pointer flex items-center gap-4"
  >
    {/* Fixed Size Icon Container */}
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_20px_rgba(0,122,255,0.2)] transition-shadow duration-300">
      <Icon name={icon as any} className="text-primary text-3xl" filled />
    </div>

    {/* Standardized Text Layout */}
    <div className="text-left flex-1 min-w-0">
      <h2 className="text-lg font-bold text-slate-800 mb-0.5">{title}</h2>
      <p className="text-slate-500 text-sm leading-tight">{subtitle}</p>
    </div>

    {/* Arrow Aligned Right */}
    <Icon name="chevron_right" className="text-slate-400 text-2xl group-hover:text-primary transition-colors shrink-0" />
  </button>
);

export const Dashboard: React.FC<DashboardProps> = ({
  onPhotoCheckClick,
  onUrlCheckClick,
  hasCheckedSystem,
  onSystemCheckComplete,
  className = ""
}) => {
  const [isChecking, setIsChecking] = useState(!hasCheckedSystem);

  useEffect(() => {
    let checkTimer: any;

    if (!hasCheckedSystem) {
      checkTimer = setTimeout(() => {
        setIsChecking(false);
        onSystemCheckComplete();
      }, 1500);
    } else {
      setIsChecking(false);
    }

    return () => {
      if (checkTimer) clearTimeout(checkTimer);
    };
  }, [hasCheckedSystem, onSystemCheckComplete]);

  return (
    <div className={`w-full h-full bg-white flex flex-col overflow-hidden ${className}`}>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-5">
        {/* Title */}
        <h1 className={`text-primary tracking-tight text-5xl font-bold mb-5 ${!hasCheckedSystem ? 'animate-[fadeSlideIn_0.5s_ease-out]' : ''}`}>
          DeepCheck
        </h1>

        {/* URL Security Check Card */}
        <ActionCard
          onClick={onUrlCheckClick}
          icon="shield"
          title="URL Security Check"
          subtitle="Scan links for phishing and malware"
          hasCheckedSystem={hasCheckedSystem}
        />

        {/* Photo Deepfake Check Card */}
        <ActionCard
          onClick={onPhotoCheckClick}
          icon="camera"
          title="Photo Deepfake Check"
          subtitle="Analyze images for AI manipulation"
          hasCheckedSystem={hasCheckedSystem}
        />
      </main>

      {/* Footer */}
      <footer className="w-full pb-6 pt-4 flex flex-col items-center gap-2 shrink-0 mt-auto">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
          Version 1.0
        </span>
      </footer>

      <style>{`
        @keyframes fadeSlideIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
