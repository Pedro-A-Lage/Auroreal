import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Eye, EyeOff } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void; // Optional callback for successful login
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => console.log(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        setFormData({ ...formData, phone: value });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: '', cpf: '', email: '', phone: '', password: '', confirmPassword: '' };

        if (isRegister) {
            if (!formData.name.trim()) {
                newErrors.name = 'Nome é obrigatório.';
                isValid = false;
            }

            if (!validateCPF(formData.cpf)) {
                newErrors.cpf = 'CPF inválido.';
                isValid = false;
            }

            const phoneClean = formData.phone.replace(/\D/g, '');
            if (phoneClean.length < 10 || phoneClean.length > 11) {
                newErrors.phone = 'Telefone inválido.';
                isValid = false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido.';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória.';
            isValid = false;
        } else if (isRegister) {
            const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!strongPasswordRegex.test(formData.password)) {
                newErrors.password = 'Mínimo 8 caracteres, 1 maiúscula, 1 número e 1 símbolo.';
                isValid = false;
            }
        }

        if (isRegister && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            if (isRegister) {
                console.log("Register submit:", formData);
                // Register logic
            } else {
                console.log("Login submit:", formData);
                // Login logic
            }
            onSuccess?.(); // Call success callback if provided
            onClose();
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setErrors({ name: '', cpf: '', email: '', phone: '', password: '', confirmPassword: '' });
        setFormData({ name: '', cpf: '', email: '', phone: '', password: '', confirmPassword: '' });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className={`bg-white rounded-lg shadow-2xl w-full ${isRegister ? 'max-w-2xl' : 'max-w-sm'} overflow-hidden relative max-h-[90vh] overflow-y-auto transition-all duration-500`}
                        >
                            <div className="bg-[#F8F6F3] p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
                                <h3 className="font-serif text-xl text-primary">
                                    {isRegister ? 'Criar Conta' : 'Acessar Conta'}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8">
                                {!isRegister ? (
                                    <>
                                        <button
                                            onClick={() => login()}
                                            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-6"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            Entrar com Google
                                        </button>

                                        <div className="relative flex items-center justify-center mb-6">
                                            <hr className="w-full border-gray-200" />
                                            <span className="absolute bg-white px-2 text-xs text-gray-400 uppercase tracking-wider">ou</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => login()}
                                            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-6"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            Preencher com Google
                                        </button>

                                        <div className="relative flex items-center justify-center mb-6">
                                            <hr className="w-full border-gray-200" />
                                            <span className="absolute bg-white px-2 text-xs text-gray-400 uppercase tracking-wider">ou preencha</span>
                                        </div>
                                    </>
                                )}

                                <form onSubmit={handleSubmit} className={isRegister ? 'space-y-4' : 'space-y-4'}>
                                    {isRegister && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-md border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow`}
                                                    placeholder="Seu nome completo"
                                                />
                                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.cpf}
                                                    onChange={handleCPFChange}
                                                    className={`w-full px-4 py-3 rounded-md border ${errors.cpf ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow`}
                                                    placeholder="000.000.000-00"
                                                    maxLength={14}
                                                />
                                                {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {!isRegister ? (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail ou CPF</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className={`w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow`}
                                                placeholder="Digite seu e-mail"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow`}
                                                    placeholder="seu@email.com"
                                                />
                                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.phone}
                                                    onChange={handlePhoneChange}
                                                    className={`w-full px-4 py-3 rounded-md border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow`}
                                                    placeholder="(11) 99999-9999"
                                                    maxLength={15}
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {isRegister ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        type={showPassword ? "text" : "password"}
                                                        value={formData.password}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-md border ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow pr-10`}
                                                        placeholder="Mínimo 8 caracteres"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                            </div>
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={formData.confirmPassword}
                                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-md border ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow pr-10`}
                                                        placeholder="Repita a senha"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    className={`w-full px-4 py-3 rounded-md border ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow pr-10`}
                                                    placeholder="Sua senha"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                        </div>
                                    )}

                                    {!isRegister && (
                                        <div className="text-right">
                                            <a href="#" className="text-xs text-accent hover:underline">Esqueceu a senha?</a>
                                        </div>
                                    )}

                                    <div className={isRegister ? 'mt-4' : 'mt-4'}>
                                        <button
                                            type="submit"
                                            className={`${isRegister ? 'w-full bg-primary text-white py-4 rounded-md font-bold uppercase tracking-widest hover:bg-accent transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0' : 'w-full bg-primary text-white py-3 rounded-md font-bold uppercase tracking-widest hover:bg-accent transition-colors shadow-lg hover:shadow-xl'}`}
                                        >
                                            {isRegister ? 'Criar Conta' : 'Entrar'}
                                        </button>
                                    </div>

                                    {isRegister && (
                                        <p className="text-xs text-center text-gray-400 mt-4">
                                            Seus dados estão protegidos.
                                        </p>
                                    )}
                                </form>

                                <div className="mt-6 text-center text-sm text-gray-500">
                                    {isRegister ? (
                                        <>
                                            Já tem uma conta?{' '}
                                            <button onClick={toggleMode} className="text-accent font-bold hover:underline">Entrar</button>
                                        </>
                                    ) : (
                                        <>
                                            Não tem conta?{' '}
                                            <button onClick={toggleMode} className="text-accent font-bold hover:underline">Cadastre-se</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
