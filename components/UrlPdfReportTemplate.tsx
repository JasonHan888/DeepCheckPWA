import React from 'react';
import { URLAnalysisResult } from '../types';

export interface UrlPdfReportProps {
    url: string;
    result: URLAnalysisResult;
    date: string;
}

export const UrlPdfReportTemplate: React.FC<UrlPdfReportProps> = ({ url, result, date }) => {
    const verdictColor = result.verdict === 'SAFE' ? '#10B981' : '#EF4444';

    // Calculate confidence score (High score = High confidence in the verdict)
    const confidenceScore = result.confidence_score;

    // Detailed analysis breakdown
    const analysisData = [
        {
            metric: 'Protocol Check',
            result: result.protocol,
            status: result.analysis_metric.protocol_check,
            highlight: result.analysis_metric.protocol_check.includes('Insecure')
        },
        {
            metric: 'HTTPS Certificate',
            result: 'SSL/TLS Validation',
            status: result.https_status === 'Valid' ? 'Verified Integrity' : 'Missing/Invalid',
            highlight: result.https_status !== 'Valid'
        },
        {
            metric: 'Domain Structure',
            result: result.analysis_metric.domain_structure,
            status: result.analysis_metric.domain_structure.includes('IP-Based') ? 'Suspicious (IP-Based)' : 'Standard Domain',
            highlight: result.analysis_metric.domain_structure.includes('IP-Based')
        },
        {
            metric: 'TLD Analysis',
            result: 'Extension Analysis',
            status: result.analysis_metric.tld_analysis,
            highlight: result.analysis_metric.tld_analysis.includes('Suspicious')
        },
        {
            metric: 'Subdomain Count',
            result: 'Structure Analysis',
            status: result.analysis_metric.subdomain_count > 2 ? `Excessive (${result.analysis_metric.subdomain_count})` : 'Normal Count',
            highlight: result.analysis_metric.subdomain_count > 2
        },
        {
            metric: 'URL Reputation',
            result: 'Database Lookup',
            status: result.analysis_metric.url_reputation,
            highlight: result.confidence_score > 90 && result.verdict === 'MALICIOUS'
        },
    ];

    return (
        <div
            id="pdf-report-template-url"
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
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#333' }}>URL SECURITY AUDIT</h1>
                </div>
                <div>
                    <p style={{ fontSize: '14px', margin: 0, color: '#666' }}>{date}</p>
                </div>
            </div>

            {/* Main Content: Flex Row */}
            <div style={{ display: 'flex', gap: '40px', marginBottom: '50px' }}>

                {/* Left Column: URL Container */}
                <div style={{ width: '350px' }}>
                    <div style={{
                        width: '350px',
                        minHeight: '200px',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: '30px',
                        marginBottom: '15px',
                        wordBreak: 'break-all'
                    }}>
                        <p style={{ fontSize: '13px', color: '#333', margin: 0, textAlign: 'center', fontWeight: '500', lineHeight: '1.6' }}>
                            {url}
                        </p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', textAlign: 'center', margin: 0 }}>Exhibit A: Analyzed URL</p>
                </div>

                {/* Right Column: Verdict Box */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div style={{
                        border: '1px solid #000',
                        borderRadius: '4px',
                        padding: '30px 25px',
                        backgroundColor: '#ffffff',
                    }}>
                        <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: '#999', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Audit Conclusion</h2>
                        <div style={{ fontSize: '42px', fontWeight: 'bold', color: verdictColor, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {result.verdict}
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '500', color: '#333' }}>
                            Confidence Score: <span style={{ fontWeight: 'bold' }}>{confidenceScore}%</span>
                        </div>
                    </div>

                    {/* Explanation Box */}
                    <div style={{
                        marginTop: '20px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '15px',
                        backgroundColor: '#f9f9f9',
                        fontSize: '12px',
                        lineHeight: '1.6',
                        color: '#555'
                    }}>
                        <p style={{ margin: 0 }}>{result.threat_message}</p>
                    </div>
                </div>
            </div>

            {/* Technical Breakdown Table (Audit Grid) */}
            <div style={{ marginBottom: '50px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '15px', margin: '0 0 15px 0' }}>Technical Breakdown</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left', border: '1px solid #000' }}>
                    <thead style={{ backgroundColor: '#e0e0e0' }}>
                        <tr>
                            <th style={{ padding: '10px', width: '28%', border: '1px solid #999', fontWeight: 'bold', color: '#000', fontSize: '11px' }}>Analysis Metric</th>
                            <th style={{ padding: '10px', width: '35%', border: '1px solid #999', fontWeight: 'bold', color: '#000', fontSize: '11px' }}>Target Artifact</th>
                            <th style={{ padding: '10px', width: '37%', border: '1px solid #999', fontWeight: 'bold', color: '#000', fontSize: '11px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analysisData.map((row, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px 10px', border: '1px solid #ccc', fontWeight: '600', fontSize: '11px' }}>{row.metric}</td>
                                <td style={{ padding: '8px 10px', border: '1px solid #ccc', fontSize: '11px' }}>{row.result}</td>
                                <td style={{
                                    padding: '8px 10px',
                                    border: '1px solid #ccc',
                                    fontWeight: 'bold',
                                    color: row.highlight ? '#EF4444' : '#10B981',
                                    fontSize: '11px'
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
