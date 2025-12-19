/**
 * Formata CPF para exibição
 * @param cpf - CPF apenas números
 * @returns CPF formatado (000.000.000-00)
 */
export function formatCPF(value: string): string {
    let cpf = value.replace(/\D/g, '');
    if (cpf.length > 11) cpf = cpf.slice(0, 11);

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
}

/**
 * Formata telefone para exibição
 * @param phone - Telefone apenas números
 * @returns Telefone formatado ((00) 00000-0000)
 */
export function formatPhone(value: string): string {
    let phone = value.replace(/\D/g, '');
    if (phone.length > 11) phone = phone.slice(0, 11);

    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');

    return phone;
}

/**
 * Formata CEP para exibição
 * @param cep - CEP apenas números
 * @returns CEP formatado (00000-000)
 */
export function formatCEP(value: string): string {
    let cep = value.replace(/\D/g, '');
    if (cep.length > 8) cep = cep.slice(0, 8);

    cep = cep.replace(/(\d{5})(\d)/, '$1-$2');

    return cep;
}

/**
 * Formata valor monetário
 * @param value - Valor numérico
 * @returns Valor formatado em reais (R$ 0,00)
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

/**
 * Remove formatação de CPF
 * @param cpf - CPF formatado
 * @returns CPF apenas números
 */
export function unformatCPF(cpf: string): string {
    return cpf.replace(/\D/g, '');
}

/**
 * Remove formatação de telefone
 * @param phone - Telefone formatado
 * @returns Telefone apenas números
 */
export function unformatPhone(phone: string): string {
    return phone.replace(/\D/g, '');
}

/**
 * Remove formatação de CEP
 * @param cep - CEP formatado
 * @returns CEP apenas números
 */
export function unformatCEP(cep: string): string {
    return cep.replace(/\D/g, '');
}

/**
 * Formata número com separador de milhares
 * @param value - Valor numérico
 * @returns Valor formatado (1.000)
 */
export function formatNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR').format(value);
}

/**
 * Calcula tempo restante até uma data
 * @param targetDate - Data alvo
 * @returns Objeto com dias, horas, minutos e segundos restantes
 */
export function getTimeRemaining(targetDate: Date): {
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
} {
    const total = targetDate.getTime() - Date.now();

    if (total <= 0) {
        return {
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true,
        };
    }

    return {
        total,
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / 1000 / 60) % 60),
        seconds: Math.floor((total / 1000) % 60),
        isExpired: false,
    };
}

/**
 * Formata tempo restante para exibição
 * @param time - Objeto com tempo restante
 * @returns String formatada (00d 00h 00m 00s)
 */
export function formatTimeRemaining(time: ReturnType<typeof getTimeRemaining>): string {
    if (time.isExpired) return 'Encerrado';

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(time.days)}d ${pad(time.hours)}h ${pad(time.minutes)}m ${pad(time.seconds)}s`;
}

/**
 * Gera mensagem para WhatsApp
 * @param product - Dados do produto
 * @param customer - Dados do cliente
 * @returns URL do WhatsApp com mensagem
 */
export function generateWhatsAppMessage(
    product: { name: string; price: string },
    customer: { name: string; cpf: string; email: string; phone: string },
    whatsappNumber: string
): string {
    const message = encodeURIComponent(
        `Olá! Gostaria de finalizar a compra do *${product.name}* (${product.price}).

Meus dados:
Nome: ${customer.name}
CPF: ${customer.cpf}
Email: ${customer.email}
Telefone: ${customer.phone}`
    );

    return `https://wa.me/${whatsappNumber}?text=${message}`;
}
