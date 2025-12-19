import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Purchase {
    id: number;
    name: string;
    location: string;
    product: 'Digital' | 'Físico' | 'Colecionador';
    timeAgo: string;
    avatar: string;
}

const purchases: Purchase[] = [
    { id: 1, name: "Maria S.", location: "São Paulo, SP", product: "Colecionador", timeAgo: "Agora mesmo", avatar: "MS" },
    { id: 2, name: "João P.", location: "Rio de Janeiro, RJ", product: "Físico", timeAgo: "Há 2 minutos", avatar: "JP" },
    { id: 3, name: "Ana C.", location: "Belo Horizonte, MG", product: "Digital", timeAgo: "Há 5 minutos", avatar: "AC" },
    { id: 4, name: "Carlos M.", location: "Curitiba, PR", product: "Colecionador", timeAgo: "Há 8 minutos", avatar: "CM" },
    { id: 5, name: "Juliana L.", location: "Brasília, DF", product: "Físico", timeAgo: "Há 12 minutos", avatar: "JL" },
    { id: 6, name: "Roberto F.", location: "Salvador, BA", product: "Digital", timeAgo: "Há 15 minutos", avatar: "RF" },
    { id: 7, name: "Patricia A.", location: "Fortaleza, CE", product: "Colecionador", timeAgo: "Há 18 minutos", avatar: "PA" },
    { id: 8, name: "Fernando S.", location: "Porto Alegre, RS", product: "Físico", timeAgo: "Há 22 minutos", avatar: "FS" },
    { id: 9, name: "Camila R.", location: "Recife, PE", product: "Digital", timeAgo: "Há 25 minutos", avatar: "CR" },
    { id: 10, name: "Lucas T.", location: "Manaus, AM", product: "Colecionador", timeAgo: "Há 28 minutos", avatar: "LT" }
]

export function LiveActivityFeed() {
    const [visibleNotifications, setVisibleNotifications] = useState<Purchase[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Show initial notification
        const timer = setTimeout(() => {
            addNotification()
        }, 3000) // Wait 3s before first notification

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        // Add new notification every 8-15 seconds
        const interval = setInterval(() => {
            addNotification()
        }, Math.random() * 7000 + 8000) // Random between 8-15s

        return () => clearInterval(interval)
    }, [currentIndex])

    const addNotification = () => {
        const nextPurchase = purchases[currentIndex % purchases.length]

        setVisibleNotifications(prev => {
            const updated = [nextPurchase, ...prev].slice(0, 3) // Keep max 3
            return updated
        })

        setCurrentIndex(prev => prev + 1)

        // Auto-remove after 6 seconds
        setTimeout(() => {
            setVisibleNotifications(prev => prev.slice(0, -1))
        }, 6000)
    }

    const removeNotification = (id: number) => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== id))
    }

    const getProductColor = (product: string) => {
        switch (product) {
            case 'Digital': return 'border-l-primary bg-primary/5'
            case 'Físico': return 'border-l-success bg-success/5'
            case 'Colecionador': return 'border-l-accent bg-accent/5'
            default: return 'border-l-gray-400 bg-gray-50'
        }
    }

    const getProductBadgeColor = (product: string) => {
        switch (product) {
            case 'Digital': return 'bg-primary text-white'
            case 'Físico': return 'bg-success text-white'
            case 'Colecionador': return 'bg-accent text-white'
            default: return 'bg-gray-400 text-white'
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 space-y-3 hidden md:block">
            <AnimatePresence mode="popLayout">
                {visibleNotifications.map((notification, index) => (
                    <motion.div
                        key={notification.id}
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className={`
                            w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-xl
                            border-l-4 ${getProductColor(notification.product)}
                            p-3 pr-2
                            hover:shadow-2xl transition-shadow
                        `}
                    >
                        <div className="flex items-start gap-2">
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                {notification.avatar}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className="text-xs font-semibold text-gray-800 truncate">
                                        {notification.name}
                                    </p>
                                    <button
                                        onClick={() => removeNotification(notification.id)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-600 mb-1">
                                    acabou de reservar
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${getProductBadgeColor(notification.product)}`}>
                                        {notification.product}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        {notification.timeAgo}
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">
                                    📍 {notification.location}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
