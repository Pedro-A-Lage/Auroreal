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
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        Auroreal Editora<span className="text-accent text-4xl">.</span>
                    </h3>
                    <p className="text-white/60 max-w-md font-light leading-relaxed mb-8 text-lg">
                        Dedicada a ampliar o acesso ao conhecimento sobre superdotação e neurodiversidade. Trazemos para o Brasil obras de referência mundial e novas vozes nacionais, em português claro. Bem-vindo à Auroreal. Aqui, a neurodiversidade fala a nossa língua.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-white/60 hover:text-accent transition-colors hover:scale-110 transform duration-300">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="text-white/60 hover:text-accent transition-colors hover:scale-110 transform duration-300">
                            <Twitter size={24} />
                        </a>
                        <a href="#" className="text-white/60 hover:text-accent transition-colors hover:scale-110 transform duration-300">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="text-white/60 hover:text-accent transition-colors hover:scale-110 transform duration-300">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-8 text-white/40">
                        Explorar
                    </h4>
                    <ul className="space-y-4 text-white/70 font-light text-lg">
                        <li>
                            <a href="#books" className="hover:text-accent transition-colors hover:pl-2 duration-300 block">
                                Mais Vendidos
                            </a>
                        </li>
                        <li>
                            <a href="#books" className="hover:text-accent transition-colors hover:pl-2 duration-300 block">
                                Lançamentos
                            </a>
                        </li>
                        <li>
                            <a href="#books" className="hover:text-accent transition-colors hover:pl-2 duration-300 block">
                                Recomendações
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-8 text-white/40">
                        Institucional
                    </h4>
                    <ul className="space-y-4 text-white/70 font-light text-lg">
                        <li>
                            <a href="#" className="hover:text-accent transition-colors hover:pl-2 duration-300 block">
                                Quem Somos
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent transition-colors hover:pl-2 duration-300 block">
                                Fale Conosco
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-accent transition-colors hover:pl-2 duration-300 block">
                                Política de Privacidade
                            </a>
                        </li>
                    </ul>
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
