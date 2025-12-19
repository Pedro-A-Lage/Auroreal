import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase/config';
import {
    loginWithEmail,
    loginWithGoogle,
    registerWithEmail,
    logout as firebaseLogout,
    resetPassword,
    getUserProfile,
    updateUserProfile,
} from '../services/firebase/auth';
import { UserProfile, RegisterData } from '../types/user';

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    loginGoogle: () => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
    clearError: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Listener para mudancas de autenticacao
    useEffect(() => {
        // Se Firebase nao esta configurado, apenas desativar loading
        if (!isFirebaseConfigured) {
            console.warn('Firebase nao configurado. Autenticacao desabilitada.');
            setLoading(false);
            return;
        }

        try {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                setUser(firebaseUser);

                if (firebaseUser) {
                    // Buscar perfil do usuario
                    try {
                        const userProfile = await getUserProfile(firebaseUser.uid);
                        setProfile(userProfile);
                    } catch (err) {
                        console.error('Erro ao buscar perfil:', err);
                    }
                } else {
                    setProfile(null);
                }

                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.error('Erro ao configurar listener de autenticacao:', err);
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            await loginWithEmail(email, password);
        } catch (err: any) {
            setError(getErrorMessage(err.code));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const loginGoogle = async () => {
        try {
            setError(null);
            setLoading(true);
            await loginWithGoogle();
        } catch (err: any) {
            setError(getErrorMessage(err.code));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setError(null);
            setLoading(true);
            await registerWithEmail(data);
        } catch (err: any) {
            setError(getErrorMessage(err.code));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await firebaseLogout();
            setProfile(null);
        } catch (err: any) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            setError(null);
            await resetPassword(email);
        } catch (err: any) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    const updateProfileData = async (data: Partial<UserProfile>) => {
        if (!user) return;

        try {
            setError(null);
            await updateUserProfile(user.uid, data);
            // Atualizar estado local
            setProfile((prev) => (prev ? { ...prev, ...data } : null));
        } catch (err: any) {
            setError('Erro ao atualizar perfil');
            throw err;
        }
    };

    const clearError = () => setError(null);

    const value: AuthContextType = {
        user,
        profile,
        loading,
        error,
        login,
        loginGoogle,
        register,
        logout,
        forgotPassword,
        updateProfile: updateProfileData,
        clearError,
        isAdmin: profile?.isAdmin || false,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

// Helper para mensagens de erro em portugues
function getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'Este email ja esta em uso.',
        'auth/invalid-email': 'Email invalido.',
        'auth/operation-not-allowed': 'Operacao nao permitida.',
        'auth/weak-password': 'Senha muito fraca.',
        'auth/user-disabled': 'Usuario desabilitado.',
        'auth/user-not-found': 'Usuario nao encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-credential': 'Credenciais invalidas.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
        'auth/popup-closed-by-user': 'Login cancelado.',
        'auth/network-request-failed': 'Erro de conexao. Verifique sua internet.',
    };

    return errorMessages[errorCode] || 'Ocorreu um erro. Tente novamente.';
}

export default AuthContext;
