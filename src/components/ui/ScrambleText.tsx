import React, { useState, useEffect, useCallback } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleOnHover?: boolean;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, scrambleOnHover = true }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const maxIterations = text.length;

        const interval = setInterval(() => {
            setDisplayText(prev => {
                return prev.split("").map((letter, index) => {
                    // Keep spaces as spaces to maintain word structure
                    if (text[index] === ' ') return ' ';
                    if (text[index] === '\n') return '\n';

                    if (index < iteration) {
                        return text[index];
                    }
                    return LETTERS[Math.floor(Math.random() * LETTERS.length)];
                }).join("");
            });

            if (iteration >= maxIterations) {
                clearInterval(interval);
                setIsScrambling(false);
                // Ensure the final text matches exactly
                setDisplayText(text);
            }

            iteration += 1 / 3; // speed
        }, 30);

        return () => clearInterval(interval);
    }, [text, isScrambling]);

    useEffect(() => {
        scramble();
    }, [scramble]);

    return (
        <span
            className={className}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
        >
            {displayText}
        </span>
    );
};
