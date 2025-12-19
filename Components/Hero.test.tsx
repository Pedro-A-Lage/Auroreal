import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

// Mock do hook useCountdown
vi.mock('../hooks/useCountdown', () => ({
    useCountdown: () => ({
        days: 30,
        hours: 12,
        minutes: 45,
        seconds: 30,
    }),
}))

describe('Hero Component', () => {
    it('should render the book title', () => {
        render(<Hero />)
        expect(screen.getByText(/Caminhos para a educação de superdotados/i)).toBeInTheDocument()
    })

    it('should display author name', () => {
        render(<Hero />)
        expect(screen.getByText(/Deborah L. Ruf, Ph.D./i)).toBeInTheDocument()
    })

    it('should display preface information for Dra. Olzeni', () => {
        render(<Hero />)
        expect(screen.getByText(/Prefácio da Dra. Olzeni Ribeiro/i)).toBeInTheDocument()
    })

    it('should have CTA button "Garantir meu Exemplar"', () => {
        render(<Hero />)
        expect(screen.getByText(/Garantir meu Exemplar/i)).toBeInTheDocument()
    })

    it('should NOT mention giftedness levels', () => {
        render(<Hero />)
        const heroElement = screen.getByRole('region', { hidden: true }) || document.body
        expect(heroElement.textContent).not.toContain('níveis de superdotação')
    })

    it('should display countdown timer', () => {
        render(<Hero />)
        // Verifica se os elementos do countdown estão presentes
        expect(screen.getByText('Dias')).toBeInTheDocument()
        expect(screen.getByText('Horas')).toBeInTheDocument()
    })

    it('should link to venda-antecipada section (not pre-venda)', () => {
        render(<Hero />)
        const ctaLink = screen.getByText(/Garantir meu Exemplar/i).closest('a')
        expect(ctaLink).toHaveAttribute('href', '#venda-antecipada')
    })
})
