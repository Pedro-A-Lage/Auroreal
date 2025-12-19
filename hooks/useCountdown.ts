import { useState, useEffect, useCallback } from 'react';
import { getTimeRemaining } from '../utils/formatters';

interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    total: number;
}

/**
 * Hook para countdown até uma data específica
 * @param targetDate - Data alvo para o countdown
 * @returns Estado atual do countdown
 */
export function useCountdown(targetDate: Date): CountdownState {
    const [timeLeft, setTimeLeft] = useState<CountdownState>(() => getTimeRemaining(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return timeLeft;
}

/**
 * Hook para countdown com controle de pausa
 * @param targetDate - Data alvo para o countdown
 * @returns Estado e controles do countdown
 */
export function useCountdownWithControls(targetDate: Date) {
    const [timeLeft, setTimeLeft] = useState<CountdownState>(() => getTimeRemaining(targetDate));
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, isPaused]);

    const pause = useCallback(() => setIsPaused(true), []);
    const resume = useCallback(() => setIsPaused(false), []);
    const toggle = useCallback(() => setIsPaused(prev => !prev), []);

    return {
        ...timeLeft,
        isPaused,
        pause,
        resume,
        toggle,
    };
}

export default useCountdown;
