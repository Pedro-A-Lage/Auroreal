import React from 'react'
import { motion } from 'framer-motion'

export function AboutSection() {
    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="inline-block mb-6 text-sm font-medium tracking-[0.2em] text-accent uppercase"
                >
                    Quem Somos
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ delay: 0.1, duration: 1.2 }}
                    className="text-3xl md:text-5xl font-bold text-primary mb-12 leading-tight tracking-tight"
                >
                    A Neurodiversidade <br /> <span className="italic text-accent">fala a nossa língua.</span>
                </motion.h2>

                <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed text-justify md:text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.2, duration: 1.2 }}
                        className="mb-8"
                    >
                        A <strong>Auroreal Editora</strong> nasceu com o propósito de ampliar o acesso ao conhecimento sobre superdotação, neurodiversidade, educação e cultura para o público brasileiro. Somos uma editora especializada que quer oferecer à comunidade neurodivergente e suas famílias mais opções de leitura de qualidade em português.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.3, duration: 1.2 }}
                        className="mb-8"
                    >
                        No Brasil, pais, professores e profissionais frequentemente enfrentam a falta de materiais atualizados e confiáveis em nossa língua. Na Auroreal, acreditamos que o idioma não pode ser barreira. Por isso, traduzimos e publicamos obras internacionais de referência, além de incentivar autores brasileiros.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.4, duration: 1.2 }}
                        className="mb-8"
                    >
                        <strong>Nosso primeiro lançamento</strong> é a tradução de "Keys to Successfully Parenting the Gifted Child" da renomada Dra. Deborah L. Ruf — uma obra essencial que finalmente chega ao público brasileiro. Este é apenas o começo de um catálogo dedicado a transformar vidas através do conhecimento.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.5, duration: 1.2 }}
                        className="text-xl font-medium text-primary"
                    >
                        Somos o ponto de encontro entre quem busca respostas e o conhecimento que já existe mundo afora – tudo em português claro, sério e acolhedor.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.6, duration: 1.2 }}
                        className="mt-12 h-[1px] w-32 bg-accent/30 mx-auto"
                    />
                </div>
            </div>
        </section>
    )
}
