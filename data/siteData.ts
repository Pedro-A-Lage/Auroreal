import bookCover from '../assets/Caminhos para educação de Superdotado.png'

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
        id: 'caminhos-1',
        title: 'Caminhos para a Educação de Superdotados',
        subtitle: 'Guia Completo para Pais e Educadores',
        author: 'Dra. Deborah L. Ruf',
        coverUrl: bookCover,
        category: 'Educação de Superdotados',
        price: 'R$ 99,90'
    }
]

export const navItems = [
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Conheça a Autora', href: '#sobre-autora' },
    { label: 'Edição Limitada', href: '#venda-antecipada' },
    { label: 'Contato', href: '#footer' },
]

