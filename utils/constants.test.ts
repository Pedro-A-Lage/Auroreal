import { describe, it, expect } from 'vitest'
import { PRODUCTS, FAQ_ITEMS, PRESALE, AUTHOR, CONTACT } from './constants'

describe('PRODUCTS', () => {
    it('should have three product types', () => {
        expect(Object.keys(PRODUCTS)).toHaveLength(3)
        expect(PRODUCTS.digital).toBeDefined()
        expect(PRODUCTS.fisico).toBeDefined()
        expect(PRODUCTS.colecionador).toBeDefined()
    })

    it('should have correct book name for all products', () => {
        expect(PRODUCTS.digital.name).toContain('Caminhos para a educação de superdotados')
        expect(PRODUCTS.fisico.name).toContain('Caminhos para a educação de superdotados')
        expect(PRODUCTS.colecionador.name).toContain('Caminhos para a educação de superdotados')
    })

    it('should have valid prices', () => {
        expect(PRODUCTS.digital.price).toBeGreaterThan(0)
        expect(PRODUCTS.fisico.price).toBeGreaterThan(PRODUCTS.digital.price)
        expect(PRODUCTS.colecionador.price).toBeGreaterThan(PRODUCTS.fisico.price)
    })

    it('should have checkout URLs for all products', () => {
        expect(PRODUCTS.digital.checkoutUrl).toMatch(/^https:\/\//)
        expect(PRODUCTS.fisico.checkoutUrl).toMatch(/^https:\/\//)
        expect(PRODUCTS.colecionador.checkoutUrl).toMatch(/^https:\/\//)
    })

    it('should include free shipping for physical products', () => {
        expect(PRODUCTS.fisico.features).toContain('Frete grátis')
        expect(PRODUCTS.colecionador.features).toContain('Frete grátis')
    })
})

describe('FAQ_ITEMS', () => {
    it('should have FAQ items defined', () => {
        expect(FAQ_ITEMS.length).toBeGreaterThan(0)
    })

    it('should have question and answer for each item', () => {
        FAQ_ITEMS.forEach(item => {
            expect(item.question).toBeDefined()
            expect(item.question.length).toBeGreaterThan(0)
            expect(item.answer).toBeDefined()
            expect(item.answer.length).toBeGreaterThan(0)
        })
    })

    it('should mention PIX discount of 5%', () => {
        const pixFaq = FAQ_ITEMS.find(item => item.question.includes('parcelar'))
        expect(pixFaq?.answer).toContain('5%')
    })

    it('should mention webinar availability date', () => {
        const webinarFaq = FAQ_ITEMS.find(item => item.question.includes('webinar'))
        expect(webinarFaq?.answer).toContain('31 de janeiro')
    })

    it('should mention shipping deadline', () => {
        const shippingFaq = FAQ_ITEMS.find(item => item.question.includes('físico'))
        expect(shippingFaq?.answer).toContain('27 de fevereiro')
    })

    it('should use "venda antecipada" terminology (not "pré-venda")', () => {
        const allText = FAQ_ITEMS.map(item => item.answer).join(' ')
        expect(allText).not.toContain('pré-venda')
        expect(allText).toContain('venda antecipada')
    })
})

describe('PRESALE', () => {
    it('should have a valid end date', () => {
        expect(PRESALE.END_DATE).toBeInstanceOf(Date)
        expect(PRESALE.END_DATE.getTime()).toBeGreaterThan(Date.now())
    })

    it('should have stock information', () => {
        expect(PRESALE.INITIAL_STOCK).toBeGreaterThan(0)
        expect(PRESALE.CURRENT_STOCK).toBeGreaterThanOrEqual(0)
        expect(PRESALE.CURRENT_STOCK).toBeLessThanOrEqual(PRESALE.INITIAL_STOCK)
    })
})

describe('AUTHOR', () => {
    it('should have author information', () => {
        expect(AUTHOR.name).toBe('Deborah L. Ruf, Ph.D.')
        expect(AUTHOR.bio).toBeDefined()
        expect(AUTHOR.quote).toBeDefined()
    })

    it('should NOT mention giftedness levels in bio', () => {
        expect(AUTHOR.bio).not.toContain('níveis de superdotação')
        expect(AUTHOR.bio).not.toContain('5 níveis')
    })
})

describe('CONTACT', () => {
    it('should have valid contact information', () => {
        expect(CONTACT.WHATSAPP_NUMBER).toMatch(/^\d+$/)
        expect(CONTACT.EMAIL).toMatch(/@/)
    })
})
