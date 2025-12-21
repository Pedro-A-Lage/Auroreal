import React from 'react'
import { motion } from 'framer-motion'
import { Award, BookOpen, Globe, GraduationCap, Quote, CheckCircle } from 'lucide-react'
import { AUTHOR } from '../utils/constants'
import authorPhoto from '../assets/Dra. Deborah L. Ruf.jpg'

export function AuthorSection() {
    const credentials = [
        { icon: GraduationCap, text: 'Ph.D. em Psicologia Educacional' },
        { icon: BookOpen, text: '30+ anos de experiência clínica' },
        { icon: Award, text: 'Autora de 5 livros publicados' },
        { icon: Globe, text: 'Consultora internacional' },
    ];

    return (
        <section id="sobre-autora" className="py-20 md:py-32 px-6 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                        Conheça a Autora
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
                        Dra. Deborah L. Ruf
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Uma das maiores autoridades mundiais em superdotação infantil
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Author Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
                            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
                                <img
                                    src={authorPhoto}
                                    alt="Dra. Deborah L. Ruf"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating credentials */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-[220px]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-accent/10 p-3 rounded-full">
                                        <Award className="w-8 h-8 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-2xl">30+</p>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">anos de experiência</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Quote decoration */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
                                <Quote className="w-6 h-6" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Info */}
                    <div className="relative">
                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="mb-10"
                        >
                            <p className="text-gray-600 leading-loose mb-6 text-lg">
                                A Dra. Deborah Ruf é uma das maiores autoridades mundiais em superdotação infantil.
                                Com mais de três décadas de experiência clínica e acadêmica, seu trabalho pioneiro
                                ajudou milhares de famílias a compreenderem e apoiarem suas crianças superdotadas.
                            </p>
                            <p className="text-gray-600 leading-loose text-lg">
                                Seus livros são referência internacional para pais, educadores e profissionais da área.
                                Este livro representa a síntese de todo seu conhecimento,
                                agora disponível em português pela primeira vez.
                            </p>
                        </motion.div>

                        {/* Quote */}
                        <motion.blockquote
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.4, duration: 1.0 }}
                            className="border-l-4 border-accent pl-8 py-6 bg-gray-50 rounded-r-xl mb-10"
                        >
                            <p className="text-xl italic text-primary/80 mb-4 leading-relaxed">
                                "{AUTHOR.quote.replace(/"/g, '')}"
                            </p>
                            <footer className="text-sm font-bold text-accent tracking-widest uppercase">
                                — Dra. Deborah L. Ruf
                            </footer>
                        </motion.blockquote>

                        {/* Credentials */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {credentials.map((cred, index) => (
                                <motion.div
                                    key={cred.text}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                    className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <cred.icon className="w-5 h-5 text-accent shrink-0" />
                                    <span className="text-sm font-medium text-gray-700">{cred.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Book highlights */}
                        <div className="mt-8">
                            <h3 className="font-semibold text-xl text-primary mb-6">O que você vai encontrar no livro:</h3>
                            <ul className="space-y-4">
                                {[
                                    'Características das crianças superdotadas',
                                    'Como identificar sinais de superdotação em seu filho',
                                    'Estratégias práticas para lidar com a escola',
                                    'Orientações para o desenvolvimento emocional',
                                    'Casos reais e exemplos aplicáveis',
                                ].map((item, index) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, x: 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 bg-green-100 p-1 rounded-full">
                                            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                        </div>
                                        <span className="text-gray-700 text-lg">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
