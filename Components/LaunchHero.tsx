import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import bookCover from '../assets/Caminhos para educação de Superdotado.png'

export function LaunchHero() {
    return (
        <section className="py-20 md:py-32 px-6 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Book Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative z-10 flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-[#1a1a1a] translate-x-4 translate-y-4 rounded-sm" />
                            <img
                                src={bookCover}
                                alt="Caminhos para a educação de superdotados"
                                className="relative z-10 w-full h-auto shadow-2xl rounded-sm"
                            />
                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-6 z-20 bg-accent text-white w-24 h-24 rounded-full flex items-center justify-center font-serif text-center p-2 shadow-lg animate-pulse">
                                <span className="text-sm font-bold uppercase tracking-wider">Pré-Venda Exclusiva</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1.2 }}
                            className="inline-block py-1 px-3 border border-accent text-accent text-xs font-bold tracking-widest uppercase mb-6"
                        >
                            Lançamento Auroreal
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4 leading-tight"
                        >
                            Caminhos para a educação de superdotados
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1.2 }}
                            className="text-xl md:text-2xl text-accent font-serif italic mb-8"
                        >
                            Por Deborah L. Ruf, Ph.D.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1.2 }}
                            className="text-gray-600 leading-relaxed mb-10 max-w-xl text-lg"
                        >
                            Uma obra fundamental que oferece ferramentas práticas e insights profundos para pais e educadores que buscam compreender e apoiar o desenvolvimento de crianças superdotadas.
                        </motion.p>
                    </div>
                </div>

                {/* Pricing Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Basic Tier */}
                    <PricingCard
                        title="Edição Digital"
                        price="R$ 59,90"
                        features={['E-book completo', 'Envio imediato no lançamento', 'Formato PDF e EPUB']}
                        delay={0.6}
                    />

                    {/* Standard Tier (Featured) */}
                    <PricingCard
                        title="Livro Físico"
                        price="R$ 89,90"
                        features={['Exemplar impresso', 'Marcador de página exclusivo', 'Frete grátis para todo Brasil', 'E-book incluso']}
                        featured={true}
                        delay={0.7}
                    />

                    {/* Premium Tier */}
                    <PricingCard
                        title="Kit Colecionador"
                        price="R$ 149,90"
                        features={['Livro Físico + E-book', 'Ecobag Auroreal', 'Acesso a webinar exclusivo com especialistas', 'Dedicatória especial']}
                        delay={0.8}
                    />
                </div>
            </div>
        </section>
    );
}

function PricingCard({ title, price, features, featured = false, delay }: { title: string, price: string, features: string[], featured?: boolean, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 1.2 }}
            className={`relative p-8 ${featured ? 'bg-primary text-white shadow-2xl scale-105 z-10' : 'bg-white text-primary border border-gray-100 shadow-lg'} flex flex-col hover:shadow-xl transition-shadow duration-500`}
        >
            {featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                    Mais Popular
                </div>
            )}

            <h3 className={`text-lg font-serif tracking-widest uppercase mb-4 ${featured ? 'text-white/80' : 'text-accent'}`}>{title}</h3>
            <div className="flex items-baseline mb-8">
                <span className="text-4xl font-serif font-bold">{price}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        <Check size={18} className={featured ? 'text-accent' : 'text-green-600'} />
                        <span className={featured ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className={`w-full py-4 px-6 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${featured ? 'bg-accent text-white hover:bg-white hover:text-primary' : 'bg-primary text-white hover:bg-accent'}`}>
                Reservar Agora
            </button>
        </motion.div>
    )
}
