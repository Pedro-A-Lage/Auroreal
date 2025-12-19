/**
 * Valida CPF brasileiro
 * @param cpf - CPF com ou sem formatação
 * @returns true se válido, false se inválido
 */
export function validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Calcula primeiro dígito verificador
    let sum = 0;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // Calcula segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

/**
 * Valida e-mail
 * @param email - Endereço de e-mail
 * @returns true se válido
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida telefone brasileiro
 * @param phone - Telefone com ou sem formatação
 * @returns true se válido (10 ou 11 dígitos)
 */
export function validatePhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

/**
 * Valida CEP brasileiro
 * @param cep - CEP com ou sem formatação
 * @returns true se tem 8 dígitos
 */
export function validateCEP(cep: string): boolean {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
}

/**
 * Valida força da senha
 * Requisitos: 8+ caracteres, 1 maiúscula, 1 número, 1 especial
 * @param password - Senha para validar
 * @returns objeto com status de cada requisito
 */
export function validatePasswordStrength(password: string): {
    isValid: boolean;
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    strength: 'weak' | 'medium' | 'strong';
} {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const passedChecks = [hasMinLength, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;

    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (passedChecks >= 4) strength = 'strong';
    else if (passedChecks >= 2) strength = 'medium';

    return {
        isValid: hasMinLength && hasUppercase && hasNumber && hasSpecial,
        hasMinLength,
        hasUppercase,
        hasNumber,
        hasSpecial,
        strength,
    };
}

/**
 * Valida nome completo (nome e sobrenome)
 * @param name - Nome completo
 * @returns true se contém pelo menos nome e sobrenome
 */
export function validateFullName(name: string): boolean {
    const trimmed = name.trim();
    return trimmed.includes(' ') && trimmed.length >= 6;
}

/**
 * Interface para erros de formulário
 */
export interface FormErrors {
    name?: string;
    cpf?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    cep?: string;
    number?: string;
    [key: string]: string | undefined;
}

/**
 * Valida todos os campos de dados pessoais
 * @param data - Dados do formulário
 * @returns objeto com erros encontrados
 */
export function validatePersonalData(data: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}): FormErrors {
    const errors: FormErrors = {};

    if (!validateFullName(data.name)) {
        errors.name = 'Digite seu nome completo (nome e sobrenome).';
    }

    if (!validateCPF(data.cpf)) {
        errors.cpf = 'CPF inválido.';
    }

    if (!validateEmail(data.email)) {
        errors.email = 'E-mail inválido.';
    }

    if (!validatePhone(data.phone)) {
        errors.phone = 'Telefone inválido.';
    }

    if (!validatePasswordStrength(data.password).isValid) {
        errors.password = 'Senha deve ter 8+ caracteres, 1 maiúscula, 1 número e 1 especial.';
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem.';
    }

    return errors;
}

/**
 * Valida campos de endereço
 * @param data - Dados de endereço
 * @returns objeto com erros encontrados
 */
export function validateAddress(data: {
    cep: string;
    number: string;
}): FormErrors {
    const errors: FormErrors = {};

    if (!validateCEP(data.cep)) {
        errors.cep = 'CEP inválido.';
    }

    if (!data.number.trim()) {
        errors.number = 'Número é obrigatório.';
    }

    return errors;
}
