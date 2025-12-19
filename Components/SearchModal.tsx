import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react'

interface Product {
    id: string;
    name: string;
    type: 'digital' | 'fisico' | 'colecionador';
    price: string;
    coverUrl: string; // We'll use a generic one or specific if available
}

// Hardcoded products as requested: "Only the 3 versions"
import bookCover from '../assets/chaves-cover.png'

interface Product {
    id: string;
    name: string;
    type: 'digital' | 'fisico' | 'colecionador';
    price: string;
    coverUrl: string; // We'll use a generic one or specific if available
}

// Hardcoded products as requested: "Only the 3 versions"
const SEARCH_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Caminhos para a educação de superdotados - Digital',
        type: 'digital',
        price: 'R$ 69,90',
        coverUrl: bookCover
    },
    {
        id: '2',
        name: 'Caminhos para a educação de superdotados - Físico + E-book',
        type: 'fisico',
        price: 'R$ 99,90',
        coverUrl: bookCover
    },
    {
        id: '3',
        name: 'Caminhos para a educação de superdotados - Colecionador',
        type: 'colecionador',
        price: 'R$ 149,90',
        coverUrl: bookCover
    }
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProduct: (product: { name: string, price: string, type: 'digital' | 'fisico' | 'colecionador' }) => void;
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            setSearchTerm(''); // Clear on close
        }
    }, [isOpen]);

    const filteredProducts = searchTerm.trim() === ''
        ? SEARCH_PRODUCTS
        : SEARCH_PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleProductClick = (product: Product) => {
        onSelectProduct({
            name: product.name,
            price: product.price,
            type: product.type
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
                    />

                    {/* Search Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-[90] flex flex-col items-center pt-24 px-4 pointer-events-none"
                    >
                        <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[70vh]">
                            {/* Input Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                                <SearchIcon className="text-gray-400" size={24} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Busque por versão (Digital, Físico...)"
                                    className="flex-1 text-xl text-primary font-medium placeholder-gray-300 outline-none bg-transparent h-12"
                                />
                                <button
                                    onClick={onClose}
                                    className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="overflow-y-auto">
                                {filteredProducts.length === 0 ? (
                                    <div className="p-8 text-center text-gray-400">
                                        <p>Nenhuma versão encontrada para "{searchTerm}"</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-50">
                                        {filteredProducts.map((product) => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleProductClick(product)}
                                                className="w-full p-4 hover:bg-gray-50 flex items-center gap-4 text-left transition-colors group"
                                            >
                                                <div className="w-12 h-16 bg-gray-200 rounded object-cover shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                                                    <img src={product.coverUrl} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-primary text-lg group-hover:text-accent transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 capitalize">{product.type}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block font-bold text-primary">{product.price}</span>
                                                    <span className="text-xs text-accent uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                                                        Ver <ArrowRight size={10} />
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
