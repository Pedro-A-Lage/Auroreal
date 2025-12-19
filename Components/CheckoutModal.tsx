import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, ShieldCheck, Package, Truck, CreditCard, Smartphone } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'
import { StepIndicator } from './checkout/StepIndicator'
import { FloatingLabelInput } from './ui/FloatingLabelInput'
import { PasswordStrengthMeter } from './ui/PasswordStrengthMeter'
import { Badge } from './ui/Badge'
import { ConfirmDialog } from './ui/ConfirmDialog'
import bookCover from '../assets/Caminhos para educação de Superdotado.png'

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        price: string;
        type: 'digital' | 'fisico' | 'colecionador';
    } | null;
}

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        // Personal
        name: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        // Address
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        // Payment
        paymentMethod: '' as 'pix' | 'card' | 'boleto' | 'whatsapp' | '',
        // Newsletter
        subscribeNewsletter: true
    });
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const steps = [
        { number: 1, label: 'Produto' },
        { number: 2, label: 'Dados' },
        ...(product?.type === 'digital' ? [] : [{ number: 3, label: 'Endereço' }]),
        { number: product?.type === 'digital' ? 3 : 4, label: 'Pagamento' }
    ];

    // Validation functions
    const validateCPF = (cpf: string) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    };

    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setFormData({ ...formData, cpf: value });
    };

    // Clear specific field error
    const clearFieldError = (fieldName: string) => {
        setErrors((prev: any) => ({ ...prev, [fieldName]: '' }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        setFormData({ ...formData, phone: value });
    };

    const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        setFormData({ ...formData, cep: value });

        // Fetch address when CEP is complete
        if (value.replace(/\D/g, '').length === 8) {
            setIsLoading(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${value.replace(/\D/g, '')}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev,
                        street: data.logradouro || '',
                        neighborhood: data.bairro || '',
                        city: data.localidade || '',
                        state: data.uf || ''
                    }));
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
            setIsLoading(false);
        }
    };

    // Google Login
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await userInfoResponse.json();
                setFormData(prev => ({
                    ...prev,
                    name: userInfo.name || '',
                    email: userInfo.email || ''
                }));
            } catch (error) {
                console.error("Erro ao buscar dados do Google:", error);
            }
        }
    });

    // Listen to password generation
    useEffect(() => {
        const handleGeneratePassword = (e: any) => {
            setFormData(prev => ({ ...prev, password: e.detail.password, confirmPassword: e.detail.password }));
        };
        window.addEventListener('generatePassword', handleGeneratePassword);
        return () => window.removeEventListener('generatePassword', handleGeneratePassword);
    }, []);

    const validateStep = (step: number) => {
        const newErrors: any = {};

        if (step === 2) {
            if (!formData.name.trim().includes(' ') || formData.name.trim().length < 6) {
                newErrors.name = 'Digite seu nome e sobrenome.';
            }
            if (!validateCPF(formData.cpf)) {
                newErrors.cpf = 'CPF inválido.';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'E-mail inválido.';
            }
            const phoneClean = formData.phone.replace(/\D/g, '');
            if (phoneClean.length < 10 || phoneClean.length > 11) {
                newErrors.phone = 'Telefone inválido.';
            }
            if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(formData.password)) {
                newErrors.password = 'Senha fraca.';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'As senhas não coincidem.';
            }
        }

        if (step === 3 && product?.type !== 'digital') {
            if (!formData.cep || formData.cep.replace(/\D/g, '').length !== 8) {
                newErrors.cep = 'CEP inválido.';
            }
            if (!formData.number) {
                newErrors.number = 'Número é obrigatório.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleSubmit = () => {
        const message = `Olá! Gostaria de finalizar a compra do *${product?.name}* (${product?.price}).%0A%0AMeus dados:%0ANome: ${formData.name}%0ACPF: ${formData.cpf}%0AEmail: ${formData.email}%0ATelefone: ${formData.phone}`;
        window.open(`https://wa.me/5531998940402?text=${message}`, '_blank');
        setTimeout(() => onClose(), 1000);
    };

    // Check if user has filled any data
    const hasFilledData = () => {
        return formData.name || formData.cpf || formData.email || formData.phone || formData.password;
    };

    // Handle close with confirmation if data is filled
    const handleClose = () => {
        if (hasFilledData()) {
            setShowConfirmDialog(true);
        } else {
            onClose();
        }
    };

    const confirmClose = () => {
        setShowConfirmDialog(false);
        onClose();
    };

    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative max-h-[90vh] flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                            >
                                <X size={24} />
                            </button>

                            {/* Step Indicator */}
                            <StepIndicator steps={steps} currentStep={currentStep} />

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {/* Step 1: Product Review */}
                                {currentStep === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-serif text-primary mb-4">Revisar Produto</h2>

                                        {/* Product Card */}
                                        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 rounded-xl p-6 flex gap-4">
                                            <img src={bookCover} alt={product.name} className="w-20 h-auto rounded-lg shadow-md flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <Badge
                                                    text={product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                                                    variant="primary"
                                                    size="sm"
                                                />
                                                <h3 className="font-bold text-xl text-primary mt-2">{product.name}</h3>
                                                <p className="text-3xl font-serif text-primary mt-2">{product.price}</p>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    {product.type === 'digital' && '📱 Acesso imediato após o pagamento'}
                                                    {product.type === 'fisico' && '📦 Entrega em 10-15 dias úteis + E-book'}
                                                    {product.type === 'colecionador' && '⭐ Livro + E-book + Webinar exclusivo'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Trust Badges */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <ShieldCheck className="w-8 h-8 text-success mx-auto mb-2" />
                                                <p className="text-xs font-medium text-gray-700">Pagamento Seguro</p>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Package className="w-8 h-8 text-info mx-auto mb-2" />
                                                <p className="text-xs font-medium text-gray-700">Garantia 7 dias</p>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Truck className="w-8 h-8 text-accent mx-auto mb-2" />
                                                <p className="text-xs font-medium text-gray-700">Entrega Garantida</p>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleNext}
                                            className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-lg"
                                        >
                                            Continuar
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* Step 2: Personal Data */}
                                {currentStep === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-serif text-primary">Seus Dados</h2>
                                            <p className="text-sm text-gray-600 mt-2">Preencha suas informações para criar sua conta.</p>
                                        </div>

                                        {/* Google OAuth */}
                                        <button
                                            type="button"
                                            onClick={() => login()}
                                            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            Preencher com Google
                                        </button>

                                        <div className="relative">
                                            <hr className="border-gray-200" />
                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-400 uppercase">ou</span>
                                        </div>

                                        {/* Form */}
                                        <div className="space-y-4">
                                            <FloatingLabelInput
                                                label="Nome completo"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                onFocus={() => clearFieldError('name')}
                                                error={errors.name}
                                                success={!errors.name && formData.name.length > 0}
                                            />
                                            <FloatingLabelInput
                                                label="CPF"
                                                value={formData.cpf}
                                                onChange={handleCPFChange}
                                                onFocus={() => clearFieldError('cpf')}
                                                error={errors.cpf}
                                                success={!errors.cpf && validateCPF(formData.cpf)}
                                                placeholder="000.000.000-00"
                                            />
                                            <FloatingLabelInput
                                                label="E-mail"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                onFocus={() => clearFieldError('email')}
                                                error={errors.email}
                                                success={!errors.email && formData.email.includes('@')}
                                            />
                                            <FloatingLabelInput
                                                label="Telefone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                onFocus={() => clearFieldError('phone')}
                                                error={errors.phone}
                                                success={!errors.phone && formData.phone.replace(/\D/g, '').length >= 10}
                                                placeholder="(11) 99999-9999"
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FloatingLabelInput
                                                    label="Senha"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    onFocus={() => clearFieldError('password')}
                                                    error={errors.password}
                                                />
                                                <FloatingLabelInput
                                                    label="Confirmar senha"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    onFocus={() => clearFieldError('confirmPassword')}
                                                    error={errors.confirmPassword}
                                                    success={!errors.confirmPassword && !!formData.confirmPassword && formData.password === formData.confirmPassword}
                                                />
                                            </div>

                                            <PasswordStrengthMeter password={formData.password} />

                                            {/* Newsletter Opt-in */}
                                            <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.subscribeNewsletter}
                                                    onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    Quero receber novidades e lançamentos da <strong>Auroreal Editora</strong>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setCurrentStep(prev => prev - 1)}
                                                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                            >
                                                Voltar
                                            </button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleNext}
                                                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-accent transition-all shadow-lg"
                                            >
                                                Continuar
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Address (conditional) */}
                                {currentStep === 3 && product.type !== 'digital' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-serif text-primary">Endereço de Entrega</h2>
                                            <p className="text-sm text-gray-600 mt-2">Estimativa: 10-15 dias úteis</p>
                                        </div>

                                        <div className="space-y-4">
                                            <FloatingLabelInput
                                                label="CEP"
                                                value={formData.cep}
                                                onChange={handleCEPChange}
                                                error={errors.cep}
                                                placeholder="00000-000"
                                            />
                                            {isLoading && <p className="text-sm text-accent">Buscando endereço...</p>}
                                            <FloatingLabelInput
                                                label="Rua"
                                                value={formData.street}
                                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                                disabled
                                            />
                                            <div className="grid grid-cols-3 gap-4">
                                                <FloatingLabelInput
                                                    label="Número"
                                                    value={formData.number}
                                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                                    error={errors.number}
                                                />
                                                <div className="col-span-2">
                                                    <FloatingLabelInput
                                                        label="Complemento (opcional)"
                                                        value={formData.complement}
                                                        onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <FloatingLabelInput
                                                label="Bairro"
                                                value={formData.neighborhood}
                                                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                                                disabled
                                            />
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-2">
                                                    <FloatingLabelInput
                                                        label="Cidade"
                                                        value={formData.city}
                                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                        disabled
                                                    />
                                                </div>
                                                <FloatingLabelInput
                                                    label="UF"
                                                    value={formData.state}
                                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setCurrentStep(prev => prev - 1)}
                                                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                            >
                                                Voltar
                                            </button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleNext}
                                                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-accent transition-all shadow-lg"
                                            >
                                                Continuar
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4/3: Payment Selection */}
                                {((currentStep === 3 && product.type === 'digital') || (currentStep === 4 && product.type !== 'digital')) && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-serif text-primary">Forma de Pagamento</h2>
                                            <p className="text-sm text-gray-600 mt-2">Escolha como deseja pagar</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { id: 'whatsapp', icon: Smartphone, label: 'WhatsApp', badge: 'Recomendado', desc: 'Atendimento personalizado' },
                                                { id: 'pix', icon: CreditCard, label: 'PIX', badge: '', desc: 'Aprovação instantânea' },
                                            ].map(method => (
                                                <motion.button
                                                    key={method.id}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    onClick={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                                                    className={`p-5 rounded-xl border-2 transition-all text-left ${formData.paymentMethod === method.id
                                                        ? 'border-accent bg-accent/5 shadow-lg'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <method.icon className={`w-8 h-8 ${formData.paymentMethod === method.id ? 'text-accent' : 'text-gray-400'}`} />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-bold text-lg">{method.label}</h3>
                                                                {method.badge && <Badge text={method.badge} variant="success" size="sm" />}
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1">{method.desc}</p>
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setCurrentStep(prev => prev - 1)}
                                                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                            >
                                                Voltar
                                            </button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleSubmit}
                                                disabled={!formData.paymentMethod}
                                                className="flex-1 bg-gradient-to-r from-accent to-accent-600 text-white py-3 rounded-xl font-bold hover:shadow-glow-accent transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Finalizar Reserva
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                title="Deseja sair?"
                message="Você tem dados preenchidos. Se sair agora, todas as informações serão perdidas."
                confirmText="Sim, sair"
                cancelText="Continuar preenchendo"
                onConfirm={confirmClose}
                onCancel={() => setShowConfirmDialog(false)}
            />
        </AnimatePresence>
    )
}
