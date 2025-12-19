import { useState, useCallback, ChangeEvent } from 'react';
import { FormErrors } from '../utils/validation';

interface UseFormOptions<T> {
    initialValues: T;
    validate?: (values: T) => FormErrors;
    onSubmit?: (values: T) => void | Promise<void>;
}

/**
 * Hook genérico para gerenciamento de formulários
 */
export function useForm<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit,
}: UseFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Atualiza um campo
    const setValue = useCallback((name: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
    }, []);

    // Handler para inputs
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValue(name as keyof T, type === 'checkbox' ? checked : value);
    }, [setValue]);

    // Handler para blur (marca campo como tocado)
    const handleBlur = useCallback((name: keyof T) => {
        setTouched(prev => ({ ...prev, [name]: true }));
    }, []);

    // Limpa erro de um campo específico
    const clearError = useCallback((name: string) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }, []);

    // Valida todos os campos
    const validateForm = useCallback((): boolean => {
        if (!validate) return true;

        const newErrors = validate(values);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [values, validate]);

    // Valida um campo específico
    const validateField = useCallback((name: keyof T): boolean => {
        if (!validate) return true;

        const allErrors = validate(values);
        const fieldError = allErrors[name as string];

        setErrors(prev => ({
            ...prev,
            [name]: fieldError,
        }));

        return !fieldError;
    }, [values, validate]);

    // Submit do formulário
    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!validateForm()) return false;

        if (onSubmit) {
            setIsSubmitting(true);
            try {
                await onSubmit(values);
                return true;
            } catch (error) {
                console.error('Form submission error:', error);
                return false;
            } finally {
                setIsSubmitting(false);
            }
        }

        return true;
    }, [values, validateForm, onSubmit]);

    // Reseta o formulário
    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    // Preenche múltiplos valores
    const setMultipleValues = useCallback((newValues: Partial<T>) => {
        setValues(prev => ({ ...prev, ...newValues }));
    }, []);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        setValue,
        handleChange,
        handleBlur,
        clearError,
        validateForm,
        validateField,
        handleSubmit,
        reset,
        setMultipleValues,
        // Helpers para inputs
        getFieldProps: (name: keyof T) => ({
            name,
            value: values[name],
            onChange: handleChange,
            onFocus: () => clearError(name as string),
            onBlur: () => handleBlur(name),
            error: errors[name as string],
        }),
    };
}

export default useForm;
