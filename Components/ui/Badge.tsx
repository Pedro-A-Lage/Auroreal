import React from 'react'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface BadgeProps {
    icon?: LucideIcon;
    text: string;
    variant?: 'primary' | 'accent' | 'success' | 'default';
    size?: 'sm' | 'md' | 'lg';
}

export function Badge({ icon: Icon, text, variant = 'default', size = 'md' }: BadgeProps) {
    const variants = {
        primary: 'bg-primary-100 text-primary-700 border-primary-200',
        accent: 'bg-accent-100 text-accent-700 border-accent-200',
        success: 'bg-success-light text-success-dark border-success',
        default: 'bg-gray-100 text-gray-700 border-gray-200'
    }

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
    }

    const iconSizes = {
        sm: 12,
        md: 14,
        lg: 16
    }

    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.2 }}
            className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${variants[variant]} ${sizes[size]}`}
        >
            {Icon && <Icon size={iconSizes[size]} className="flex-shrink-0" />}
            <span>{text}</span>
        </motion.div>
    )
}
