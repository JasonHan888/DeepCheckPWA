import { Client } from "@gradio/client";
import { URLAnalysisResult } from '../types';

/**
 * Connects to the Hugging Face Space and analyzes the URL.
 * Space: jasonhan888/my-url-scanner
 */
export async function checkUrlWithHuggingFace(url: string): Promise<URLAnalysisResult> {
    try {
        const client = await Client.connect("jasonhan888/my-url-scanner");

        // Use the named endpoint /predict as requested by user
        // Pass arguments as an array
        const result = await client.predict("/predict", [url]);

        // Log the raw result to see what came back
        console.log("Raw HF Result:", result);

        // The data usually resides in the 'data' array
        const apiResponse = (result as any).data[0];

        if (!apiResponse) {
            throw new Error("No data received from analysis API");
        }

        if (apiResponse.error) {
            throw new Error(apiResponse.error);
        }

        // Generate the PWA report on the client side
        return generatePwaReport(url, apiResponse);

    } catch (error: any) {
        console.error("Hugging Face Space analysis failed:", error);
        throw error;
    }
}

/**
 * Generates the full PWA report from the raw AI response.
 * Mirrors the logic previously found in the backend.
 */
function generatePwaReport(url: string, aiResponse: any): URLAnalysisResult {
    // Parse URL for metrics
    let parsedUrl: URL;
    try {
        parsedUrl = new URL(url);
    } catch (e) {
        // Fallback for invalid URLs
        parsedUrl = new URL("http://" + url);
    }

    const isHttps = parsedUrl.protocol === 'https:';
    const domain = parsedUrl.hostname;
    const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(domain);

    // --- 1. Calculate Confidence & Status ---
    let finalScore = 0;
    const isMalicious = !!aiResponse.is_malicious;

    if (isMalicious) {
        const method = aiResponse.method || '';
        // Database and Heuristics are always 100% certain
        if (!method.includes("AI Engine")) {
            finalScore = 100;
        } else {
            // Convert 0.98 to 98
            const confidence = typeof aiResponse.confidence === 'number' ? aiResponse.confidence : 0;
            finalScore = Math.floor(confidence * 100);
        }
    }

    // --- 2. Generate UI Data ---
    const category = aiResponse.category || 'unknown';
    const method = aiResponse.method || 'No threats found';

    return {
        verdict: isMalicious ? "MALICIOUS" : "SAFE",
        confidence_score: finalScore,
        protocol: parsedUrl.protocol.replace(':', ''),
        https_status: isHttps ? "Valid" : "Missing",

        threat_message: isMalicious ? method : "No threats found",
        recommendation: isMalicious ? "Avoid this link" : "Safe to proceed",
        analysis_metric: {
            protocol_check: isHttps ? "Secure (HTTPS)" : "Insecure (HTTP)",
            domain_structure: isIp ? "IP-Based Detection" : "Standard Domain",
            tld_analysis: (domain.endsWith('.xyz') || domain.endsWith('.top')) ? "Suspicious Extension" : "Normal Distribution",
            subdomain_count: !isIp ? (domain.split('.').length - 2) : 0,
            url_reputation: finalScore > 90 ? "Risk Level: 100/100" : `Risk Level: ${finalScore}/100`,

        }
    };
}
