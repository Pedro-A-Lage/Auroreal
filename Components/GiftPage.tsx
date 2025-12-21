import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Send, CheckCircle, User, Mail, MessageSquare } from 'lucide-react'
import { CONTACT } from '../utils/constants'

interface GiftFormData {
    nomePresente: string
    emailPresente: string
    mensagem: string
}

export function GiftPage() {
    const [formData, setFormData] = useState<GiftFormData>({
        nomePresente: '',
        emailPresente: '',
        mensagem: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<Partial<GiftFormData>>({})

    const validateForm = (): boolean => {
        const newErrors: Partial<GiftFormData> = {}

        if (!formData.nomePresente.trim()) {
            newErrors.nomePresente = 'Nome é obrigatório'
        }

        if (!formData.emailPresente.trim()) {
            newErrors.emailPresente = 'Email é obrigatório'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailPresente)) {
            newErrors.emailPresente = 'Email inválido'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        // Simula envio via FormSubmit ou email
        // Por enquanto, abre o email com os dados preenchidos
        const subject = encodeURIComponent('🎁 Cadastro de Presenteado - E-book Auroreal')
        const body = encodeURIComponent(
            `Olá Auroreal!\n\n` +
            `Um cliente comprou a edição Colecionador e deseja presentear:\n\n` +
            `📧 Nome do Presenteado: ${formData.nomePresente}\n` +
            `📧 Email do Presenteado: ${formData.emailPresente}\n` +
            `💌 Mensagem: ${formData.mensagem || '(sem mensagem)'}\n\n` +
            `Por favor, enviem o e-book para o email acima.\n\n` +
            `Obrigado!`
        )

        // Envia via FormSubmit (gratuito, sem backend)
        try {
            const response = await fetch('https://formsubmit.co/ajax/' + CONTACT.EMAIL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: '🎁 Cadastro de Presenteado - E-book Auroreal',
                    nome_presenteado: formData.nomePresente,
                    email_presenteado: formData.emailPresente,
                    mensagem: formData.mensagem || '(sem mensagem)',
                    _template: 'table'
                })
            })

            if (response.ok) {
                setIsSubmitted(true)
            } else {
                // Fallback para mailto se FormSubmit falhar
                window.location.href = `mailto:${CONTACT.EMAIL}?subject=${subject}&body=${body}`
            }
        } catch {
            // Fallback para mailto se houver erro
            window.location.href = `mailto:${CONTACT.EMAIL}?subject=${subject}&body=${body}`
        }

        setIsSubmitting(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Limpa erro ao digitar
        if (errors[name as keyof GiftFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    // Tela de sucesso
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary via-primary-600 to-primary flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-14 h-14 text-success" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-primary mb-4">
                        Cadastro Realizado! 🎉
                    </h1>

                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Os dados do presenteado foram enviados com sucesso.<br />
                        O e-book será enviado para <strong className="text-primary">{formData.emailPresente}</strong> após <strong>31 de janeiro de 2026</strong>.
                    </p>

                    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-8">
                        <p className="text-accent font-medium text-sm">
                            💡 Dica: Avise seu presenteado para verificar também a caixa de spam!
                        </p>
                    </div>

                    <a
                        href="/"
                        className="inline-block bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-all"
                    >
                        Voltar ao Site
                    </a>
                </motion.div>
            </div>
        )
    }

    // Formulário principal
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary-600 to-primary flex items-center justify-center p-6">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl p-8 md:p-10 max-w-xl w-full shadow-2xl"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-10 h-10 text-accent" />
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        Cadastre o Presenteado 🎁
                    </h1>

                    <p className="text-gray-600">
                        Preencha os dados de quem vai receber o <strong>e-book de presente</strong>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nome */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-4 h-4 text-accent" />
                            Nome Completo do Presenteado
                        </label>
                        <input
                            type="text"
                            name="nomePresente"
                            value={formData.nomePresente}
                            onChange={handleInputChange}
                            placeholder="Ex: Maria Silva"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all ${errors.nomePresente
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-accent'
                                }`}
                        />
                        {errors.nomePresente && (
                            <p className="text-red-500 text-sm mt-1">{errors.nomePresente}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="w-4 h-4 text-accent" />
                            Email do Presenteado
                        </label>
                        <input
                            type="email"
                            name="emailPresente"
                            value={formData.emailPresente}
                            onChange={handleInputChange}
                            placeholder="email@exemplo.com"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all ${errors.emailPresente
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-200 focus:border-accent'
                                }`}
                        />
                        {errors.emailPresente && (
                            <p className="text-red-500 text-sm mt-1">{errors.emailPresente}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                            O e-book será enviado para este email após 31/01/2026
                        </p>
                    </div>

                    {/* Mensagem */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <MessageSquare className="w-4 h-4 text-accent" />
                            Mensagem Personalizada <span className="text-gray-400 font-normal">(opcional)</span>
                        </label>
                        <textarea
                            name="mensagem"
                            value={formData.mensagem}
                            onChange={handleInputChange}
                            placeholder="Escreva uma dedicatória para o presenteado..."
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/30"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Cadastrar Presenteado
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Footer Note */}
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mt-6">
                    <p className="text-center text-gray-600 text-sm">
                        📅 O e-book será enviado para o presenteado <strong className="text-primary">após 31 de janeiro de 2026</strong>.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
