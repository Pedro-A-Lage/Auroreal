import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, RefreshCw, Lock, Award } from 'lucide-react'

// ... imports equal ...
export function GuaranteeSection() {
    // ... guarantees array equal ...
    const guarantees = [
        {
            icon: ShieldCheck,
            title: 'Garantia de 7 Dias',
            description: 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.',
            highlight: true,
        },
        {
            icon: RefreshCw,
            title: 'Troca Garantida',
            description: 'Recebeu o livro com defeito? Enviamos outro exemplar sem custo adicional.',
        },
        {
            icon: Lock,
            title: 'Pagamento Seguro',
            description: 'Seus dados estão protegidos. Ambiente 100% seguro com criptografia SSL.',
        },
        {
            icon: Award,
            title: 'Qualidade Premium',
            description: 'Papel de alta qualidade, capa dura e acabamento impecável. Feito para durar.',
        },
    ];

    return (
        <section className="py-20 md:py-24 px-6 bg-gradient-to-br from-primary to-primary-900 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                        Compra sem Risco
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">
                        Sua Satisfação Garantida
                    </h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-serif italic">
                        Temos tanta confiança no valor deste livro que oferecemos garantia total
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {guarantees.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                            className={`relative p-8 rounded-2xl text-center ${item.highlight
                                    ? 'bg-accent shadow-2xl shadow-accent/20'
                                    : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
                                } transition-all duration-300`}
                        >
                            {item.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-accent px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                                    Principal
                                </div>
                            )}
                            <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${item.highlight ? 'bg-white/20' : 'bg-accent/20'
                                }`}>
                                <item.icon className={`w-8 h-8 ${item.highlight ? 'text-white' : 'text-accent'}`} />
                            </div>
                            <h3 className="font-serif text-xl mb-4 text-white tracking-wide">{item.title}</h3>
                            <p className={`text-sm leading-relaxed ${item.highlight ? 'text-white/90' : 'text-white/70'}`}>
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Trust seal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm tracking-widest uppercase"
                >
                    <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4" />
                        <span>SSL Seguro</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Compra Protegida</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Award className="w-4 h-4" />
                        <span>Satisfação Garantida</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
