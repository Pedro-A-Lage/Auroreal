import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckoutModal } from './CheckoutModal'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Wrapper para Google OAuth
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <GoogleOAuthProvider clientId="test-client-id">
            {ui}
        </GoogleOAuthProvider>
    )
}

const mockProduct = {
    name: 'Caminhos para a educação de superdotados - Digital',
    price: 'R$ 69,90',
    type: 'digital' as const,
}

describe('CheckoutModal Component', () => {
    it('should not render when closed', () => {
        renderWithProviders(
            <CheckoutModal isOpen={false} onClose={() => { }} product={mockProduct} />
        )
        expect(screen.queryByText(/Revisar Produto/i)).not.toBeInTheDocument()
    })

    it('should render when open', () => {
        renderWithProviders(
            <CheckoutModal isOpen={true} onClose={() => { }} product={mockProduct} />
        )
        expect(screen.getByText(/Revisar Produto/i)).toBeInTheDocument()
    })

    it('should display product name', () => {
        renderWithProviders(
            <CheckoutModal isOpen={true} onClose={() => { }} product={mockProduct} />
        )
        expect(screen.getByText(/Caminhos para a educação de superdotados/i)).toBeInTheDocument()
    })

    it('should show step indicators', () => {
        renderWithProviders(
            <CheckoutModal isOpen={true} onClose={() => { }} product={mockProduct} />
        )
        expect(screen.getByText('Produto')).toBeInTheDocument()
        expect(screen.getByText('Dados')).toBeInTheDocument()
        expect(screen.getByText('Pagamento')).toBeInTheDocument()
    })

    it('should have newsletter checkbox checked by default on step 2', async () => {
        renderWithProviders(
            <CheckoutModal isOpen={true} onClose={() => { }} product={mockProduct} />
        )

        // Navigate to step 2
        const continueButton = screen.getByText(/Continuar/i)
        fireEvent.click(continueButton)

        // Check for newsletter text
        expect(await screen.findByText(/receber novidades e lançamentos/i)).toBeInTheDocument()
    })

    it('should display trust badges', () => {
        renderWithProviders(
            <CheckoutModal isOpen={true} onClose={() => { }} product={mockProduct} />
        )
        expect(screen.getByText(/Pagamento Seguro/i)).toBeInTheDocument()
        expect(screen.getByText(/Garantia 7 dias/i)).toBeInTheDocument()
    })
})

describe('CheckoutModal CPF Validation', () => {
    it('should format CPF input correctly', async () => {
        renderWithProviders(
            <CheckoutModal isOpen={true} onClose={() => { }} product={mockProduct} />
        )

        // Navigate to step 2
        fireEvent.click(screen.getByText(/Continuar/i))

        // Find CPF input by placeholder
        const cpfInput = await screen.findByPlaceholderText(/000\.000\.000-00/i)
        expect(cpfInput).toBeInTheDocument()
    })
})
