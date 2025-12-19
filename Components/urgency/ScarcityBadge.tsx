import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScarcityBadgeProps {
    initialCount?: number;
    text: string;
}

export function ScarcityBadge({ initialCount = 127, text }: ScarcityBadgeProps) {
    const [count, setCount] = useState(initialCount)

    // Simulate decreasing count every 15-30 minutes (for demo, using shorter interval)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => Math.max(50, prev - 1)) // Min 50
        }, 120000) // 2 minutes for demo (adjust to 900000 for 15 min)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-600 text-white font-semibold shadow-lg"
        >
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm md:text-base">
                Pré-venda:{' '}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={count}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-bold"
                    >
                        {count}
                    </motion.span>
                </AnimatePresence>
                {' '}{text}
            </span>
        </motion.div>
    )
}
