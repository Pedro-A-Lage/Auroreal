import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Truck, Calendar, BookOpen } from 'lucide-react'
import { Header } from './Components/Header'
import { Hero } from './Components/Hero'
import { AboutSection } from './Components/AboutSection'
import { AuthorSection } from './Components/AuthorSection'
import { Footer } from './Components/Footer'
import { TestimonialSection } from './Components/social-proof/TestimonialSection'
import { FAQ } from './Components/FAQ'
import { Badge } from './Components/ui/Badge'
import { PRODUCTS } from './utils/constants'

export function App() {
    return (
        <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-white">
            <Header />

            <main>
                {/* Hero Section */}
                <Hero />

                {/* About Section - Editora (movido para cima) */}
                <div id="quem-somos" className="py-20 bg-white">
                    <AboutSection />
                </div>

                {/* Author Section */}
                <AuthorSection />

                {/* Venda Antecipada Section - Clean Product Cards */}
                <section id="venda-antecipada" className="py-24 md:py-32 px-6 bg-[#F8F6F3] overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight"
                            >
                                Garanta seu Exemplar
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                                className="text-xl text-gray-600 max-w-2xl mx-auto"
                            >
                                Venda antecipada exclusiva — <strong className="text-accent">disponível apenas até 31 de janeiro</strong>
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center gap-2 mt-4 text-sm text-gray-500"
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    <span>Fim da venda antecipada: <strong className="text-primary">31 de janeiro de 2026</strong></span>
                                </div>
                                <span className="text-xs text-gray-400">Preço único • Frete grátis • Sem complicação</span>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                            {/* Card Digital */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="bg-white p-8 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col border border-gray-100 rounded-2xl h-full"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <BookOpen className="w-5 h-5 text-accent" />
                                    <h3 className="text-lg font-bold uppercase tracking-wide text-primary">Digital</h3>
                                </div>

                                <p className="text-sm text-gray-500 mb-6">{PRODUCTS.digital.delivery}</p>

                                <div className="text-primary mb-2 flex items-baseline">
                                    <span className="text-lg mr-1 text-gray-400 font-light">R$</span>
                                    <span className="text-4xl font-bold tracking-tight">69,90</span>
                                </div>
                                <p className="text-xs text-accent font-medium mb-6">5% de desconto no PIX</p>

                                <ul className="text-gray-600 space-y-3 mb-8 flex-1">
                                    {PRODUCTS.digital.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={PRODUCTS.digital.checkoutUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-primary hover:bg-primary-600 text-white py-4 font-semibold uppercase tracking-wide transition-all duration-300 text-sm rounded-xl mt-auto text-center block"
                                >
                                    Reservar E-book
                                </a>
                            </motion.div>

                            {/* Card Fisico */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="bg-white p-8 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col border border-gray-100 rounded-2xl h-full relative"
                            >
                                <div className="absolute top-4 right-4">
                                    <Badge text="+ E-book" variant="success" size="sm" />
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <h3 className="text-lg font-bold uppercase tracking-wide text-primary">Físico</h3>
                                </div>

                                <p className="text-sm text-gray-500 mb-6">{PRODUCTS.fisico.delivery}</p>

                                <div className="text-primary mb-2 flex items-baseline">
                                    <span className="text-lg mr-1 text-gray-400 font-light">R$</span>
                                    <span className="text-4xl font-bold tracking-tight">99,90</span>
                                </div>
                                <p className="text-xs text-accent font-medium mb-6">5% de desconto no PIX</p>

                                <ul className="text-gray-600 space-y-3 mb-8 flex-1">
                                    {PRODUCTS.fisico.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={PRODUCTS.fisico.checkoutUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-primary hover:bg-primary-600 text-white py-4 font-semibold uppercase tracking-wide transition-all duration-300 text-sm rounded-xl mt-auto text-center block"
                                >
                                    Reservar Físico
                                </a>
                            </motion.div>

                            {/* Card Colecionador - PREMIUM */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="bg-primary text-white p-8 relative flex flex-col border-2 border-accent rounded-2xl h-full md:scale-105 z-10 shadow-premium"
                            >
                                <div className="absolute top-4 right-4">
                                    <Badge text="Recomendado" variant="accent" size="sm" />
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Star className="w-5 h-5 text-accent" />
                                    <h3 className="text-lg font-bold uppercase tracking-wide">Colecionador</h3>
                                </div>

                                <p className="text-sm text-white/70 mb-6">{PRODUCTS.colecionador.delivery}</p>

                                {/* Pricing */}
                                <div className="mb-2">
                                    <p className="text-sm text-white/50 line-through mb-1">De R$ 250,00</p>
                                    <div className="flex items-baseline">
                                        <span className="text-lg mr-1 text-white/60 font-light">R$</span>
                                        <span className="text-4xl font-bold tracking-tight">149,90</span>
                                    </div>
                                </div>
                                <p className="text-xs text-accent font-medium mb-6">5% de desconto no PIX</p>

                                <ul className="text-white/90 space-y-3 mb-6 flex-1">
                                    {PRODUCTS.colecionador.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Bonus Section */}
                                <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
                                    <p className="font-semibold text-sm mb-1">Bônus: Webinar Exclusivo</p>
                                    <p className="text-xs text-white/70">
                                        Aula gravada com a Dra. Deborah Ruf
                                    </p>
                                </div>

                                <a
                                    href={PRODUCTS.colecionador.checkoutUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-accent hover:bg-accent-600 text-white py-4 font-semibold uppercase tracking-wide transition-all duration-300 text-sm rounded-xl mt-auto text-center block"
                                >
                                    Reservar Colecionador
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Testimonials - Depoimentos dos EUA */}
                <TestimonialSection />

                {/* FAQ Section */}
                <FAQ />
            </main>

            <Footer />
        </div>
    )
}
