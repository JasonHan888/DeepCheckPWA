// Remote API Service

export interface AnalysisResult {
    isFake: boolean;
    confidence: number;
    forensicScore?: number;
    details?: {
        method: string;
        full_image_fake_score: string;
        face_crop_fake_score: string;
    };
}

const API_URL = "https://jasonhan888-deepfake-analyzer.hf.space/analyze";

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.error) {
            throw new Error(data.error);
        }

        // Parse API Usage:
        // {
        //     "filename": "...",
        //     "verdict": "Real" | "Deepfake",
        //     "confidence_fake": "98.50%",
        //     "method": "...",
        //     "details": {
        //         "full_image_fake_score": "XX.XX%",
        //         "face_crop_fake_score": "XX.XX%"
        //     }
        // }

        const isFake = data.verdict === "Deepfake";

        // Parse percentage string "98.50%" -> 0.985
        const parsePercent = (str: string) => {
            if (!str) return 0;
            return parseFloat(str.replace('%', '')) / 100;
        };

        const fakeProb = parsePercent(data.confidence_fake);

        // Confidence should be the confidence IN THE VERDICT.
        // If Deepfake -> fakeProb
        // If Real -> 1 - fakeProb (e.g. if fakeProb is 1.5%, real confidence is 98.5%)

        // Note: The python code says: 
        // if final_fake_score > 0.50: verdict = "Deepfake"
        // So boundaries are aligned.

        const confidence = isFake ? fakeProb : (1 - fakeProb);

        // Map details
        const details = {
            method: data.method,
            full_image_fake_score: data.details?.full_image_fake_score,
            face_crop_fake_score: data.details?.face_crop_fake_score
        };

        return {
            isFake,
            confidence,
            forensicScore: 0, // Not provided by this API
            details
        };

    } catch (error) {
        console.error("Deepfake Analysis API Error:", error);
        throw error;
    }
};
