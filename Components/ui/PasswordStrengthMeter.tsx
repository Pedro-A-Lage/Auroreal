import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface PasswordStrengthMeterProps {
    password: string;
}

interface Requirement {
    label: string;
    test: (password: string) => boolean;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
    const requirements: Requirement[] = [
        { label: 'Mínimo 8 caracteres', test: (p) => p.length >= 8 },
        { label: 'Uma letra maiúscula', test: (p) => /[A-Z]/.test(p) },
        { label: 'Um número', test: (p) => /\d/.test(p) },
        { label: 'Um caractere especial (!@#$...)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
    ]

    const passedRequirements = useMemo(() => {
        return requirements.filter(req => req.test(password))
    }, [password])

    const strength = useMemo(() => {
        const score = passedRequirements.length
        if (score === 0) return { level: 'none', color: 'bg-gray-200', label: '' }
        if (score <= 1) return { level: 'weak', color: 'bg-error', label: 'Fraca' }
        if (score <= 2) return { level: 'medium', color: 'bg-warning', label: 'Média' }
        if (score <= 3) return { level: 'good', color: 'bg-info', label: 'Boa' }
        return { level: 'strong', color: 'bg-success', label: 'Forte' }
    }, [passedRequirements.length])

    const progress = (passedRequirements.length / requirements.length) * 100

    if (!password) return null

    return (
        <div className="mt-3 space-y-3">
            {/* Progress Bar */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600 font-medium">Força da senha:</span>
                    {strength.label && (
                        <span className={`text-xs font-bold ${
                            strength.level === 'weak' ? 'text-error' :
                            strength.level === 'medium' ? 'text-warning' :
                            strength.level === 'good' ? 'text-info' :
                            'text-success'
                        }`}>
                            {strength.label}
                        </span>
                    )}
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full ${strength.color} transition-colors duration-300`}
                    />
                </div>
            </div>

            {/* Requirements Checklist */}
            <div className="grid grid-cols-1 gap-2">
                {requirements.map((req, index) => {
                    const isPassed = req.test(password)
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-2"
                        >
                            <div className={`
                                w-4 h-4 rounded-full flex items-center justify-center
                                transition-all duration-200
                                ${isPassed ? 'bg-success' : 'bg-gray-200'}
                            `}>
                                {isPassed ? (
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                ) : (
                                    <X className="w-3 h-3 text-gray-400" strokeWidth={2} />
                                )}
                            </div>
                            <span className={`text-xs transition-colors duration-200 ${
                                isPassed ? 'text-success font-medium' : 'text-gray-500'
                            }`}>
                                {req.label}
                            </span>
                        </motion.div>
                    )
                })}
            </div>

            {/* Generate Secure Password Button */}
            {strength.level !== 'strong' && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="button"
                    onClick={() => {
                        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
                        let generated = ''
                        // Ensure at least one of each requirement
                        generated += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
                        generated += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]
                        generated += '0123456789'[Math.floor(Math.random() * 10)]
                        generated += '!@#$%^&*'[Math.floor(Math.random() * 8)]
                        // Fill the rest
                        for (let i = 0; i < 8; i++) {
                            generated += chars[Math.floor(Math.random() * chars.length)]
                        }
                        // Shuffle
                        generated = generated.split('').sort(() => Math.random() - 0.5).join('')

                        // Trigger custom event that parent can listen to
                        const event = new CustomEvent('generatePassword', { detail: { password: generated } })
                        window.dispatchEvent(event)
                    }}
                    className="text-xs text-accent hover:text-accent-600 font-medium underline transition-colors"
                >
                    Gerar senha segura automaticamente
                </motion.button>
            )}
        </div>
    )
}
