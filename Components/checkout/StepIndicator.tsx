import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
    number: number;
    label: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full py-6 px-4 bg-gray-50 border-b border-gray-200">
            <div className="max-w-3xl mx-auto">
                {/* Desktop: Horizontal */}
                <div className="hidden md:flex items-center justify-between">
                    {steps.map((step, index) => {
                        const isCompleted = step.number < currentStep
                        const isActive = step.number === currentStep
                        const isLast = index === steps.length - 1

                        return (
                            <React.Fragment key={step.number}>
                                {/* Step Circle */}
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1.1 : 1,
                                            backgroundColor: isCompleted
                                                ? '#10B981'
                                                : isActive
                                                ? '#f7941d'
                                                : '#E5E7EB'
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={`
                                            w-12 h-12 rounded-full flex items-center justify-center
                                            border-4 border-white shadow-lg
                                            ${isCompleted ? 'text-white' : isActive ? 'text-white' : 'text-gray-400'}
                                            font-bold text-lg
                                        `}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-6 h-6" strokeWidth={3} />
                                        ) : (
                                            step.number
                                        )}
                                    </motion.div>
                                    <motion.span
                                        initial={false}
                                        animate={{
                                            color: isCompleted || isActive ? '#662D91' : '#9CA3AF',
                                            fontWeight: isActive ? 600 : 500
                                        }}
                                        className="mt-2 text-sm text-center max-w-[100px]"
                                    >
                                        {step.label}
                                    </motion.span>
                                </div>

                                {/* Connector Line */}
                                {!isLast && (
                                    <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                width: isCompleted ? '100%' : '0%'
                                            }}
                                            transition={{ duration: 0.4 }}
                                            className="h-full bg-success"
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>

                {/* Mobile: Compact */}
                <div className="md:hidden">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {steps.map((step) => {
                            const isCompleted = step.number < currentStep
                            const isActive = step.number === currentStep

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1 : 0.8,
                                        backgroundColor: isCompleted
                                            ? '#10B981'
                                            : isActive
                                            ? '#f7941d'
                                            : '#E5E7EB'
                                    }}
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center
                                        ${isCompleted ? 'text-white' : isActive ? 'text-white' : 'text-gray-400'}
                                        text-sm font-bold
                                    `}
                                >
                                    {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : step.number}
                                </motion.div>
                            )
                        })}
                    </div>
                    <p className="text-center text-sm font-medium text-primary">
                        {steps[currentStep - 1]?.label}
                    </p>
                    <p className="text-center text-xs text-gray-500 mt-1">
                        Etapa {currentStep} de {steps.length}
                    </p>
                </div>
            </div>
        </div>
    )
}
