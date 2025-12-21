import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Globe, Star, Calendar } from 'lucide-react'
import { smoothScrollTo } from '../utils/smoothScroll'
import bookCover from '../assets/Caminhos para educação de Superdotado.png'
import { useCountdown } from '../hooks/useCountdown'
import { PRESALE } from '../utils/constants'

export function Hero() {
    const countdown = useCountdown(PRESALE.END_DATE);

    return (
        <section id="hero" className="relative pt-28 pb-12 md:pt-28 md:pb-16 px-6 overflow-hidden bg-[#F8F6F3]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="max-w-xl relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="inline-flex items-center gap-2 mb-4 px-4 py-2 text-sm font-semibold tracking-wide bg-gradient-to-r from-primary/10 to-accent/10 border border-accent/30 rounded-full shadow-sm"
                    >
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-primary">Primeiro livro da Auroreal Editora</span>
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight"
                    >
                        <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                            Caminhos para a educação de superdotados
                        </span>
                    </motion.h1>

                    {/* Author */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
                        className="text-lg text-gray-600 mb-4 font-medium"
                    >
                        por <span className="text-primary font-semibold">Deborah L. Ruf, Ph.D.</span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                        className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg"
                    >
                        A obra de referência mundial sobre superdotação, finalmente traduzida para o português.
                        Descubra estratégias práticas para apoiar o desenvolvimento do seu filho.
                    </motion.p>

                    {/* Countdown Timer - Clean Version */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
                        className="bg-white rounded-xl p-5 mb-8 shadow-soft border border-gray-100"
                    >
                        <p className="text-sm text-gray-600 mb-1 font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            Edição limitada — Fim das vendas em 31 de janeiro de 2026
                        </p>
                        <p className="text-xs text-gray-500 mb-3">Após esta data, o livro não estará mais disponível</p>
                        <div className="grid grid-cols-4 gap-3 text-center">
                            {[
                                { value: countdown.days, label: 'Dias' },
                                { value: countdown.hours, label: 'Horas' },
                                { value: countdown.minutes, label: 'Min' },
                                { value: countdown.seconds, label: 'Seg' },
                            ].map((item) => (
                                <div key={item.label} className="bg-primary/5 rounded-lg p-3">
                                    <motion.span
                                        key={`${item.label}-${item.value}`}
                                        initial={{ scale: 1.1, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="block text-2xl md:text-3xl font-bold text-primary"
                                    >
                                        {item.value.toString().padStart(2, '0')}
                                    </motion.span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                        className="flex flex-wrap gap-4"
                    >
                        <motion.a
                            href="#venda-antecipada"
                            onClick={(e) => smoothScrollTo(e, '#venda-antecipada')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="bg-accent hover:bg-accent-600 text-white px-8 py-4 font-semibold tracking-wide transition-colors flex items-center cursor-pointer rounded-lg shadow-soft text-lg"
                        >
                            Garantir meu Exemplar
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="#sobre-autora"
                            onClick={(e) => smoothScrollTo(e, '#sobre-autora')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="border-2 border-primary text-primary px-8 py-4 font-semibold tracking-wide hover:bg-primary hover:text-white transition-all cursor-pointer rounded-lg"
                        >
                            Conhecer a Autora
                        </motion.a>
                    </motion.div>
                </div>

                {/* Hero Image / Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                    className="relative h-[450px] md:h-[700px] w-full flex justify-center md:justify-end items-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -rotate-3 rounded-2xl z-0 w-3/4 ml-auto" />

                    <motion.div
                        whileHover={{ rotateY: 3, scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full max-w-[550px]"
                        style={{ perspective: '1000px' }}
                    >
                        <img
                            src={bookCover}
                            alt="Caminhos para a educação de superdotados - Capa do Livro"
                            className="w-full h-auto shadow-premium-lg rounded-lg"
                        />

                        {/* Floating Review Card */}
                        <motion.div
                            initial={{ x: -40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.8, duration: 1.2, type: 'spring', bounce: 0.3 }}
                            className="absolute -bottom-6 -left-6 z-20 backdrop-blur-md bg-white/95 text-gray-800 p-4 shadow-xl max-w-[260px] hidden md:block rounded-xl border border-gray-100"
                        >
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-accent text-accent" />
                                ))}
                                <span className="text-xs text-gray-500 ml-2">5.0</span>
                            </div>
                            <p className="text-sm italic mb-3 text-gray-700 leading-snug">
                                "Este livro é um divisor de águas! Finalmente encontrei respostas práticas e diretas."
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary text-xs">
                                    SK
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-800">Sarah K.</p>
                                    <p className="text-[10px] text-gray-500">Mãe, EUA</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

