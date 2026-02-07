import React from 'react';
import { Icon } from '../Icon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PdfReportTemplate } from '../PdfReportTemplate';

// Update Props Interface
interface ResultScreenProps {
  imageSrc: string;
  onBack: () => void;
  onScanAnother: () => void;
  score?: number; // 0-100 (Confidence in Verdict)
  isFake?: boolean;
  forensicScore?: number;
  details?: {
    method: string;
    full_image_fake_score: string;
    face_crop_fake_score: string;
  };
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  imageSrc,
  onBack,
  onScanAnother,
  score = 0,
  isFake = false,
  forensicScore = 0,
  details
}) => {
  // ... (keep state logic same)
  // Generate random Case ID and Date once
  const caseId = React.useMemo(() => `#DC-${Math.floor(Math.random() * 9000) + 1000}`, []);
  const date = React.useMemo(() => new Date().toLocaleString(), []);
  const [isGenerating, setIsGenerating] = React.useState(false);

  // FIVE-STATE RISK ASSESSMENT (Final Calibration v3):
  // ... (keep existing verdict logic)
  // 1. < 30%: AUTHENTIC (Green)
  // 2. 30% - 50%: INCONCLUSIVE / UNCERTAIN (Blue/Gray) 
  // 3. 50% - 70%: SUSPICIOUS / POTENTIAL AI (Amber) - Handles the "55%" case the user wants caught
  // 4. 70% - 90%: HIGH RISK (Orange)
  // 5. > 90%: ARTIFICIAL / DEEPFAKE (Red)

  const deepfakeScore = isFake ? score : (100 - score);

  let verdictText = "AUTHENTIC";
  let verdictColor = "text-emerald-500";
  let barColor = "bg-emerald-500";

  if (deepfakeScore >= 90) {
    verdictText = "ARTIFICIAL";
    verdictColor = "text-red-500";
    barColor = "bg-red-500";
  } else if (deepfakeScore >= 70) {
    verdictText = "HIGH RISK / SUSPICIOUS";
    verdictColor = "text-orange-500";
    barColor = "bg-orange-500";
  } else if (deepfakeScore >= 50) {
    verdictText = "SUSPICIOUS / POTENTIAL AI";
    verdictColor = "text-amber-500";
    barColor = "bg-amber-500";
  } else if (deepfakeScore >= 30) {
    verdictText = "INCONCLUSIVE / NEUTRAL";
    verdictColor = "text-blue-500";
    barColor = "bg-blue-400";
  } else {
    verdictText = "NO GEN-AI DETECTED";
    verdictColor = "text-emerald-500";
    barColor = "bg-emerald-500";
  }

  const getIcon = (confidence: string) => {
    // Basic heuristic for icon based on score string "98%"
    const num = parseFloat(confidence.replace('%', ''));
    if (isNaN(num)) return "info";
    if (num > 50) return "warning";
    return "check_circle";
  };

  // Helper to parse score string to color
  const getScoreColor = (scoreStr?: string) => {
    if (!scoreStr) return "text-gray-500";
    const num = parseFloat(scoreStr.replace('%', ''));
    if (isNaN(num)) return "text-gray-500";
    if (num > 70) return "text-red-500";
    if (num > 40) return "text-amber-500";
    return "text-emerald-500";
  };

  const generateAndSharePDF = async () => {
    // ... (keep PDF logic same, but note: PDF template might need update separately if critical)
    // For now we focus on the UI screen update.
    setIsGenerating(true);
    try {
      const input = document.getElementById('pdf-report-template');
      if (input) {
        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 794,
          windowHeight: 1123
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const now = new Date();
        const timestamp = now.getFullYear().toString() +
          (now.getMonth() + 1).toString().padStart(2, '0') +
          now.getDate().toString().padStart(2, '0') + '_' +
          now.getHours().toString().padStart(2, '0') +
          now.getMinutes().toString().padStart(2, '0');

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`DeepCheck_Analysis_${timestamp}.pdf`);
      }
    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    // Main Container: 100dvh, flex column, no outer padding
    <div className="h-full w-full bg-white flex flex-col relative overflow-hidden">

      {/* Header with Back Button */}
      <div className="shrink-0 w-full px-6 pt-12 pb-4 flex items-center">
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-slate-100 -ml-2"
          aria-label="Back to home"
        >
          <Icon name="arrow_back" className="text-2xl" />
        </button>
      </div>

      {/* Content Area: Flex-1, scrollable, with padding */}
      <div className="flex-1 w-full flex flex-col items-center overflow-y-auto px-8 py-8 animate-[fadeIn_0.5s_ease-out]">

        {/* Top: User's Photo */}
        <div className="relative w-[200px] h-[200px] mb-8 shrink-0">
          <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-slate-50">
            <img
              src={imageSrc}
              alt="Analyzed"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Middle: Verdict */}
        <div className="flex flex-col items-center w-full max-w-xs text-center shrink-0">
          <h1 className={`text-[32px] font-[800] tracking-tight mb-6 ${verdictColor} uppercase`}>
            {verdictText}
          </h1>

          {/* Below Verdict: Score */}
          <div className="w-full flex flex-col items-center mb-6">
            <span className={`text-sm font-bold mb-2 uppercase tracking-wide ${verdictColor}`}>
              Confidence: {score}%
            </span>
            {/* Thin Elegant Line */}
            <div className="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Technical Details Checklist */}
        <div className="w-full max-w-xs mb-4">

          {/* Row 1: Scan Method */}
          <div className="flex flex-col w-full px-4 py-3 bg-gray-50 rounded-xl mb-2 border border-slate-100">
            <span className="text-xs font-bold text-gray-400 uppercase mb-1">Methodology</span>
            <span className="text-sm font-semibold text-slate-700">{details?.method || "Standard Scan"}</span>
          </div>

          {/* Row 2: Full Image Score */}
          <div className="flex justify-between items-center w-full px-4 py-3 bg-gray-50 rounded-xl mb-2 border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium text-sm">Full Image Risk</span>
            </div>
            <span className={`font-semibold text-sm text-right ${getScoreColor(details?.full_image_fake_score)}`}>
              {details?.full_image_fake_score || "N/A"}
            </span>
          </div>

          {/* Row 3: Face Crop Score */}
          <div className="flex justify-between items-center w-full px-4 py-3 bg-gray-50 rounded-xl mb-2 border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium text-sm">Face Analysis Risk</span>
            </div>
            <span className={`font-semibold text-sm text-right ${getScoreColor(details?.face_crop_fake_score)}`}>
              {details?.face_crop_fake_score || "N/A"}
            </span>
          </div>

        </div>

      </div>

      {/* Footer: Sticky Bottom, White BG, Shadow */}
      <div
        className="w-full bg-white/85 backdrop-blur-[12px] px-5 pt-5 border-t border-black/5 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] shrink-0 z-100 sticky bottom-0"
        style={{ paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' }}
      >
        <button
          onClick={generateAndSharePDF}
          disabled={isGenerating}
          className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-sm uppercase tracking-wider shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 mb-3"
        >
          {isGenerating ? 'Generating...' : 'DOWNLOAD FULL AUDIT REPORT'}
        </button>
        <div className="text-center mb-2">
          <button
            onClick={onScanAnother}
            className="text-slate-400 text-[13px] font-semibold uppercase tracking-wider hover:text-slate-600 transition-colors opacity-60"
          >
            Scan New Image
          </button>
        </div>
      </div>

      {/* Hidden PDF Template */}
      <PdfReportTemplate
        imageSrc={imageSrc}
        score={score}
        caseId={caseId}
        date={date}
        isFake={isFake}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};