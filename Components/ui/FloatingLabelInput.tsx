import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Eye, EyeOff } from 'lucide-react'

interface FloatingLabelInputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    error?: string;
    success?: boolean;
    placeholder?: string;
    disabled?: boolean;
    autoComplete?: string;
    icon?: React.ReactNode;
}

export function FloatingLabelInput({
    label,
    type = 'text',
    value,
    onChange,
    onFocus,
    error,
    success,
    placeholder,
    disabled,
    autoComplete,
    icon
}: FloatingLabelInputProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const hasValue = value.length > 0
    const isFloating = isFocused || hasValue
    const isPasswordField = type === 'password'

    const getBorderColor = () => {
        if (error) return 'border-error ring-error/10'
        if (success) return 'border-success ring-success/10'
        if (isFocused) return 'border-accent ring-accent/10'
        return 'border-gray-200'
    }

    const getBackgroundColor = () => {
        if (error) return 'bg-error-light'
        if (success) return 'bg-success-light'
        if (disabled) return 'bg-gray-100'
        if (isFocused) return 'bg-white'
        return 'bg-gray-50'
    }

    return (
        <div className="relative">
            <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {/* Icon */}
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}

                {/* Input */}
                <input
                    type={isPasswordField && !showPassword ? 'password' : type === 'password' ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => {
                        setIsFocused(true);
                        onFocus?.();
                    }}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    placeholder={isFloating ? placeholder : ''}
                    className={`
                        w-full h-14 px-4 ${icon ? 'pl-12' : ''} ${success || error || isPasswordField ? 'pr-12' : ''}
                        border-2 rounded-lg
                        ${getBorderColor()} ${getBackgroundColor()}
                        ${isFocused ? 'ring-4' : ''}
                        transition-all duration-200
                        outline-none
                        text-gray-900
                        disabled:cursor-not-allowed
                        ${error ? 'animate-shake' : ''}
                    `}
                />

                {/* Floating Label */}
                <motion.label
                    initial={false}
                    animate={{
                        top: isFloating ? '-0.5rem' : '50%',
                        translateY: isFloating ? '0%' : '-50%',
                        fontSize: isFloating ? '0.75rem' : '1rem',
                        color: error ? '#EF4444' : success ? '#10B981' : isFocused ? '#f7941d' : '#6B7280'
                    }}
                    transition={{ duration: 0.2 }}
                    className={`
                        absolute left-4 ${icon ? 'left-12' : ''}
                        pointer-events-none
                        font-medium
                        px-2
                        ${isFloating ? 'bg-white shadow-sm' : ''}
                        z-20
                    `}
                >
                    {label}
                </motion.label>

                {/* Password Toggle Button */}
                {isPasswordField && !error && !success && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}

                {/* Success/Error Icons */}
                <AnimatePresence>
                    {success && !error && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <Check className="w-5 h-5 text-success" />
                        </motion.div>
                    )}
                    {error && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <AlertCircle className="w-5 h-5 text-error" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mt-2 text-error text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Add shake animation to tailwind config if not exists
// keyframes: { shake: { '0%, 100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-4px)' }, '75%': { transform: 'translateX(4px)' } } }
// animation: { shake: 'shake 0.3s ease-in-out' }
