import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Badge } from './ui/Badge'
import bookCover from '../assets/livro-lancamento.jpg'

interface Product {
    name: string;
    price: string;
    type: 'digital' | 'fisico' | 'colecionador';
}

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Product[];
    onRemoveItem: (index: number) => void;
    onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }: CartSidebarProps) {
    const total = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        return acc + price;
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8F6F3]">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary" size={24} />
                                <h2 className="text-xl font-serif text-primary">Seu Carrinho</h2>
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {cartItems.length}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-6 relative"
                                    >
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                                            <ShoppingBag size={48} className="text-primary/30" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xl">
                                            😊
                                        </div>
                                    </motion.div>
                                    <h3 className="text-xl font-serif text-primary mb-2">Seu carrinho aguarda...</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Adicione o livro "Caminhos para a educação de superdotados" e garanta sua vaga!
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            onClose();
                                            setTimeout(() => {
                                                const preSaleSection = document.getElementById('pre-venda');
                                                if (preSaleSection) {
                                                    preSaleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                            }, 300);
                                        }}
                                        className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent transition-colors shadow-lg flex items-center gap-2"
                                    >
                                        Ver Pré-venda
                                        <ArrowRight size={18} />
                                    </motion.button>
                                </div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        key={index}
                                        className="flex items-start gap-4 bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-primary/20 hover:shadow-md transition-all group"
                                    >
                                        {/* Book Image with Type Badge */}
                                        <div className="relative shrink-0">
                                            <img
                                                src={bookCover}
                                                alt={item.name}
                                                className="w-20 h-auto rounded-lg shadow-md"
                                            />
                                            {/* Type Badge Overlay */}
                                            <div className="absolute -top-2 -right-2">
                                                <Badge
                                                    text={
                                                        item.type === 'digital' ? 'Digital' :
                                                            item.type === 'fisico' ? 'Físico' :
                                                                'Premium'
                                                    }
                                                    variant={
                                                        item.type === 'digital' ? 'primary' :
                                                            item.type === 'fisico' ? 'success' :
                                                                'accent'
                                                    }
                                                    size="sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-primary line-clamp-2 text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {item.type === 'digital' && '📱 Acesso digital'}
                                                {item.type === 'fisico' && '📦 Livro + E-book'}
                                                {item.type === 'colecionador' && '⭐ Completo + Webinar'}
                                            </p>
                                            <p className="text-primary font-bold mt-2 text-lg">{item.price}</p>
                                        </div>

                                        <button
                                            onClick={() => onRemoveItem(index)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                            title="Remover item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                                {/* Savings Indicator */}
                                {cartItems.some(item => item.type === 'colecionador') && (
                                    <div className="bg-success-light border border-success/20 rounded-xl p-4 mb-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl">🎉</span>
                                            <p className="text-sm font-bold text-success-dark">Você está economizando!</p>
                                        </div>
                                        <p className="text-xs text-success-dark/80">
                                            Colecionador: Valor total R$ 250, você paga apenas R$ 149,90
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center text-sm text-gray-600">
                                        <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
                                        <span className="font-medium">R$ {total.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-success">
                                        <span>Frete</span>
                                        <span className="font-bold">GRÁTIS</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-6 pb-4 border-t pt-4">
                                    <span className="text-gray-700 font-semibold">Total</span>
                                    <span className="text-3xl font-serif text-primary font-bold">
                                        R$ {total.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onCheckout}
                                    className="w-full bg-gradient-to-r from-primary to-primary-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:from-accent hover:to-accent-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                >
                                    Finalizar Compra
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </motion.button>

                                <p className="text-xs text-center text-gray-500 mt-4">
                                    🔒 Pagamento 100% seguro e protegido
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
