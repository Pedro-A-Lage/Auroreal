import React from 'react'
import { motion } from 'framer-motion'

export function QuoteSection() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="font-serif text-3xl md:text-4xl italic leading-relaxed text-primary/80"
                >
                    "Superdotação não é apenas sobre ser inteligente; é uma maneira de ser."
                </motion.blockquote>
                <motion.cite
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="block mt-6 text-sm font-medium tracking-widest uppercase text-accent not-italic"
                >
                    — Columbus Group, 1991
                </motion.cite>
            </div>
        </section>
    )
}
