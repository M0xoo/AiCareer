import React, { useState, useEffect, useCallback, useRef } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleOnHover?: boolean;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, scrambleOnHover = true }) => {
    const [displayText, setDisplayText] = useState(text);
    const isScrambling = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = useCallback(() => {
        if (isScrambling.current) return;
        isScrambling.current = true;

        let iteration = 0;
        const maxIterations = text.length;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev => {
                return text.split("").map((_, index) => {
                    if (text[index] === ' ') return ' ';
                    if (text[index] === '\n') return '\n';

                    if (index < iteration) {
                        return text[index];
                    }
                    return LETTERS[Math.floor(Math.random() * LETTERS.length)];
                }).join("");
            });

            if (iteration >= maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                isScrambling.current = false;
                setDisplayText(text);
            }

            iteration += 1;
        }, 15);
    }, [text]);

    useEffect(() => {
        scramble();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []); // Run ONLY once on mount

    return (
        <span
            className={className}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
        >
            {displayText}
        </span>
    );
};
