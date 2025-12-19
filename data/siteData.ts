import bookCover1 from '../assets/Upside-Down Brilliance.jpg'
import bookCover2 from '../assets/Counseling the Gifted &.jpg'
import bookCover3 from '../assets/Giftedness 101.jpg'
import bookCover4 from '../assets/Enjoying the Gift of Being Uncommon.jpg'

export interface BookProps {
    id: string
    title: string
    subtitle?: string
    author: string
    price: string
    coverUrl: string
    category: string
}

export const books: BookProps[] = [
    {
        id: 'silverman-1',
        title: 'Upside-Down Brilliance',
        subtitle: 'The Visual-Spatial Learner',
        author: 'Linda Silverman',
        coverUrl: bookCover1,
        category: 'Estilo de Aprendizagem',
        price: 'R$ 180,00'
    },
    {
        id: 'silverman-2',
        title: 'Counseling the Gifted & Talented',
        subtitle: 'A Guide for Professionals',
        author: 'Linda Silverman',
        coverUrl: bookCover2,
        category: 'Psicologia & Emoção',
        price: 'R$ 250,00'
    },
    {
        id: 'silverman-3',
        title: 'Giftedness 101',
        subtitle: 'Psychology 101 Series',
        author: 'Linda Silverman',
        coverUrl: bookCover3,
        category: 'Guia Essencial',
        price: 'R$ 150,00'
    },
    {
        id: 'silverman-4',
        title: 'Enjoying the Gift of Being Uncommon',
        subtitle: 'Extra Intelligent, Intense, and Effective',
        author: 'Willem Kuipers & Linda Silverman',
        coverUrl: bookCover4,
        category: 'Superdotação Adulta',
        price: 'R$ 140,00'
    }
]

export const navItems = [
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Conheça a Autora', href: '#sobre-autora' },
    { label: 'Venda Antecipada', href: '#venda-antecipada' },
    { label: 'Contato', href: '#footer' },
]
