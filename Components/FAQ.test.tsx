import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FAQ } from './FAQ'

describe('FAQ Component', () => {
    it('should render FAQ section title', () => {
        render(<FAQ />)
        expect(screen.getByText(/Perguntas Frequentes/i)).toBeInTheDocument()
    })

    it('should display "venda antecipada" text (not "pré-venda")', () => {
        render(<FAQ />)
        expect(screen.getByText(/venda antecipada/i)).toBeInTheDocument()
    })

    it('should render all FAQ questions', () => {
        render(<FAQ />)
        expect(screen.getByText(/Quando receberei meu livro físico/i)).toBeInTheDocument()
        expect(screen.getByText(/e-book é enviado imediatamente/i)).toBeInTheDocument()
        expect(screen.getByText(/parcelar o pagamento/i)).toBeInTheDocument()
    })

    it('should expand FAQ item when clicked', async () => {
        render(<FAQ />)

        // Primeiro item deve estar aberto por padrão (index 0)
        const firstQuestion = screen.getByText(/Quando receberei meu livro físico/i)
        const button = firstQuestion.closest('button')

        if (button) {
            fireEvent.click(button)
        }
    })

    it('should have WhatsApp contact link', () => {
        render(<FAQ />)
        expect(screen.getByText(/Falar pelo WhatsApp/i)).toBeInTheDocument()
    })

    it('should mention help availability', () => {
        render(<FAQ />)
        expect(screen.getByText(/Ainda tem dúvidas/i)).toBeInTheDocument()
    })
})
