import React from 'react'
import { motion } from 'framer-motion'
import { Languages, ShieldCheck, Package, Headphones } from 'lucide-react'

interface TrustBadge {
    icon: React.ElementType;
    title: string;
    description: string;
}

const badges: TrustBadge[] = [
    {
        icon: Languages,
        title: "Tradução Especializada",
        description: "Traduzido por especialistas em educação e superdotação"
    },
    {
        icon: ShieldCheck,
        title: "Pagamento Seguro",
        description: "Seus dados protegidos com criptografia SSL"
    },
    {
        icon: Package,
        title: "Entrega Garantida",
        description: "Garantia de recebimento ou reembolso total"
    },
    {
        icon: Headphones,
        title: "Suporte Dedicado",
        description: "Atendimento via WhatsApp em horário comercial"
    }
]

export function TrustBadges() {
    return (
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white border-y border-gray-100">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-serif text-primary mb-3">
                        Por que confiar na Auroreal?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Compromisso com excelência e satisfação em cada detalhe
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                            whileHover={{
                                y: -8,
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className="flex flex-col items-center text-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all"
                            >
                                <badge.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                            </motion.div>
                            <h3 className="font-bold text-sm text-primary mb-2 group-hover:text-accent transition-colors">
                                {badge.title}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {badge.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        <span>SSL Certificado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        <span>Dados Criptografados</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        <span>100% Seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        <span>Garantia de Satisfação</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
