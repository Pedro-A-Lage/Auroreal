/**
 * Servico de integracao com InfinityPay
 *
 * NOTA: Este arquivo contem a estrutura base para integracao.
 * A implementacao real depende da documentacao oficial do InfinityPay.
 * Os endpoints e formatos de dados podem variar.
 */

import { Order, CreateOrderData } from '../../types/order';

const INFINITYPAY_PUBLIC_KEY = import.meta.env.VITE_INFINITYPAY_PUBLIC_KEY || '';
const INFINITYPAY_ENV = import.meta.env.VITE_INFINITYPAY_ENVIRONMENT || 'sandbox';

// URLs base (ajustar conforme documentacao oficial)
const API_URLS = {
    sandbox: 'https://api.sandbox.infinitypay.io',
    production: 'https://api.infinitypay.io',
};

const API_BASE_URL = API_URLS[INFINITYPAY_ENV as keyof typeof API_URLS] || API_URLS.sandbox;

// Tipos de resposta do InfinityPay
export interface PixPaymentResponse {
    id: string;
    status: 'pending' | 'paid' | 'expired' | 'cancelled';
    pixCode: string;
    pixQrCode: string; // Base64 da imagem QR Code
    expiresAt: string;
    amount: number;
}

export interface CardPaymentResponse {
    id: string;
    status: 'pending' | 'approved' | 'declined' | 'error';
    transactionId: string;
    authorizationCode?: string;
    message?: string;
}

export interface PaymentStatusResponse {
    id: string;
    status: 'pending' | 'paid' | 'failed' | 'expired' | 'refunded';
    paidAt?: string;
    amount: number;
}

export interface CardTokenResponse {
    token: string;
    lastDigits: string;
    brand: string;
    expiresAt: string;
}

/**
 * Criar pagamento via PIX
 */
export async function createPixPayment(orderData: {
    orderId: string;
    amount: number;
    customer: {
        name: string;
        cpf: string;
        email: string;
    };
    description: string;
}): Promise<PixPaymentResponse> {
    const response = await fetch(`${API_BASE_URL}/v1/pix/qrcode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${INFINITYPAY_PUBLIC_KEY}`,
        },
        body: JSON.stringify({
            amount: Math.round(orderData.amount * 100), // Converter para centavos
            description: orderData.description,
            external_reference: orderData.orderId,
            customer: {
                name: orderData.customer.name,
                document: orderData.customer.cpf.replace(/\D/g, ''),
                email: orderData.customer.email,
            },
            expiration_minutes: 30, // PIX expira em 30 minutos
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao criar pagamento PIX');
    }

    const data = await response.json();

    return {
        id: data.id,
        status: 'pending',
        pixCode: data.pix_code || data.qr_code_text,
        pixQrCode: data.qr_code_base64 || data.qr_code_image,
        expiresAt: data.expires_at,
        amount: orderData.amount,
    };
}

/**
 * Tokenizar cartao de credito
 * NOTA: Em producao, use o SDK JavaScript do InfinityPay para tokenizacao segura
 */
export async function tokenizeCard(cardData: {
    number: string;
    holderName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
}): Promise<CardTokenResponse> {
    const response = await fetch(`${API_BASE_URL}/v1/tokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${INFINITYPAY_PUBLIC_KEY}`,
        },
        body: JSON.stringify({
            card: {
                number: cardData.number.replace(/\s/g, ''),
                holder_name: cardData.holderName,
                expiry_month: cardData.expiryMonth,
                expiry_year: cardData.expiryYear,
                cvv: cardData.cvv,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao tokenizar cartao');
    }

    const data = await response.json();

    return {
        token: data.token || data.id,
        lastDigits: cardData.number.slice(-4),
        brand: detectCardBrand(cardData.number),
        expiresAt: data.expires_at,
    };
}

/**
 * Criar pagamento com cartao de credito
 */
export async function createCardPayment(orderData: {
    orderId: string;
    amount: number;
    cardToken: string;
    installments: number;
    customer: {
        name: string;
        cpf: string;
        email: string;
        phone: string;
    };
    billing?: {
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
}): Promise<CardPaymentResponse> {
    const response = await fetch(`${API_BASE_URL}/v1/charges`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${INFINITYPAY_PUBLIC_KEY}`,
        },
        body: JSON.stringify({
            amount: Math.round(orderData.amount * 100),
            payment_method: 'credit_card',
            card_token: orderData.cardToken,
            installments: orderData.installments,
            external_reference: orderData.orderId,
            customer: {
                name: orderData.customer.name,
                document: orderData.customer.cpf.replace(/\D/g, ''),
                email: orderData.customer.email,
                phone: orderData.customer.phone.replace(/\D/g, ''),
            },
            billing: orderData.billing
                ? {
                      street: orderData.billing.street,
                      number: orderData.billing.number,
                      neighborhood: orderData.billing.neighborhood,
                      city: orderData.billing.city,
                      state: orderData.billing.state,
                      zip_code: orderData.billing.zipCode.replace(/\D/g, ''),
                  }
                : undefined,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao processar pagamento');
    }

    const data = await response.json();

    return {
        id: data.id,
        status: data.status === 'approved' ? 'approved' : data.status === 'declined' ? 'declined' : 'pending',
        transactionId: data.transaction_id || data.id,
        authorizationCode: data.authorization_code,
        message: data.status_message,
    };
}

/**
 * Verificar status do pagamento
 */
export async function checkPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    const response = await fetch(`${API_BASE_URL}/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${INFINITYPAY_PUBLIC_KEY}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao verificar status');
    }

    const data = await response.json();

    return {
        id: data.id,
        status: mapPaymentStatus(data.status),
        paidAt: data.paid_at,
        amount: data.amount / 100,
    };
}

/**
 * Calcular parcelas disponiveis
 */
export function calculateInstallments(
    amount: number,
    maxInstallments: number = 12
): Array<{ installments: number; installmentAmount: number; total: number; interest: boolean }> {
    const options = [];

    for (let i = 1; i <= maxInstallments; i++) {
        // Sem juros ate 3x, com juros acima (exemplo - ajustar conforme politica)
        const interestRate = i <= 3 ? 0 : 0.0199; // 1.99% ao mes
        const total = i <= 3 ? amount : amount * Math.pow(1 + interestRate, i);
        const installmentAmount = total / i;

        options.push({
            installments: i,
            installmentAmount: Math.round(installmentAmount * 100) / 100,
            total: Math.round(total * 100) / 100,
            interest: i > 3,
        });
    }

    return options;
}

// Helpers

function detectCardBrand(cardNumber: string): string {
    const number = cardNumber.replace(/\D/g, '');

    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6(?:011|5)/.test(number)) return 'discover';
    if (/^(?:2131|1800|35)/.test(number)) return 'jcb';
    if (/^3(?:0[0-5]|[68])/.test(number)) return 'diners';
    if (/^(?:5[0678]|6304|6390|67)/.test(number)) return 'maestro';
    if (/^(636368|636369|438935|504175|451416|636297)/.test(number)) return 'elo';
    if (/^(606282|3841)/.test(number)) return 'hipercard';

    return 'unknown';
}

function mapPaymentStatus(status: string): PaymentStatusResponse['status'] {
    const statusMap: Record<string, PaymentStatusResponse['status']> = {
        pending: 'pending',
        processing: 'pending',
        approved: 'paid',
        paid: 'paid',
        declined: 'failed',
        failed: 'failed',
        cancelled: 'failed',
        expired: 'expired',
        refunded: 'refunded',
    };

    return statusMap[status] || 'pending';
}

/**
 * Formatar numero do cartao para exibicao
 */
export function formatCardNumber(number: string): string {
    const cleaned = number.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
}

/**
 * Validar numero do cartao (Luhn algorithm)
 */
export function validateCardNumber(number: string): boolean {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

/**
 * Validar CVV
 */
export function validateCVV(cvv: string, brand: string): boolean {
    const cleaned = cvv.replace(/\D/g, '');
    const expectedLength = brand === 'amex' ? 4 : 3;
    return cleaned.length === expectedLength;
}

/**
 * Validar data de validade
 */
export function validateExpiry(month: string, year: string): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
}
