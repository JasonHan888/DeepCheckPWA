import React, { useEffect, useState } from 'react';
import { analyzeImage } from '../../services/analysisService';
import { AnalysisResult } from '../../services/analysisService';

interface AnalyzingScreenProps {
  imageSrc: string;
  imageFile: File;
  onCancel: () => void;
  onComplete: (result: AnalysisResult) => void;
  onError?: (message: string) => void;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ imageSrc, imageFile, onCancel, onComplete, onError }) => {
  const [scanMessage, setScanMessage] = useState("Initializing Deepware Core...");

  // Message Cycler Logic
  useEffect(() => {
    const messages = [
      "Initializing Deepware Core...",
      "Extracting Metadata...",
      "Mapping Noise Patterns...",
      "Verifying Pixel Integrity...",
      "Finalizing Verdict..."
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setScanMessage(messages[index]);
    }, 600); // Rapid fire cycling

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let active = true;

    const analyze = async () => {
      try {
        // Enforce roughly 3 seconds of "scanning" to match the animation
        const startTime = Date.now();
        const result = await analyzeImage(imageFile);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - elapsedTime);

        setTimeout(() => {
          if (active) {
            onComplete(result);
          }
        }, remainingTime);

      } catch (error) {
        console.error("Analysis failed", error);
        if (active && onError) {
          const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
          onError(`Analysis failed: ${errorMessage}`);
        } else if (active) {
          // Fallback: go back to cancel if no error handler
          onCancel();
        }
      }
    };

    analyze();

    return () => { active = false; };
  }, [imageFile, onComplete, onError, onCancel]);

  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center relative overflow-hidden text-slate-900">

      {/* Scanner Box */}
      <div className="relative w-64 h-64 rounded-[20px] overflow-hidden shadow-2xl bg-black transform transition-transform hover:scale-[1.02] duration-500">
        {/* User Image */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        ></div>

        {/* Blue Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-10"
          style={{
            backgroundImage: `
                linear-gradient(to right, rgba(0, 122, 255, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 122, 255, 0.2) 1px, transparent 1px)
              `,
            backgroundSize: '20px 20px'
          }}
        ></div>

        {/* Laser Scan Line */}
        <div
          className="absolute left-0 w-full h-[2px] bg-[#007AFF] shadow-[0_0_15px_#007AFF] z-20 animate-[laserScan_1.5s_linear_infinite_alternate]"
        ></div>

        {/* Brightness/Highlight Effect following the laser */}
        <div
          className="absolute left-0 w-full h-[40px] bg-gradient-to-b from-transparent via-[#007AFF]/10 to-transparent z-10 animate-[laserScan_1.5s_linear_infinite_alternate]"
          style={{ transform: 'translateY(-50%)' }} // Center align with laser
        ></div>

      </div>

      {/* Terminal Log Data Stream */}
      <div className="w-64 mt-8 flex flex-col">
        {/* Terminal Log Text */}
        <div className="font-mono text-[10px] text-slate-500 mb-3 h-4 leading-none">
          {">"} {scanMessage}
        </div>

        {/* Super-Thin Progress Line */}
        <div className="w-full h-[2px] bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#007AFF] animate-[progressGrow_3s_ease-out_forwards] w-0"></div>
        </div>
      </div>

      {/* Cancel Button */}
      <div className="absolute bottom-10 w-full text-center">
        <button
          onClick={onCancel}
          className="text-red-500 text-xs font-medium uppercase tracking-widest hover:text-red-600 transition-colors opacity-80 hover:opacity-100"
        >
          Stop Analysis
        </button>
      </div>

      <style>{`
        @keyframes laserScan {
            0% { top: 5%; opacity: 0.8; }
            100% { top: 95%; opacity: 1; }
        }
        @keyframes progressGrow {
            0% { width: 0%; }
            100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};