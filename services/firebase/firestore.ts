import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    DocumentSnapshot,
    QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';
import {
    Order,
    CreateOrderData,
    UpdateOrderData,
    OrderFilters,
    OrderStatus,
    PaymentStatus,
} from '../../types/order';

const ORDERS_COLLECTION = 'orders';
const ORDERS_PER_PAGE = 20;

/**
 * Gera numero do pedido unico
 */
function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `AUR-${timestamp}-${random}`;
}

/**
 * Criar novo pedido
 */
export async function createOrder(data: CreateOrderData): Promise<string> {
    const orderNumber = generateOrderNumber();

    const orderData = {
        ...data,
        orderNumber,
        status: 'pending' as OrderStatus,
        payment: {
            ...data.payment,
            status: 'pending' as PaymentStatus,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);

    return docRef.id;
}

/**
 * Buscar pedido por ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as Order;
}

/**
 * Buscar pedidos do usuario
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
    const q = query(
        collection(db, ORDERS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Order[];
}

/**
 * Buscar todos os pedidos (admin)
 */
export async function getAllOrders(
    filters?: OrderFilters,
    lastDoc?: DocumentSnapshot,
    pageSize: number = ORDERS_PER_PAGE
): Promise<{ orders: Order[]; lastDoc: DocumentSnapshot | null }> {
    const constraints: QueryConstraint[] = [];

    // Aplicar filtros
    if (filters?.status) {
        constraints.push(where('status', '==', filters.status));
    }

    if (filters?.paymentStatus) {
        constraints.push(where('payment.status', '==', filters.paymentStatus));
    }

    if (filters?.startDate) {
        constraints.push(where('createdAt', '>=', Timestamp.fromDate(filters.startDate)));
    }

    if (filters?.endDate) {
        constraints.push(where('createdAt', '<=', Timestamp.fromDate(filters.endDate)));
    }

    // Ordenacao e paginacao
    constraints.push(orderBy('createdAt', 'desc'));
    constraints.push(limit(pageSize));

    if (lastDoc) {
        constraints.push(startAfter(lastDoc));
    }

    const q = query(collection(db, ORDERS_COLLECTION), ...constraints);
    const snapshot = await getDocs(q);

    const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Order[];

    const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

    return { orders, lastDoc: newLastDoc };
}

/**
 * Atualizar pedido
 */
export async function updateOrder(orderId: string, data: UpdateOrderData): Promise<void> {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);

    const updateData: any = {
        updatedAt: serverTimestamp(),
    };

    if (data.status) {
        updateData.status = data.status;
    }

    if (data.payment) {
        // Mesclar dados de pagamento
        Object.keys(data.payment).forEach((key) => {
            updateData[`payment.${key}`] = (data.payment as any)[key];
        });
    }

    if (data.delivery) {
        // Mesclar dados de entrega
        Object.keys(data.delivery).forEach((key) => {
            updateData[`delivery.${key}`] = (data.delivery as any)[key];
        });
    }

    if (data.notes !== undefined) {
        updateData.notes = data.notes;
    }

    await updateDoc(docRef, updateData);
}

/**
 * Atualizar status de pagamento
 */
export async function updatePaymentStatus(
    orderId: string,
    status: PaymentStatus,
    transactionId?: string
): Promise<void> {
    const updateData: UpdateOrderData = {
        payment: { status },
    };

    if (transactionId) {
        updateData.payment!.transactionId = transactionId;
    }

    if (status === 'paid') {
        updateData.payment!.paidAt = Timestamp.now();
        updateData.status = 'paid';
    } else if (status === 'failed') {
        updateData.payment!.failedAt = Timestamp.now();
    }

    await updateOrder(orderId, updateData);
}

/**
 * Listener em tempo real para pedido
 */
export function subscribeToOrder(
    orderId: string,
    callback: (order: Order | null) => void
): () => void {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);

    return onSnapshot(docRef, (snapshot) => {
        if (!snapshot.exists()) {
            callback(null);
            return;
        }

        callback({
            id: snapshot.id,
            ...snapshot.data(),
        } as Order);
    });
}

/**
 * Listener em tempo real para todos os pedidos (admin)
 */
export function subscribeToAllOrders(
    callback: (orders: Order[]) => void,
    filters?: OrderFilters
): () => void {
    const constraints: QueryConstraint[] = [];

    if (filters?.status) {
        constraints.push(where('status', '==', filters.status));
    }

    constraints.push(orderBy('createdAt', 'desc'));
    constraints.push(limit(50));

    const q = query(collection(db, ORDERS_COLLECTION), ...constraints);

    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Order[];

        callback(orders);
    });
}

/**
 * Obter estatisticas de pedidos (admin)
 */
export async function getOrderStats(): Promise<{
    total: number;
    pending: number;
    paid: number;
    shipped: number;
    delivered: number;
    totalRevenue: number;
}> {
    const snapshot = await getDocs(collection(db, ORDERS_COLLECTION));

    let total = 0;
    let pending = 0;
    let paid = 0;
    let shipped = 0;
    let delivered = 0;
    let totalRevenue = 0;

    snapshot.docs.forEach((doc) => {
        const order = doc.data() as Order;
        total++;

        switch (order.status) {
            case 'pending':
                pending++;
                break;
            case 'paid':
            case 'processing':
                paid++;
                break;
            case 'shipped':
                shipped++;
                break;
            case 'delivered':
                delivered++;
                break;
        }

        if (order.payment?.status === 'paid') {
            totalRevenue += order.totals?.total || 0;
        }
    });

    return { total, pending, paid, shipped, delivered, totalRevenue };
}

/**
 * Alias para getOrderById
 */
export const getOrder = getOrderById;

/**
 * Atualizar dados de pagamento do pedido
 */
export async function updateOrderPayment(
    orderId: string,
    paymentData: {
        status?: PaymentStatus;
        transactionId?: string;
        paidAt?: string;
    }
): Promise<void> {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);

    const updateData: Record<string, any> = {
        updatedAt: serverTimestamp(),
    };

    if (paymentData.status) {
        updateData['payment.status'] = paymentData.status;
        if (paymentData.status === 'paid') {
            updateData['status'] = 'paid';
        }
    }

    if (paymentData.transactionId) {
        updateData['payment.transactionId'] = paymentData.transactionId;
    }

    if (paymentData.paidAt) {
        updateData['payment.paidAt'] = paymentData.paidAt;
    }

    await updateDoc(docRef, updateData);
}
