import React, { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram } from 'lucide-react'
import logo from '../assets/logo.svg'
import { navItems } from '../data/siteData'
import { smoothScrollTo } from '../utils/smoothScroll'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 50)
    })

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);

        if (elem) {
            const start = window.scrollY;
            const end = elem.getBoundingClientRect().top + start;
            const duration = 600;
            const startTime = performance.now();

            const scroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - (1 - progress) * (1 - progress);
                window.scrollTo(0, start + (end - start) * eased);
                if (progress < 1) requestAnimationFrame(scroll);
            };

            requestAnimationFrame(scroll);
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-transparent"
                animate={{
                    height: isScrolled ? '64px' : '96px',
                    boxShadow: isScrolled
                        ? '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
                        : 'none',
                    borderColor: isScrolled ? 'rgba(0,0,0,0.05)' : 'transparent',
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0 z-50">
                        <a
                            href="#hero"
                            onClick={(e) => smoothScrollTo(e, '#hero')}
                            className="block cursor-pointer"
                        >
                            <img
                                src={logo}
                                alt="Auroreal Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className="text-sm font-medium text-primary hover:text-accent transition-colors tracking-wide uppercase cursor-pointer"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="https://www.instagram.com/aurorealeditora/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-accent transition-colors hover:scale-110 transform duration-300"
                        >
                            <Instagram size={22} />
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 text-[#1a1a1a]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[60] bg-[#F8F6F3] flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col space-y-8 text-center">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className="text-2xl font-semibold text-primary hover:text-accent transition-colors cursor-pointer"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                        <div className="absolute top-6 left-6">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-primary hover:text-accent transition-colors"
                            >
                                <X size={32} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
