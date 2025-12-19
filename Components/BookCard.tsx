import React from 'react'
import { motion } from 'framer-motion'
export interface Book {
    id: string
    title: string
    author: string
    price: string
    coverUrl: string
    category: string
}
interface BookCardProps {
    book: Book
    index: number
}
export function BookCard({ book, index }: BookCardProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                margin: '-50px',
            }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
            }}
            className="group cursor-pointer flex flex-col gap-4"
        >
            {/* Image Container with contained zoom */}
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                <motion.img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                    whileHover={{
                        scale: 1.05,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeOut',
                    }}
                />

                {/* Quick Add Overlay - Subtle */}
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileHover={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="absolute inset-0 bg-black/5 flex items-center justify-center"
                >
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1a1a1a] translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <div className="space-y-1">
                <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
                    {book.category}
                </p>
                <h3 className="font-serif text-lg leading-tight text-[#1a1a1a] group-hover:text-[#8B2635] transition-colors duration-200">
                    {book.title}
                </h3>
                <div className="flex justify-between items-baseline pt-1">
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-sm font-medium text-[#8B2635]">{book.price}</p>
                </div>
            </div>
        </motion.div>
    )
}
