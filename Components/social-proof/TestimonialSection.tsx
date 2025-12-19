import React from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'

interface Testimonial {
    id: number;
    author: string;
    role: string;
    rating: number;
    text: string;
    verified: boolean;
    date: string;
    initials: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        author: "Sarah K.",
        role: "Mãe de 2 crianças superdotadas, EUA",
        rating: 5,
        text: "Este livro é um divisor de águas! Depois de anos me sentindo perdida, finalmente encontrei respostas práticas e diretas. Os 40 anos de experiência da Dra. Ruf são evidentes em cada página. Recomendo para todos os pais de crianças superdotadas!",
        verified: true,
        date: "2023-03-15",
        initials: "SK"
    },
    {
        id: 2,
        author: "Jennifer M.",
        role: "Educadora, Califórnia",
        rating: 5,
        text: "Como professora, sempre busquei recursos confiáveis sobre superdotação. Este livro é conciso, acessível e repleto de insights valiosos. A abordagem da Dra. Ruf sobre opções educacionais é excepcional. Leitura essencial!",
        verified: true,
        date: "2023-08-22",
        initials: "JM"
    },
    {
        id: 3,
        author: "Robert T.",
        role: "Pai, Texas",
        rating: 5,
        text: "Finalmente um livro que vai direto ao ponto! Consegui respostas rápidas e objetivas para as questões mais importantes. A expertise da Dra. Ruf em comunicação com educadores foi transformadora para nossa família.",
        verified: true,
        date: "2023-06-10",
        initials: "RT"
    }
]

export function TestimonialSection() {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                        Depoimentos Verificados
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
                        O que dizem sobre o livro
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                            ))}
                        </div>
                        <span className="text-xl font-bold text-primary">5.0</span>
                    </div>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                            whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' }}
                            className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-primary/20 transition-all"
                        >
                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex gap-0.5">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                    ))}
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="mb-4">
                                <span className="text-4xl text-primary/10 font-bold leading-none">"</span>
                                <p className="text-gray-700 text-sm leading-relaxed italic mt-2">
                                    {testimonial.text}
                                </p>
                                <span className="text-4xl text-primary/10 font-bold leading-none float-right">"</span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                                    {testimonial.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-primary text-sm truncate">
                                            {testimonial.author}
                                        </h4>
                                        {testimonial.verified && (
                                            <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
