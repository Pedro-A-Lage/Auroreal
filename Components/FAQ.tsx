import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { FAQ_ITEMS, CONTACT } from '../utils/constants'

// ... imports equal ...
interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="border-b border-gray-200 last:border-b-0"
        >
            <button
                onClick={onToggle}
                className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-2 rounded-lg group"
            >
                <span className="font-semibold text-primary group-hover:text-accent transition-colors pr-4 text-lg">
                    {question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="shrink-0"
                >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-accent' : 'text-gray-400'}`} />
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 px-2 text-gray-600 leading-relaxed text-base">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-32 px-6 bg-[#F8F6F3]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                        Tire suas Dúvidas
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Respondemos as dúvidas mais comuns sobre esta edição limitada
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
                >
                    {FAQ_ITEMS.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* CTA to contact */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className="mt-16 text-center"
                >
                    <div className="bg-white rounded-2xl p-8 border border-accent/20 shadow-lg inline-block w-full max-w-lg">
                        <HelpCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-primary mb-2">
                            Ainda tem dúvidas?
                        </h3>
                        <p className="text-gray-600 mb-6 font-medium">
                            Nossa equipe está pronta para ajudar você
                        </p>
                        <motion.a
                            href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}?text=Olá! Tenho uma dúvida sobre a pré-venda do livro.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-success text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-success/90 transition-all shadow-md hover:shadow-lg"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Falar pelo WhatsApp
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
