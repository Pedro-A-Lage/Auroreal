import React from 'react'
import { Mail, Instagram, Twitter, Facebook } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2 }}
            id="footer"
            className="bg-primary text-white py-20 px-6 overflow-hidden"
        >
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                    Auroreal Editora<span className="text-accent text-4xl">.</span>
                </h3>
                <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-8 text-lg">
                    Dedicada a ampliar o acesso ao conhecimento sobre superdotação e neurodiversidade. Trazemos para o Brasil obras de referência mundial e novas vozes nacionais, em português claro. Bem-vindo à Auroreal. Aqui, a neurodiversidade fala a nossa língua.
                </p>
                <div className="flex justify-center">
                    <a
                        href="https://www.instagram.com/aurorealeditora/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-accent transition-colors hover:scale-110 transform duration-300"
                    >
                        <Instagram size={28} />
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-white/40 text-sm font-light tracking-wide">
                <p>
                    &copy; {currentYear} Auroreal Editora. Todos os direitos reservados.
                </p>
            </div>
        </motion.footer>
    )
}
