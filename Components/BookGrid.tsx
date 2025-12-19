import React from 'react'
import { motion } from 'framer-motion'
import { BookCard } from './BookCard'
import { books } from '../data/siteData'

// ... imports equal ...
export function BookGrid() {
    return (
        <section id="books" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-background overflow-hidden">
            <div className="text-center mb-16">
                <motion.span
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: false,
                        margin: "-50px"
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut"
                    }}
                    className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-4 block"
                >
                    Exclusividade
                </motion.span>
                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: false,
                        margin: "-50px"
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 0.1,
                        ease: "easeOut"
                    }}
                    className="text-4xl md:text-5xl font-serif text-primary mb-6"
                >
                    Nossa Coleção
                </motion.h2>
                <motion.div
                    initial={{
                        scaleX: 0,
                    }}
                    whileInView={{
                        scaleX: 1,
                    }}
                    viewport={{
                        once: false,
                        margin: "-50px"
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 0.2,
                        ease: "easeOut"
                    }}
                    className="h-[1px] w-24 bg-accent mx-auto"
                />
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: false,
                    margin: "-50px"
                }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                            delayChildren: 0.3,
                        },
                    },
                }}
                className="flex flex-wrap justify-center gap-x-8 gap-y-16"
            >
                {books.map((book, index) => (
                    <motion.div
                        key={book.id}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.8, ease: "easeOut" }
                            }
                        }}
                        className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
                    >
                        <BookCard book={book} index={index} />
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-20 text-center">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.6, duration: 1.0 }}
                    className="px-8 py-4 border border-primary text-primary font-bold tracking-[0.1em] hover:bg-primary hover:text-white transition-all duration-300 uppercase text-xs"
                >
                    Ver Todos os Recursos
                </motion.button>
            </div>
        </section>
    )
}
