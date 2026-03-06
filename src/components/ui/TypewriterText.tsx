import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    words,
    className,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isPaused) {
            timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(timeout);
        }

        const currentWord = words[currentWordIndex];

        if (isDeleting) {
            if (currentText.length === 0) {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            } else {
                timeout = setTimeout(() => {
                    setCurrentText(currentText.slice(0, -1));
                }, deletingSpeed);
            }
        } else {
            if (currentText.length === currentWord.length) {
                setIsPaused(true);
            } else {
                timeout = setTimeout(() => {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                }, typingSpeed);
            }
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, isPaused, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={className}>
            {currentText}<span className="inline-block w-[0.5em] h-[1em] bg-neon ml-[2px] animate-pulse align-middle" style={{ animationDuration: '0.8s' }} />
        </span>
    );
};
