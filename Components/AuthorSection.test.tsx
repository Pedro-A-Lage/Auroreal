import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthorSection } from './AuthorSection'

describe('AuthorSection Component', () => {
    it('should render author name', () => {
        render(<AuthorSection />)
        expect(screen.getByText(/Dra. Deborah L. Ruf/i)).toBeInTheDocument()
    })

    it('should display author credentials', () => {
        render(<AuthorSection />)
        expect(screen.getByText(/Ph.D. em Psicologia Educacional/i)).toBeInTheDocument()
        expect(screen.getByText(/30\+ anos de experiência/i)).toBeInTheDocument()
    })

    it('should NOT mention "níveis de superdotação"', () => {
        const { container } = render(<AuthorSection />)
        const textContent = container.textContent || ''

        expect(textContent).not.toContain('níveis de superdotação')
        expect(textContent).not.toContain('5 níveis')
        expect(textContent).not.toContain('sistema de identificação de níveis')
    })

    it('should NOT mention old book content about levels', () => {
        const { container } = render(<AuthorSection />)
        const textContent = container.textContent || ''

        expect(textContent).not.toContain('Os 5 níveis de superdotação explicados')
    })

    it('should display what readers will find in the book', () => {
        render(<AuthorSection />)
        expect(screen.getByText(/O que você vai encontrar no livro/i)).toBeInTheDocument()
    })

    it('should mention practical topics', () => {
        render(<AuthorSection />)
        expect(screen.getByText(/Características das crianças superdotadas/i)).toBeInTheDocument()
        expect(screen.getByText(/Estratégias práticas para lidar com a escola/i)).toBeInTheDocument()
    })

    it('should have author quote', () => {
        render(<AuthorSection />)
        expect(screen.getByText(/Cada criança superdotada é única/i)).toBeInTheDocument()
    })
})
