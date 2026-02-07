import React, { useState } from 'react';
import { Icon } from '../Icon';
import { URLAnalysisResult } from '../../types';
import { checkUrlWithHuggingFace } from '../../services/huggingFaceService';
import { UrlAnalyzingScreen } from './AnalyzingScreen';
import { UrlResultScreen } from './ResultScreen';
import { UrlInputScreen } from './InputScreen';

interface URLCheckScreenProps {
    initialUrl?: string;
}

type ScreenState = 'input' | 'analyzing' | 'result';

export const UrlCheckScreen: React.FC<URLCheckScreenProps> = ({ initialUrl = '' }) => {
    const [screenState, setScreenState] = useState<ScreenState>('input');
    const [url, setUrl] = useState(initialUrl);
    const [result, setResult] = useState<URLAnalysisResult | null>(null);

    const handleUrlSubmitted = (submittedUrl: string) => {
        setUrl(submittedUrl);
        setScreenState('analyzing');
    };

    const handleAnalysisComplete = (analysisResult: URLAnalysisResult) => {
        setResult(analysisResult);
        setScreenState('result');
    };

    const handleBackToInput = () => {
        setScreenState('input');
    };

    const handleAnalyzeAnother = () => {
        setUrl('');
        setResult(null);
        setScreenState('input');
    };

    return (
        <div className="h-full w-full bg-white relative">

            {screenState === 'input' && (
                <UrlInputScreen
                    onUrlSubmitted={handleUrlSubmitted}
                    onBackToHome={() => { }} // No home anymore, maybe just reset or hide
                    initialUrl={url}
                />
            )}

            {screenState === 'analyzing' && (
                <UrlAnalyzingScreen
                    url={url}
                    onCancel={handleBackToInput}
                    onComplete={handleAnalysisComplete}
                />
            )}

            {screenState === 'result' && result && (
                <UrlResultScreen
                    url={url}
                    result={result}
                    onBack={handleBackToInput}
                    onAnalyzeAnother={handleAnalyzeAnother}
                />
            )}

            {/* Custom styles override to handle the "one screen" feel */}
            <style>{`
                /* Hide back button in InputScreen since there's no Home */
                [aria-label="Back to home"] {
                    display: none;
                }
            `}</style>
        </div>
    );
};
