import { Timestamp } from 'firebase/firestore';

export type ProductType = 'digital' | 'fisico' | 'colecionador';
export type PaymentMethod = 'pix' | 'credit_card';
export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'refunded' | 'cancelled';
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type DeliveryStatus = 'pending' | 'shipped' | 'in_transit' | 'delivered';

export interface OrderCustomer {
    name: string;
    email: string;
    cpf: string;
    phone: string;
}

export interface OrderAddress {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface OrderItem {
    productId: string;
    productType: ProductType;
    name: string;
    price: number;
    quantity: number;
}

export interface OrderPayment {
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
    pixCode?: string;
    pixQrCode?: string;
    pixExpiresAt?: Timestamp;
    cardLastDigits?: string;
    cardBrand?: string;
    installments?: number;
    paidAt?: Timestamp;
    failedAt?: Timestamp;
    failureReason?: string;
}

export interface OrderDelivery {
    status: DeliveryStatus;
    trackingCode?: string;
    carrier?: string;
    shippedAt?: Timestamp;
    estimatedDelivery?: Timestamp;
    deliveredAt?: Timestamp;
}

export interface OrderTotals {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
}

export interface OrderMetadata {
    source: 'website' | 'modal' | 'admin';
    userAgent?: string;
    ipAddress?: string;
    couponCode?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    customer: OrderCustomer;
    address?: OrderAddress;
    items: OrderItem[];
    payment: OrderPayment;
    delivery?: OrderDelivery;
    totals: OrderTotals;
    status: OrderStatus;
    metadata: OrderMetadata;
    hubspotContactId?: string;
    hubspotDealId?: string;
    notes?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface CreateOrderData {
    userId: string;
    customer: OrderCustomer;
    address?: OrderAddress;
    items: OrderItem[];
    payment: {
        method: PaymentMethod;
    };
    totals: OrderTotals;
    metadata: OrderMetadata;
}

export interface UpdateOrderData {
    status?: OrderStatus;
    payment?: Partial<OrderPayment>;
    delivery?: Partial<OrderDelivery>;
    notes?: string;
}

// Helper type for order filters
export interface OrderFilters {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    productType?: ProductType;
    startDate?: Date;
    endDate?: Date;
    searchTerm?: string;
}
