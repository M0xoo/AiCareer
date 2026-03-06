import React, { useState, useEffect, useRef, useCallback } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
    // Scramble State
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Glitch State
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(Date.now());
    const rafRef = useRef<number | null>(null);

    const startScramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const maxIterations = text.length;

        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

        scrambleIntervalRef.current = setInterval(() => {
            setDisplayText(prev => {
                return prev.split("").map((letter, index) => {
                    if (text[index] === ' ') return ' ';
                    if (text[index] === '\n') return '\n';

                    if (index < iteration) {
                        return text[index];
                    }
                    return LETTERS[Math.floor(Math.random() * LETTERS.length)];
                }).join("");
            });

            if (iteration >= maxIterations) {
                if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
                setIsScrambling(false);
                setDisplayText(text);
            }

            iteration += 1 / 3;
        }, 30);
    }, [text, isScrambling]);

    const stopScramble = useCallback(() => {
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        setIsScrambling(false);
        setDisplayText(text);
    }, [text]);

    useEffect(() => {
        startScramble(); // run once on mount
        return () => {
            if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        };
    }, []); // eslint-disable-line

    // Velocity Calculation for Holographic RGB Glitch
    const handleMouseMove = (e: React.MouseEvent) => {
        const now = Date.now();
        const dt = now - lastTime.current || 16;

        // Calculate distance
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;

        // Velocity mapped to shadow offset (pixels)
        const vx = (dx / dt) * 15;
        const vy = (dy / dt) * 15;

        // Cap velocity to prevent extreme shadow offsets
        setVelocity({
            x: Math.max(-15, Math.min(15, vx)),
            y: Math.max(-15, Math.min(15, vy))
        });

        lastMousePos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        setIsHovered(true);
        startScramble();
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = Date.now();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        stopScramble(); // Stop scrambling instantly when not hovered
    };

    const [timeOffset, setTimeOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const loop = () => {
            if (isHovered) {
                setVelocity(prev => ({
                    x: prev.x * 0.85,
                    y: prev.y * 0.85
                }));

                // Add continuous organic jitter while hovered
                const t = Date.now() / 120;
                setTimeOffset({
                    x: Math.sin(t) * 2.5 + Math.cos(t * 1.7) * 1.5,
                    y: Math.cos(t * 1.3) * 2.5 + Math.sin(t * 2.1) * 1.5,
                });

                rafRef.current = requestAnimationFrame(loop);
            }
        };

        if (isHovered) {
            rafRef.current = requestAnimationFrame(loop);
        } else {
            setVelocity({ x: 0, y: 0 });
            setTimeOffset({ x: 0, y: 0 });
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isHovered]);

    const shadowX = (isHovered ? velocity.x : 0) + timeOffset.x;
    const shadowY = (isHovered ? velocity.y : 0) + timeOffset.y;

    // Minimum blur to keep the effect smooth
    const velocityMagnitude = Math.sqrt(shadowX * shadowX + shadowY * shadowY);
    const blur = Math.min(4, Math.max(1, velocityMagnitude * 0.2));

    const textShadow = isHovered && velocityMagnitude > 0.1
        ? `${-shadowX}px ${-shadowY}px ${blur}px rgba(255, 0, 0, 0.8), ${shadowX}px ${shadowY}px ${blur}px rgba(0, 255, 255, 0.8)`
        : 'none';

    return (
        <span
            className={`relative inline-block transition-transform duration-75 ${className || ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                textShadow,
                transform: isHovered && velocityMagnitude > 0.1 ? `translate(${shadowX * 0.05}px, ${shadowY * 0.05}px)` : 'none'
            }}
        >
            {displayText}
        </span>
    );
};
