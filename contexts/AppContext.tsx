import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos
export interface Product {
    name: string;
    price: string;
    type: 'digital' | 'fisico' | 'colecionador';
}

export type ModalType = 'none' | 'checkout' | 'login' | 'cart' | 'search';

interface AppState {
    modal: ModalType;
    cart: Product[];
    selectedProduct: Product | null;
}

type AppAction =
    | { type: 'OPEN_MODAL'; payload: ModalType }
    | { type: 'CLOSE_MODAL' }
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'CLEAR_CART' }
    | { type: 'SELECT_PRODUCT'; payload: Product | null }
    | { type: 'OPEN_CHECKOUT'; payload: Product };

// Estado inicial
const initialState: AppState = {
    modal: 'none',
    cart: [],
    selectedProduct: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, modal: action.payload };

        case 'CLOSE_MODAL':
            return { ...state, modal: 'none' };

        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.payload] };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((_, index) => index !== action.payload),
            };

        case 'CLEAR_CART':
            return { ...state, cart: [] };

        case 'SELECT_PRODUCT':
            return { ...state, selectedProduct: action.payload };

        case 'OPEN_CHECKOUT':
            return {
                ...state,
                cart: [...state.cart, action.payload],
                selectedProduct: action.payload,
                modal: 'checkout',
            };

        default:
            return state;
    }
}

// Context
interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
    // Helpers
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
    openCheckout: (product: Product) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;
    cartCount: number;
    isModalOpen: (modal: ModalType) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Helper functions
    const openModal = (modal: ModalType) => {
        dispatch({ type: 'OPEN_MODAL', payload: modal });
    };

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    const openCheckout = (product: Product) => {
        dispatch({ type: 'OPEN_CHECKOUT', payload: product });
    };

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (index: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: index });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const isModalOpen = (modal: ModalType) => state.modal === modal;

    const value: AppContextType = {
        state,
        dispatch,
        openModal,
        closeModal,
        openCheckout,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: state.cart.length,
        isModalOpen,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook
export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}

// Hooks específicos para facilitar uso
export function useCart() {
    const { state, addToCart, removeFromCart, clearCart, cartCount } = useApp();
    return {
        items: state.cart,
        count: cartCount,
        add: addToCart,
        remove: removeFromCart,
        clear: clearCart,
        total: state.cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            return sum + price;
        }, 0),
    };
}

export function useModal() {
    const { state, openModal, closeModal, isModalOpen } = useApp();
    return {
        current: state.modal,
        open: openModal,
        close: closeModal,
        isOpen: isModalOpen,
    };
}
