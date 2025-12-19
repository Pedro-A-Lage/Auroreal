import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CountdownTimerProps {
    endDate: string; // Format: 'YYYY-MM-DD'
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownTimer({ endDate }: CountdownTimerProps) {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(endDate) - +new Date()

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [endDate])

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="relative bg-accent text-white rounded-lg p-3 md:p-4 shadow-lg min-w-[60px] md:min-w-[80px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={value}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl md:text-5xl font-bold text-center tabular-nums"
                    >
                        {String(value).padStart(2, '0')}
                    </motion.div>
                </AnimatePresence>
            </div>
            <span className="text-xs md:text-sm text-gray-600 mt-2 font-medium uppercase tracking-wide">
                {label}
            </span>
        </div>
    )

    return (
        <div className="flex flex-col items-center gap-4">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm md:text-base text-gray-700 font-medium"
            >
                Pré-venda termina em:
            </motion.p>
            <div className="flex gap-2 md:gap-4">
                <TimeUnit value={timeLeft.days} label="Dias" />
                <div className="text-3xl md:text-5xl font-bold text-accent self-start mt-3 md:mt-4">:</div>
                <TimeUnit value={timeLeft.hours} label="Horas" />
                <div className="text-3xl md:text-5xl font-bold text-accent self-start mt-3 md:mt-4">:</div>
                <TimeUnit value={timeLeft.minutes} label="Min" />
                <div className="text-3xl md:text-5xl font-bold text-accent self-start mt-3 md:mt-4">:</div>
                <TimeUnit value={timeLeft.seconds} label="Seg" />
            </div>
        </div>
    )
}
