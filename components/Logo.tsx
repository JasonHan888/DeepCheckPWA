import React from 'react';

interface LogoProps {
    showText?: boolean;
    showIcon?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({
    showText = true,
    showIcon = false,
    size = 'md',
    className = ""
}) => {
    const sizeMap = {
        sm: { box: 'w-10 h-10', text: 'text-lg', gap: 'gap-2', innerText: 'text-[8px]' },
        md: { box: 'w-16 h-16', text: 'text-2xl', gap: 'gap-3', innerText: 'text-[12px]' },
        lg: { box: 'w-24 h-24', text: 'text-4xl', gap: 'gap-4', innerText: 'text-[18px]' },
        xl: { box: 'w-32 h-32', text: 'text-5xl', gap: 'gap-6', innerText: 'text-[24px]' },
    };

    const currentSize = sizeMap[size];

    return (
        <div className={`flex flex-col items-center justify-center ${currentSize.gap || ''} ${className}`}>
            {/* Logo Box (Removed by default) */}
            {showIcon && (
                <div className={`${currentSize.box} bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 p-2`}>
                    <div className="flex flex-col items-center leading-none font-bold text-primary">
                        <span style={{ fontSize: currentSize.innerText }}>Deep</span>
                        <span style={{ fontSize: currentSize.innerText }}>Check</span>
                    </div>
                </div>
            )}

            {/* Logo Text Below */}
            {showText && (
                <h1 className={`text-primary font-bold tracking-tight ${currentSize.text}`}>
                    DeepCheck
                </h1>
            )}
        </div>
    );
};
