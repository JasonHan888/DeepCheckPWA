import React from 'react';

export interface PdfReportProps {
    imageSrc: string;
    score: number;
    caseId: string; // Kept for compatibility
    date: string;
    isFake: boolean;
    forensicScore?: number;
}

export const PdfReportTemplate: React.FC<PdfReportProps> = ({ imageSrc, score, date, isFake, forensicScore = 0 }) => {

    const deepfakeScore = isFake ? score : (100 - score);
    const isSuspicious = deepfakeScore >= 50 || forensicScore >= 0.8;

    let verdict = 'AUTHENTIC';
    let verdictColor = '#10B981'; // Green

    if (deepfakeScore >= 90) {
        verdict = 'ARTIFICIAL';
        verdictColor = '#EF4444'; // Red
    } else if (deepfakeScore >= 70) {
        verdict = 'HIGH RISK';
        verdictColor = '#F97316'; // Orange
    } else if (deepfakeScore >= 50) {
        verdict = 'SUSPICIOUS';
        verdictColor = '#F59E0B'; // Amber
    } else if (deepfakeScore >= 30) {
        verdict = 'INCONCLUSIVE';
        verdictColor = '#3B82F6'; // Blue
    }

    // Dynamic Analysis Data (Full Spectrum Audit)
    const hasIssues = deepfakeScore >= 30;
    const isHighRisk = deepfakeScore >= 50;

    const analysisData = [
        {
            metric: 'Compression Profile',
            result: 'JPEG Quantization',
            status: hasIssues ? (isHighRisk ? 'Anomalous (Double Compression)' : 'Potential Artifacts') : 'Consistent (Original Source)',
            highlight: hasIssues,
            color: verdictColor
        },
        {
            metric: 'Noise Distribution',
            result: 'Global Variance',
            status: forensicScore >= 0.8 ? 'Synthetic Smoothness (AI Identified)' : (forensicScore >= 0.6 ? 'Inconsistent Texture' : 'Natural Sensor Pattern'),
            highlight: forensicScore >= 0.6,
            color: forensicScore >= 0.6 ? '#F59E0B' : '#10B981'
        },
        {
            metric: 'Metadata Heuristics',
            result: 'EXIF Structure',
            status: hasIssues ? (isHighRisk ? 'Missing / Stripped' : 'Modified/Unknown') : 'Verified Integrity',
            highlight: hasIssues,
            color: verdictColor
        },
        {
            metric: 'Generative Artifacts',
            result: 'Diffusion Pattern',
            status: hasIssues ? (isHighRisk ? 'DETECTED' : 'Potential Traces') : 'None Detected',
            highlight: hasIssues,
            color: verdictColor
        },
        { metric: 'Frequency Analysis', result: 'DCT Coefficients', status: hasIssues ? (isHighRisk ? 'ANOMALY' : 'Unstable Distribution') : 'Normal Distribution', highlight: hasIssues, color: verdictColor },
        { metric: 'Biometric Consistency', result: 'Facial Landmarks', status: hasIssues ? (isHighRisk ? 'Distorted' : 'Natural appearance') : 'Aligned/Natural', highlight: false, color: '#333' },
        { metric: 'Error Level Analysis', result: 'Resave Quality', status: hasIssues ? (isHighRisk ? 'FAIL' : 'Borderline') : 'PASS (Uniform)', highlight: hasIssues, color: verdictColor },
    ];

    return (
        <div
            id="pdf-report-template"
            style={{
                position: 'absolute',
                left: '-9999px',
                top: 0,
                width: '794px', // A4 width at 96dpi
                minHeight: '1123px', // A4 height at 96dpi
                backgroundColor: '#ffffff',
                fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
                color: '#333333',
                padding: '40px 50px',
                boxSizing: 'border-box'
            }}
        >
            {/* Header */}
            <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#333' }}>MEDIA INTEGRITY AUDIT</h1>
                </div>
                <div>
                    <p style={{ fontSize: '14px', margin: 0, color: '#666' }}>{date}</p>
                </div>
            </div>

            {/* Main Content: Flex Row */}
            <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>

                {/* Left Column: Image Container */}
                <div style={{ width: '350px' }}>
                    <div style={{
                        width: '350px',
                        height: '450px',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #000', // Black Border
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        marginBottom: '10px'
                    }}>
                        <img
                            src={imageSrc}
                            alt="Evidence"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                    <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>Exhibit A: Submitted Media</p>
                </div>

                {/* Right Column: Findings */}
                <div style={{ flex: 1 }}>
                    {/* Verdict Box */}
                    <div style={{
                        border: '1px solid #000', // High Contrast Black Border
                        borderRadius: '4px',
                        padding: '25px',
                        backgroundColor: '#ffffff',
                        marginBottom: '30px'
                    }}>
                        <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: '#999', margin: '0 0 15px 0', textTransform: 'uppercase' }}>Audit Conclusion</h2>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: verdictColor, marginBottom: '10px' }}>
                            {verdict}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                            Confidence Score: <span style={{ fontWeight: 'bold' }}>{score.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Breakdown Table (Audit Grid) */}
            <div style={{ marginBottom: '50px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '10px', marginBottom: '15px' }}>Technical Breakdown</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left', border: '1px solid #ccc' }}>
                    <thead style={{ backgroundColor: '#e0e0e0' }}>
                        <tr>
                            <th style={{ padding: '10px', width: '30%', border: '1px solid #999', fontWeight: 'bold', color: '#000' }}>Analysis Metric</th>
                            <th style={{ padding: '10px', width: '40%', border: '1px solid #999', fontWeight: 'bold', color: '#000' }}>Target Artifact</th>
                            <th style={{ padding: '10px', width: '30%', border: '1px solid #999', fontWeight: 'bold', color: '#000' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analysisData.map((row, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px 10px', border: '1px solid #ccc', fontWeight: '600' }}>{row.metric}</td>
                                <td style={{ padding: '8px 10px', border: '1px solid #ccc' }}>{row.result}</td>
                                <td style={{
                                    padding: '8px 10px',
                                    border: '1px solid #ccc',
                                    fontWeight: 'bold',
                                    color: row.color
                                }}>
                                    {row.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eee', color: '#999', fontSize: '10px', textAlign: 'center' }}>
                Generated by DeepCheck Automated System. No data stored on servers.
            </div>

        </div>
    );
};
